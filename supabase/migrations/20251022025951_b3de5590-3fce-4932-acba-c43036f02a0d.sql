-- Seed initial content for VZ Juspol Portal
-- This migration populates pages, faq_items, and announcements tables

-- Insert Pages (Over Ons, Privacy Beleid, Contact)
INSERT INTO public.pages (title, slug, content, meta_description, is_published, published_at, created_by) 
VALUES 
(
  'Over Ons',
  'over-ons',
  '<h2>Welkom bij de Vreemdelingenzaken Suriname</h2>
<p>De afdeling Vreemdelingenzaken is verantwoordelijk voor het behandelen van alle aanvragen met betrekking tot verblijfsvergunningen, naturalisatie, en vluchtelingenstatus in Suriname.</p>

<h3>Onze Missie</h3>
<p>Wij streven naar een professionele, transparante en klantvriendelijke dienstverlening voor alle aanvragers. Ons doel is om de procedures zo efficiënt mogelijk te maken, met behoud van de hoogste veiligheidsnormen.</p>

<h3>Wat Doen Wij?</h3>
<ul>
  <li>Behandeling van verblijfsvergunningen voor werk, studie, en gezinshereniging</li>
  <li>Naturalisatie procedures voor vreemdelingen die Surinaams staatsburger willen worden</li>
  <li>Asielaanvragen en vluchtelingenstatus bepaling</li>
  <li>Verklaringen omtrent het Nederlanderschap (VON)</li>
  <li>Advisering over immigratie- en verblijfszaken</li>
</ul>

<h3>Contactgegevens</h3>
<p>Bezoekadres: Gravenstraat 112, Paramaribo<br>
Telefoon: +597 472-222<br>
Email: info@vreemdelingenzaken.gov.sr<br>
Openingstijden: Maandag t/m Vrijdag, 08:00 - 14:00 uur</p>',
  'Informatie over de afdeling Vreemdelingenzaken Suriname, onze diensten en contactgegevens.',
  true,
  now(),
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Privacy Beleid',
  'privacy-beleid',
  '<h2>Privacy Beleid</h2>
<p><strong>Laatst bijgewerkt:</strong> Januari 2025</p>

<h3>1. Inleiding</h3>
<p>De afdeling Vreemdelingenzaken hecht groot belang aan de bescherming van uw persoonsgegevens. Dit privacybeleid legt uit hoe wij uw gegevens verzamelen, gebruiken, en beschermen.</p>

<h3>2. Welke Gegevens Verzamelen Wij?</h3>
<p>Bij het indienen van een aanvraag verzamelen wij de volgende gegevens:</p>
<ul>
  <li>Persoonlijke identificatiegegevens (naam, geboortedatum, nationaliteit)</li>
  <li>Contactgegevens (adres, telefoon, email)</li>
  <li>Reisdocumenten en identiteitsbewijzen</li>
  <li>Bewijs van verblijfsdoel (arbeidscontract, inschrijving onderwijs, etc.)</li>
  <li>Financiële gegevens indien relevant voor de aanvraag</li>
</ul>

<h3>3. Hoe Gebruiken Wij Uw Gegevens?</h3>
<p>Uw persoonsgegevens worden gebruikt voor:</p>
<ul>
  <li>Beoordeling en behandeling van uw aanvraag</li>
  <li>Communicatie over de status van uw aanvraag</li>
  <li>Voldoen aan wettelijke verplichtingen</li>
  <li>Statistische analyses (geanonimiseerd)</li>
</ul>

<h3>4. Beveiliging</h3>
<p>Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, verlies, of misbruik.</p>

<h3>5. Bewaarperiode</h3>
<p>Persoonsgegevens worden bewaard conform de Archiefwet en interne richtlijnen, doorgaans 5-10 jaar na afhandeling van de aanvraag.</p>

<h3>6. Uw Rechten</h3>
<p>U heeft het recht op inzage, correctie, en verwijdering van uw persoonsgegevens. Voor vragen of verzoeken kunt u contact opnemen via privacy@vreemdelingenzaken.gov.sr.</p>

<h3>7. Contact</h3>
<p>Voor vragen over dit privacybeleid kunt u contact opnemen met onze Privacy Officer via bovenstaand emailadres.</p>',
  'Privacy beleid van de afdeling Vreemdelingenzaken Suriname over het gebruik en bescherming van persoonsgegevens.',
  true,
  now(),
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Contact',
  'contact',
  '<h2>Contact</h2>

<h3>Bezoekadres</h3>
<p>Gravenstraat 112<br>
Paramaribo<br>
Suriname</p>

<h3>Postadres</h3>
<p>Ministerie van Justitie en Politie<br>
Afdeling Vreemdelingenzaken<br>
Gravenstraat 112<br>
Paramaribo, Suriname</p>

<h3>Telefonisch Contact</h3>
<p>Algemeen: +597 472-222<br>
Fax: +597 472-333</p>

<h3>Email</h3>
<p>Algemene vragen: info@vreemdelingenzaken.gov.sr<br>
Aanvragen status: status@vreemdelingenzaken.gov.sr<br>
Spoedgevallen: urgent@vreemdelingenzaken.gov.sr</p>

<h3>Openingstijden</h3>
<p><strong>Maandag t/m Vrijdag:</strong> 08:00 - 14:00 uur<br>
<strong>Zaterdag & Zondag:</strong> Gesloten<br>
<strong>Feestdagen:</strong> Gesloten</p>

<h3>Afspraak Maken</h3>
<p>Voor complexe aanvragen raden wij aan om vooraf een afspraak te maken. Dit kan telefonisch of via email. Bij spoedgevallen verzoeken wij u dit duidelijk te vermelden.</p>

<h3>Routebeschrijving</h3>
<p>Het kantoor is gelegen aan de Gravenstraat, nabij het centrum van Paramaribo. Openbaar vervoer stopt op 200 meter afstand. Parkeren is mogelijk in de omliggende straten.</p>',
  'Contactinformatie, openingstijden en bezoekadres van de afdeling Vreemdelingenzaken Suriname.',
  true,
  now(),
  (SELECT id FROM auth.users LIMIT 1)
);

