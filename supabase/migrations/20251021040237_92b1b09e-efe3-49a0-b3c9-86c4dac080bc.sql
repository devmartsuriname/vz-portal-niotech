-- First, drop the existing check constraint
ALTER TABLE wizard_rules DROP CONSTRAINT wizard_rules_question_type_check;

-- Add new check constraint that includes 'confirmation' type
ALTER TABLE wizard_rules ADD CONSTRAINT wizard_rules_question_type_check 
CHECK (question_type = ANY (ARRAY['single-choice'::text, 'multiple-choice'::text, 'text'::text, 'number'::text, 'date'::text, 'confirmation'::text]));

-- Now update terminal questions to use 'confirmation' type
UPDATE wizard_rules 
SET question_type = 'confirmation'
WHERE question_key IN (
  'residence_result',
  'naturalization_result', 
  'declaration_result',
  'duplicate_result',
  'conversion_result',
  'asylum_result'
);