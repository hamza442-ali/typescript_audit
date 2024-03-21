import type { NextAuthOptions } from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import configs from "./config";
import jwt from 'jsonwebtoken';

import { AdapterUser } from "next-auth/adapters";
type TradeshareUser = AdapterUser & {
  address: string;
  accessToken: string;
};

const { SUPABASE_JWT_SECRET } = configs;

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = 'authenticated'

        // Sign and encrypt the wallet address using the Supabase secret
        // This is required for RLS to work
        // @See <https://auth0.com/blog/using-nextjs-and-auth0-with-supabase/#Authentication>
        const payload = {
          userId: (user as TradeshareUser).address,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) // 30 days
        }
        token.accessToken = jwt.sign(payload, SUPABASE_JWT_SECRET)

      }
      // console.log("jwt token", token);
      return token;
    },
    async session({ session, token }) {
      const user = Object.assign({}, token.user, { accessToken: token.accessToken }) as TradeshareUser;
      (session as { user: unknown }).user = user;
      // console.log("session auth:", session);
      return session;
    }
  }
};