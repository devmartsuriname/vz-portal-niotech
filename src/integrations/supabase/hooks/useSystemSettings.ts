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

interface SMTPTestConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  testEmail: string;
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
      // Special handling for smtp_password - store in vault
      if (key === 'smtp_password' && value) {
        const { error: vaultError } = await supabase.rpc('store_smtp_password', {
          password_value: value
        });
        
        if (vaultError) throw vaultError;
        
        // Don't store actual password in system_settings
        const { data, error } = await supabase
          .from('system_settings')
          .update({ setting_value: '""' })
          .eq('setting_key', key)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
      
      // Normal settings update
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

  const testSMTPConnection = useMutation({
    mutationFn: async ({ host, port, secure, username, password, fromEmail, fromName, testEmail }: SMTPTestConfig) => {
      const payload: any = {
        smtp_host: host,
        smtp_port: port,
        smtp_secure: secure,
        smtp_username: username,
        from_email: fromEmail,
        from_name: fromName,
        test_email: testEmail,
      };

      // Omit password if masked or empty (function will fetch from Vault)
      if (password && password !== '••••••••') {
        payload.smtp_password = password;
      }

      const { data, error } = await supabase.functions.invoke('test-smtp-connection', {
        body: payload,
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
    testSMTPConnection,
  };
};
