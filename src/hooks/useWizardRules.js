import { useEffect, useState } from 'react';
import * as React from 'react';
import { supabase } from '@/integrations/supabase/client';

// DIAGNOSTIC: Log React instance being used
if (typeof window !== 'undefined') {
  console.log('[useWizardRules] React version:', React.version);
  console.log('[useWizardRules] React instance ID:', (window as any).__REACT_DIAG__?.instanceId);
}

// Lightweight local-fetch version to avoid React Query context issues in editor iframe
export const useWizardRules = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('wizard_rules')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        if (error) throw error;
        if (!cancelled) setData(data);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, error, isLoading };
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
