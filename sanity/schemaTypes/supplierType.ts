import { defineField, defineType } from "sanity";

export const supplierType = defineType({
  name: "supplier",
  title: "Supplier",
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
      name: "phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "email",
    }),
    defineField({
      name: "country",
      type: "string",
    }),
    defineField({
      name: "address",
      type: "string",
    }),
    defineField({
      name: "status",
      type: "string",
      initialValue: "active",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
        ],
      },
    }),
  ],
});
