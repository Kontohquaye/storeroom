import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/client";
import { writeClient } from "./sanity/lib/write-client";
import { USER_QUERY_BY_EMAIL } from "./sanity/lib/queries/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      const user = await client.fetch(USER_QUERY_BY_EMAIL, {
        email,
      });
      if (!user) {
        await writeClient.withConfig({ useCdn: false }).create({
          _type: "user",
          name,
          id,
          email,
          image,
        });
      }

      return true;
    },
  },
});
