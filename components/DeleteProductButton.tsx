"use client";
import { DeleteDialog } from "./Delete";
import { usePathname } from "next/navigation";

const DeleteProductButton = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  //   console.log("Path Segments:", pathSegments);
  const id = pathSegments[pathSegments.length - 2];
  //   console.log("Product ID for deletion:", id);
  return <DeleteDialog storeName={`${id}`} />;
};

export default DeleteProductButton;
