"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/Delete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { SingleStore } from "@/app/types/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { editStore } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditStoreForm = ({ id, store }: { id: string; store: SingleStore }) => {
  if (!store) return notFound();
  const { name, category, location, type, status } = store;
  const [storeName, setStoreName] = useState(name);
  const [storeLocation, setStoreLocation] = useState(location);
  const [storeType, setStoreType] = useState(type);
  const [storeStatus, setStoreStatus] = useState(status);
  const [storeCategory, setStoreCategory] = useState(category);
  const [isPending, setIsPending] = useState(false);

  const data = {
    category: storeCategory,
    location: storeLocation,
    name: storeName,
    status: storeStatus,
    type: storeType,
  };
  const deleteParams = {
    id,
    name,
  };

  const handleEdit = async () => {
    setIsPending(true);
    const { response } = await editStore(id, data);
    if (response._updatedAt) toast.success("edit successful");
    setIsPending(false);
    window.history.back();
    if (!response._updatedAt) toast.error("error editing");
    // console.log(response);
  };
  return (
    <>
      {store ? (
        <div className="container">
          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder={`${name}`}
                  />
                  <FieldDescription>
                    Change store name 🥹 choose a <b>unique name</b> for your
                    store.
                  </FieldDescription>
                </Field>
                {/* location */}
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    id="location"
                    type="text"
                    value={storeLocation}
                    onChange={(e) => setStoreLocation(e.target.value)}
                    placeholder={`${location}`}
                  />
                  <FieldDescription>
                    Edit location of your store.
                  </FieldDescription>
                </Field>
                {/* store type */}
                <Field>
                  <FieldLabel>Store type</FieldLabel>
                  <Select
                    required
                    value={storeType}
                    onValueChange={setStoreType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`${type}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="transit store">
                        Transit store
                      </SelectItem>
                      <SelectItem value="storage unit">Storage unit</SelectItem>

                      <SelectItem value="finished goods">
                        Finished Goods
                      </SelectItem>
                      {/* <SelectItem value="pharmaceuticals">
                    Pharmaceuticals
                  </SelectItem> */}
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Select type of storage unit.
                  </FieldDescription>
                </Field>
                {/* status */}
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    required
                    value={storeStatus}
                    onValueChange={setStoreStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`${status}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Edit store status.</FieldDescription>
                </Field>
                {/* business category */}
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    required
                    value={storeCategory}
                    onValueChange={setStoreCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`${category}`} />
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
                  <FieldDescription>Edit business category.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <div className="btn w-full max-w-md flex gap-1.5">
            {isPending ? (
              <Button
                className="flex-1 bg-gray-900"
                onClick={() => toast.error("in progress")}
              >
                <div className="loader" />
              </Button>
            ) : (
              <Button className="flex-1" onClick={handleEdit}>
                Edit
              </Button>
            )}

            <DeleteDialog storeName={`${id}`} store={deleteParams} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default EditStoreForm;
