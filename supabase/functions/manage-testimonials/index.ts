import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, password, data } = await req.json();

    // Validate admin password
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword || password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create service-role client to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let result;

    switch (action) {
      case "list": {
        const { data: rows, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("display_order");
        if (error) throw error;
        result = rows;
        break;
      }

      case "create": {
        const { error } = await supabase.from("testimonials").insert([data]);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "update": {
        const { id, ...fields } = data;
        const { error } = await supabase
          .from("testimonials")
          .update(fields)
          .eq("id", id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "delete": {
        const { error } = await supabase
          .from("testimonials")
          .delete()
          .eq("id", data.id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "toggle_visibility": {
        const { error } = await supabase
          .from("testimonials")
          .update({ is_visible: data.is_visible })
          .eq("id", data.id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "reorder": {
        // data = [{ id, display_order }, ...]
        for (const item of data) {
          const { error } = await supabase
            .from("testimonials")
            .update({ display_order: item.display_order })
            .eq("id", item.id);
          if (error) throw error;
        }
        result = { success: true };
        break;
      }

      case "duplicate": {
        const { data: original, error: fetchErr } = await supabase
          .from("testimonials")
          .select("*")
          .eq("id", data.id)
          .single();
        if (fetchErr) throw fetchErr;

        const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original;
        const { error } = await supabase
          .from("testimonials")
          .insert([{ ...rest, name: `${rest.name} (Copy)`, display_order: rest.display_order + 1 }]);
        if (error) throw error;
        result = { success: true };
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
