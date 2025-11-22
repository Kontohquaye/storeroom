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
import { SiteHeader } from "@/components/PageHeader";
import { CreateSupplier } from "@/components/CreateSupplier";
import { EmptySuppliersPage } from "@/components/EmptySuppliers";
import { client } from "@/sanity/client";
import { CHECK_SUPPLIERS } from "@/sanity/lib/queries/suppliers";
import { auth } from "@/auth";
import { SupplierListType } from "@/app/types/supplier";

const suppliers1 = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    country: "USA",
  },
  {
    name: "Jasne Samith",
    email: "jane.smith@example.com",
    phone: "+44-20-7946-1234",
    country: "UK",
  },
  {
    name: "Kwam Minsah",
    email: "kwame.mensah@example.com",
    phone: "+233-24-123-4567",
    country: "Ghana",
  },
  {
    name: "Jn Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    country: "USA",
  },
  {
    name: "Janse Smith",
    email: "jane.smith@example.com",
    phone: "+44-20-7946-1234",
    country: "UK",
  },
  {
    name: "Kim Mensah",
    email: "kwame.mensah@example.com",
    phone: "+233-24-123-4567",
    country: "Ghana",
  },
];

const Suppliers = async () => {
  const session = await auth();
  const suppliers = await client.fetch(CHECK_SUPPLIERS, {
    owner: session?.user?.id,
  });
  // console.log(suppliers);
  const id = "1";
  // const have = false; // Empty array to simulate no suppliers
  return (
    <div className="container min-w-full">
      {/* Table */}
      <SiteHeader heading="Suppliers" />
      <div className="table-container p-2 mt-2">
        {suppliers.length <= 0 ? (
          <EmptySuppliersPage />
        ) : (
          <Table>
            <TableCaption>A list of suppliers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier: SupplierListType) => (
                <TableRow key={supplier.name}>
                  {/* <Link href={``}></Link> */}
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell className="text-right">
                    {/* use id from database */}
                    <Link
                      href={`/storeroom/suppliers/edit/${id}`}
                      className="inline-block text-right"
                    >
                      <Eye className="text-right hover:text-red-400 " />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <CreateSupplier expand={true} />
                </TableCell>
                {/* <TableCell className="text-right">$2,500.00</TableCell> */}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
