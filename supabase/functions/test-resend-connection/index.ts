import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestRequest {
  api_key: string;
  from_email: string;
  from_name: string;
  test_email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { api_key, from_email, from_name, test_email }: TestRequest = await req.json();

    console.log(`Testing Resend connection for email: ${test_email}`);

    if (!api_key || !from_email || !test_email) {
      throw new Error("Missing required fields");
    }

    // Send test email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        from: `${from_name} <${from_email}>`,
        to: [test_email],
        subject: "VZ Juspol Portal - Test Email",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Test Email Succesvol</h1>
            <p>Deze test email bevestigt dat uw Resend API configuratie correct is ingesteld.</p>
            <p>Uw email service is nu operationeel en klaar voor gebruik.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="color: #6b7280; font-size: 14px;">
              Dit is een automatisch gegenereerde test email van het VZ Juspol Portal.<br>
              Ministerie van Justitie en Politie
            </p>
          </div>
        `,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData);
      throw new Error(emailData.message || "Failed to send test email");
    }

    console.log("Test email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test email succesvol verzonden",
        email_id: emailData.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in test-resend-connection:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
