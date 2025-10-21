import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StatusUpdateRequest {
  submission_id: string;
  old_status: string;
  new_status: string;
  admin_notes?: string;
}

const STATUS_LABELS: Record<string, { nl: string; color: string }> = {
  draft: { nl: "Concept", color: "#6b7280" },
  submitted: { nl: "Ingediend", color: "#2563eb" },
  under_review: { nl: "In Behandeling", color: "#f59e0b" },
  approved: { nl: "Goedgekeurd", color: "#10b981" },
  rejected: { nl: "Afgewezen", color: "#ef4444" },
  additional_info_required: { nl: "Aanvullende Informatie Vereist", color: "#8b5cf6" },
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { submission_id, old_status, new_status, admin_notes }: StatusUpdateRequest = await req.json();

    console.log(`Processing status update for submission: ${submission_id}, ${old_status} -> ${new_status}`);

    // Fetch submission details including user email
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select(`
        id,
        user_id,
        submitted_at,
        application_types (name)
      `)
      .eq("id", submission_id)
      .single();

    if (submissionError || !submission) {
      throw new Error("Submission not found");
    }

    // Fetch user email from auth
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(submission.user_id);

    if (userError || !user?.email) {
      throw new Error("User email not found");
    }

    const applicationTypeName = (submission.application_types as any)?.name || "Onbekend";
    const oldStatusLabel = STATUS_LABELS[old_status]?.nl || old_status;
    const newStatusLabel = STATUS_LABELS[new_status]?.nl || new_status;
    const statusColor = STATUS_LABELS[new_status]?.color || "#6b7280";

    // Build email content based on new status
    let emailSubject = "";
    let emailContent = "";

    switch (new_status) {
      case "under_review":
        emailSubject = "Uw aanvraag is in behandeling";
        emailContent = `
          <p>Beste aanvrager,</p>
          <p>Wij hebben uw aanvraag voor <strong>${applicationTypeName}</strong> in behandeling genomen.</p>
          <p>U ontvangt een verdere update zodra de beoordeling is voltooid.</p>
        `;
        break;
      
      case "approved":
        emailSubject = "Uw aanvraag is goedgekeurd ✓";
        emailContent = `
          <p>Beste aanvrager,</p>
          <p>Goed nieuws! Uw aanvraag voor <strong>${applicationTypeName}</strong> is goedgekeurd.</p>
          <p>U kunt uw vergunning ophalen bij ons kantoor tijdens kantooruren.</p>
        `;
        break;
      
      case "rejected":
        emailSubject = "Update over uw aanvraag";
        emailContent = `
          <p>Beste aanvrager,</p>
          <p>Na zorgvuldige beoordeling kunnen wij uw aanvraag voor <strong>${applicationTypeName}</strong> helaas niet goedkeuren.</p>
          ${admin_notes ? `<p><strong>Toelichting:</strong> ${admin_notes}</p>` : ""}
          <p>U kunt contact met ons opnemen voor meer informatie of een nieuwe aanvraag indienen.</p>
        `;
        break;
      
      case "additional_info_required":
        emailSubject = "Aanvullende informatie nodig voor uw aanvraag";
        emailContent = `
          <p>Beste aanvrager,</p>
          <p>Voor de behandeling van uw aanvraag voor <strong>${applicationTypeName}</strong> hebben wij aanvullende informatie nodig.</p>
          ${admin_notes ? `<p><strong>Vereiste informatie:</strong> ${admin_notes}</p>` : ""}
          <p>Log in op het portaal om de gevraagde documenten of informatie te uploaden.</p>
        `;
        break;
      
      default:
        emailSubject = `Status update: ${newStatusLabel}`;
        emailContent = `
          <p>Beste aanvrager,</p>
          <p>De status van uw aanvraag voor <strong>${applicationTypeName}</strong> is gewijzigd.</p>
        `;
    }

    // Send email to user
    const emailResponse = await resend.emails.send({
      from: "VZ Juspol Portal <onboarding@resend.dev>",
      to: [user.email],
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${statusColor};">${emailSubject}</h1>
          ${emailContent}
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Status Wijziging</h3>
            <p><strong>Van:</strong> ${oldStatusLabel}</p>
            <p><strong>Naar:</strong> <span style="color: ${statusColor}; font-weight: bold;">${newStatusLabel}</span></p>
            <p><strong>Referentie:</strong> ${submission_id.substring(0, 8).toUpperCase()}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Met vriendelijke groet,<br>
            Vreemdelingenzaken Juspol<br>
            Ministerie van Justitie en Politie
          </p>
        </div>
      `,
    });

    console.log("Status update email sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        email_id: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-status-update-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