-- Insert FAQ Items (15 records across 3 categories)
INSERT INTO public.faq_items (question, answer, category, display_order, is_published, created_by)
VALUES 
-- Category: Verblijfsvergunningen (5 items)
(
  'Welke documenten heb ik nodig voor een verblijfsvergunning?',
  'Dit hangt af van uw specifieke situatie. Voor Surinaamse origine zijn andere documenten vereist dan voor andere nationaliteiten. Download de juiste checklist via onze Documenten Lijsten pagina. In het algemeen heeft u nodig: geldig paspoort, geboorteakte, bewijs van verblijfsdoel, en eventueel financieel bewijs.',
  'Verblijfsvergunningen',
  1,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Hoe lang duurt de behandeling van mijn aanvraag?',
  'De behandeltijd varieert per aanvraagtype: Verblijfsvergunningen 4-6 weken, Naturalisatie 8-12 weken, Verklaringen 2-4 weken. Dit zijn geschatte tijden die kunnen variëren afhankelijk van de complexiteit van uw zaak en de volledigheid van de ingediende documenten.',
  'Verblijfsvergunningen',
  2,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Kan ik mijn aanvraag online volgen?',
  'Ja, na het indienen van uw aanvraag ontvangt u een agenummer. Met dit nummer kunt u de status van uw aanvraag opvragen via onze Vergunningen pagina of door contact op te nemen met ons kantoor tijdens openingstijden.',
  'Verblijfsvergunningen',
  3,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Wat kost een verblijfsvergunning?',
  'De kosten variëren per type vergunning. Raadpleeg onze Instructies pagina voor een volledig overzicht van alle leges. Voor verblijfsvergunningen liggen de kosten tussen SRD 500 en SRD 2.000 afhankelijk van het doel en de duur.',
  'Verblijfsvergunningen',
  4,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Moet ik persoonlijk langskomen of kan ik online indienen?',
  'U kunt uw aanvraag online indienen via ons portal. Voor bepaalde documenten moet u mogelijk nog wel langskomen voor verificatie of het afgeven van biometrische gegevens. U ontvangt hierover bericht na het indienen van uw online aanvraag.',
  'Verblijfsvergunningen',
  5,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),

-- Category: Naturalisatie (5 items)
(
  'Wat zijn de kosten voor naturalisatie?',
  'De leges voor naturalisatie bedragen SRD 1.500 voor volwassenen en SRD 750 voor minderjarigen. Zie onze Instructies pagina voor een volledig overzicht van alle kosten en benodigde documenten.',
  'Naturalisatie',
  6,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Welke voorwaarden gelden voor naturalisatie?',
  'U moet minimaal 5 jaar legaal in Suriname hebben verbleven, een vaste woon- en verblijfplaats hebben, geen strafblad hebben, en voldoende middelen van bestaan kunnen aantonen. Daarnaast moet u een basiskennis van de Nederlandse taal bezitten.',
  'Naturalisatie',
  7,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Verlies ik mijn oorspronkelijke nationaliteit?',
  'Dit hangt af van de wetgeving van uw land van herkomst. Suriname staat dubbele nationaliteit toe, maar niet alle landen doen dit. Informeer bij uw ambassade of consulaat naar de regels in uw land.',
  'Naturalisatie',
  8,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Kan ik naturaliseren als ik getrouwd ben met een Surinamer?',
  'Ja, huwelijk met een Surinaams staatsburger kan de naturalisatie versnellen. In dat geval geldt een verkorte verblijfstermijn van 3 jaar in plaats van 5 jaar. U moet wel aan alle andere voorwaarden voldoen.',
  'Naturalisatie',
  9,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Moet ik een taaltest afleggen?',
  'Ja, als onderdeel van het naturalisatieproces moet u een basiskennis van de Nederlandse taal aantonen. Dit kan door middel van een erkend diploma of door het afleggen van een taaltest bij onze afdeling.',
  'Naturalisatie',
  10,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),

