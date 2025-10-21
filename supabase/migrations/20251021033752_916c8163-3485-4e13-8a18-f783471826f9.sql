-- Seed application_documents with comprehensive document mappings
-- Get document type IDs
WITH doc_ids AS (
  SELECT id, name FROM document_types
),
app_ids AS (
  SELECT id, name FROM application_types
)

-- Common documents for ALL application types (Passport & Birth Certificate)
INSERT INTO application_documents (application_type_id, document_type_id, is_mandatory, display_order)
SELECT app.id, doc.id, true, 1
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE doc.name = 'Paspoort'

UNION ALL

SELECT app.id, doc.id, true, 2
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE doc.name = 'Geboorteakte'

UNION ALL

-- Residence permit specific documents
SELECT app.id, doc.id, true, 10
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name LIKE 'Verblijfsvergunning%' AND doc.name = 'Bewijs van Verblijf'

UNION ALL

SELECT app.id, doc.id, false, 11
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Verblijfsvergunning (Gezinshereniging)' AND doc.name = 'Huwelijksakte'

UNION ALL

SELECT app.id, doc.id, false, 12
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Verblijfsvergunning (Gezinshereniging)' AND doc.name = 'Bewijs van Inkomen'

UNION ALL

-- Naturalization specific documents
SELECT app.id, doc.id, true, 20
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Naturalisatie' AND doc.name = 'Taalcertificaat'

UNION ALL

SELECT app.id, doc.id, true, 21
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Naturalisatie' AND doc.name = 'Inburgeringsdiploma'

UNION ALL

SELECT app.id, doc.id, true, 22
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Naturalisatie' AND doc.name = 'Verklaring Omtrent Gedrag'

UNION ALL

SELECT app.id, doc.id, false, 23
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Naturalisatie' AND doc.name = 'Bewijs van Inkomen'

UNION ALL

-- Declaration specific documents
SELECT app.id, doc.id, true, 30
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name LIKE 'Verklaring%' AND doc.name = 'Originele Documenten'

UNION ALL

SELECT app.id, doc.id, false, 31
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name LIKE 'Verklaring%' AND doc.name = 'Apostille'

UNION ALL

-- Duplicate specific documents
SELECT app.id, doc.id, true, 40
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name LIKE 'Duplicaat%' AND doc.name = 'Politierapport'

UNION ALL

SELECT app.id, doc.id, false, 41
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name LIKE 'Duplicaat%' AND doc.name = 'Pasfoto'

UNION ALL

-- Conversion specific documents
SELECT app.id, doc.id, true, 50
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Conversie Vergunning' AND doc.name = 'Huidige Vergunning'

UNION ALL

SELECT app.id, doc.id, true, 51
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Conversie Vergunning' AND doc.name = 'Bewijs van Inkomen'

UNION ALL

-- Asylum specific documents
SELECT app.id, doc.id, true, 60
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Asiel' AND doc.name = 'Reisdocumenten'

UNION ALL

SELECT app.id, doc.id, false, 61
FROM app_ids app
CROSS JOIN doc_ids doc
WHERE app.name = 'Asiel' AND doc.name = 'Bewijs van Vervolging';