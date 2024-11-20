import NextAuth from "next-auth";
import { Account, User as AuthUser, Profile } from "next-auth"; // Importing necessary types
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db"; // Adjust this import based on your project structure

// Define the options for NextAuth
const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any) {
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.email },
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password!
            );
            if (isPasswordCorrect) {
              // Return user object containing required properties
              return { id: user.id, email: user.email }; // Include other properties if needed
            }
          }
        } catch (error) {
          console.error("Error during authorization:", error);
        }
        // If no user is found or password is incorrect
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!, // Ensure you have these variables set in .env
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: AuthUser | null; account: Account | null; profile?: Profile | undefined }) {
      if (account && user) {
        // Custom sign-in logic if needed
        return true; // Return true to allow sign-in
      }
      return false; // Reject sign-in if account or user is null
    },
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST methods
export { handler as GET, handler as POST };
