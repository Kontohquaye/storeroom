import { FolderUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/PageHeader";
import CreateProductForm from "@/components/CreateProductForm";

const CeateProduct = () => {
  const heading = "Product Entry";
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderUp />
            <h1>Create Product</h1>
          </div>

          {/* Create Product Ui */}
          <CreateProductForm />
          <div className="btn w-full max-w-md">
            <Button className="w-full">Create </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeateProduct;
