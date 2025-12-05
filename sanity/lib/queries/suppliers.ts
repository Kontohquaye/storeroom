import { de } from "date-fns/locale";
import { defineQuery } from "next-sanity";

export const EXISTING_SUPPLIER = defineQuery(
  `*[_type == "supplier"  && owner._ref == $owner && name == $name && email == $email ][0] `
);

export const CHECK_SUPPLIERS = defineQuery(
  `*[_type == "supplier" && owner._ref == $owner]`
);

export const FETCH_SINGLE_SUPPLIER = defineQuery(
  `*[_type == "supplier" && _id == $id][0]`
);

export const FETCH_USER_SUPPLIER = defineQuery(
  `*[_type == "supplier" && owner._ref == $owner]`
);
