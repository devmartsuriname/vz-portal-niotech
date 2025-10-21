import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useWizardRules = () => {
  return useQuery({
    queryKey: ['wizard-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wizard_rules')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

export const getNextQuestionKey = (currentRule, selectedAnswer) => {
  if (!currentRule) return null;
  
  // If this question has a result_application_type_id, it's a terminal question
  if (currentRule.result_application_type_id) {
    return null;
  }

  // Check next_question_map for navigation logic
  if (currentRule.next_question_map && typeof currentRule.next_question_map === 'object') {
    return currentRule.next_question_map[selectedAnswer] || null;
  }

  return null;
};

export const getRuleByQuestionKey = (rules, questionKey) => {
  if (!rules || !questionKey) return null;
  return rules.find(rule => rule.question_key === questionKey);
};
