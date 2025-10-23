import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WizardAnswer {
  question_key: string;
  answer: string | string[];
}

interface EvaluationResult {
  application_type_id: string | null;
  application_type_name: string | null;
  required_documents: Array<{
    document_type_id: string;
    document_type_name: string;
    is_mandatory: boolean;
    display_order: number;
  }>;
  evaluation_path: string[];
  confidence: "high" | "medium" | "low";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { answers }: { answers: WizardAnswer[] } = await req.json();

    console.log("Evaluating wizard answers:", JSON.stringify(answers, null, 2));

    // Fetch all active wizard rules ordered by display_order
    const { data: wizardRules, error: rulesError } = await supabase
      .from("wizard_rules")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (rulesError || !wizardRules) {
      throw new Error("Failed to fetch wizard rules");
    }

    console.log(`Loaded ${wizardRules.length} wizard rules`);

    // Build evaluation path
    const evaluationPath: string[] = [];
    let currentApplicationTypeId: string | null = null;
    let foundTerminalQuestion = false;

    // Process answers sequentially based on wizard logic
    for (const rule of wizardRules) {
      const answer = answers.find((a) => a.question_key === rule.question_key);
      
      if (!answer) {
        continue;
      }

      evaluationPath.push(`${rule.question_key}:${JSON.stringify(answer.answer)}`);

      // Check if this rule determines the application type (terminal question)
      if (rule.result_application_type_id) {
        currentApplicationTypeId = rule.result_application_type_id;
        foundTerminalQuestion = true;
        console.log(`✓ Terminal question found: ${rule.question_key}`);
        console.log(`  Application Type ID: ${currentApplicationTypeId}`);
        console.log(`  Answer provided: ${JSON.stringify(answer.answer)}`);
        // Once we find the terminal question with result, we have our application type
        break;
      }

      // Check next_question_map for conditional navigation
      if (rule.next_question_map && typeof rule.next_question_map === "object") {
        const answerValue = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        const nextQuestionKey = (rule.next_question_map as Record<string, any>)[answerValue];
        
        if (nextQuestionKey) {
          console.log(`Next question mapped: ${nextQuestionKey}`);
          
          // Check if the NEXT question is a terminal question (confirmation type)
          const nextRule = wizardRules.find(r => r.question_key === nextQuestionKey);
          if (nextRule?.result_application_type_id) {
            currentApplicationTypeId = nextRule.result_application_type_id;
            foundTerminalQuestion = true;
            console.log(`✓ Terminal question reached via navigation: ${nextQuestionKey}`);
            console.log(`  Application Type ID: ${currentApplicationTypeId}`);
            // Break since we've found the application type through navigation
            break;
          }
        }
      }
    }

    if (!foundTerminalQuestion) {
      console.warn('No terminal question found in answers. User may not have completed the wizard.');
    }

    // Fetch application type details
    let applicationTypeName: string | null = null;
    if (currentApplicationTypeId) {
      const { data: appType } = await supabase
        .from("application_types")
        .select("name")
        .eq("id", currentApplicationTypeId)
        .single();
      
      applicationTypeName = appType?.name || null;
    }

    // Fetch required documents for this application type
    const requiredDocuments: EvaluationResult["required_documents"] = [];

    if (currentApplicationTypeId) {
      const { data: appDocs, error: docsError } = await supabase
        .from("application_documents")
        .select(`
          document_type_id,
          is_mandatory,
          display_order,
          document_types (
            name
          )
        `)
        .eq("application_type_id", currentApplicationTypeId)
        .order("display_order", { ascending: true });

      if (!docsError && appDocs) {
        for (const doc of appDocs) {
          requiredDocuments.push({
            document_type_id: doc.document_type_id,
            document_type_name: (doc.document_types as any)?.name || "Unknown",
            is_mandatory: doc.is_mandatory,
            display_order: doc.display_order,
          });
        }
      }
    }

    // Determine confidence level
    let confidence: "high" | "medium" | "low" = "low";
    if (currentApplicationTypeId && answers.length >= 3) {
      confidence = "high";
    } else if (currentApplicationTypeId) {
      confidence = "medium";
    }

    const result: EvaluationResult = {
      application_type_id: currentApplicationTypeId,
      application_type_name: applicationTypeName,
      required_documents: requiredDocuments,
      evaluation_path: evaluationPath,
      confidence: confidence,
    };

    console.log("Evaluation result:", JSON.stringify(result, null, 2));

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in evaluate-wizard:", error);
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
