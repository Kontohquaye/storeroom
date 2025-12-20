"use server";
import { ToSales, ProductTemplateType } from "@/app/types/product";
import { SingleStore, StoreDataType, StoreListType } from "@/app/types/store";
import {
  SupplierFormState,
  SupplierFormType,
  supplierType,
} from "@/app/types/supplier";
import { auth } from "@/auth";
import { client } from "@/sanity/client";
import { z } from "zod";
import {
  CHECK_EXISTING_PRODUCT,
  FETCH_SPECIFIC_PRODUCT,
} from "@/sanity/lib/queries/products";
import {
  EXISTING_STORE_NAME,
  FETCH_SINGLE_STORE,
  FETCH_USER_STORES,
} from "@/sanity/lib/queries/store";
import {
  EXISTING_SUPPLIER,
  FETCH_USER_SUPPLIER,
} from "@/sanity/lib/queries/suppliers";
import { writeClient } from "@/sanity/lib/write-client";
import { FETCH_STOCK_DATA } from "@/sanity/lib/queries/stock";
import { StockType } from "@/app/types/stock";
import { setExpiry } from "./utils";
import { FETCH_SPECIFIC_SUBSCRIPTION } from "@/sanity/lib/queries/subscription";
import { CHECK_EXISTING_COUPON } from "@/sanity/lib/queries/coupon";
// import { time } from "console";

