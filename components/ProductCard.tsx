import { TrendingUp, TrendingDown, Banknote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonTooltip } from "./ButtonTooltip";
import { ProductTemplateType } from "@/app/types/product";
import { calculateNotDamaged, productPerformance, toCedis } from "@/lib/utils";

export function ProductCard({
  id,
  product,
}: {
  id: string;
  product: ProductTemplateType;
}) {
  // console.log(Number(product.instock) * Number(product.unit_price));
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In Stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {product.instock}
          </CardTitle>
          <CardAction>
            <Badge variant="default">- damaged</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total amount in cedis <Banknote className="size-5" />
          </div>
          <div className="text-muted-foreground">
            {toCedis(product.instock, product.unit_price)}
          </div>
          <div className="buttons flex items-center max-w-full overflow-hidden gap-1">
            <ButtonTooltip
              name={"update"}
              tip={"update stock"}
              to={`/storeroom/product/details/${id}/update-stock`}
            />
            <ButtonTooltip
              name={"to sales"}
              tip={"move to sales"}
              to={`/storeroom/product/details/${id}/move-to-sales`}
            />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>On Sale</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {product.on_sale}
          </CardTitle>
          <CardAction>
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              {Number(product.on_sale) <= 0 ? <TrendingDown /> : <TrendingUp />}
              {productPerformance(
                product.instock,
                product.on_sale,
                product.damaged,
                "onSale"
              ) + "%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total amount in cedis <Banknote className="size-5" />
          </div>
          <div className="text-muted-foreground">
            {toCedis(product.on_sale, product.unit_price)}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Damaged</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {product.damaged}
          </CardTitle>
          <CardAction>
            <Badge variant="destructive">
              {Number(product.damaged) <= 0 ? <TrendingDown /> : <TrendingUp />}
              {productPerformance(
                product.instock,
                product.on_sale,
                product.damaged,
                "damaged"
              ) + "%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total amount in cedis <Banknote className="size-5" />
          </div>
          <div className="text-muted-foreground">
            {toCedis(product.damaged, product.unit_price)}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In Good State</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {calculateNotDamaged(
              product.instock,
              product.on_sale,
              product.damaged
            )}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {Number(product.on_sale) + Number(product.instock) <= 0 ? (
                <TrendingDown />
              ) : (
                <TrendingUp />
              )}
              {productPerformance(
                product.instock,
                product.on_sale,
                product.damaged,
                "inGoodState"
              ) + "%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total amount in cedis <Banknote className="size-4" />
          </div>
          <div className="text-muted-foreground">GHS 900,788.00</div>
        </CardFooter>
      </Card>
    </div>
  );
}
