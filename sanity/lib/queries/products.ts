import { defineQuery } from "next-sanity";

export const CHECK_EXISTING_PRODUCT = defineQuery(
  `*[_type == "product" && name == $name && owner._ref == $owner]`
);

export const FETCH_ALL_STORE_PRODUCTS = defineQuery(
  `*[_type == "product" && store._ref == $store_id]`
);

export const FETCH_SPECIFIC_PRODUCT = defineQuery(
  `*[_type == "product" && _id == $product_id][0]`
);
