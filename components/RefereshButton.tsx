"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";

export default function RefreshButton() {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.refresh()}>
      <RefreshCcwIcon />
      Refresh
    </Button>
  );
}
