import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ValidationRequest {
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  document_type_id: string;
}

interface ValidationResult {
  is_valid: boolean;
  errors: string[];
  warnings: string[];
}

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg", "image/jpg"],
  jpeg: ["image/jpeg", "image/jpg"],
  png: ["image/png"],
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB global max

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { file_name, file_size_bytes, mime_type, document_type_id }: ValidationRequest = await req.json();

    console.log(`Validating file: ${file_name}, type: ${mime_type}, size: ${file_size_bytes}`);

    const result: ValidationResult = {
      is_valid: true,
      errors: [],
      warnings: [],
    };

    // Fetch document type rules
    const { data: docType, error: docError } = await supabase
      .from("document_types")
      .select("allowed_formats, max_file_size_mb")
      .eq("id", document_type_id)
      .single();

    if (docError || !docType) {
      result.errors.push("Document type niet gevonden");
      result.is_valid = false;
      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate file extension
    const fileExtension = file_name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !docType.allowed_formats.includes(fileExtension)) {
      result.errors.push(
        `Bestandstype .${fileExtension} is niet toegestaan. Toegestane types: ${docType.allowed_formats.join(", ")}`
      );
      result.is_valid = false;
    }

    // Validate MIME type
    const expectedMimeTypes = ALLOWED_MIME_TYPES[fileExtension || ""] || [];
    if (!expectedMimeTypes.includes(mime_type)) {
      result.errors.push(
        `MIME type ${mime_type} komt niet overeen met bestandsextensie .${fileExtension}`
      );
      result.is_valid = false;
    }

    // Validate file size
    const maxSizeBytes = (docType.max_file_size_mb || 5) * 1024 * 1024;
    if (file_size_bytes > maxSizeBytes) {
      result.errors.push(
        `Bestandsgrootte (${(file_size_bytes / 1024 / 1024).toFixed(2)} MB) overschrijdt maximum van ${docType.max_file_size_mb} MB`
      );
      result.is_valid = false;
    }

    // Global size check
    if (file_size_bytes > MAX_FILE_SIZE_BYTES) {
      result.errors.push(
        `Bestandsgrootte overschrijdt globale limiet van ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB`
      );
      result.is_valid = false;
    }

    // Check for suspicious file names
    const suspiciousPatterns = ["..", "\\", "<", ">", "|", ":", "*", "?", '"'];
    if (suspiciousPatterns.some((pattern) => file_name.includes(pattern))) {
      result.errors.push("Bestandsnaam bevat ongeldige karakters");
      result.is_valid = false;
    }

    // Warnings for potentially problematic files
    if (file_size_bytes < 1024) {
      result.warnings.push("Bestand is zeer klein (< 1 KB). Controleer of het bestand compleet is.");
    }

    if (file_name.length > 200) {
      result.warnings.push("Bestandsnaam is erg lang. Overweeg een kortere naam.");
    }

    console.log(`Validation result for ${file_name}:`, result);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in validate-file:", error);
    return new Response(
      JSON.stringify({ 
        is_valid: false,
        errors: ["Er is een fout opgetreden bij het valideren van het bestand"],
        warnings: []
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
