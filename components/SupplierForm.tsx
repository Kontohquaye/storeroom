"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteDialog } from "@/components/Delete";
import { SupplierFormState, SupplierListType } from "@/app/types/supplier";
import { updateSupplier } from "@/lib/actions";
import { useActionState } from "react";

const SupplierForm = ({
  supplier,
  supplierName,
  id,
}: {
  supplier: SupplierListType;
  supplierName: string;
  id: string;
}) => {
  const initialState: SupplierFormState = {
    success: true,
    errors: {},
  };
  const [state, formAction, pending] = useActionState(
    updateSupplier,
    initialState
  );
  //   console.log(state);
  return (
    <div className="details w-full max-w-md mx-auto mt-2">
      <form action={formAction}>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.name ?? supplier.name}
            />
            {state.errors?.name && (
              <p className="text-red-600">{state.errors?.name?.errors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              defaultValue={state.phone ?? supplier.phone}
            />
            {state.errors?.phone && (
              <p className="text-red-600">{state.errors?.phone?.errors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state.email ?? supplier.email}
            />
            {state.errors?.email && (
              <p className="text-red-600">{state.errors?.email?.errors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="country">Country</Label>
            <Input
              name="country"
              id="country"
              type="text"
              defaultValue={state.country ?? supplier.country}
            />
            {state.errors?.country && (
              <p className="text-red-600">{state.errors?.country?.errors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              defaultValue={state.address ?? supplier.address}
            />
            {state.errors?.address && (
              <p className="text-red-600">{state.errors?.address?.errors[0]}</p>
            )}
          </div>
          {/* !!!!! */}
          <input type="hidden" name="supplierId" value={id} />
          {/* buttons */}
          <div className="btn flex gap-2 items-center">
            <Button
              type="submit"
              className="flex-1 cursor-pointer"
              disabled={pending}
            >
              {pending ? <div className="loader" /> : "Save supplier"}
            </Button>
          </div>
        </div>
      </form>
      <div className="delete grid  auto-rows-min mt-2 px-4">
        <p className="text-red-700">
          Deleting suppliers will delete all products or items linked to
          it!{" "}
        </p>
        <DeleteDialog
          expand={true}
          supplierName={supplierName}
          supplierId={id}
        />
      </div>
    </div>
  );
};

export default SupplierForm;
