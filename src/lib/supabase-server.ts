import configs from "@/lib/config";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseServer = createClient<Database>(
  "https://zstdcrnjlrlasjdsxrfl.supabase.co",
  configs.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false
    },
      

  }
);

export default supabaseServer;
