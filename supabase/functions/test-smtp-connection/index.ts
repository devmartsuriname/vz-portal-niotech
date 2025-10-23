import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "https://esm.sh/nodemailer@6.9.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMTPTestRequest {
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_username: string;
  smtp_password?: string; // Optional - will use vault if not provided
  from_email: string;
  from_name: string;
  test_email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      smtp_host,
      smtp_port,
      smtp_secure,
      smtp_username,
      smtp_password,
      from_email,
      from_name,
      test_email,
    }: SMTPTestRequest = await req.json();

    console.log('[test-smtp] Testing SMTP connection:', {
      host: smtp_host,
      port: smtp_port,
      secure: smtp_secure,
      username: smtp_username,
    });

    // Validate required fields
    if (!smtp_host || !smtp_username || !smtp_password || !test_email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Vul alle verplichte velden in' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create nodemailer transport
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port || 587,
      secure: smtp_secure !== false,
      auth: {
        user: smtp_username,
        pass: smtp_password,
      },
      connectionTimeout: 10000, // 10 seconds
    });

    // Verify connection
    console.log('[test-smtp] Verifying SMTP connection...');
    await transporter.verify();
    console.log('[test-smtp] Connection verified successfully');

    // Send test email
    console.log('[test-smtp] Sending test email to:', test_email);
    const info = await transporter.sendMail({
      from: `${from_name} <${from_email}>`,
      to: test_email,
      subject: 'VZ Juspol Portal - SMTP Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">SMTP Verbinding Getest ✅</h1>
          <p>Dit is een test email van het VZ Juspol Portal admin panel.</p>
          <p>Als je deze email ontvangt, betekent dit dat je SMTP configuratie correct is ingesteld.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            <strong>SMTP Details:</strong><br>
            Host: ${smtp_host}<br>
            Port: ${smtp_port}<br>
            Security: ${smtp_secure ? 'TLS/SSL' : 'None'}<br>
            Username: ${smtp_username}
          </p>
        </div>
      `,
      text: `
VZ Juspol Portal - SMTP Test Email

Dit is een test email van het VZ Juspol Portal admin panel.
Als je deze email ontvangt, betekent dit dat je SMTP configuratie correct is ingesteld.

SMTP Details:
Host: ${smtp_host}
Port: ${smtp_port}
Security: ${smtp_secure ? 'TLS/SSL' : 'None'}
Username: ${smtp_username}
      `.trim(),
    });

    console.log('[test-smtp] Test email sent successfully:', info.messageId);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Test email succesvol verzonden',
        messageId: info.messageId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('[test-smtp] Error:', error);
    
    let errorMessage = 'SMTP test mislukt: ';
    
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      errorMessage += 'Kan geen verbinding maken met SMTP server. Controleer host en port.';
    } else if (error.code === 'EAUTH' || error.responseCode === 535) {
      errorMessage += 'Authenticatie mislukt. Controleer gebruikersnaam en wachtwoord.';
    } else if (error.code === 'ESOCKET') {
      errorMessage += 'SSL/TLS verbinding mislukt. Controleer security instellingen.';
    } else {
      errorMessage += error.message || 'Onbekende fout';
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
