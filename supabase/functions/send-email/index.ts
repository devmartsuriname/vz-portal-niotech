import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.0';
import nodemailer from "https://esm.sh/nodemailer@6.9.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from_override?: {
    email: string;
    name: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, text, from_override }: EmailRequest = await req.json();
    
    console.log('[send-email] Processing email request to:', to);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch email settings
    const { data: settings, error: settingsError } = await supabase
      .from('system_settings')
      .select('setting_key, setting_value')
      .eq('category', 'email');

    if (settingsError) {
      console.error('[send-email] Failed to fetch settings:', settingsError);
      throw new Error('Failed to fetch email settings');
    }

    // Convert settings array to object
    const settingsMap: Record<string, any> = {};
    settings?.forEach(setting => {
      settingsMap[setting.setting_key] = setting.setting_value;
    });

    const provider = settingsMap.smtp_provider || 'resend';
    console.log('[send-email] Using provider:', provider);

    // Prepare sender info
    const fromEmail = from_override?.email || settingsMap.smtp_from_email || settingsMap.resend_from_email || 'noreply@vz-juspol.sr';
    const fromName = from_override?.name || settingsMap.smtp_from_name || settingsMap.resend_from_name || 'VZ Juspol Portal';
    const fromAddress = `${fromName} <${fromEmail}>`;

    let emailResult;

    if (provider === 'smtp') {
      console.log('[send-email] Sending via SMTP');
      
      // Validate SMTP settings
      const smtpHost = settingsMap.smtp_host;
      const smtpPort = parseInt(settingsMap.smtp_port) || 587;
      const smtpUsername = settingsMap.smtp_username;
      const smtpPassword = settingsMap.smtp_password;

      if (!smtpHost || !smtpUsername || !smtpPassword) {
        throw new Error('SMTP settings incomplete. Please configure SMTP in admin settings.');
      }

      // Create nodemailer transport
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: settingsMap.smtp_secure !== false, // true for 465, false for other ports
        auth: {
          user: smtpUsername,
          pass: smtpPassword,
        },
      });

      // Send email via SMTP
      emailResult = await transporter.sendMail({
        from: fromAddress,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      });

      console.log('[send-email] SMTP email sent:', emailResult.messageId);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          id: emailResult.messageId,
          provider: 'smtp'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );

    } else {
      // Use Resend API
      console.log('[send-email] Sending via Resend');
      
      const resendApiKey = settingsMap.resend_api_key || Deno.env.get('RESEND_API_KEY');
      
      if (!resendApiKey) {
        throw new Error('Resend API key not configured. Please configure in admin settings.');
      }

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
          text,
        }),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error('[send-email] Resend API error:', resendData);
        throw new Error(resendData.message || 'Failed to send email via Resend');
      }

      console.log('[send-email] Resend email sent:', resendData.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          id: resendData.id,
          provider: 'resend'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error('[send-email] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
