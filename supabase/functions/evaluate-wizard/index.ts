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

    // Build fast lookup map for O(1) access to rules
    const ruleMap = new Map<string, any>();
    for (const r of wizardRules) {
      ruleMap.set(r.question_key, r);
    }

    // Helper to normalize answer values (handles both string and array)
    const normalizeAnswer = (value: string | string[]) =>
      (Array.isArray(value) ? value[0] : value).toString().trim();

    // Determine starting point for traversal (prefer 'application_type', else first answer)
    let currentKey = answers.find(a => a.question_key === 'application_type')
      ? 'application_type'
      : (answers[0]?.question_key ?? null);

    const visited = new Set<string>();
    let currentApplicationTypeId: string | null = null;
    const evaluationPath: string[] = [];

    console.log(`Starting traversal from: ${currentKey}`);

    // Traverse the wizard path step by step following user's answers
    while (currentKey && !visited.has(currentKey)) {
      visited.add(currentKey);
      const rule = ruleMap.get(currentKey);
      
      if (!rule) {
        console.warn(`Rule not found for key: ${currentKey}`);
        break;
      }

      // If current rule itself is terminal (rare but possible)
      if (rule.result_application_type_id) {
        currentApplicationTypeId = rule.result_application_type_id;
        console.log(`✓ Terminal question found while traversing: ${currentKey}`);
        console.log(`  Application Type ID: ${currentApplicationTypeId}`);
        break;
      }

      // Look up user's answer for current question
      const answer = answers.find(a => a.question_key === currentKey);
      if (!answer) {
        console.log(`No answer for ${currentKey}. Stopping traversal.`);
        break;
      }

      // Track evaluation path
      evaluationPath.push(`${currentKey}:${JSON.stringify(answer.answer)}`);

      // Follow next step based on answer value
      let nextKey: string | undefined;
      if (rule.next_question_map && typeof rule.next_question_map === 'object') {
        const answerValue = normalizeAnswer(answer.answer);
        nextKey = (rule.next_question_map as Record<string, any>)[answerValue];
        console.log(`Traversing: ${currentKey} -> (${answerValue}) -> ${nextKey ?? 'end'}`);
      }

      if (!nextKey) {
        console.log(`No next question from ${currentKey}. Stopping traversal.`);
        break;
      }

      // Check if the NEXT rule is terminal (this is the key fix!)
      const nextRule = ruleMap.get(nextKey);
      if (nextRule?.result_application_type_id) {
        currentApplicationTypeId = nextRule.result_application_type_id;
        console.log(`✓ Terminal question reached via traversal: ${nextKey}`);
        console.log(`  Application Type ID: ${currentApplicationTypeId}`);
        break;
      }

      // Move forward in the path
      currentKey = nextKey;
    }

    if (!currentApplicationTypeId) {
      console.warn('No terminal question found via traversal. User may not have completed the wizard.');
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
