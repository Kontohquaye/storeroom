import { Undo2, DatabaseBackup } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import Link from "next/link";
import { Button } from "./ui/button";

const EmptySearchPage = ({ product }: { product?: boolean }) => {
  return (
    <div className="container">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <DatabaseBackup />
          </EmptyMedia>
          <EmptyTitle>No match found!</EmptyTitle>
          <EmptyDescription>
            Get started by creating your first storeroom.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            {!product && (
              <Link href="/storeroom/create">
                <Button>"Create Store</Button>
              </Link>
            )}

            {/* <Button variant="outline">Import Project</Button> */}
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <Link href="/dashboard" rel="noreferrer">
                To dashboard <Undo2 />
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptySearchPage;
