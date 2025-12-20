"use client";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DatabaseBackup } from "lucide-react";
// import {
//   Empty,
//   EmptyContent,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle,
// } from "@components/ui/empty";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";

const NotFountPage = () => {
  return (
    <div className="container flex items-center h-screen min-h-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <DatabaseBackup />
          </EmptyMedia>
          <EmptyTitle>Resouce Not Found</EmptyTitle>
          <EmptyDescription>😔😔😔</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Link href="/">
              <Button>Home</Button>
            </Link>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFountPage;
