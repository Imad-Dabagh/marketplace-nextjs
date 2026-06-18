import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/lib/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await AuthService.validateCredentials(
          credentials.email,
          credentials.password
        );

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.picture = (user as any).image;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        if (token.picture) {
          session.user.image = token.picture as string;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export async function GET(req: any, props: { params: Promise<any> }) {
  const params = await props.params;
  return handler(req, { params });
}

export async function POST(req: any, props: { params: Promise<any> }) {
  const params = await props.params;
  return handler(req, { params });
}
