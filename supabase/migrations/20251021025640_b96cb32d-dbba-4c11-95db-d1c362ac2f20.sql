-- Enable Realtime for submissions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;

-- Enable Realtime for submission_files table
ALTER PUBLICATION supabase_realtime ADD TABLE public.submission_files;