"use client";
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

import { FolderSync } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/PageHeader";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { convertTime, getId } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ToSales } from "@/app/types/product";
import { moveToSales } from "@/lib/actions";
import toast from "react-hot-toast";

const MoveToSales = () => {
  const path = usePathname();
  const router = useRouter();
  const id = getId(path);
  // console.log(id);
  const heading = "To Sales Entry";
  const [open, setOpen] = React.useState(false);

  const currentDate = new Date();

  const [time, setTime] = React.useState(convertTime(currentDate));
  const [quantity, setQuantity] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(currentDate);

  // console.log(formattedDate);

  const data: ToSales = {
    product: id,
    quantity: quantity,
    created: date,
    time: time,
  };

  // console.log(time);
  // const handleTime = () => {};
  const handleMoveToSales = async () => {
    if (!quantity || !time || !date) return toast.error("All fields required");
    setIsPending(true);
    const response = await moveToSales(data);
    setIsPending(false);
    if (!response.res && response.message) toast.error(response.message);
    if (response.res) toast.success("moved successfully") && router.back();
  };

  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderSync />
            <h1>Move to sales</h1>
          </div>

          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                {/* to sales */}
                {/* <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="eg. Adom Containers (20 characters max)"
                  />
                  <FieldDescription>
                    Choose a unique name for your product (item).
                  </FieldDescription>
                </Field> */}
                {/* quantity to move */}
                <Field>
                  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="200 (max:15 char)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <FieldDescription>
                    Enter quantity to add to on sales (e.g., 139).
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          {/* DatePicker */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
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
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                // defaultValue={"10:30:00"}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          <div className="btn w-full max-w-md">
            {!isPending ? (
              <Button className="w-full" onClick={handleMoveToSales}>
                To sales
              </Button>
            ) : (
              <Button className="w-full  bg-gray-800!">
                <div className="loader "></div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveToSales;
