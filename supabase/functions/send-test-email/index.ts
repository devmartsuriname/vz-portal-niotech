import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestEmailRequest {
  templateId: string;
  testEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateId, testEmail }: TestEmailRequest = await req.json();

    if (!templateId || !testEmail) {
      throw new Error("Missing required fields: templateId or testEmail");
    }

    console.log("Sending test email for template:", templateId, "to:", testEmail);

    // Initialize Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch template from database
    const { data: template, error: templateError } = await supabaseClient
      .from("email_templates")
      .select("*")
      .eq("id", templateId)
      .single();

    if (templateError || !template) {
      console.error("Template not found:", templateError);
      throw new Error("Template not found");
    }

    // Replace variables with sample data
    let subject = template.subject;
    let bodyHtml = template.body_html;
    let bodyText = template.body_text || "";

    const sampleData: Record<string, string> = {
      applicant_name: "Jan de Vries",
      application_type: "Verblijfsvergunning Arbeid",
      agenda_number: "VZ-2025-001234",
      submitted_date: new Date().toLocaleDateString("nl-NL"),
      updated_date: new Date().toLocaleDateString("nl-NL"),
      approved_date: new Date().toLocaleDateString("nl-NL"),
      decision_date: new Date().toLocaleDateString("nl-NL"),
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("nl-NL"),
      new_status: "In behandeling",
      notes: "Dit is een test opmerking voor de email preview.",
      rejection_reason: "Ontbrekende documenten voor verificatie.",
      required_documents: "Paspoort kopie, Arbeidscontract, Bewijs van huisvesting",
    };

    // Replace variables in subject and body
    Object.entries(sampleData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      subject = subject.replace(regex, value);
      bodyHtml = bodyHtml.replace(regex, value);
      bodyText = bodyText.replace(regex, value);
    });

    // Handle conditional blocks (simple implementation)
    bodyHtml = bodyHtml.replace(/{{#if [^}]+}}([\s\S]*?){{\/if}}/g, "$1");
    bodyText = bodyText.replace(/{{#if [^}]+}}([\s\S]*?){{\/if}}/g, "$1");

    // Handle each loops (simple implementation for required_documents)
    bodyHtml = bodyHtml.replace(
      /{{#each required_documents}}([\s\S]*?){{\/each}}/g,
      (_match: string, content: string) => {
        const docs = sampleData.required_documents.split(", ");
        return docs.map(doc => content.replace(/{{this}}/g, doc)).join("");
      }
    );
    bodyText = bodyText.replace(
      /{{#each required_documents}}([\s\S]*?){{\/each}}/g,
      (_match: string, content: string) => {
        const docs = sampleData.required_documents.split(", ");
        return docs.map(doc => content.replace(/{{this}}/g, doc)).join("\n");
      }
    );

    // Get sender info from system settings
    const { data: fromEmailSetting } = await supabaseClient
      .from("system_settings")
      .select("setting_value")
      .eq("setting_key", "resend_from_email")
      .single();

    const { data: fromNameSetting } = await supabaseClient
      .from("system_settings")
      .select("setting_value")
      .eq("setting_key", "resend_from_name")
      .single();

    const fromEmail = fromEmailSetting?.setting_value 
      ? String(fromEmailSetting.setting_value).replace(/"/g, "")
      : "onboarding@resend.dev";
    
    const fromName = fromNameSetting?.setting_value 
      ? String(fromNameSetting.setting_value).replace(/"/g, "")
      : "Vreemdelingenzaken";

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [testEmail],
        subject: `[TEST] ${subject}`,
        html: bodyHtml,
        text: bodyText || undefined,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await resendResponse.json();
    console.log("Test email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test email sent successfully",
        emailId: emailResponse.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-test-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to send test email. Please check your Resend API configuration."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
