import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sales",
  title: "Sales",
  type: "document",
  fields: [
    defineField({
      name: "product",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "product" }],
    }),
    defineField({
      name: "quantity",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "created",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
