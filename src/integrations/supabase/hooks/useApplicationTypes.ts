import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ApplicationType {
  id: string;
  name: string;
  description: string | null;
  base_fee: number | null;
  processing_days: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useApplicationTypes = () => {
  return useQuery({
    queryKey: ['application_types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('application_types')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data as ApplicationType[];
    },
  });
};
