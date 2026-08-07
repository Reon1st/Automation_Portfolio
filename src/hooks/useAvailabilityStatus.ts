import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isInClassNow } from "@/lib/classStatus";

type Override = "auto" | "available" | "unavailable";

// Manual admin override (site_status table) wins when set; otherwise falls
// back to the automatic class-schedule signal.
export function useAvailabilityStatus(): boolean {
  const [override, setOverride] = useState<Override>("auto");
  const [scheduleAvailable, setScheduleAvailable] = useState(() => !isInClassNow());

  useEffect(() => {
    const fetchOverride = async () => {
      const { data } = await supabase.from("site_status").select("status").limit(1).maybeSingle();
      setOverride(data?.status === "available" || data?.status === "unavailable" ? data.status : "auto");
    };
    fetchOverride();
    const id = setInterval(fetchOverride, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setScheduleAvailable(!isInClassNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (override === "available") return true;
  if (override === "unavailable") return false;
  return scheduleAvailable;
}
