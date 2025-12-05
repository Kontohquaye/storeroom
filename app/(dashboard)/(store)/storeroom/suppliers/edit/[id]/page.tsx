import { SupplierListType } from "@/app/types/supplier";

import { SiteHeader } from "@/components/PageHeader";
import SupplierForm from "@/components/SupplierForm";

import { client } from "@/sanity/client";
import { FETCH_SINGLE_SUPPLIER } from "@/sanity/lib/queries/suppliers";
import { notFound } from "next/navigation";

const EditSupplier = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supplier: SupplierListType = await client
    .withConfig({ useCdn: false })
    .fetch(FETCH_SINGLE_SUPPLIER, {
      id,
    });

  if (!supplier) return notFound();
  // console.log(supplier);
  const supplierName = supplier.name;
  return (
    <div className="container ">
      <SiteHeader id={id} heading="Edit suppliers" />
      <SupplierForm supplier={supplier} supplierName={supplierName} id={id} />
    </div>
  );
};

export default EditSupplier;
