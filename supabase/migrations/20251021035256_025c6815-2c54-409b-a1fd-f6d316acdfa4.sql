-- Fix terminal wizard questions to map to correct application types
DO $$
DECLARE
  v_residence_regulier UUID;
  v_naturalization UUID;
  v_declaration UUID;
  v_duplicate_residence UUID;
  v_conversion UUID;
  v_asylum UUID;
BEGIN
  -- Get correct application type IDs
  SELECT id INTO v_residence_regulier FROM public.application_types WHERE name = 'Verblijfsvergunning - Regulier';
  SELECT id INTO v_naturalization FROM public.application_types WHERE name = 'Naturalisatie - Surinaamse Origine (Art. 4)';
  SELECT id INTO v_declaration FROM public.application_types WHERE name = 'Verklaring - Ingezetenschap (Art. 21)';
  SELECT id INTO v_duplicate_residence FROM public.application_types WHERE name = 'Duplicaat - Verblijfsvergunning';
  SELECT id INTO v_conversion FROM public.application_types WHERE name = 'Conversie - Tijdelijk naar Permanent';
  SELECT id INTO v_asylum FROM public.application_types WHERE name = 'Asiel - Vluchtelingenstatus';

  -- Update terminal questions with correct result_application_type_id
  UPDATE public.wizard_rules SET result_application_type_id = v_residence_regulier WHERE question_key = 'residence_result';
  UPDATE public.wizard_rules SET result_application_type_id = v_naturalization WHERE question_key = 'naturalization_result';
  UPDATE public.wizard_rules SET result_application_type_id = v_declaration WHERE question_key = 'declaration_result';
  UPDATE public.wizard_rules SET result_application_type_id = v_duplicate_residence WHERE question_key = 'duplicate_result';
  UPDATE public.wizard_rules SET result_application_type_id = v_conversion WHERE question_key = 'conversion_result';
  UPDATE public.wizard_rules SET result_application_type_id = v_asylum WHERE question_key = 'asylum_result';

END $$;