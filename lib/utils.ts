import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getAvatarFallback(name: string | null | undefined) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
export { getAvatarFallback };

// product Details
export const toCedis = (
  quantity: string | number,
  unitPrize: string | number
) => {
  const amtInCedis = (Number(quantity) * Number(unitPrize)).toFixed(2);
  const formated = Number(amtInCedis).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `GHS ${formated}`;
};

export const calculateNotDamaged = (
  inStock: string | number,
  onSale: string | number,
  damaged: string | number
) => {
  return Number(inStock) + Number(onSale);
};

export const productPerformance = (
  inStock: string | number,
  onSale: string | number,
  damaged: string | number,
  forState: "onSale" | "damaged" | "inGoodState"
) => {
  if (forState === "onSale") {
    const percentage =
      (Number(onSale) / (Number(inStock) + Number(damaged))) * 100;

    const absolutePercentage = Math.abs(Number(percentage.toFixed(1)));
    return absolutePercentage;
  } else if (forState === "damaged") {
    const percentage =
      (Number(damaged) / (Number(inStock) + Number(onSale))) * 100;

    const absolutePercentage = Math.abs(Number(percentage.toFixed(1)));
    return absolutePercentage;
  } else {
    const percentage =
      ((Number(inStock) + Number(onSale)) /
        (Number(inStock) + Number(damaged) + Number(onSale))) *
      100;

    const absolutePercentage = Math.abs(Number(percentage.toFixed(1)));
    return absolutePercentage;
  }
};
