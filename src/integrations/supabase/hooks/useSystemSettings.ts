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
        
        // Try to update the mask in system_settings, fallback to upsert if row doesn't exist
        const { data: updateData, error: updateError } = await supabase
          .from('system_settings')
          .update({ setting_value: '""' })
          .eq('setting_key', key)
          .select()
          .single();

        if (updateError && updateError.code === 'PGRST116') {
          // Row doesn't exist, upsert it
          const { data, error: upsertError } = await supabase
            .from('system_settings')
            .upsert({
              setting_key: key,
              setting_value: '""',
              category: category || 'email'
            })
            .select()
            .single();
          
          if (upsertError) throw upsertError;
          return data;
        }
        
        if (updateError) throw updateError;
        return updateData;
      }
      
      // Normal settings update with upsert fallback
      const { data: updateData, error: updateError } = await supabase
        .from('system_settings')
        .update({ setting_value: value })
        .eq('setting_key', key)
        .select()
        .single();

      // If row doesn't exist (PGRST116), upsert it
      if (updateError && updateError.code === 'PGRST116') {
        const { data, error: upsertError } = await supabase
          .from('system_settings')
          .upsert({
            setting_key: key,
            setting_value: value,
            category: category || 'general'
          })
          .select()
          .single();
        
        if (upsertError) throw upsertError;
        return data;
      }

      if (updateError) throw updateError;
      return updateData;
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
