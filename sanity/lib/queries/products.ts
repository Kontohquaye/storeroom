import { defineQuery } from "next-sanity";

export const CHECK_EXISTING_PRODUCT = defineQuery(
  `*[_type == "product" && name == $name && owner._ref == $owner]`
);

export const FETCH_ALL_STORE_PRODUCTS = defineQuery(
  `*[_type == "product" && store._ref == $store_id]`
);
