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
export const EXISTING_STORE_NAME = defineQuery(
  `*[_type == "store" && name == $name ][0]`
);
