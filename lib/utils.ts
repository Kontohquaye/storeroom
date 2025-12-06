import { clsx, type ClassValue } from "clsx";
import constants from "constants";
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

export const convertTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // convert 24h → 12h (no AM/PM)
  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date) => {
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const getId = (path: string) => {
  const split = path.split("/");
  const id = split[split.length - 2];
  return id;
};

// convert date for stocks
export const getMonthName = (dateString: string) => {
  const date = new Date(dateString);
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  return monthName;
};
