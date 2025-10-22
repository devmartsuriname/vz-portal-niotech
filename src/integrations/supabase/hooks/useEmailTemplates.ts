import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";
import { toast } from "sonner";

export interface EmailTemplate {
  id: string;
  template_key: string;
  name: string;
  subject: string;
  body_html: string;
  body_text: string | null;
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export const useEmailTemplates = () => {
  const queryClient = useQueryClient();

  const { data: templates, isLoading, error } = useQuery({
    queryKey: ["email-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as EmailTemplate[];
    },
  });

  const createTemplate = useMutation({
    mutationFn: async (template: Omit<EmailTemplate, "id" | "created_at" | "updated_at" | "created_by">) => {
      const { data, error } = await supabase
        .from("email_templates")
        .insert([template])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      toast.success("Template succesvol aangemaakt");
    },
    onError: (error: any) => {
      toast.error(`Fout bij aanmaken template: ${error.message}`);
    },
  });

  const updateTemplate = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<EmailTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from("email_templates")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      toast.success("Template succesvol bijgewerkt");
    },
    onError: (error: any) => {
      toast.error(`Fout bij bijwerken template: ${error.message}`);
    },
  });

  const deleteTemplate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("email_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      toast.success("Template succesvol verwijderd");
    },
    onError: (error: any) => {
      toast.error(`Fout bij verwijderen template: ${error.message}`);
    },
  });

  const sendTestEmail = useMutation({
    mutationFn: async ({ templateId, testEmail }: { templateId: string; testEmail: string }) => {
      const { data, error } = await supabase.functions.invoke("send-test-email", {
        body: { templateId, testEmail },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Test email verzonden");
    },
    onError: (error: any) => {
      toast.error(`Fout bij verzenden test email: ${error.message}`);
    },
  });

  return {
    templates,
    isLoading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    sendTestEmail,
  };
};
