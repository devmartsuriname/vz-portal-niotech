-- Seed Extended Application Documents
-- This migration adds 74 additional document mappings to reach 100+ total
-- Current count: 26 | Target count: 100+

-- Insert extended document mappings for all 12 application types
INSERT INTO application_documents (application_type_id, document_type_id, is_mandatory, display_order)
SELECT 
  at.id as application_type_id,
  dt.id as document_type_id,
  mappings.is_mandatory,
  mappings.display_order
FROM (VALUES
  -- GROUP 1: Verblijfsvergunning - Regulier (add 7 mappings: 2→9)
  ('Verblijfsvergunning - Regulier', 'Bewijs van Huisvesting', true, 3),
  ('Verblijfsvergunning - Regulier', 'Bewijs van Inkomsten', true, 4),
  ('Verblijfsvergunning - Regulier', 'Politierapport VOG', true, 5),
  ('Verblijfsvergunring - Regulier', 'Medische Verklaring', true, 6),
  ('Verblijfsvergunning - Regulier', 'Verblijfsvergunning (huidig)', false, 7),
  ('Verblijfsvergunning - Regulier', 'Huwelijksakte', false, 8),
  ('Verblijfsvergunning - Regulier', 'Arbeidscontract', false, 9),
  
  -- Verblijfsvergunning - Arbeidsvergunning (add 6 mappings: 2→8)
  ('Verblijfsvergunning - Arbeidsvergunning', 'Arbeidscontract', true, 3),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Bewijs van Huisvesting', true, 4),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Bewijs van Inkomsten', true, 5),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Politierapport VOG', true, 6),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Medische Verklaring', false, 7),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Huwelijksakte', false, 8),
  
  -- Verblijfsvergunning - Gezinshereniging (add 6 mappings: 2→8)
  ('Verblijfsvergunning - Gezinshereniging', 'Huwelijksakte', true, 3),
  ('Verblijfsvergunning - Gezinshereniging', 'Bewijs van Huisvesting', true, 4),
  ('Verblijfsvergunning - Gezinshereniging', 'Bewijs van Inkomsten', true, 5),
  ('Verblijfsvergunning - Gezinshereniging', 'Politierapport VOG', true, 6),
  ('Verblijfsvergunning - Gezinshereniging', 'Medische Verklaring', false, 7),
  ('Verblijfsvergunning - Gezinshereniging', 'Arbeidscontract', false, 8),
  
  -- GROUP 2: Naturalisatie - Surinaamse Origine (add 6 mappings: 2→8)
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Bewijs Surinaamse Origine', true, 3),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Politierapport VOG', true, 4),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Bewijs van Inkomsten', true, 5),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Verblijfsvergunning (huidig)', true, 6),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Huwelijksakte', false, 7),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Arbeidscontract', false, 8),
  
  -- Naturalisatie - Huwelijk (add 6 mappings: 2→8)
  ('Naturalisatie - Huwelijk (Art. 12)', 'Huwelijksakte', true, 3),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Bewijs Surinaamse Origine', true, 4),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Politierapport VOG', true, 5),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Bewijs van Inkomsten', true, 6),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Verblijfsvergunning (huidig)', true, 7),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Bewijs van Huisvesting', false, 8),
  
  -- Naturalisatie - Optie (add 6 mappings: 2→8)
  ('Naturalisatie - Optie (Art. 5)', 'Bewijs Surinaamse Origine', true, 3),
  ('Naturalisatie - Optie (Art. 5)', 'Verblijfsvergunning (huidig)', true, 4),
  ('Naturalisatie - Optie (Art. 5)', 'Politierapport VOG', true, 5),
  ('Naturalisatie - Optie (Art. 5)', 'Bewijs van Huisvesting', false, 6),
  ('Naturalisatie - Optie (Art. 5)', 'Huwelijksakte', false, 7),
  ('Naturalisatie - Optie (Art. 5)', 'Arbeidscontract', false, 8),
  
  -- GROUP 3: Verklaring - Ingezetenschap (add 5 mappings: 2→7)
  ('Verklaring - Ingezetenschap (Art. 21)', 'Verblijfsvergunning (huidig)', true, 3),
  ('Verklaring - Ingezetenschap (Art. 21)', 'Politierapport VOG', true, 4),
  ('Verklaring - Ingezetenschap (Art. 21)', 'Bewijs van Huisvesting', true, 5),
  ('Verklaring - Ingezetenschap (Art. 21)', 'Arbeidscontract', false, 6),
  ('Verklaring - Ingezetenschap (Art. 21)', 'Huwelijksakte', false, 7),
  
  -- Verklaring - Naturalisatie (add 5 mappings: 2→7)
  ('Verklaring - Naturalisatie (NATSO)', 'Verblijfsvergunning (huidig)', true, 3),
  ('Verklaring - Naturalisatie (NATSO)', 'Politierapport VOG', true, 4),
  ('Verklaring - Naturalisatie (NATSO)', 'Bewijs Surinaamse Origine', true, 5),
  ('Verklaring - Naturalisatie (NATSO)', 'Bewijs van Huisvesting', false, 6),
  ('Verklaring - Naturalisatie (NATSO)', 'Arbeidscontract', false, 7),
  
  -- GROUP 4: Duplicaat - Verblijfsvergunning (add 2 mappings: 3→5)
  ('Duplicaat - Verblijfsvergunning', 'Politierapport VOG', true, 3),
  ('Duplicaat - Verblijfsvergunning', 'Verblijfsvergunning (huidig)', false, 4),
  ('Duplicaat - Verblijfsvergunning', 'Bewijs van Huisvesting', false, 5),
  
  -- Duplicaat - Naturalisatiebewijs (add 2 mappings: 3→5)
  ('Duplicaat - Naturalisatiebewijs', 'Politierapport VOG', true, 3),
  ('Duplicaat - Naturalisatiebewijs', 'Bewijs Surinaamse Origine', false, 4),
  ('Duplicaat - Naturalisatiebewijs', 'Verblijfsvergunning (huidig)', false, 5),
  
  -- GROUP 5: Conversie (add 7 mappings: 2→9)
  ('Conversie - Tijdelijk naar Permanent', 'Verblijfsvergunning (huidig)', true, 3),
  ('Conversie - Tijdelijk naar Permanent', 'Bewijs van Huisvesting', true, 4),
  ('Conversie - Tijdelijk naar Permanent', 'Bewijs van Inkomsten', true, 5),
  ('Conversie - Tijdelijk naar Permanent', 'Politierapport VOG', true, 6),
  ('Conversie - Tijdelijk naar Permanent', 'Arbeidscontract', false, 7),
  ('Conversie - Tijdelijk naar Permanent', 'Huwelijksakte', false, 8),
  ('Conversie - Tijdelijk naar Permanent', 'Medische Verklaring', false, 9),
  
  -- GROUP 6: Asiel (add 7 mappings: 2→9)
  ('Asiel - Vluchtelingenstatus', 'Asielmotivatie', true, 3),
  ('Asiel - Vluchtelingenstatus', 'Medische Verklaring', false, 4),
  ('Asiel - Vluchtelingenstatus', 'Politierapport VOG', false, 5),
  ('Asiel - Vluchtelingenstatus', 'Bewijs van Huisvesting', false, 6),
  ('Asiel - Vluchtelingenstatus', 'Huwelijksakte', false, 7),
  ('Asiel - Vluchtelingenstatus', 'Arbeidscontract', false, 8),
  ('Asiel - Vluchtelingenstatus', 'Bewijs van Inkomsten', false, 9)
) AS mappings(app_type_name, doc_type_name, is_mandatory, display_order)
CROSS JOIN application_types at
CROSS JOIN document_types dt
WHERE at.name = mappings.app_type_name
  AND dt.name = mappings.doc_type_name;