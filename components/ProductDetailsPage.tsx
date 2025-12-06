"use client";

import { useState } from "react";
import { CreateSupplier } from "./CreateSupplier";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/actions";
import toast from "react-hot-toast";
import { SupplierListType } from "@/app/types/supplier";
import { ProductTemplateType } from "@/app/types/product";
import { useRouter } from "next/navigation";

const CreateProductDetails = ({
  suppliers,
  store_id,
}: {
  suppliers: SupplierListType[];
  store_id?: string;
}) => {
  const router = useRouter();
  // console.log(suppliers);
  const [name, setName] = useState("");
  const [inStock, setInStock] = useState("");
  const [onSale, setOnSale] = useState("");
  const [damaged, setDamaged] = useState("");
  const [supplier, setSupplier] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [isPending, setIsPending] = useState(false);
  // const [hasSupplier, setHasSupplier] = useState(true);
  // const [suppliersList, setSuppliersList] = useState<SupplierListType[]>([]);
  //   console.log(name, inStock, damaged);
  // console.log(store_id);

  const currentSupplier = suppliers.filter((supp) => supp.name === supplier);

  const data: ProductTemplateType = {
    name: name,
    on_sale: onSale,
    instock: inStock,
    supplier: { _type: "reference", _ref: currentSupplier[0]?._id },
    store: { _type: "reference", _ref: store_id },
    damaged: damaged,
    unit_price: unitPrice,
  };

  // creat product handler
  const handleCreateProduct = async () => {
    setIsPending(true);
    if (!name || !inStock || !damaged || !supplier || !onSale || !unitPrice) {
      setIsPending(false);
      return toast.error("All fields required!");
    }
    if (
      Number(inStock) < 0 ||
      Number(damaged) < 0 ||
      Number(supplier) < 0 ||
      Number(onSale) < 0 ||
      Number(unitPrice) < 0
    ) {
      setIsPending(false);
      return toast.error("quantities should be positive!");
    }

    const response = await createProduct(name, data);
    // console.log(response?.created);

    if (response?.created) {
      setIsPending(false);
      router.push(`/storeroom/details/${store_id}`);
    } else {
      setIsPending(false);
      toast.error(`${response?.message}`);
    }

    // if (result.length <= 0) {
    //   toast.error("Add a supplier first");
    //   setHasSupplier(false);
    // } else {
    //   setSuppliersList([...result]);
    //   console.log(suppliersList);
    //   setHasSupplier(true);
    // }
  };

  const handleToast = () => {
    setIsPending(false);
    toast.error("🥹add a supplier and refresh!");
  };
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="eg. Adom Containers (20 characters max)"
            />
            <FieldDescription>
              Choose a unique name for your product (item).
            </FieldDescription>
          </Field>
          {/* Instock */}
          <Field>
            <FieldLabel htmlFor="instock">Instock</FieldLabel>
            <Input
              id="instock"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              type="number"
              placeholder="200 (max:15 char)"
            />
            <FieldDescription>
              Enter quantity in storage (e.g., 199) excluding damaged ones.
            </FieldDescription>
          </Field>
          {/* Unit Price */}
          <Field>
            <FieldLabel htmlFor="unit_price">UnitPrice</FieldLabel>
            <Input
              id="unit_price"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              type="number"
              placeholder="200 (max:15 char)"
            />
            <FieldDescription>
              Enter price for one (e.g., GHS 29).
            </FieldDescription>
          </Field>
          {/* Onsale */}
          <Field>
            <FieldLabel htmlFor="onsale">On Sale</FieldLabel>
            <Input
              id="onsale"
              value={onSale}
              onChange={(e) => setOnSale(e.target.value)}
              type="number"
              placeholder="200 (max:15 char)"
            />
            <FieldDescription>
              Enter quantity on sale (e.g., 199).
            </FieldDescription>
          </Field>
          {/* Damaged */}
          <Field>
            <FieldLabel htmlFor="damaged">Damaged</FieldLabel>
            <Input
              required={true}
              id="damaged"
              type="number"
              placeholder="20 (max:15 char)"
              value={damaged}
              onChange={(e) => setDamaged(e.target.value)}
            />
            <FieldDescription>
              Enter quantity of damaged products or items (e.g., 19).
            </FieldDescription>
          </Field>

          {/* Supplier details */}
          {/* Name of Supplier */}
          <div className="supplier flex items-center gap-0.5">
            {suppliers.length > 0 ? (
              <Field>
                <FieldLabel>Supplier</FieldLabel>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier._id} value={supplier.name}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>Select supplier.</FieldDescription>
                {/* popup create supplier */}
              </Field>
            ) : (
              <Field>
                <FieldLabel htmlFor="supplier">Supplier</FieldLabel>
                <Input
                  id="supplier"
                  type="text"
                  placeholder="click on the add button😶‍🌫️"
                />
                <FieldDescription>Add supplier</FieldDescription>
              </Field>
            )}
            <CreateSupplier />
          </div>
        </FieldGroup>
      </FieldSet>
      {/* button */}
      {suppliers.length > 0 ? (
        <div className="btn w-full max-w-md">
          <Button
            className="w-full bg-blue-950"
            type="submit"
            onClick={handleCreateProduct}
          >
            {!isPending ? "Create" : <div className="loader size-3"></div>}
          </Button>
        </div>
      ) : (
        <div className="btn w-full max-w-md">
          <Button
            className="w-full"
            type="submit"
            variant={"destructive"}
            onClick={handleToast}
          >
            Create{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateProductDetails;
