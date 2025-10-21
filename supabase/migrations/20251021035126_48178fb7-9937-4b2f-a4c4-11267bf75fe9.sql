-- =====================================================
-- Seed Wizard Rules - Complete Decision Tree
-- 30 Questions covering all 6 application paths
-- =====================================================

-- Get application type IDs for result mapping
DO $$
DECLARE
  v_residence_surinamer UUID;
  v_residence_other UUID;
  v_naturalization UUID;
  v_declaration_inheritance UUID;
  v_declaration_unmarried UUID;
  v_declaration_other UUID;
  v_duplicate UUID;
  v_conversion UUID;
  v_asylum UUID;
BEGIN
  -- Fetch application type IDs
  SELECT id INTO v_residence_surinamer FROM public.application_types WHERE name = 'Verblijfsvergunning - Surinaamse Origine';
  SELECT id INTO v_residence_other FROM public.application_types WHERE name = 'Verblijfsvergunning - Andere Nationaliteit';
  SELECT id INTO v_naturalization FROM public.application_types WHERE name = 'Naturalisatie';
  SELECT id INTO v_declaration_inheritance FROM public.application_types WHERE name = 'Verklaring - Erfenis';
  SELECT id INTO v_declaration_unmarried FROM public.application_types WHERE name = 'Verklaring - Ongehuwd';
  SELECT id INTO v_declaration_other FROM public.application_types WHERE name = 'Verklaring - Overige';
  SELECT id INTO v_duplicate FROM public.application_types WHERE name = 'Duplicaat Document';
  SELECT id INTO v_conversion FROM public.application_types WHERE name = 'Conversie Vergunning';
  SELECT id INTO v_asylum FROM public.application_types WHERE name = 'Asielaanvraag';

  -- =====================================================
  -- ROOT QUESTION
  -- =====================================================
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'application_type',
    'Wat wilt u aanvragen?',
    'single-choice',
    '["Verblijfsvergunning", "Naturalisatie", "Verklaring", "Duplicaat", "Conversie", "Asiel"]'::jsonb,
    '{"Verblijfsvergunning": "residence_origin", "Naturalisatie": "naturalization_years", "Verklaring": "declaration_type", "Duplicaat": "duplicate_reason", "Conversie": "conversion_current", "Asiel": "asylum_origin"}'::jsonb,
    1,
    true
  );

  -- =====================================================
  -- RESIDENCE PERMIT BRANCH (8 questions)
  -- =====================================================
  
  -- Q2: Origin
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_origin',
    'Wat is uw nationaliteit?',
    'single-choice',
    '["Surinaamse Origine", "Andere Nationaliteit"]'::jsonb,
    '{"Surinaamse Origine": "residence_current_status", "Andere Nationaliteit": "residence_current_status"}'::jsonb,
    2,
    true
  );

  -- Q3: Current Status
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_current_status',
    'Wat is uw huidige verblijfsstatus?',
    'single-choice',
    '["Toerist", "Student", "Werknemer", "Gezinshereniging", "Geen Status"]'::jsonb,
    '{"Toerist": "residence_duration", "Student": "residence_duration", "Werknemer": "residence_duration", "Gezinshereniging": "residence_duration", "Geen Status": "residence_duration"}'::jsonb,
    3,
    true
  );

  -- Q4: Duration of Stay
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_duration',
    'Hoe lang bent u al in Suriname?',
    'single-choice',
    '["Minder dan 6 maanden", "6-12 maanden", "1-3 jaar", "Meer dan 3 jaar"]'::jsonb,
    '{"Minder dan 6 maanden": "residence_family", "6-12 maanden": "residence_family", "1-3 jaar": "residence_family", "Meer dan 3 jaar": "residence_family"}'::jsonb,
    4,
    true
  );

  -- Q5: Family Composition
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_family',
    'Heeft u familie in Suriname?',
    'single-choice',
    '["Ja, directe familie", "Ja, indirecte familie", "Nee"]'::jsonb,
    '{"Ja, directe familie": "residence_marital_status", "Ja, indirecte familie": "residence_marital_status", "Nee": "residence_marital_status"}'::jsonb,
    5,
    true
  );

  -- Q6: Marital Status
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_marital_status',
    'Wat is uw burgerlijke staat?',
    'single-choice',
    '["Ongehuwd", "Gehuwd", "Gescheiden", "Weduwe/Weduwnaar"]'::jsonb,
    '{"Ongehuwd": "residence_employment", "Gehuwd": "residence_employment", "Gescheiden": "residence_employment", "Weduwe/Weduwnaar": "residence_employment"}'::jsonb,
    6,
    true
  );

  -- Q7: Employment Status
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_employment',
    'Heeft u een baan in Suriname?',
    'single-choice',
    '["Ja, vast contract", "Ja, tijdelijk contract", "Nee, werkzoekend", "Nee, student", "Nee, gepensioneerd"]'::jsonb,
    '{"Ja, vast contract": "residence_num_people", "Ja, tijdelijk contract": "residence_num_people", "Nee, werkzoekend": "residence_num_people", "Nee, student": "residence_num_people", "Nee, gepensioneerd": "residence_num_people"}'::jsonb,
    7,
    true
  );

  -- Q8: Number of People (determines document scaling)
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'residence_num_people',
    'Voor hoeveel personen vraagt u de vergunning aan?',
    'single-choice',
    '["1 persoon", "2 personen", "3 personen", "4+ personen"]'::jsonb,
    '{"1 persoon": "residence_result", "2 personen": "residence_result", "3 personen": "residence_result", "4+ personen": "residence_result"}'::jsonb,
    8,
    true
  );

  -- Q9: TERMINAL - Residence Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'residence_result',
    'Uw aanvraag voor een verblijfsvergunning wordt verwerkt.',
    'single-choice',
    CASE 
      WHEN EXISTS (SELECT 1 FROM public.wizard_rules WHERE question_key = 'residence_origin' AND options @> '["Surinaamse Origine"]') 
      THEN v_residence_surinamer 
      ELSE v_residence_other 
    END,
    9,
    true
  );

  -- =====================================================
  -- NATURALIZATION BRANCH (6 questions)
  -- =====================================================

  -- Q10: Years in Suriname
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'naturalization_years',
    'Hoe lang woont u al in Suriname?',
    'single-choice',
    '["Minder dan 3 jaar", "3-5 jaar", "5-10 jaar", "Meer dan 10 jaar"]'::jsonb,
    '{"Minder dan 3 jaar": "naturalization_language", "3-5 jaar": "naturalization_language", "5-10 jaar": "naturalization_language", "Meer dan 10 jaar": "naturalization_language"}'::jsonb,
    10,
    true
  );

  -- Q11: Language Proficiency
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'naturalization_language',
    'Spreekt u Nederlands?',
    'single-choice',
    '["Ja, vloeiend", "Ja, basis niveau", "Nee, maar leer het", "Nee"]'::jsonb,
    '{"Ja, vloeiend": "naturalization_integration", "Ja, basis niveau": "naturalization_integration", "Nee, maar leer het": "naturalization_integration", "Nee": "naturalization_integration"}'::jsonb,
    11,
    true
  );

  -- Q12: Integration Status
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'naturalization_integration',
    'Heeft u een inburgeringscursus gevolgd?',
    'single-choice',
    '["Ja, afgerond", "Bezig", "Nee, nog niet begonnen"]'::jsonb,
    '{"Ja, afgerond": "naturalization_criminal_record", "Bezig": "naturalization_criminal_record", "Nee, nog niet begonnen": "naturalization_criminal_record"}'::jsonb,
    12,
    true
  );

  -- Q13: Criminal Record
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'naturalization_criminal_record',
    'Heeft u een strafblad?',
    'single-choice',
    '["Nee", "Ja, minor overtredingen", "Ja, ernstige overtredingen"]'::jsonb,
    '{"Nee": "naturalization_marital_status", "Ja, minor overtredingen": "naturalization_marital_status", "Ja, ernstige overtredingen": "naturalization_marital_status"}'::jsonb,
    13,
    true
  );

  -- Q14: Marital Status
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'naturalization_marital_status',
    'Bent u gehuwd met een Surinaams staatsburger?',
    'single-choice',
    '["Ja", "Nee"]'::jsonb,
    '{"Ja": "naturalization_result", "Nee": "naturalization_result"}'::jsonb,
    14,
    true
  );

  -- Q15: TERMINAL - Naturalization Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'naturalization_result',
    'Uw naturalisatieaanvraag wordt verwerkt.',
    'single-choice',
    v_naturalization,
    15,
    true
  );

  -- =====================================================
  -- DECLARATION BRANCH (4 questions)
  -- =====================================================

  -- Q16: Declaration Type
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'declaration_type',
    'Welk type verklaring heeft u nodig?',
    'single-choice',
    '["Erfenis", "Ongehuwd Status", "Goed Gedrag", "Verblijf", "Overig"]'::jsonb,
    '{"Erfenis": "declaration_urgency", "Ongehuwd Status": "declaration_urgency", "Goed Gedrag": "declaration_urgency", "Verblijf": "declaration_urgency", "Overig": "declaration_urgency"}'::jsonb,
    16,
    true
  );

  -- Q17: Urgency
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'declaration_urgency',
    'Wanneer heeft u de verklaring nodig?',
    'single-choice',
    '["Binnen 1 week (spoed)", "Binnen 2 weken", "Binnen 1 maand", "Geen haast"]'::jsonb,
    '{"Binnen 1 week (spoed)": "declaration_apostille", "Binnen 2 weken": "declaration_apostille", "Binnen 1 maand": "declaration_apostille", "Geen haast": "declaration_apostille"}'::jsonb,
    17,
    true
  );

  -- Q18: Apostille Required
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'declaration_apostille',
    'Heeft u een apostille nodig?',
    'single-choice',
    '["Ja", "Nee", "Weet niet"]'::jsonb,
    '{"Ja": "declaration_result", "Nee": "declaration_result", "Weet niet": "declaration_result"}'::jsonb,
    18,
    true
  );

  -- Q19: TERMINAL - Declaration Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'declaration_result',
    'Uw verklaringsaanvraag wordt verwerkt.',
    'single-choice',
    v_declaration_other,
    19,
    true
  );

  -- =====================================================
  -- DUPLICATE BRANCH (3 questions)
  -- =====================================================

  -- Q20: Reason for Duplicate
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'duplicate_reason',
    'Waarom heeft u een duplicaat nodig?',
    'single-choice',
    '["Verloren", "Gestolen", "Beschadigd", "Verouderd"]'::jsonb,
    '{"Verloren": "duplicate_police_report", "Gestolen": "duplicate_police_report", "Beschadigd": "duplicate_urgency", "Verouderd": "duplicate_urgency"}'::jsonb,
    20,
    true
  );

  -- Q21: Police Report (conditional)
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'duplicate_police_report',
    'Heeft u aangifte gedaan bij de politie?',
    'single-choice',
    '["Ja, heb politierapport", "Nee, nog niet", "Niet nodig"]'::jsonb,
    '{"Ja, heb politierapport": "duplicate_urgency", "Nee, nog niet": "duplicate_urgency", "Niet nodig": "duplicate_urgency"}'::jsonb,
    21,
    true
  );

  -- Q22: Urgency
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'duplicate_urgency',
    'Wanneer heeft u het duplicaat nodig?',
    'single-choice',
    '["Binnen 3 dagen (spoed)", "Binnen 1 week", "Binnen 2 weken"]'::jsonb,
    '{"Binnen 3 dagen (spoed)": "duplicate_result", "Binnen 1 week": "duplicate_result", "Binnen 2 weken": "duplicate_result"}'::jsonb,
    22,
    true
  );

  -- Q23: TERMINAL - Duplicate Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'duplicate_result',
    'Uw duplicaataanvraag wordt verwerkt.',
    'single-choice',
    v_duplicate,
    23,
    true
  );

  -- =====================================================
  -- CONVERSION BRANCH (3 questions)
  -- =====================================================

  -- Q24: Current Permit Type
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'conversion_current',
    'Welk type vergunning heeft u nu?',
    'single-choice',
    '["Toerist", "Student", "Werk", "Gezinshereniging"]'::jsonb,
    '{"Toerist": "conversion_desired", "Student": "conversion_desired", "Werk": "conversion_desired", "Gezinshereniging": "conversion_desired"}'::jsonb,
    24,
    true
  );

  -- Q25: Desired Permit Type
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'conversion_desired',
    'Naar welk type vergunning wilt u converteren?',
    'single-choice',
    '["Permanente verblijfsvergunning", "Werkvergunning", "Studievisum", "Gezinshereniging"]'::jsonb,
    '{"Permanente verblijfsvergunning": "conversion_reason", "Werkvergunning": "conversion_reason", "Studievisum": "conversion_reason", "Gezinshereniging": "conversion_reason"}'::jsonb,
    25,
    true
  );

  -- Q26: Reason for Conversion
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'conversion_reason',
    'Wat is de reden voor conversie?',
    'single-choice',
    '["Nieuw werk", "Huwelijk", "Studie", "Familiehereniging", "Overig"]'::jsonb,
    '{"Nieuw werk": "conversion_result", "Huwelijk": "conversion_result", "Studie": "conversion_result", "Familiehereniging": "conversion_result", "Overig": "conversion_result"}'::jsonb,
    26,
    true
  );

  -- Q27: TERMINAL - Conversion Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'conversion_result',
    'Uw conversieaanvraag wordt verwerkt.',
    'single-choice',
    v_conversion,
    27,
    true
  );

  -- =====================================================
  -- ASYLUM BRANCH (4 questions)
  -- =====================================================

  -- Q28: Country of Origin
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'asylum_origin',
    'Uit welk land komt u?',
    'single-choice',
    '["Venezuela", "Guyana", "Brazilië", "Haiti", "Cuba", "Overig"]'::jsonb,
    '{"Venezuela": "asylum_reason", "Guyana": "asylum_reason", "Brazilië": "asylum_reason", "Haiti": "asylum_reason", "Cuba": "asylum_reason", "Overig": "asylum_reason"}'::jsonb,
    28,
    true
  );

  -- Q29: Reason for Asylum
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'asylum_reason',
    'Wat is de reden voor uw asielaanvraag?',
    'single-choice',
    '["Politieke vervolging", "Oorlog/Conflict", "Religieuze vervolging", "Etnische vervolging", "Levensbedreigende situatie"]'::jsonb,
    '{"Politieke vervolging": "asylum_family", "Oorlog/Conflict": "asylum_family", "Religieuze vervolging": "asylum_family", "Etnische vervolging": "asylum_family", "Levensbedreigende situatie": "asylum_family"}'::jsonb,
    29,
    true
  );

  -- Q30: Family Members
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, options, next_question_map, display_order, is_active)
  VALUES (
    'asylum_family',
    'Heeft u familieleden bij u?',
    'single-choice',
    '["Ja, partner", "Ja, kinderen", "Ja, partner en kinderen", "Nee, alleen"]'::jsonb,
    '{"Ja, partner": "asylum_result", "Ja, kinderen": "asylum_result", "Ja, partner en kinderen": "asylum_result", "Nee, alleen": "asylum_result"}'::jsonb,
    30,
    true
  );

  -- Q31: TERMINAL - Asylum Result
  INSERT INTO public.wizard_rules (question_key, question_text, question_type, result_application_type_id, display_order, is_active)
  VALUES (
    'asylum_result',
    'Uw asielaanvraag wordt verwerkt. U wordt zo spoedig mogelijk gecontacteerd.',
    'single-choice',
    v_asylum,
    31,
    true
  );

END $$;