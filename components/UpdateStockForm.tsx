"use client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderSync } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { updateStockForm } from "@/lib/actions";
import { SupplierListType } from "@/app/types/supplier";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateStockForm = ({
  suppliers,
  productDetails,
}: {
  suppliers: SupplierListType[];
  productDetails: { productName: string; productId: string };
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  //   const [supplier, setSupplier] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const initialState: any = { initialState: {}, error: null };

  const [state, formAction, pending] = React.useActionState(
    updateStockForm,
    initialState
  );
  // console.log(state);
  //   console.log(state?.errors?.time?.errors[0]);
  //   console.log(state?.errors?.quantity);
  // console.log(errors?.email?.errors[0]);

  React.useEffect(() => {
    if (state?.success) {
      toast.success("stock updated");
      router.refresh();
      router.replace(`/storeroom/product/details/${productDetails.productId}`);
    }
  }, [state?.success]);

  // if (state?.success) {
  //   toast.success("stock updated");
  //   router.refresh();
  //   return router.replace(
  //     `/storeroom/product/details/${productDetails.productId}`
  //   );
  // }

  return (
    <div className="content ml-6 mt-4 flex justify-center items-center ">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="title flex items-center gap-2 mb-2">
          <FolderSync />
          <h1>Update Stock</h1>
        </div>
        <div className="form">
          <form action={formAction}>
            <div className="w-full max-w-md">
              <FieldSet>
                <FieldGroup>
                  {/* Name of product */}
                  <Field>
                    {/* <FieldLabel>Name</FieldLabel> */}
                    {/* <FieldLabel htmlFor="name">Name</FieldLabel> */}
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={productDetails.productName}
                      //   disabled={true}
                      hidden
                      // placeholder="eg. name of product"
                    />
                    <input
                      type="hidden"
                      name="product"
                      value={productDetails.productId}
                    />
                  </Field>
                  {/* Quantity recieved */}
                  <Field>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="eg. 305 (20 characters max)"
                    />
                    {state?.errors?.quantity && (
                      <p className="text-red-800">
                        {state?.errors?.quantity?.errors[0]}
                      </p>
                    )}
                    <FieldDescription>
                      Enter quantity of products recieved from order.
                    </FieldDescription>
                  </Field>
                  {/* Damaged stock */}
                  <Field>
                    <FieldLabel htmlFor="damaged">Damaged</FieldLabel>
                    <Input
                      id="damaged"
                      name="damaged"
                      type="number"
                      placeholder="200 (max:15 char)"
                    />
                    {state?.errors?.damaged && (
                      <p className="text-red-800">
                        {state?.errors?.damaged?.errors[0]}
                      </p>
                    )}
                    <FieldDescription>
                      Enter damaged product quantity from order.
                    </FieldDescription>
                  </Field>
                  {/* Unit Price */}
                  <Field>
                    <FieldLabel htmlFor="unit_price">Unit price</FieldLabel>
                    <Input
                      id="unit_price"
                      name="unit_price"
                      type="unit_price"
                      placeholder="20 (eg 500)"
                    />
                    {state?.errors?.unit_price && (
                      <p className="text-red-800">
                        {state?.errors?.unit_price?.errors[0]}
                      </p>
                    )}
                    <FieldDescription>
                      Enter unit price of products or items (e.g., 19).
                    </FieldDescription>
                  </Field>
                  {/* Rejected */}
                  <Field>
                    <FieldLabel htmlFor="return">To Return</FieldLabel>
                    <Input
                      id="return"
                      name="to_return"
                      type="number"
                      placeholder="20 (max:15 char)"
                    />
                    {state?.errors?.to_return && (
                      <p className="text-red-800">
                        {state?.errors?.to_return?.errors[0]}
                      </p>
                    )}
                    <FieldDescription>
                      Enter quantity of products to be returned i.e. damaged
                      products or others.
                    </FieldDescription>
                  </Field>
                  {/* Name of Supplier */}
                  <Field>
                    <FieldLabel>Supplier</FieldLabel>
                    <Select name="supplier">
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier._id} value={supplier._id}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state?.errors?.supplier && (
                      <p className="text-red-800">
                        {state?.errors?.supplier?.errors[0]}
                      </p>
                    )}
                    <FieldDescription>Select supplier.</FieldDescription>
                    {/* popup create supplier */}
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
            {/* DatePicker */}
            <div className="flex gap-4 my-3">
              <div className="flex flex-col gap-3">
                <input
                  type="hidden"
                  name="date"
                  defaultValue={date ? date.toISOString().split("T")[0] : ""}
                  //   value={date ? date.toISOString() : Date.now()}
                />
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                {state?.errors?.date && (
                  <p className="text-red-800">
                    {state?.errors?.date?.errors[0]}
                  </p>
                )}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  name="time"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              {state?.errors?.time && (
                <p className="text-red-800">{state?.errors?.time?.errors[0]}</p>
              )}
            </div>

            {/* comments */}
            <div className="grid w-full max-w-md mt-2 gap-3">
              <Label htmlFor="comments">Add comments</Label>
              <Textarea
                name="comments"
                placeholder="Type your comments here."
                id="comments"
              />
              {state?.errors?.comments && (
                <p className="text-red-800">
                  {state?.errors?.comments?.errors[0]}
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                Add any extra info here, this could be referred to anytime.
              </p>
            </div>
            <div className="btn w-full max-w-md">
              <Button disabled={pending} className="w-full">
                {pending ? <div className="loader text-blue-900!" /> : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStockForm;
