import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "owner",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "user" }],
    }),
    defineField({
      name: "supplier",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "supplier" }],
    }),
    defineField({
      name: "store",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "store" }],
    }),
    defineField({
      name: "instock",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "on_sale",
      type: "string",
    }),
    defineField({
      name: "damaged",
      type: "string",
    }),
  ],
});
