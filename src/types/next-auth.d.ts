import NextAuth, { DefaultSession } from "next-auth";

// Includes user.accessToken which is used for RLS in Supabase
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      address: string
      chainId: number
      uri: string
      version: string
      nonce: string
      profileId: string
      payload?: any
      accessToken?: string
    } & DefaultSession["user"]
  }
}