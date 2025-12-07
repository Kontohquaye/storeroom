import { defineField, defineType } from "sanity";

export const subscriptionType = defineType({
  name: "subscription",
  title: "Subscription",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
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
      name: "subscription_id",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
        ],
      },
    }),
    defineField({
      name: "expiry",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
