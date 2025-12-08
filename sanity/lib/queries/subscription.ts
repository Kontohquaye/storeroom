import { defineQuery } from "next-sanity";

export const FETCH_SPECIFIC_SUBSCRIPTION = defineQuery(
  `*[_type == "subscription" && subscription_id._ref == $id][0]`
);
