import { FolderUp } from "lucide-react";
import { SiteHeader } from "@/components/PageHeader";
import CreateProductForm from "@/components/CreateProductForm";

const CeateProduct = async ({
  searchParams,
}: {
  searchParams: Promise<{ store?: string }>;
}) => {
  const store = (await searchParams).store;
  // console.log(store);
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
          <CreateProductForm store_id={store} />
        </div>
      </div>
    </div>
  );
};

export default CeateProduct;
