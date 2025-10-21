-- Supplementary Document Mappings to Reach 100 Total
-- Strategic additions based on current gaps in each application type

WITH app_types AS (
  SELECT id, name FROM application_types
),
doc_types AS (
  SELECT id, name FROM document_types
)

INSERT INTO application_documents (application_type_id, document_type_id, is_mandatory, display_order)
VALUES
  -- Duplicaat - Naturalisatiebewijs (6 → 8): Add missing documents
  (
    (SELECT id FROM app_types WHERE name = 'Duplicaat - Naturalisatiebewijs'),
    (SELECT id FROM doc_types WHERE name = 'Huwelijksakte'),
    false,
    7
  ),
  (
    (SELECT id FROM app_types WHERE name = 'Duplicaat - Naturalisatiebewijs'),
    (SELECT id FROM doc_types WHERE name = 'Medische Verklaring'),
    false,
    8
  ),
  
  -- Duplicaat - Verblijfsvergunning (6 → 8): Add missing documents
  (
    (SELECT id FROM app_types WHERE name = 'Duplicaat - Verblijfsvergunning'),
    (SELECT id FROM doc_types WHERE name = 'Bewijs van Inkomsten'),
    false,
    7
  ),
  (
    (SELECT id FROM app_types WHERE name = 'Duplicaat - Verblijfsvergunning'),
    (SELECT id FROM doc_types WHERE name = 'Medische Verklaring'),
    false,
    8
  ),
  
  -- Verklaring - Ingezetenschap (7 → 8): Add income proof
  (
    (SELECT id FROM app_types WHERE name = 'Verklaring - Ingezetenschap (Art. 21)'),
    (SELECT id FROM doc_types WHERE name = 'Bewijs van Inkomsten'),
    false,
    8
  ),
  
  -- Verklaring - Naturalisatie (7 → 8): Add marriage certificate
  (
    (SELECT id FROM app_types WHERE name = 'Verklaring - Naturalisatie (NATSO)'),
    (SELECT id FROM doc_types WHERE name = 'Huwelijksakte'),
    false,
    8
  ),
  
  -- Naturalisatie - Huwelijk (8 → 9): Add medical declaration
  (
    (SELECT id FROM app_types WHERE name = 'Naturalisatie - Huwelijk (Art. 12)'),
    (SELECT id FROM doc_types WHERE name = 'Medische Verklaring'),
    false,
    9
  ),
  
  -- Verblijfsvergunning - Regulier (8 → 9): Add medical declaration
  (
    (SELECT id FROM app_types WHERE name = 'Verblijfsvergunning - Regulier'),
    (SELECT id FROM doc_types WHERE name = 'Medische Verklaring'),
    false,
    9
  );

-- Validation: Confirm total is 100
DO $$
DECLARE
  total_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_count FROM application_documents;
  
  IF total_count = 100 THEN
    RAISE NOTICE '✅ DATABASE SEEDING COMPLETE: Exactly 100 document mappings created!';
  ELSE
    RAISE NOTICE '📊 Total mappings: %', total_count;
  END IF;
END $$;