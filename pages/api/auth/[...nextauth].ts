import { CredentialsI } from '@models/services/auth.model';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '@services/auth.service';

export const authOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.NEXT_AUTH_SECRET ?? '12as12sd312dfa123',
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials === null || credentials === undefined) return null;
        try {
          const { username, password } = credentials as CredentialsI;
          const { user, jwt } = await signIn({ username, password });
          return { ...user, jwt };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.jwt = token.jwt;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.jwt = user.jwt;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
