import { BrickWall, Frown, WalletMinimal } from "lucide-react";
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

const DeniedAccessPage = ({ id, name }: { id: string; name: string }) => {
  return (
    <div className="container min-h-full flex items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Frown />
          </EmptyMedia>
          <EmptyTitle>Hello {name} 😊</EmptyTitle>
          <EmptyDescription>
            🐥 Oops! You found <b>the storeroom</b>👀 But it’s locked right now.
            Subscribe to unlock all your tools and start managing your products!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <Link href={`/account/${id}`} rel="noreferrer">
                subscribe <WalletMinimal />
              </Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-muted-foreground"
              size="sm"
            >
              <Link href="/about" rel="noreferrer">
                About <BrickWall />
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default DeniedAccessPage;
