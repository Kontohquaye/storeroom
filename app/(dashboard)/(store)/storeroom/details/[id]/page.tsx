import { EmptyProducts } from "@/components/EmptyProducts";
import { ProductList } from "@/components/ProductList";
import SearchProducts from "@/components/SearchProducts";

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
  return (
    <div className="content">
      {!productAdded ? (
        <div className="container">
          <header className="flex justify-end p-0">
            <SearchProducts id={id} query={query} />
          </header>
          <ProductList query={query} />
        </div>
      ) : (
        <EmptyProducts />
      )}
    </div>
  );
};

export default StoreDetails;
