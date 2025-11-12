import { ArchiveX } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateSupplier } from "./CreateSupplier";
import Link from "next/link";
import RefreshButton from "./RefereshButton";

export function EmptySuppliersPage() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ArchiveX />
        </EmptyMedia>
        <EmptyTitle>No Suppliers</EmptyTitle>
        <EmptyDescription>
          Sorry🥹. No suppliers added yet. Added suppliers will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-1 items-center">
          <RefreshButton />
          <CreateSupplier />
        </div>
      </EmptyContent>
    </Empty>
  );
}
