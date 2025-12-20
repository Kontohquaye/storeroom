import { defineQuery } from "next-sanity";

export const CHECK_EXISTING_COUPON = defineQuery(
  `*[_type == "coupon" &&  code == $code][0]`
);
