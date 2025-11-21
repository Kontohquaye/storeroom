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

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [inStock, setInStock] = useState("");
  const [damaged, setDamaged] = useState("");
  const [supplier, setSupplier] = useState("");
  //   console.log(name, inStock, damaged);
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
            <Field>
              <FieldLabel>Supplier</FieldLabel>
              <Select value={supplier} onValueChange={setSupplier}>
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
  );
};

export default CreateProductForm;
