"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { addSupplier } from "@/lib/actions";
import { supplierType } from "@/app/types/supplier";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SupplierDetails = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [isPending, setIsPending] = useState(false);

  //   supplier details
  const supplierDetails: supplierType = {
    name,
    phone: contact,
    email,
    country,
    address,
    status,
  };

  //   handle add supplier
  const handleAddSupplier = async () => {
    setIsPending(true);
    const response = await addSupplier(supplierDetails);
    // console.log(results);
    if (!response) toast.error("supplier already exists");
    if (response) toast.success("supplier created successfully");
    setIsPending(false);
    if (response) return router.push("/dashboard");
  };
  return (
    <div className="container overflow-y-scroll">
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Akosah Ltd"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            type="tel"
            placeholder="+233-1245609754"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="akltd@service.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            placeholder="Abuohia street 34"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Abuohia street 34"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <Field>
          <FieldLabel>Status</FieldLabel>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Select supplier status.</FieldDescription>
          {/* popup create supplier */}
        </Field>
      </div>
      <SheetFooter>
        {isPending ? (
          <Button type="submit" onClick={handleAddSupplier}>
            <div className="loader "></div>
          </Button>
        ) : (
          <Button type="submit" onClick={handleAddSupplier}>
            Save supplier
          </Button>
        )}

        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
};

export default SupplierDetails;
