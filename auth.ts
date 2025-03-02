import NextAuth, { User } from "next-auth";
import { Apple } from "lucide-react";
import Google from "@auth/core/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);
        if (user.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password,
        );

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/auth/page",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
