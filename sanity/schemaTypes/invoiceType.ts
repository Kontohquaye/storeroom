import { defineField, defineType } from "sanity";

export const invoiceType = defineType({
  name: "invoice",
  title: "Invoice",
  type: "document",
  fields: [
    defineField({
      name: "subcription",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "subscription" }],
    }),
    defineField({
      name: "amount_paid",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "plan",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Yearly", value: "yearly" },
          { title: "Monthly", value: "monthly" },
        ],
      },
    }),
    defineField({
      name: "date_paid",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expires",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
