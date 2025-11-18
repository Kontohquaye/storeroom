import { defineField, defineType } from "sanity";

export const storeType = defineType({
  name: "store",
  title: "Store",
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
      name: "location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Warehouse", value: "warehouse" },
          { title: "Wholesale", value: "wholesale" },
          { title: "Retail", value: "retail" },
          { title: "Transit store", value: "transit store" },
          { title: "Storage unit", value: "storage unit" },
          { title: "Finished goods", value: "finished goods" },
          { title: "Others", value: "others" },
        ],
      },

      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Fashion & Apparel", value: "fashion" },
          { title: "Cosmetics & Beauty", value: "cosmetics and beauty" },
          { title: "Groceries", value: "groceries" },
          { title: "Electronic gadgets", value: "electronics" },
          { title: "Pharmaceuticals", value: "pharmaceuticals" },
          { title: "General merchandise", value: "general merchandise" },
          { title: "Mix up", value: "mix up" },
          { title: "Others", value: "others" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
