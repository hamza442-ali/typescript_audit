"use client";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack"; // Requires SnackbarProvider in providers.tsx
import { createContext, useContext, useEffect, useState } from "react";

import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import configs from "@/lib/config";
import { User } from "@/lib/supabase";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = configs;

type SupabaseContextType = {
  supabase: SupabaseClient<Database> | undefined;
  user: User | undefined;
  isMounted: boolean;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false); // Prevents useEffect from running on first render
  const [supabase, setSupabase] = useState<
    SupabaseClient<Database> | undefined
  >(undefined);

  useEffect(() => {
    const accessToken = session?.user?.accessToken;

    if (!accessToken) return;

    if (!isMounted) {
      const client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      setSupabase(client);

      const upsertUser = async () => {
        const eth_address = session?.user?.address;
        if (!eth_address) return;
        const { data, error } = await client.rpc("upsert_user", {
          eth_address,
        });
        if (error) {
          handleSupabaseError(error);
        } else {
          setUser(data[0]);
        }
      };

      upsertUser();

      setIsMounted(true);
    }
  }, [session, isMounted]);

  return (
    <SupabaseContext.Provider value={{ supabase, user, isMounted }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  return context;
};

export const handleSupabaseError = (error: PostgrestError | string) => {
  const message = typeof error === "string" ? error : error.message;
  enqueueSnackbar(message, { variant: "error" });
  console.error(error);
};

export const handleSupabaseSuccess = (message: string) => {
  enqueueSnackbar(message, { variant: "success" });
};
