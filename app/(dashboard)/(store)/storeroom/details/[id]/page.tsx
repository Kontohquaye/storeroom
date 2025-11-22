import { EmptyProducts } from "@/components/EmptyProducts";
import { SiteHeader } from "@/components/PageHeader";
import { ProductList } from "@/components/ProductList";
import SearchProducts from "@/components/SearchProducts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StoreDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) => {
  const { id } = await params;
  const query = (await searchParams).query;
  const productAdded = false;
  const heading = "Storeroom Details";
  return (
    <div className="container min-w-full">
      {!productAdded ? (
        <div className="container min-w-full">
          <SiteHeader heading={heading} />
          <header className="flex justify-between items-center p-0 mt-2">
            <Link
              href={`/storeroom/product/create?store=${id}`}
              className="mb-10  "
            >
              <Button variant={"secondary"} className="hover:cursor-pointer">
                Add item
              </Button>
            </Link>
            <SearchProducts id={id} query={query} />
          </header>
          <ProductList query={query} id={id} />
        </div>
      ) : (
        <div className="content-empty">
          <SiteHeader />
          <EmptyProducts />
        </div>
      )}
    </div>
  );
};

export default StoreDetails;
