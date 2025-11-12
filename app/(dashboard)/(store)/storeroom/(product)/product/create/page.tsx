import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { FolderUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/PageHeader";
import { CreateSupplier } from "@/components/CreateSupplier";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CeateProduct = () => {
  const heading = "Product Entry";
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderUp />
            <h1>Create Product</h1>
          </div>

          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
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
                    type="number"
                    placeholder="200 (max:15 char)"
                  />
                  <FieldDescription>
                    Enter quantity in storage (e.g., 199).
                  </FieldDescription>
                </Field>
                {/* Damaged */}
                <Field>
                  <FieldLabel htmlFor="damaged">Damaged</FieldLabel>
                  <Input
                    id="damaged"
                    type="number"
                    placeholder="20 (max:15 char)"
                  />
                  <FieldDescription>
                    Enter quantity of damaged products or items (e.g., 19).
                  </FieldDescription>
                </Field>

                {/* Supplier details */}
                {/* Name of Supplier */}
                <div className="supplier flex items-center gap-0.5">
                  <Field>
                    <FieldLabel>Supplier</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="container">Mark</SelectItem>
                        <SelectItem value="Buckets">Sign Duhny</SelectItem>
                        <SelectItem value="covers">Cofie</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>Select supplier.</FieldDescription>
                    {/* popup create supplier */}
                  </Field>
                  <CreateSupplier />
                </div>
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

export default CeateProduct;
