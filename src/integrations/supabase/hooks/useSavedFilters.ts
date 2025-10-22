import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/integrations/supabase/auth";

export interface SavedFilter {
  id: string;
  user_id: string;
  name: string;
  entity_type: string;
  filter_config: any;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const useSavedFilters = (entityType: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: filters, isLoading, error } = useQuery({
    queryKey: ['saved_filters', entityType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_filters')
        .select('*')
        .eq('entity_type', entityType)
        .order('name');

      if (error) throw error;
      return data as SavedFilter[];
    },
    enabled: !!user,
  });

  const saveFilter = useMutation({
    mutationFn: async (filter: {
      name: string;
      filter_config: any;
      is_default?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('saved_filters')
        .insert({
          user_id: user!.id,
          entity_type: entityType,
          ...filter,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved_filters', entityType] });
    },
  });

  const updateFilter = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SavedFilter> }) => {
      const { data, error } = await supabase
        .from('saved_filters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved_filters', entityType] });
    },
  });

  const deleteFilter = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('saved_filters')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved_filters', entityType] });
    },
  });

  return {
    filters,
    isLoading,
    error,
    saveFilter,
    updateFilter,
    deleteFilter,
  };
};
