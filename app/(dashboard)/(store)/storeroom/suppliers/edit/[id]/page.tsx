import { DeleteDialog } from "@/components/Delete";
import { SiteHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditSupplier = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supplierName = "Akosah Ltd";
  return (
    <div className="container ">
      <SiteHeader id={id} heading="Edit suppliers" />
      <div className="details w-full max-w-md mx-auto mt-2">
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
            <Input id="country" type="text" defaultValue="Abuohia street 34" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" defaultValue="Abuohia street 34" />
          </div>
          {/* buttons */}
          <div className="btn flex gap-2 items-center">
            <Button type="submit" className="flex-1 cursor-pointer">
              Save supplier
            </Button>
            <DeleteDialog supplierName={supplierName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplier;