-- Category: Algemeen (5 items)
(
  'Moeten alle documenten vertaald worden?',
  'Ja, alle documenten die niet in het Nederlands zijn gesteld, moeten door een beëdigde vertaler worden vertaald. Zie onze Instructies pagina voor een lijst van erkende vertalers in Suriname.',
  'Algemeen',
  11,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Wat gebeurt er na indiening van mijn aanvraag?',
  'U ontvangt direct een bevestigingsmail met uw agenummer. Uw aanvraag wordt vervolgens beoordeeld door onze medewerkers. Bij vragen of ontbrekende documenten nemen wij contact met u op via de opgegeven contactgegevens. U kunt de status online volgen.',
  'Algemeen',
  12,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Kan ik mijn aanvraag intrekken?',
  'Ja, u kunt uw aanvraag te allen tijde intrekken door contact op te nemen met onze afdeling. Let op: betaalde leges worden niet gerestitueerd, tenzij de aanvraag nog niet in behandeling is genomen.',
  'Algemeen',
  13,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Wat als mijn aanvraag wordt afgewezen?',
  'Bij afwijzing ontvangt u een gemotiveerde beslissing. U heeft het recht om binnen 6 weken na ontvangst van de beslissing bezwaar aan te tekenen bij de Minister van Justitie en Politie. In de afwijzingsbrief staat precies hoe u dit moet doen.',
  'Algemeen',
  14,
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Hoe lang is mijn vergunning geldig?',
  'De geldigheidsduur varieert per type vergunning: werkvergunningen meestal 1 jaar (verlengbaar), studieverblijf voor de duur van de studie, en gezinshereniging meestal 3-5 jaar. Op uw vergunning staat de exacte vervaldatum vermeld.',
  'Algemeen',
  15,
  true,
  (SELECT id FROM auth.users LIMIT 1)
);

-- Insert Announcements (5 records)
INSERT INTO public.announcements (title, content, type, starts_at, ends_at, is_active, created_by)
VALUES
(
  'Nieuwe Online Portal Gelanceerd',
  'Vanaf heden kunt u uw aanvragen online indienen via ons nieuwe digitale portal. Dit bespaart u tijd en maakt het proces transparanter. U kunt de status van uw aanvraag realtime volgen.',
  'info',
  now(),
  now() + interval '90 days',
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Feestdagen Sluiting December 2024',
  'Ons kantoor is gesloten van 24 december 2024 t/m 2 januari 2025 in verband met de feestdagen. Spoedgevallen kunnen gemeld worden via urgent@vreemdelingenzaken.gov.sr. Wij wensen u fijne feestdagen.',
  'warning',
  '2024-12-15 00:00:00+00',
  '2025-01-03 00:00:00+00',
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Nieuwe Tarieven Per 1 Januari 2025',
  'Met ingang van 1 januari 2025 gelden nieuwe leges voor verblijfsvergunningen en naturalisatie procedures. Raadpleeg de Instructies pagina voor het actuele overzicht van alle kosten.',
  'info',
  '2024-12-01 00:00:00+00',
  '2025-02-01 00:00:00+00',
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Systeemonderhoud Gepland',
  'Op zaterdag 25 januari 2025 tussen 08:00 en 14:00 uur vindt systeemonderhoud plaats. Gedurende deze tijd is het online portal niet beschikbaar. Wij verontschuldigen ons voor het ongemak.',
  'warning',
  '2025-01-18 00:00:00+00',
  '2025-01-26 00:00:00+00',
  true,
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Versnelde Procedure Voor Studenten',
  'Studenten die zich hebben ingeschreven bij een erkende onderwijsinstelling kunnen gebruik maken van een versnelde procedure. De behandeltijd is verkort naar 2-3 weken. Upload uw inschrijvingsbewijs bij uw aanvraag.',
  'success',
  now(),
  now() + interval '180 days',
  true,
  (SELECT id FROM auth.users LIMIT 1)
);

-- Create index on faq_items category for better performance
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON public.faq_items(category);

-- Create index on announcements active status and dates
CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.announcements(is_active, starts_at, ends_at);