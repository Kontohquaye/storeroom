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
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const roomUser = await client
          .withConfig({ useCdn: false })
          .fetch(USER_QUERY_BY_EMAIL, {
            email: profile.email,
          });

        token.id = roomUser?._id;
        console.log("JWT Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
