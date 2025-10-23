import * as React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// DIAGNOSTIC: Ensure consistent React instance in editor iframe
if (typeof window !== 'undefined') {
  console.log('[useWizardSubmission] React version:', React.version);
  console.log('[useWizardSubmission] React instances:', window.__REACT_INSTANCES__?.length, 'active:', window.__REACT_DIAG__?.instanceId);
}

export const useWizardSubmission = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionId, setSubmissionId] = React.useState(null);

  const evaluateWizard = async (answers) => {
    try {
      const { data, error } = await supabase.functions.invoke('evaluate-wizard', {
        body: { answers: Object.entries(answers).map(([question_key, answer]) => ({ question_key, answer })) }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error evaluating wizard:', error);
      toast.error('Fout bij het evalueren van uw antwoorden');
      throw error;
    }
  };

  const uploadFiles = async (files, submissionId) => {
    const uploadedFiles = [];
    
    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${submissionId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('submission-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Create file record in submission_files table
        const { data: fileRecord, error: fileError } = await supabase
          .from('submission_files')
          .insert({
            submission_id: submissionId,
            document_type_id: file.documentTypeId,
            file_name: file.name,
            file_path: uploadData.path,
            file_size_bytes: file.size,
            mime_type: file.type,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id
          })
          .select()
          .single();

        if (fileError) throw fileError;
        uploadedFiles.push(fileRecord);
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        throw error;
      }
    }

    return uploadedFiles;
  };

  const submitApplication = async (wizardData) => {
    setIsSubmitting(true);
    try {
      const { answers, personalInfo, files } = wizardData;

      // Step 1: Evaluate wizard to get application type
      const evaluation = await evaluateWizard(answers);
      
      if (!evaluation.application_type_id) {
        throw new Error('Kon het aanvraagtype niet bepalen');
      }

      // Step 2: Get or create user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // User needs to sign up
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: personalInfo.email,
          password: Math.random().toString(36).slice(-8), // Temporary password
          options: {
            data: {
              full_name: personalInfo.name,
              date_of_birth: personalInfo.dateOfBirth
            }
          }
        });

        if (authError) throw authError;
      }

      // Step 3: Create submission record
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          user_id: user?.id || (await supabase.auth.getUser()).data.user?.id,
          application_type_id: evaluation.application_type_id,
          wizard_answers: answers,
          applicant_data: personalInfo,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (submissionError) throw submissionError;
      setSubmissionId(submission.id);

      // Step 4: Upload files
      if (files && files.length > 0) {
        await uploadFiles(files, submission.id);
      }

      // Step 5: Send notification
      try {
        await supabase.functions.invoke('send-submission-notification', {
          body: { submission_id: submission.id }
        });
      } catch (notifError) {
        console.error('Failed to send notification:', notifError);
        // Don't throw - submission was successful even if notification failed
      }

      toast.success('Aanvraag succesvol ingediend!');
      return submission;
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Fout bij het indienen van de aanvraag');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitApplication,
    evaluateWizard,
    isSubmitting,
    submissionId
  };
};
