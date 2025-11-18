"use client";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useState } from "react";
import { createStore } from "@/lib/actions";
import { storeDateType } from "@/app/types/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateStoreForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [storeType, setStoreType] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const storeData: storeDateType = {
    name,
    location,
    type: storeType,
    status,
    category,
  };

  // create store handler
  const handleCreate = async () => {
    const response = await createStore(storeData);
    if (response) toast.success("store created successfully");
    return router.push("/dashboard");
  };
  return (
    <div className="container">
      <div className="w-full max-w-md">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="eg. Containers (15 characters max)"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <FieldDescription>
                Choose a unique name for your store.
              </FieldDescription>
            </Field>
            {/* location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                type="text"
                value={location}
                required
                placeholder="Kumasi Alabar (max:15 char)"
                onChange={(e) => setLocation(e.target.value)}
              />
              <FieldDescription>
                Enter location of your store (e.g., City, Country).
              </FieldDescription>
            </Field>
            {/* store type */}
            <Field>
              <FieldLabel>Store type</FieldLabel>
              <Select required value={storeType} onValueChange={setStoreType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="wholesale">Wholesale</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="transit store">Transit store</SelectItem>
                  <SelectItem value="storage unit">Storage unit</SelectItem>

                  <SelectItem value="finished goods">Finished Goods</SelectItem>
                  {/* <SelectItem value="pharmaceuticals">
                    Pharmaceuticals
                  </SelectItem> */}
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Select type of storage unit.</FieldDescription>
            </Field>
            {/* status */}
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select required value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Is the store active or inactive.
              </FieldDescription>
            </Field>
            {/* business category */}
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select required value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                  <SelectItem value="cosmetics and beauty">
                    Cosmetics & Beauty
                  </SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="electronics">
                    Electronics & Gadgets
                  </SelectItem>
                  <SelectItem value="Pharmaceuticals">
                    Pharmaceuticals
                  </SelectItem>
                  <SelectItem value="general merchandise">
                    General Merchandise
                  </SelectItem>
                  <SelectItem value="mix up">Mix up</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Select business category.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="btn w-full max-w-md">
        <Button className="w-full" onClick={handleCreate}>
          Create{" "}
        </Button>
      </div>
    </div>
  );
};

export default CreateStoreForm;
