import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function DeleteDialog({
  storeName,
  productName,
}: {
  storeName?: string;
  productName?: string;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Open Dialog</Button> */}
          <Button variant={"destructive"}>
            <Trash2 />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              To confirm delete, enter{" "}
              {storeName ? storeName : productName ? productName : "name"}{" "}
              here.... Click delete when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="example" />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
