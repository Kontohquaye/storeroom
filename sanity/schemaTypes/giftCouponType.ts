import { defineField, defineType } from "sanity";

export const giftCouponType = defineType({
  name: "coupon",
  title: "Coupon",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
