import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  category: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useSystemSettings = (category?: string) => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['system_settings', category],
    queryFn: async () => {
      let query = supabase
        .from('system_settings')
        .select('*')
        .order('setting_key');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SystemSetting[];
    },
  });

  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase
        .from('system_settings')
        .update({ setting_value: value })
        .eq('setting_key', key)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system_settings'] });
    },
  });

  const testResendConnection = useMutation({
    mutationFn: async ({ apiKey, fromEmail, fromName, testEmail }: { 
      apiKey: string; 
      fromEmail: string; 
      fromName: string; 
      testEmail: string;
    }) => {
      const { data, error } = await supabase.functions.invoke('test-resend-connection', {
        body: {
          api_key: apiKey,
          from_email: fromEmail,
          from_name: fromName,
          test_email: testEmail,
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);
      return data;
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    testResendConnection,
  };
};
