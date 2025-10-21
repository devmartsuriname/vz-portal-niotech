import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";
import { useAuth } from "../auth";

export interface Submission {
  id: string;
  user_id: string;
  application_type_id: string;
  status: string;
  wizard_answers: any;
  applicant_data: any;
  admin_notes: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  application_types?: {
    name: string;
    description: string | null;
  };
}

export const useSubmissions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select(`
          *,
          application_types (
            name,
            description
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Submission[];
    },
    enabled: !!user,
  });

  const updateSubmissionStatus = useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      admin_notes 
    }: { 
      id: string; 
      status: string; 
      admin_notes?: string 
    }) => {
      const updateData: any = { status, reviewed_at: new Date().toISOString() };
      if (admin_notes) updateData.admin_notes = admin_notes;

      const { data: oldSubmission } = await supabase
        .from("submissions")
        .select("status")
        .eq("id", id)
        .single();

      const { data, error } = await supabase
        .from("submissions")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Trigger status update notification
      if (oldSubmission && oldSubmission.status !== status) {
        await supabase.functions.invoke("send-status-update-notification", {
          body: {
            submission_id: id,
            old_status: oldSubmission.status,
            new_status: status,
            admin_notes: admin_notes || null,
          },
        });
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });

  return {
    submissions,
    isLoading,
    error,
    updateSubmissionStatus,
  };
};

export const useSubmissionDetails = (submissionId: string) => {
  const queryClient = useQueryClient();

  const { data: submission, isLoading, error } = useQuery({
    queryKey: ["submission", submissionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select(`
          *,
          application_types (
            name,
            description,
            base_fee,
            processing_days
          )
        `)
        .eq("id", submissionId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!submissionId,
  });

  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["submission-files", submissionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submission_files")
        .select(`
          *,
          document_types (
            name,
            description
          )
        `)
        .eq("submission_id", submissionId)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!submissionId,
  });

  const verifyFile = useMutation({
    mutationFn: async ({ 
      fileId, 
      isVerified 
    }: { 
      fileId: string; 
      isVerified: boolean 
    }) => {
      const { data, error } = await supabase
        .from("submission_files")
        .update({
          is_verified: isVerified,
          verified_at: isVerified ? new Date().toISOString() : null,
          verified_by: isVerified ? (await supabase.auth.getUser()).data.user?.id : null,
        })
        .eq("id", fileId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-files", submissionId] });
    },
  });

  return {
    submission,
    files,
    isLoading: isLoading || filesLoading,
    error,
    verifyFile,
  };
};
