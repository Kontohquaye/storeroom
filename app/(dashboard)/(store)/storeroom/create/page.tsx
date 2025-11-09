import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/PageHeader";

const CreatStore = () => {
  const heading = "Storeroom Entry";
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderPlus />
            <h1>Create storeroom</h1>
          </div>

          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="eg. Containers (15 characters max)"
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
                    placeholder="Kumasi Alabar (max:15 char)"
                  />
                  <FieldDescription>
                    Enter location of your store (e.g., City, Country).
                  </FieldDescription>
                </Field>
                {/* store type */}
                <Field>
                  <FieldLabel>Store type</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="transit store">
                        Transit store
                      </SelectItem>
                      <SelectItem value="production">
                        Production storage
                      </SelectItem>
                      <SelectItem value="Pharmaceuticals">
                        Pharmaceuticals
                      </SelectItem>
                      <SelectItem value="finished goods">
                        Finished Goods
                      </SelectItem>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">Active</SelectItem>
                      <SelectItem value="wholesale">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Is the store active or inactive.
                  </FieldDescription>
                </Field>
                {/* business category */}
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select>
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
                      <SelectItem value="general merchandise">
                        General Merchandise
                      </SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Select business category.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <div className="btn w-full max-w-md">
            <Button className="w-full">Create </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatStore;
