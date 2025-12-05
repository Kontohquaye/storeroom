import { SiteHeader } from "@/components/PageHeader";
import UpdateStockForm from "@/components/UpdateStockForm";
import { fetchMySuppliers } from "@/lib/actions";

const UpdateStock = async ({
  searchParams,
}: {
  searchParams: Promise<{ product: string; id: string }>;
}) => {
  const heading = "Stock Entry";
  const query = await searchParams;
  const { product: productName, id: productId } = query;
  const productDetails = { productName, productId };
  const mySuppliers = await fetchMySuppliers();
  // console.log(mySuppliers);
  return (
    <div className="content">
      <SiteHeader heading={heading} />

      <UpdateStockForm
        suppliers={mySuppliers}
        productDetails={productDetails}
      />
    </div>
  );
};

export default UpdateStock;
