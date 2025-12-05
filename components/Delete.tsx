"use client";
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
import { deleteStore, deleteSupplier } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function DeleteDialog({
  supplierId,
  productId,
  supplierName,
  store,
  expand,
}: {
  supplierId?: string;
  productId?: string;
  supplierName?: string;
  store?: {
    id: string;
    name: string;
  };
  expand?: boolean;
}) {
  const router = useRouter();
  const [itemId, setItemId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const handleDelete = async (ConfirmationId: string) => {
    setIsPending(true);
    const id = store?.id;
    // work on this later!!

    if (supplierId && supplierId == ConfirmationId) {
      const res = await deleteSupplier(supplierId);
      console.log(res);
      router.push("/storeroom/suppliers");
      toast.success(res.message);
      setIsPending(false);
      return;
    }

    if (id && id == ConfirmationId) {
      const res = await deleteStore({ id: store.id });
      setIsPending(false);
      if (res.deleted) toast.success(res.message);
      if (res.deleted) return router.push("/dashboard");
      if (!res.deleted) toast.error(res.message);
    } else {
      toast.error("enter correct confirmation token");
      setIsPending(false);
    }
  };
  const handleToast = () => {
    toast.error("delete in progress");
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Open Dialog</Button> */}

          <Button
            variant={"destructive"}
            type="button"
            className={expand ? "cursor-pointer w-full" : "cursor-pointer"}
          >
            <Trash2 />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              {store ? (
                <>
                  {` To confirm ${store?.name} store deletion enter  "${store?.id}"`}
                </>
              ) : (
                <>
                  {supplierId
                    ? `To confirm enter "${supplierId}" `
                    : productId
                      ? productId
                      : supplierName
                        ? supplierName
                        : "name"}{" "}
                </>
              )}{" "}
              Click delete when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="confirmation">Confirmation</Label>
              <Input
                id="confirmation"
                name="name"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
              />
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

            {isPending ? (
              <Button
                className="bg-blue-950"
                type="submit"
                variant={"default"}
                onClick={handleToast}
              >
                <p className="loader" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"destructive"}
                onClick={() => handleDelete(itemId)}
              >
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
