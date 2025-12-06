"use client";
import DeleteProductButton from "@/components/DeleteProductButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateProduct } from "@/lib/actions";
import { Product } from "@/app/types/product";
import toast from "react-hot-toast";

const EditProductDetails = ({ product }: { product: Product }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  //   console.log("Path Segments:", pathSegments);
  const id = pathSegments[pathSegments.length - 2];
  const initialState = { productId: id };
  const [state, action, pending] = useActionState(updateProduct, initialState);
  //   console.log(state);
  useEffect(() => {
    if (state.success) {
      toast.success("Product updated successfully!");
    }
  }, [state?.success]);

  return (
    <div className="container">
      <div className="w-full max-w-md">
        <form action={action}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state.name ?? product.name}
                  placeholder="eg. Adom Containers (20 characters max)"
                />
                <input type="hidden" name="productId" value={id} />

                <FieldDescription>
                  Unique name for your product (item).
                </FieldDescription>
              </Field>

              {/* Instock */}
              <Field>
                <FieldLabel htmlFor="instock">Instock</FieldLabel>
                <Input
                  name="instock"
                  id="instock"
                  type="number"
                  defaultValue={state.instock ?? product.instock}
                  placeholder="200 (max:15 char)"
                />
                <FieldDescription>
                  Enter quantity in storage (e.g., 199) excluding damaged ones.
                </FieldDescription>
              </Field>

              {/* on sale */}
              <Field>
                <FieldLabel htmlFor="on_sale">On sale</FieldLabel>
                <Input
                  name="on_sale"
                  id="on_sale"
                  type="number"
                  defaultValue={state.on_sale ?? product.on_sale}
                  placeholder="200 (max:15 char)"
                />
                <FieldDescription>
                  Enter quantity in storage (e.g., 199) excluding damaged ones.
                </FieldDescription>
              </Field>

              {/* UnitPrice */}
              <FieldLabel htmlFor="unit_price">UnitPrice</FieldLabel>
              <Input
                id="unit_price"
                name="unit_price"
                type="number"
                defaultValue={
                  Number(state.unit_price).toFixed(2) ??
                  Number(product.unit_price).toFixed(2)
                }
                placeholder="20 (max:15 char)"
              />
              <FieldDescription>
                Enter unit price (e.g., GHS 599)
              </FieldDescription>

              {/* Damaged */}
              <Field>
                <FieldLabel htmlFor="damaged">Damaged</FieldLabel>
                <Input
                  id="damaged"
                  name="damaged"
                  type="number"
                  defaultValue={state.damaged ?? product.damaged}
                  placeholder="20 (max:15 char)"
                />
                <FieldDescription>
                  Enter quantity of damaged products or items (e.g., 19).
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Button
            className="w-full max-w-md mb-2"
            disabled={pending}
            type="submit"
          >
            {pending ? <div className="loader" /> : "Update"}
          </Button>
        </form>
      </div>
      <div className="btn  max-w-md mt-2">
        <DeleteProductButton />
      </div>
    </div>
  );
};

export default EditProductDetails;
