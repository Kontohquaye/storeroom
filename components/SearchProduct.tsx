import { Product, ProductTemplateType } from "@/app/types/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Eye } from "lucide-react";
import EmptySearchPage from "./EmptySearchPage";

const SearchProductResults = ({
  query,
  product,
}: {
  query: string;
  product: ProductTemplateType[];
}) => {
  const filteredProduct = product.filter((prod) =>
    prod.name.toLowerCase().includes(query.toLowerCase())
  );
  //   console.log(filteredProduct);
  return (
    <div className="container">
      {filteredProduct.length <= 0 && <EmptySearchPage product={true} />}
      {filteredProduct.length > 0 && (
        <Table>
          <TableCaption>
            Product list for <b>"{query}"</b>
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
            {filteredProduct.map((product: any) => (
              <TableRow key={product._id}>
                {/* <Link href={``}></Link> */}
                <TableCell className="font-medium">{product.name}</TableCell>
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
      )}
    </div>
  );
};

export default SearchProductResults;
