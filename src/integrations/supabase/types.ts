export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_type: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          ends_at: string | null
          id: string
          is_active: boolean | null
          starts_at: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          starts_at?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          starts_at?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_type_id: string
          created_at: string | null
          display_order: number | null
          document_type_id: string
          id: string
          is_mandatory: boolean | null
        }
        Insert: {
          application_type_id: string
          created_at?: string | null
          display_order?: number | null
          document_type_id: string
          id?: string
          is_mandatory?: boolean | null
        }
        Update: {
          application_type_id?: string
          created_at?: string | null
          display_order?: number | null
          document_type_id?: string
          id?: string
          is_mandatory?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_type_id_fkey"
            columns: ["application_type_id"]
            isOneToOne: false
            referencedRelation: "application_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
        ]
      }
      application_types: {
        Row: {
          base_fee: number | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          processing_days: number | null
          updated_at: string | null
        }
        Insert: {
          base_fee?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          processing_days?: number | null
          updated_at?: string | null
        }
        Update: {
          base_fee?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          processing_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      document_types: {
        Row: {
          allowed_formats: string[] | null
          created_at: string | null
          description: string | null
          id: string
          is_required: boolean | null
          max_file_size_mb: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          allowed_formats?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_required?: boolean | null
          max_file_size_mb?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          allowed_formats?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_required?: boolean | null
          max_file_size_mb?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body_html: string
          body_text: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_key: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          body_html: string
          body_text?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_key: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          body_html?: string
          body_text?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_key?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          category: string | null
          created_at: string | null
          created_by: string
          display_order: number | null
          id: string
          is_published: boolean | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string | null
          created_by: string
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string | null
          created_by?: string
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          question?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      issued_permits: {
        Row: {
          agenda_number: string
          code: string
          created_at: string | null
          expires_at: string | null
          given_names: string
          id: string
          issued_date: string | null
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agenda_number: string
          code: string
          created_at?: string | null
          expires_at?: string | null
          given_names: string
          id?: string
          issued_date?: string | null
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agenda_number?: string
          code?: string
          created_at?: string | null
          expires_at?: string | null
          given_names?: string
          id?: string
          issued_date?: string | null
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          read_at?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string
          id: string
          is_published: boolean | null
          meta_description: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_filters: {
        Row: {
          created_at: string | null
          entity_type: string
          filter_config: Json
          id: string
          is_default: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          entity_type: string
          filter_config: Json
          id?: string
          is_default?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          entity_type?: string
          filter_config?: Json
          id?: string
          is_default?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      submission_files: {
        Row: {
          document_type_id: string
          file_name: string
          file_path: string
          file_size_bytes: number
          id: string
          is_verified: boolean | null
          mime_type: string
          submission_id: string
          uploaded_at: string | null
          uploaded_by: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          document_type_id: string
          file_name: string
          file_path: string
          file_size_bytes: number
          id?: string
          is_verified?: boolean | null
          mime_type: string
          submission_id: string
          uploaded_at?: string | null
          uploaded_by: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          document_type_id?: string
          file_name?: string
          file_path?: string
          file_size_bytes?: number
          id?: string
          is_verified?: boolean | null
          mime_type?: string
          submission_id?: string
          uploaded_at?: string | null
          uploaded_by?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submission_files_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_files_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          admin_notes: string | null
          applicant_data: Json | null
          application_type_id: string
          created_at: string | null
          id: string
          reviewed_at: string | null
          status: string
          submitted_at: string | null
          updated_at: string | null
          user_id: string
          wizard_answers: Json | null
        }
        Insert: {
          admin_notes?: string | null
          applicant_data?: Json | null
          application_type_id: string
          created_at?: string | null
          id?: string
          reviewed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
          wizard_answers?: Json | null
        }
        Update: {
          admin_notes?: string | null
          applicant_data?: Json | null
          application_type_id?: string
          created_at?: string | null
          id?: string
          reviewed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
          wizard_answers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_application_type_id_fkey"
            columns: ["application_type_id"]
            isOneToOne: false
            referencedRelation: "application_types"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wizard_rules: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          next_question_map: Json | null
          options: Json | null
          question_key: string
          question_text: string
          question_type: string
          result_application_type_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          next_question_map?: Json | null
          options?: Json | null
          question_key: string
          question_text: string
          question_type: string
          result_application_type_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          next_question_map?: Json | null
          options?: Json | null
          question_key?: string
          question_text?: string
          question_type?: string
          result_application_type_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wizard_rules_result_application_type_id_fkey"
            columns: ["result_application_type_id"]
            isOneToOne: false
            referencedRelation: "application_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
