import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/services/login-signup/auth.service";

export const authOption = {
    providers: [
        CredentialsProvider({
            async authorize(newUserInfo) {
                const userData = {
                    email: newUserInfo?.email,
                    password: newUserInfo?.password,
                }
                const login = await loginService(userData);
                return login.payload;
            },
        }),
    ],
    // secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },

    // used to set token into cookies
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };