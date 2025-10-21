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

interface NotificationRequest {
  submission_id: string;
  user_email: string;
  application_type_name: string;
  submission_date: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { submission_id, user_email, application_type_name, submission_date }: NotificationRequest = await req.json();

    console.log(`Processing notification for submission: ${submission_id}`);

    // Send email to user
    const userEmailResponse = await resend.emails.send({
      from: "VZ Juspol Portal <onboarding@resend.dev>",
      to: [user_email],
      subject: "Aanvraag Ontvangen - VZ Juspol Portal",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Aanvraag Succesvol Ontvangen</h1>
          <p>Beste aanvrager,</p>
          <p>Wij hebben uw aanvraag succesvol ontvangen en in behandeling genomen.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Aanvraag Details</h3>
            <p><strong>Type:</strong> ${application_type_name}</p>
            <p><strong>Ingediend op:</strong> ${new Date(submission_date).toLocaleDateString('nl-NL')}</p>
            <p><strong>Referentie:</strong> ${submission_id.substring(0, 8).toUpperCase()}</p>
          </div>
          <p>U ontvangt binnenkort een update over de status van uw aanvraag.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Met vriendelijke groet,<br>
            Vreemdelingenzaken Juspol<br>
            Ministerie van Justitie en Politie
          </p>
        </div>
      `,
    });

    console.log("User email sent:", userEmailResponse);

    // Send notification to admin team
    const adminEmailResponse = await resend.emails.send({
      from: "VZ Juspol Portal <onboarding@resend.dev>",
      to: ["admin@juspol.sr"],
      subject: `Nieuwe Aanvraag: ${application_type_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Nieuwe Aanvraag Ontvangen</h1>
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #991b1b;">Aanvraag Details</h3>
            <p><strong>Type:</strong> ${application_type_name}</p>
            <p><strong>Ingediend op:</strong> ${new Date(submission_date).toLocaleDateString('nl-NL')}</p>
            <p><strong>Aanvrager:</strong> ${user_email}</p>
            <p><strong>Submission ID:</strong> ${submission_id}</p>
          </div>
          <p>Log in op het admin portaal om deze aanvraag te beoordelen.</p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        user_email_id: userEmailResponse.data?.id,
        admin_email_id: adminEmailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-submission-notification:", error);
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
