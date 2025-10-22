import { useQuery } from "@tanstack/react-query";
import { supabase } from "../client";

export interface IssuedPermit {
  id: string;
  code: string;
  agenda_number: string;
  name: string;
  given_names: string;
  issued_date: string | null;
  expires_at: string | null;
  status: string;
}

export const useIssuedPermits = (searchQuery: string = "") => {
  return useQuery({
    queryKey: ["issued-permits", searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("issued_permits")
        .select("*")
        .eq("status", "active")
        .order("agenda_number", { ascending: false })
        .limit(1000);

      if (searchQuery.trim()) {
        query = query.or(
          `agenda_number.ilike.%${searchQuery}%,` +
          `name.ilike.%${searchQuery}%,` +
          `given_names.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as IssuedPermit[];
    },
  });
};
