import { createClient } from "@supabase/supabase-js";

export const checkSupabaseConnection = async () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        isConnected: false,
        error: "Supabase credentials are missing",
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("products")
      .select("count")
      .limit(1);

    if (error) throw error;

    return {
      isConnected: true,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: `Failed to connect to Supabase: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
