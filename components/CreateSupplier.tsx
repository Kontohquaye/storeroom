import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRoundPlus } from "lucide-react";

export function CreateSupplier({ expand }: { expand?: boolean }) {
  return (
    <div className="container">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default" className={expand ? "w-full" : ""}>
            <UserRoundPlus /> Add
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add supplier</SheetTitle>
            <SheetDescription>
              Add new supplier here, click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Akosah Ltd" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" type="tel" defaultValue="+233-1245609754" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="akltd@service.co" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                defaultValue="Abuohia street 34"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                defaultValue="Abuohia street 34"
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save supplier</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
