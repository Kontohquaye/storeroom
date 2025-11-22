import { defineQuery } from "next-sanity";

export const FETCH_USER_STORES = defineQuery(
  `*[_type == "store" && owner._ref == $owner ]{
  _id,
  category,
  location,
  _createdAt,
  name,
  status, 
  type }`
);

export const FETCH_PRODUCT_STORE = defineQuery(
  `*[_type == "store" && _id == $store_id ]{
  name,
  status, 
  }`
);

export const EXISTING_STORE_NAME = defineQuery(
  `*[_type == "store" && name == $name ][0]`
);
