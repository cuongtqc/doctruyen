// /lib/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"; // You'll create this file to export the Prisma client instance

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    /**
     * @param {{ session: import('next-auth').Session, token: import('next-auth/jwt').JWT }} params
     * @returns {Promise<import('next-auth').Session>}
     */
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // @ts-ignore - Adding custom property
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken
      return session;
    },
    /**
     * @param {{ token: import('next-auth/jwt').JWT }} params
     * @returns {Promise<import('next-auth/jwt').JWT>}
     */
    async jwt({ token, user, account }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
});