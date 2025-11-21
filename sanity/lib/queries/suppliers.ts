import { defineQuery } from "next-sanity";

export const EXISTING_SUPPLIER = defineQuery(
  `*[_type == "supplier" && name == $name && email == $email][0]`
);
