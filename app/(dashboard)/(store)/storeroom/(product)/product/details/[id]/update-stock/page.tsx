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
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const UpdateStock = () => {
  const heading = "Stock Entry";
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderSync />
            <h1>Update Stock</h1>
          </div>

          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                {/* Name of product */}
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="container">Containers</SelectItem>
                      <SelectItem value="Buckets">Buckets</SelectItem>
                      <SelectItem value="covers">Covers</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Select existing product to update.
                  </FieldDescription>
                </Field>
                {/* Quantity recieved */}
                <Field>
                  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="eg. 305 (20 characters max)"
                  />
                  <FieldDescription>
                    Enter quantity of products recieved from order.
                  </FieldDescription>
                </Field>
                {/* Damaged stock */}
                <Field>
                  <FieldLabel htmlFor="damaged">Damaged</FieldLabel>
                  <Input
                    id="damaged"
                    type="number"
                    placeholder="200 (max:15 char)"
                  />
                  <FieldDescription>
                    Enter damaged product quantity from order.
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
                {/* Rejected */}
                <Field>
                  <FieldLabel htmlFor="return">To Return</FieldLabel>
                  <Input
                    id="return"
                    type="number"
                    placeholder="20 (max:15 char)"
                  />
                  <FieldDescription>
                    Enter quantity of products to be returned i.e. damaged
                    products or others.
                  </FieldDescription>
                </Field>
                {/* Name of Supplier */}
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
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          {/* comments */}
          <div className="grid w-full max-w-md gap-3">
            <Label htmlFor="comments">Add comments</Label>
            <Textarea placeholder="Type your comments here." id="comments" />
            <p className="text-muted-foreground text-sm">
              Add any extra info here, this could be referred to anytime.
            </p>
          </div>
          <div className="btn w-full max-w-md">
            <Button className="w-full">Create </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;
