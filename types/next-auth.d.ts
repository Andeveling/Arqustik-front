import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number
      username: string
      jwt: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth" {
  interface User {
    username: string
    jwt: string
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    username?: string
    jwt: string
  }
}
