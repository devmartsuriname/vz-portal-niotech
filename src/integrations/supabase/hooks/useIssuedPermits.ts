import { useQuery } from "@tanstack/react-query";
import { supabase } from "../client";

export interface IssuedPermit {
  code: string;
  agenda_number: string;
  issued_date: string | null;
  expires_at: string | null;
  status: string;
}

export interface IssuedPermitFull extends IssuedPermit {
  id: string;
  name: string;
  given_names: string;
  created_at: string;
  updated_at: string;
}

export const useIssuedPermits = (searchQuery: string = "") => {
  return useQuery({
    queryKey: ["issued-permits", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        // No search query provided, return empty array for security
        return [];
      }

      // Use secure RPC function that only searches by exact code or agenda_number
      // and doesn't expose personal names to public
      const { data, error } = await supabase.rpc("search_permit_public", {
        search_code: searchQuery.trim(),
        search_agenda: searchQuery.trim(),
      });

      if (error) throw error;
      return (data || []) as IssuedPermit[];
    },
  });
};
