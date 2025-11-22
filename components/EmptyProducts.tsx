// import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon, FolderUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function EmptyProducts({ store }: { store?: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderUp />
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any storerooms yet. Get started by creating
          your first storeroom item.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link href={`/storeroom/product/create?store=${store}`}>
            <Button>Add item</Button>
          </Link>

          {/* <Button variant="outline">Import Project</Button> */}
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <Link href="/learn-more/product" target="_blank" rel="noreferrer">
              Learn More <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
