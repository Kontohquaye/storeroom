import { defineField, defineType } from "sanity";

export const stockType = defineType({
  name: "stock",
  title: "Stock",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "product",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "product" }],
    }),
    defineField({
      name: "supplier",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "supplier" }],
    }),
    defineField({
      name: "comments",
      type: "text",
    }),
    defineField({
      name: "unit_price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "to_return",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quantity",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "damaged",
      type: "number",
    }),
    defineField({
      name: "date",
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
