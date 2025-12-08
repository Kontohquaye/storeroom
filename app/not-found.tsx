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
import { Undo2, DatabaseBackup } from "lucide-react";
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
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
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

            {/* <Button variant="outline">Import Project</Button> */}
            <Button
              variant="link"
              asChild
              className="text-muted-foreground cursor-pointer"
              size="sm"
              onClick={handleClick}
            >
              <div className="p-2">
                Back <Undo2 />
              </div>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFountPage;