export const createStore = async (data: StoreDataType) => {
  const session = await auth();
  // console.log(session);

  const user = {
    _type: "reference",
    _ref: session?.user?.id,
  };

  try {
    const isSupplier = await client
      .withConfig({ useCdn: false })
      .fetch(EXISTING_STORE_NAME, { name: data.name });
    if (isSupplier) return false;
    await writeClient.create({
      _type: "store",
      ...data,
      owner: { ...user },
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

// fetch store
export const fetchStore = async () => {
  const session = await auth();
  // console.log(session);

  const stores = await client
    .withConfig({ useCdn: false })
    .fetch(FETCH_USER_STORES, {
      owner: session?.user?.id,
    });
  // await storeList;
  const storeList: StoreListType[] = stores.map((item: StoreListType) => ({
    ...item,
    _createdAt: new Date(item._createdAt).toLocaleString(),
  }));
  // console.log(storeList);
  return storeList;
};

// fetch_store_update
export const fetchSingleStore = async (id: string) => {
  const store = await client.fetch(FETCH_SINGLE_STORE, {
    id: id,
  });
  return store;
};

// editStore
export const editStore = async (id: string, data: SingleStore) => {
  const session = await auth();
  // console.log(session);

  const user = {
    _type: "reference",
    _ref: session?.user?.id,
  };

  const res = await writeClient
    .withConfig({ useCdn: false })
    .patch(id)
    .set({
      ...data,
      owner: { ...user },
    })
    .commit();
  return { response: res };
};

export const deleteStore = async ({ id }: { id: string }) => {
  try {
    const products = await client.fetch(
      `*[_type == "product" && store._ref == $store_id]{ _id }`,
      { store_id: id }
    );

    const productIds = products.map((p: { _id: string }) => p._id);

    // 2. Fetch sales for ANY of the products
    const sales = productIds.length
      ? await client.fetch(
          `*[_type == "sales" && product._ref in $productIds]{ _id }`,
          { productIds }
        )
      : [];

    // const sales = await client.fetch(
    //   `*[_type == "sales" && product._ref == $product_id]{ _id }`,
    //   { product_id: products._id }
    // );

    // Step 2: Create a transaction
    const tx = writeClient.transaction();
    // Delete all sales
    sales.forEach((sale: { _id: string }) => {
      tx.delete(sale._id);
    });

    // Delete all products
    products.forEach((p: { _id: string }) => {
      tx.delete(p._id);
    });

    // Step 3: Delete the store
    tx.delete(id);

    // Commit the changes

    const respose = await tx.commit();
    if (respose.results.length > 0)
      return { deleted: true, message: "success" };
    return { deleted: false, message: "store non existent!" };
  } catch (error) {
    console.log(error);
    return { deleted: false, message: "error on sever" };
  }
};

// suppliers (add)
export const addSupplier = async (data: supplierType) => {
  const session = await auth();
  // console.log(session);

  const user = {
    _type: "reference",
    _ref: session?.user?.id,
  };
  // console.log(user);

  try {
    const isSupplier = await client
      .withConfig({ useCdn: false })
      .fetch(EXISTING_SUPPLIER, {
        owner: user._ref,
        name: data.name.trimEnd(),
        email: data.email.trimEnd(),
      });
    // console.log(isSupplier);
    if (isSupplier) {
      return false;
    } else {
      await writeClient.create({
        _type: "supplier",
        ...data,
        owner: { ...user },
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

// fetch specific supplier
export const editSingleSupplier = async (id: string, data: any) => {
  try {
    const results = await writeClient
      .patch(id)
      .set({ ...data })
      .commit();
    // console.log(results);
  } catch (error) {
    console.log(error);
  }
};

// create product

export const createProduct = async (
  name: string,
  data?: ProductTemplateType
) => {
  const session = await auth();
  const user = {
    _type: "reference",
    _ref: session?.user?.id,
  };
  try {
    // check for supplier first
    const product = await client
      .withConfig({ useCdn: false })
      .fetch(CHECK_EXISTING_PRODUCT, { name: name, owner: session?.user?.id });
    // console.log(product.length);
    if (product.length <= 0) {
      // check if user has stores
      const stores = await client.fetch(FETCH_USER_STORES, {
        owner: session?.user?.id,
      });
      // ////
      // supplier: store:
      if (stores.length > 0) {
        const result = await writeClient.create({
          _type: "product",
          ...data,
          owner: { ...user },
        });
        // log results
        // console.log(result);
        return { message: "product created", created: true };
      }
    } else return { message: "product name exist", created: false };
  } catch (error) {
    console.log(error);
  }
};

export const fetchMySuppliers = async () => {
  const session = await auth();
  const suppliers = await client.fetch(FETCH_USER_SUPPLIER, {
    owner: session?.user?.id,
  });
  // console.log(suppliers);
  return suppliers;
};

export const fetchSingleProduct = async (id: string) => {
  const product = await client.fetch(FETCH_SPECIFIC_PRODUCT, {
    product_id: id,
  });
  return product;
};

export const deleteSupplier = async (id: string) => {
  try {
    const products = await client.fetch(
      `*[_type == "product" && supplier._ref == "${id}"]{ _id }`,
      { store_id: id }
    );
    // console.log(products);

    const productIds = products.map((p: { _id: string }) => p._id);

    // 2. Fetch sales for ANY of the products
    const sales = productIds.length
      ? await client.fetch(
          `*[_type == "sales" && product._ref in $productIds]{ _id }`,
          { productIds }
        )
      : [];
    // console.log(sales);

    // const sales = await client.fetch(
    //   `*[_type == "sales" && product._ref == $product_id]{ _id }`,
    //   { product_id: products._id }
    // );

    // Step 2: Create a transaction
    const tx = writeClient.transaction();
    // Delete all sales
    sales.forEach((sale: { _id: string }) => {
      tx.delete(sale._id);
    });

    // Delete all products
    products.forEach((p: { _id: string }) => {
      tx.delete(p._id);
    });

    // Step 3: Delete the supplier
    tx.delete(id);

    // Commit the changes

    const respose = await tx.commit();
    if (respose.results.length > 0)
      return { deleted: true, message: "success" };
    return { deleted: false, message: "store non existent!" };
  } catch (error) {
    console.log(error);
    return { deleted: false, message: "error on sever" };
  }
};

//
//
// delete product
export const deleteProduct = async (id: string) => {
  try {
    const res = await writeClient.delete(id);
    console.log(res);
    return { deleted: true, message: "product deleted successfully" };
  } catch (error) {
    console.log(error);
    return { deleted: false, message: "error on server" };
  }
  // const products = await client.fetch(
  //   `*[_type == "product" && store._ref == $store_id]{ _id }`,
  //   { store_id: id }
  // );

  // const productIds = products.map((p: { _id: string }) => p._id);

  // 2. Fetch sales for ANY of the products
  // const sales = productIds.length
  //   ? await client.fetch(
  //       `*[_type == "sales" && product._ref in $productIds]{ _id }`,
  //       { productIds }
  //     )
  //   : [];

  // const sales = await client.fetch(
  //   `*[_type == "sales" && product._ref == $product_id]{ _id }`,
  //   { product_id: products._id }
  // );

  // Step 2: Create a transaction
  // const tx = writeClient.transaction();
  // Delete all sales
  // sales.forEach((sale: { _id: string }) => {
  //   tx.delete(sale._id);
  // });

  // Delete all products
  // products.forEach((p: { _id: string }) => {
  //   tx.delete(p._id);
  // });

  // Step 3: Delete the store
  // tx.delete(id);

  // Commit the changes

  // const respose = await tx.commit();
  //   if (respose.results.length > 0)
  //     return { deleted: true, message: "success" };
  //   return { deleted: false, message: "store non existent!" };
  // } catch (error) {
  //   console.log(error);
  //   return { deleted: false, message: "error on sever" };
  // }
};

// move to sale
export const moveToSales = async (data: ToSales) => {
  const product = await client.fetch(FETCH_SPECIFIC_PRODUCT, {
    product_id: data.product,
  });
  if (!product) return { message: "no product created", res: false };
  if (Number(product.instock) < Number(data.quantity))
    return { message: "less quantity in stock", res: false };
  await writeClient.create({
    _type: "sales",
    product: {
      _type: "reference",
      _ref: data.product,
    },
    quantity: data.quantity,
    time: data.time,
    created: data.created,
  });
  const newInstock = (
    Number(product.instock) - Number(data.quantity)
  ).toString();
  const newOnSale = (
    Number(product.on_sale) + Number(data.quantity)
  ).toString();
  if (product)
    await writeClient
      .patch(data.product)
      .set({ instock: newInstock, on_sale: newOnSale })
      .commit();
  return { message: "sales update", res: true };
};

// I'm trying Next form action

// const schema = z.object({ name: z.email("Invalid Email") });
// export const userForm = async (formData: FormData) => {
//   const validatedData = schema.safeParse({ name: formData.get("name") });

//   // console.log(formData.get("name"));
//   // console.log(initialState);
//   if (!validatedData.success) {
//     // console.log(
//     //   z.treeifyError(validatedData.error).properties?.name?.errors[0]
//     // );
//     // return {
//     //   error: z.treeifyError(validatedData.error).properties?.name?.errors[0],
//     // };
//   }
//   // return { name: formData.get("name") as string };
// };

//

const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/;
const supplierSchema = z.object({
  name: z.string("Name must be a string").max(50, " Name too long"),
  email: z.email("Invalid email"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(phoneRegex, "Invalid phone number"),
  country: z.string("Country must be string").max(60, "Country too long"),
  address: z.string("Address must be string").max(70, "address too long"),
});
export const updateSupplier = async (currentState: any, formData: FormData) => {
  const validatedData = supplierSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("contact"),
    country: formData.get("country"),
    address: formData.get("address"),
  });

  // console.log(validatedData);
  // console.log(currentState);
  if (!validatedData.success) {
    const errors = z.treeifyError(validatedData.error).properties;
    // console.log(errors?.email?.errors[0]);
    // console.log({ ...currentState, errors });

    return { ...currentState, errors };
  }
  // console.log(validatedData);
  if (validatedData.success) {
    const res = await editSingleSupplier(formData.get("supplierId") as string, {
      ...validatedData.data,
    });
    // console.log(res);
  }
  return { ...validatedData.data };
  // console.log(validatedData);
};

const productSchema = z.object({
  name: z.string("Name must be a string").max(150, " Name too long"),
  instock: z
    .number("Instock must be a positive number")
    .min(0, "Amount cannot be negative"),
  on_sale: z
    .number("On sale must be a positive number")
    .min(0, "Amount cannot be negative"),
  damaged: z
    .number("Damaged must be a positive number")
    .min(0, "Amount cannot be negative"),
  unit_price: z
    .number("Unit price must be a positive number")
    .min(0, "Amount cannot be negative"),
  id: z.string(),
});
export const updateProduct = async (initialState: any, formData: FormData) => {
  const id = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const instock = formData.get("instock") as string;
  const on_sale = formData.get("on_sale") as string;
  const damaged = formData.get("damaged") as string;
  const unit_price = formData.get("unit_price") as string;
  const validatedData = productSchema.safeParse({
    name: name,
    instock: Number(instock),
    on_sale: Number(on_sale),
    damaged: Number(damaged),
    unit_price: Number(unit_price),
    id: id,
  });
  if (validatedData.success) {
    const res = await writeClient
      .patch(id)
      .set({
        name: validatedData.data.name,
        instock: validatedData.data.instock,
        on_sale: validatedData.data.on_sale,
        damaged: validatedData.data.damaged,
        unit_price: validatedData.data.unit_price,
      })
      .commit();
    // console.log(res);
    // console.log(validatedData.data);
    return { ...validatedData.data, success: true };
  }
  // will convert back to string too late for changes now
  if (!validatedData.success) {
    const errors = z.treeifyError(validatedData.error).properties;
    // console.log(errors?.email?.errors[0]);
    // console.log({ ...initialState, errors });
    return { ...initialState, errors };
  }
  // console.log(validatedData);
};

const stockSchema = z.object({
  name: z.string("Name must be a string").max(150, " Name too long"),
  product: z.string("Must be a string"),
  supplier: z.string("Must be a string"),
  quantity: z
    .number("Quantity is required and must be a positive number")
    .min(0, "Quantity cannot be negative"),
  damaged: z
    .number("Damaged is required and must be a positive number")
    .min(0, "Amount cannot be negative"),
  unit_price: z.number("Unit is required and price must be a positive number"),
  to_return: z
    .number("To return must be a positive number")
    .min(0, "Amount cannot be negative"),
  comments: z
    .string("Comments must be a string")
    .max(200, " Comments too long"),
  date: z.string("Select date"),
  time: z.string("Time is required"),
});

export const updateStockForm = async (
  initialState: any,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const product = formData.get("product") as string;
  const supplier = formData.get("supplier") as string;
  const quantity = Number(formData.get("quantity") as string);
  const damaged = Number(formData.get("damaged") as string);
  const unit_price = Number(formData.get("unit_price") as string);
  const to_return = Number(formData.get("to_return") as string);
  const comments = formData.get("comments") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const data = {
    name,
    product,
    supplier,
    quantity,
    damaged,
    unit_price,
    to_return,
    comments,
    date,
    time,
  };

  const validatedData = stockSchema.safeParse({ ...data });
  // console.log(data);
  if (!validatedData.success) {
    const errors = z.treeifyError(validatedData.error).properties;
    return { initialState, errors };
  }
  // console.log(validatedData.data);
  if (validatedData.success) {
    const productDetail = await writeClient.fetch(FETCH_SPECIFIC_PRODUCT, {
      product_id: validatedData.data.product,
    });
    const newInstock = (
      Number(productDetail.instock) + Number(validatedData.data.quantity)
    ).toString();
    const newDamaged = (
      Number(productDetail.damaged) + Number(validatedData.data.damaged)
    ).toString();

    const newUnitPrice = (
      (Number(productDetail.unit_price) +
        Number(validatedData.data.unit_price)) /
      2
    ).toString();

    // Just learned about transactions in sanity (second implementation) )
    const stockUp = writeClient.transaction();

    const product = {
      _type: "reference",
      _ref: validatedData.data.product,
    };

    const supplier = {
      _type: "reference",
      _ref: validatedData.data.supplier,
    };

    stockUp.create({
      _type: "stock",
      ...validatedData.data,
      product: { ...product },
      supplier: { ...supplier },
    });

    stockUp
      .patch(validatedData.data.product, (patch) =>
        patch.set({
          instock: newInstock,
          damaged: newDamaged,
          unit_price: newUnitPrice,
        })
      )
      .commit();
    // console.log(stockUp);

    return { ...validatedData.data, success: true };
  }
};

//
//
//
// coupouns
const couponsSchema = z.object({
  code: z.string("Schema must be a string").max(7, " invalid coupon"),
});
export async function verifyCoupons(initialState: any, formData: FormData) {
  const validatedFields = couponsSchema.safeParse({
    code: formData.get("code") as string,
  });
  // console.log(validatedFields.data);

  if (validatedFields.success) {
    const code = validatedFields.data.code;
    const res = await client.fetch(CHECK_EXISTING_COUPON, { code: code });
    // console.log(res);
    const discount = (res._createdAt && res.value) ?? 0;
    return { ...validatedFields, discount };
  } else {
    const errors = z.treeifyError(validatedFields.error).properties;
    return { success: false, error: errors?.code?.errors, discount: 0 };
  }

  // ...
}

export const fetchProductStocks = async (productId: string) => {
  try {
    const stocks = await client.fetch(FETCH_STOCK_DATA, { productId });
    // console.log(stocks);

    // sumbmit only last three months of data
    // understand date functions better later
    const now = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 3);

    const filteredStocks = stocks.filter((item: StockType) => {
      const createdAt = new Date(item._createdAt);
      return createdAt >= twoMonthsAgo;
    });
    return filteredStocks;
  } catch (error) {
    console.log(error);
  }
};

//
//

//
//Payments
export const createInvoice = async ({
  plan,
  amount,
}: {
  plan: string;
  amount: number;
}) => {
  const session = await auth();
  const { name, email, id } = session?.user!;
  const startDate = new Date();
  const subscriptionDetails = await fetchSubscription(id!);
  const invoiceDetails = await writeClient.create({
    _type: "invoice",
    subscription: {
      _type: "reference",
      _ref: await subscriptionDetails.subscription._id,
    },
    amount_paid: amount,
    plan,
    date_paid: startDate,
    expires: await subscriptionDetails.subscription.expiry,
  });

  return { message: `invoice created for ${email}` };
};

export const fetchSubscription = async (id: string) => {
  const subscription = await client.fetch(FETCH_SPECIFIC_SUBSCRIPTION, { id });
  if (subscription && subscription._createdAt) {
    // console.log(subscription);
    // console.log({ message: "No subscriber", existing: true, subscription });
    return { message: "subscriber", existing: true, subscription };
  } else {
    console.log({ message: "No subscriber", existing: false, subscription });
    return { message: "No subscriber", existing: false, subscription };
  }
};

export const subscribeUser = async ({
  plan,
  amount,
}: {
  plan: string;
  amount: number;
}) => {
  const session = await auth();
  const { name, email, id } = session?.user!;
  // console.log(plan, amount);
  const existingSubscriber = await fetchSubscription(id!);
  // console.log(existingSubscriber);
  if (!existingSubscriber.existing) {
    try {
      const startDate = new Date();
      const expiryDate = setExpiry(startDate, plan);

      const res = await writeClient.create({
        _type: "subscription",
        name,
        email,
        plan,
        subscription_id: {
          _type: "reference",
          _ref: id,
        },
        status: "active",
        expiry: expiryDate,
      });
      console.log(res);

      if (res._createdAt) {
        const invoice = await createInvoice({ plan, amount });
        console.log(invoice);
        return {
          message: `subscription for ${email?.split("@")[0]} created😁`,
          subscribed: true,
        };
      }

      // return { message: `subscription for ${email?.split("@")[0]} created😁` };
    } catch (error) {
      console.log(error);
      return { message: " internal error" };
    }
  } else {
    // for existing users
    const startDate = new Date();
    const expiryDate = setExpiry(startDate, plan);
    const subscriptionDetails = await fetchSubscription(id!);
    // console.log(subscriptionDetails);
    const updateTransProg = writeClient.transaction();
    //
    updateTransProg.create({
      _type: "invoice",
      subscription: {
        _type: "reference",
        _ref: subscriptionDetails.subscription._id,
      },
      amount_paid: amount,
      plan,
      date_paid: startDate,
      expires: expiryDate,
    });

    updateTransProg.patch(subscriptionDetails.subscription._id, (patch) =>
      patch.set({
        plan,
        expiry: expiryDate,
        status: "active",
      })
    );
    updateTransProg.commit();

    return { message: "subscription activated", subscribed: true };
  }
};
