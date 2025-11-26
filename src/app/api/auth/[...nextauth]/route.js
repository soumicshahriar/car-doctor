import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { LoginUser } from "@/app/actions/auth/LoginUser";

export const authOptions = {
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await LoginUser(credentials);

        if (!user) {
          return null; // Login failed
        }

        return user; // Login success
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // Custom login page
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const usersCollection = await dbConnect(
          collectionNamesObj.usersCollection
        );

        // Check if Google user already exists
        const existingUser = await usersCollection.findOne({
          providerAccountId: account.providerAccountId,
        });

        if (!existingUser) {
          // Insert new Google user
          await usersCollection.insertOne({
            providerAccountId: account.providerAccountId,
            provider: account.provider,
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date(),
          });
        }
      }

      return true; // Allow sign in
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
