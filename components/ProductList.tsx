import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { client } from "@/sanity/client";
import { FETCH_ALL_STORE_PRODUCTS } from "@/sanity/lib/queries/products";
import { Product } from "@/app/types/product";
import { FETCH_PRODUCT_STORE } from "@/sanity/lib/queries/store";
import { Badge } from "./ui/badge";
import { EmptyProducts } from "./EmptyProducts";

export async function ProductList({
  query,
  id,
}: {
  query?: string;
  id: string;
}) {
  const store_id = id;
  const productsList = await client.fetch(FETCH_ALL_STORE_PRODUCTS, {
    store_id,
  });
  const store = await client.fetch(FETCH_PRODUCT_STORE, { store_id });
  // console.log(store);
  // console.log(productsList.length);
  return (
    <div className="container">
      {query ? (
        <p>
          Results for <b>{`${query}`}</b>
        </p>
      ) : (
        <div className="table-container p-2">
          {productsList.length > 0 ? (
            <Table>
              <TableCaption>
                List of products in {store[0].name}
                {store[0].status === "active" ? (
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600 ml-1.5"
                  >
                    active
                  </Badge>
                ) : (
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums ml-1.5"
                    variant="destructive"
                  >
                    inactive
                  </Badge>
                )}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>In stock</TableHead>
                  <TableHead>On sale</TableHead>
                  <TableHead>Damaged</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsList.map((product: Product) => (
                  <TableRow key={product._id}>
                    {/* <Link href={``}></Link> */}
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.instock}</TableCell>
                    <TableCell>{product.on_sale}</TableCell>
                    <TableCell>{product.damaged}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/storeroom/product/details/${product._id}`}
                        className="inline-block text-right"
                      >
                        <Eye className="text-right hover:text-red-400 " />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} >Total</TableCell>
                </TableRow>
              </TableFooter> */}
            </Table>
          ) : (
            <EmptyProducts store={store_id} />
          )}
        </div>
      )}
    </div>
  );
}
