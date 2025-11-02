// import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon, FolderPlus } from "lucide-react";

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

export function EmptyStore() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>No Stores Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any storerooms yet. Get started by creating
          your first storeroom.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Store</Button>
          {/* <Button variant="outline">Import Project</Button> */}
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <Link href="/learn-more" target="_blank" rel="noreferrer">
              Learn More <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
