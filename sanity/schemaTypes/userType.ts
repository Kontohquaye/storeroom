import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "id",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
    }),
    defineField({
      name: "image",
      type: "string",
    }),
    defineField({
      name: "subscriptionStatus",
      type: "string",
      initialValue: "free",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Active", value: "active" },
          { title: "Expired", value: "expired" },
        ],
      },
    }),
    defineField({
      name: "subscriptionPlan",
      type: "string",
      initialValue: "monthly",
      options: {
        list: [
          { title: "Monthly", value: "monthly" },
          { title: "Yearly", value: "yearly" },
        ],
      },
    }),
    defineField({
      name: "subscriptionExpiry",
      type: "datetime",
    }),
    defineField({
      name: "paystackCustomerId",
      type: "string",
    }),
    defineField({
      name: "lastPaymentDate",
      type: "datetime",
    }),
  ],
});
