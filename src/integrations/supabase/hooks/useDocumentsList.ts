import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DocumentWithApplications {
  id: string;
  name: string;
  description: string | null;
  is_required: boolean;
  allowed_formats: string[];
  max_file_size_mb: number;
  application_types: string[];
  checklists: {
    application_type: string;
    pdf_url: string;
    title: string;
  }[];
}

export const useDocumentsList = (applicationTypeFilter?: string) => {
  return useQuery({
    queryKey: ['documents-list', applicationTypeFilter],
    queryFn: async () => {
      // Get all document-application mappings with details
      let query = supabase
        .from('application_documents')
        .select(`
          document_type_id,
          application_type_id,
          is_mandatory,
          document_types (
            id,
            name,
            description,
            is_required,
            allowed_formats,
            max_file_size_mb
          ),
          application_types (
            id,
            name
          )
        `)
        .order('display_order');

      // Filter by application type if specified
      if (applicationTypeFilter && applicationTypeFilter !== 'all') {
        const { data: appTypes } = await supabase
          .from('application_types')
          .select('id')
          .ilike('name', `%${applicationTypeFilter}%`);
        
        if (appTypes && appTypes.length > 0) {
          query = query.in('application_type_id', appTypes.map(at => at.id));
        }
      }

      const { data: mappings, error } = await query;
      if (error) throw error;

      // Get checklist PDFs
      const { data: checklists } = await supabase
        .from('checklist_pdfs')
        .select(`
          id,
          application_type_id,
          title,
          filename,
          storage_path,
          application_types (
            id,
            name
          )
        `)
        .eq('is_active', true);

      // Transform data into document-centric structure
      const documentsMap = new Map<string, DocumentWithApplications>();

      mappings?.forEach((mapping: any) => {
        const doc = mapping.document_types;
        const appType = mapping.application_types;
        
        if (!doc || !appType) return;

        if (!documentsMap.has(doc.id)) {
          documentsMap.set(doc.id, {
            id: doc.id,
            name: doc.name,
            description: doc.description,
            is_required: mapping.is_mandatory,
            allowed_formats: doc.allowed_formats || [],
            max_file_size_mb: doc.max_file_size_mb || 5,
            application_types: [],
            checklists: [],
          });
        }

        const docData = documentsMap.get(doc.id)!;
        
        // Add application type if not already present
        if (!docData.application_types.includes(appType.name)) {
          docData.application_types.push(appType.name);
        }

        // Add checklist if available for this application type
        const checklist = checklists?.find(
          (c: any) => c.application_type_id === appType.id
        );
        
        if (checklist && !docData.checklists.find(c => c.application_type === appType.name)) {
          docData.checklists.push({
            application_type: appType.name,
            pdf_url: `/assets/documents${checklist.storage_path}`,
            title: checklist.title,
          });
        }
      });

      return Array.from(documentsMap.values());
    },
  });
};
