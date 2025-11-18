import { defineQuery } from "next-sanity";

export const USER_QUERY_BY_EMAIL = defineQuery(
  `*[_type == "user" && email == $email][0]`
);
