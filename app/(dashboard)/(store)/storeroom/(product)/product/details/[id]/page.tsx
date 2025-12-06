import { ProductTemplateType } from "@/app/types/product";
import { StockType } from "@/app/types/stock";
import { CustomChart } from "@/components/CustomChart";
import { SiteHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { fetchProductStocks } from "@/lib/actions";
import { client } from "@/sanity/client";
import { FETCH_SPECIFIC_PRODUCT } from "@/sanity/lib/queries/products";
import { notFound } from "next/navigation";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product: ProductTemplateType = await client.fetch(
    FETCH_SPECIFIC_PRODUCT,
    {
      product_id: id,
    }
  );

  const stockData: StockType[] = await fetchProductStocks(id);
  // console.log("Stock data:", stockData);

  if (!product) {
    return notFound();
  }
  // console.log(product);
  return (
    <div className="container min-w-full">
      <SiteHeader id={id} heading="Product details" edit={true} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ProductCard id={id} product={product} />

            <div className="px-4 lg:px-6">
              <CustomChart stockData={stockData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
