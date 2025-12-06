import { defineQuery } from "next-sanity";

export const FETCH_STOCK_DATA = defineQuery(
  `*[_type == "stock" && product._ref == $productId] | order(_createdAt desc)`
);
