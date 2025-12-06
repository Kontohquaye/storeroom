import { FolderPen } from "lucide-react";

import { SiteHeader } from "@/components/PageHeader";
import EditProductDetails from "@/components/EditProductForm";
import { fetchSingleProduct } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditProduct = async ({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) => {
  const heading = "Edit-Product Entry";
  const id = (await searchParams).product;
  // console.log(id);
  const product = await fetchSingleProduct(id!);
  // console.log(product);
  if (!product) {
    return notFound();
  }
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <div className="content ml-6 mt-4 flex justify-center items-center ">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div className="title flex items-center gap-2 mb-2">
            <FolderPen />
            <h1>Edit Product</h1>
          </div>
          <EditProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
