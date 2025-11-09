import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import Link from "next/link";

export function ButtonTooltip({
  name,
  tip,
  to,
}: {
  name: string;
  tip: string;
  to: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={to}>
          <Button variant="default">{name}</Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
