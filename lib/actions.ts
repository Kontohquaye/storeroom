"use server";
import { ToSales, ProductTemplateType } from "@/app/types/product";
import { StoreDataType, StoreListType } from "@/app/types/store";
import { supplierType } from "@/app/types/supplier";
import { auth } from "@/auth";
import { client } from "@/sanity/client";
import {
  CHECK_EXISTING_PRODUCT,
  FETCH_SPECIFIC_PRODUCT,
} from "@/sanity/lib/queries/products";
import {
  EXISTING_STORE_NAME,
  FETCH_USER_STORES,
} from "@/sanity/lib/queries/store";
import { EXISTING_SUPPLIER } from "@/sanity/lib/queries/suppliers";
import { writeClient } from "@/sanity/lib/write-client";
import { time } from "console";

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

  const stores = await client.fetch(FETCH_USER_STORES, {
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
    console.log(isSupplier);
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
