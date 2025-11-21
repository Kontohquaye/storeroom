import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRoundPlus } from "lucide-react";
import SupplierDetails from "./SupplierDetails";

const CreateSupplierForm = ({ expand }: { expand?: boolean }) => {
  return (
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
        <SupplierDetails />
      </SheetContent>
    </Sheet>
  );
};

export default CreateSupplierForm;
