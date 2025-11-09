import { CustomChart } from "@/components/CustomChart";
import { SiteHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="container min-w-full">
      <SiteHeader id={id} heading="Product details" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ProductCard id={id} />

            <div className="px-4 lg:px-6">
              <CustomChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
