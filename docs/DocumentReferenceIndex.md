# Document Reference Index
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Purpose:** Central registry of all document types used across application workflows  

---

## Document Categories

1. [Identity Documents](#identity-documents)
2. [Civil Status Documents](#civil-status-documents)
3. [Residence Documents](#residence-documents)
4. [Financial Documents](#financial-documents)
5. [Background Check Documents](#background-check-documents)
6. [Asylum Documents](#asylum-documents)
7. [Support Documents](#support-documents)

---

## Identity Documents

### 1. Paspoort (houderpagina)
**Code:** `PASSPORT`  
**Category:** Identity  
**Description:** Copy of valid passport with photo and personal information  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** 120 months (10 years)  
**Notes:**  
- Must show full page with photo
- Passport must be valid for at least 6 months
- Color scan preferred, grayscale acceptable

**Required For:**
- Verblijf (Surinaamse origine)
- Verblijf (Overige)
- Naturalisatie (all types)
- Verklaring (Art. 21, NATSO)
- Duplicaat
- Conversie
- Asiel

**PDF Checklist Reference:** All checklist PDFs  

---

### 2. Pasfoto
**Code:** `PHOTO_ID`  
**Category:** Identity  
**Description:** Recent passport photo (3.5cm × 4.5cm)  
**File Type:** PDF (scanned photo or digital)  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** None (must be recent, within 6 months)  
**Notes:**
- White or light blue background
- Face directly facing camera
- No glasses (unless medically required)
- No headwear (unless religious)

**Required For:**
- Verblijf (all types)
- Naturalisatie (all types)
- Duplicaat Verblijfsvergunning
- Asiel

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf
- verblijf-overige.pdf
- naturalisatie-surinaamse-origine.pdf
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf
- duplicaat-verblijf.pdf

---

## Civil Status Documents

### 3. Geboorteakte
**Code:** `BIRTH_CERT`  
**Category:** Civil Status  
**Description:** Original or certified copy of birth certificate  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** Yes (if not in Dutch)  
**Validity Period:** None (permanent document)  
**Notes:**
- Must be original or certified copy (no photocopies of photocopies)
- If issued abroad, must be legalized/apostilled
- Translation must be by sworn translator recognized by Suriname

**Required For:**
- Verblijf (all types)
- Naturalisatie (all types)
- Verklaring (Art. 21, NATSO)
- Asiel

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf
- verblijf-overige.pdf
- naturalisatie-surinaamse-origine.pdf
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf
- verklaring-art21.pdf
- verklaring-natso.pdf

---

### 4. Huwelijksakte
**Code:** `MARRIAGE_CERT`  
**Category:** Civil Status  
**Description:** Certified copy of marriage certificate  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** Yes (if not in Dutch)  
**Validity Period:** None (permanent document)  
**Notes:**
- Required only if married to Surinamese citizen (conditional)
- Must show marriage date (for duration calculation)
- If divorced, also provide divorce decree

**Required For:**
- Verblijf (Overige) — if married to Surinamese citizen
- Naturalisatie door Huwelijk (Art. 12)

**Conditional Rule:**
```json
{
  "condition": "marital_status",
  "type": "equals",
  "value": "married"
}
```

**PDF Checklist Reference:**  
- verblijf-overige.pdf (conditional)
- naturalisatie-huwelijk-art12.pdf

---

## Residence Documents

### 5. Bewijs van Ingezetenschap
**Code:** `RESIDENCE_PROOF`  
**Category:** Residence  
**Description:** Proof of residence issued by local authorities  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** 6 months (for Verblijf), 3 months (for Verklaring)  
**Notes:**
- Must be recent (within validity period)
- Issued by district commissioner or neighborhood chief
- Must show full address

**Required For:**
- Verblijf (all types)
- Naturalisatie (all types — must show 5+ years)
- Verklaring (Art. 21)

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf
- verblijf-overige.pdf
- naturalisatie-surinaamse-origine.pdf
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf
- verklaring-art21.pdf

---

### 6. Huidige Verblijfsvergunning
**Code:** `CURRENT_RESIDENCE_PERMIT`  
**Category:** Residence  
**Description:** Original or certified copy of current residence permit  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** Must be currently valid  
**Notes:**
- Required only for Conversie (conversion to settlement permit)
- Must show continuous residence (no gaps)

**Required For:**
- Conversie naar Vestigingsvergunning

**PDF Checklist Reference:**  
- conversie-vestiging.pdf

---

## Financial Documents

### 7. Bewijs van Inkomen
**Code:** `INCOME_PROOF`  
**Category:** Financial  
**Description:** Proof of income (salary slips or employer statement)  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** 3 months (Verblijf), 6 months (Naturalisatie)  
**Notes:**
- Salary slips for last 3 or 6 months (depending on application type)
- OR employer statement on company letterhead
- Must show sufficient income to support self and dependents

**Required For:**
- Verblijf (all types)
- Naturalisatie (all types)
- Conversie

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf
- verblijf-overige.pdf
- naturalisatie-surinaamse-origine.pdf
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf
- conversie-vestiging.pdf

---

### 8. Legesbetalingsbewijs
**Code:** `FEE_RECEIPT`  
**Category:** Financial  
**Description:** Receipt of fee payment (leges)  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** Must be recent (same application)  
**Notes:**
- Payment must be made at authorized location
- Keep original receipt
- Amount varies by application type (see fee table)

**Fee Table:**

| Application Type | Fee (SRD) |
|-----------------|-----------|
| Verblijf (Surinaamse origine) | 500.00 |
| Verblijf (Overige) | 750.00 |
| Naturalisatie (Surinaamse origine) | 1,000.00 |
| Naturalisatie (Art. 5 / Art. 12) | 1,500.00 |
| Verklaring (Art. 21 / NATSO) | 250.00 |
| Duplicaat Verblijfsvergunning | 300.00 |
| Conversie naar Vestigingsvergunning | 600.00 |
| Asiel | 0.00 (free) |

**Required For:**
- All application types except Asiel

**PDF Checklist Reference:** All checklist PDFs (except asiel.pdf)

---

## Background Check Documents

### 9. Verklaring van Goed Gedrag (VOG)
**Code:** `POLICE_CLEARANCE`  
**Category:** Background Check  
**Description:** Police clearance certificate (Verklaring van Goed Gedrag)  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No (if from Suriname), Yes (if from abroad)  
**Validity Period:** 6 months  
**Notes:**
- Must be recent (within 6 months)
- If lived abroad for >1 year in past 5 years, VOG from that country also required
- Apply at local police station

**Required For:**
- Verblijf (all types)
- Naturalisatie (all types)
- Conversie

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf
- verblijf-overige.pdf
- naturalisatie-surinaamse-origine.pdf
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf
- conversie-vestiging.pdf

---

## Asylum Documents

### 10. UNHCR Certificaat
**Code:** `UNHCR_CERT`  
**Category:** Asylum  
**Description:** Valid UNHCR refugee certificate  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No (issued in multiple languages)  
**Validity Period:** 60 months (5 years), but must be renewed  
**Notes:**
- **MANDATORY** for asylum applications
- Must be issued by UNHCR Suriname office
- Certificate must be valid (not expired)
- Contact UNHCR Suriname: +597 520-700

**Required For:**
- Asiel

**PDF Checklist Reference:**  
- asiel.pdf

---

### 11. Verklaring van Omstandigheden
**Code:** `CIRCUMSTANCES_STATEMENT`  
**Category:** Asylum  
**Description:** Written statement explaining circumstances leading to asylum request  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** Yes (if not in Dutch)  
**Validity Period:** Must be current application  
**Notes:**
- Handwritten or typed statement
- Explain why you fled your country
- Include dates, locations, events
- Can be supplemented with supporting documents (news articles, etc.)

**Required For:**
- Asiel

**PDF Checklist Reference:**  
- asiel.pdf

---

## Support Documents

### 12. Garantstellingsformulier
**Code:** `GUARANTOR_FORM`  
**Category:** Support Document  
**Description:** Guarantee form signed by Surinamese sponsor  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** Valid for specific application  
**Notes:**
- Required if applicant is sponsored by Surinamese citizen
- Sponsor must provide ID, proof of income, and proof of residence
- Form available at VZ office or downloadable from website

**Required For:**
- Verblijf (if sponsored)

**Conditional Rule:**
```json
{
  "condition": "has_sponsor",
  "type": "equals",
  "value": "yes"
}
```

**PDF Checklist Reference:**  
- verblijf-surinaamse-origine.pdf (conditional)
- verblijf-overige.pdf (conditional)
- garantstelling.pdf (standalone form)

---

### 13. Formulier Minderjarige Kinderen
**Code:** `MINOR_FORM`  
**Category:** Support Document  
**Description:** Form for minor children included in application  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** Valid for specific application  
**Notes:**
- Required for each minor child (<18 years) included in application
- Must be signed by both parents (or legal guardian)
- Include child's birth certificate
- If one parent absent, provide court order or death certificate

**Required For:**
- All application types (if minor children involved)

**Conditional Rule:**
```json
{
  "condition": "has_minor_children",
  "type": "equals",
  "value": "yes"
}
```

**PDF Checklist Reference:**  
- minderjarige-kinderen.pdf (standalone form)

---

### 14. Optieverklaring
**Code:** `OPTION_DECLARATION`  
**Category:** Support Document  
**Description:** Original option declaration document  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** None (permanent document)  
**Notes:**
- Required only for Naturalisatie door Optie (Art. 5)
- Must be original document (not copy)
- Issued by competent authority

**Required For:**
- Naturalisatie door Optie (Art. 5)

**PDF Checklist Reference:**  
- naturalisatie-optie-art5.pdf

---

### 15. Naturalisatiebewijs
**Code:** `NATURALIZATION_CERT`  
**Category:** Support Document  
**Description:** Original naturalization certificate  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** None (permanent document)  
**Notes:**
- Required for Verklaring van Naturalisatie (NATSO)
- Required for Duplicaat Naturalisatiebewijs
- Must be original or certified copy

**Required For:**
- Verklaring van Naturalisatie (NATSO)
- Duplicaat Naturalisatiebewijs

**PDF Checklist Reference:**  
- verklaring-natso.pdf
- duplicaat-naturalisatie.pdf

---

### 16. Diploma Nederlands (A2 niveau)
**Code:** `DUTCH_CERTIFICATE`  
**Category:** Support Document  
**Description:** Dutch language proficiency certificate (A2 level)  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** None  
**Notes:**
- Required for Naturalisatie (non-Surinamese origin)
- A2 level = basic proficiency
- Accepted institutions: [List to be provided]
- Exemption for elderly (65+) or disabled

**Required For:**
- Naturalisatie (all types except Surinaamse origine)

**PDF Checklist Reference:**  
- naturalisatie-optie-art5.pdf
- naturalisatie-huwelijk-art12.pdf

---

### 17. Politierapport (bij verlies)
**Code:** `POLICE_REPORT`  
**Category:** Support Document  
**Description:** Police report for lost document  
**File Type:** PDF  
**Max Size:** 400KB  
**Translation Required:** No  
**Validity Period:** Must be recent (within 30 days)  
**Notes:**
- Required only for Duplicaat if original document was lost (not damaged)
- Must be filed at local police station
- Include report number and date

**Required For:**
- Duplicaat (if lost)

**Conditional Rule:**
```json
{
  "condition": "reason",
  "type": "equals",
  "value": "lost"
}
```

**PDF Checklist Reference:**  
- duplicaat-verblijf.pdf (conditional)

---

## Downloadable PDF Checklists

All PDF checklists are stored in `/public/assets/documents/` and linked from the public website.

### Residence Permits
1. **verblijf-surinaamse-origine.pdf** — Verblijf (Surinaamse origine)
2. **verblijf-overige.pdf** — Verblijf (Overige)

### Naturalization
3. **naturalisatie-surinaamse-origine.pdf** — Naturalisatie (Surinaamse origine)
4. **naturalisatie-optie-art5.pdf** — Naturalisatie door Optie (Art. 5)
5. **naturalisatie-huwelijk-art12.pdf** — Naturalisatie door Huwelijk (Art. 12)

### Declarations
6. **verklaring-art21.pdf** — Verklaring van Ingezetenschap (Art. 21)
7. **verklaring-natso.pdf** — Verklaring van Naturalisatie (NATSO)

### Support Forms
8. **garantstelling.pdf** — Garantstellingsformulier
9. **minderjarige-kinderen.pdf** — Formulier Minderjarige Kinderen

### Asylum
10. **asiel.pdf** — Asielaanvraag (UNHCR)

---

## Validation Rules Summary

| Rule | Value | Enforced By |
|------|-------|-------------|
| File Type | PDF only | Client + Server |
| Max Size | 400KB | Client + Server |
| Translation | If not Dutch | Manual review |
| Validity | Varies by doc type | Manual review |
| Legibility | Readable scan | Manual review |
| Completeness | All pages included | Manual review |

---

## Common Issues & Solutions

### Issue: File Too Large
**Error:** "File size exceeds 400KB"  
**Solution:**  
1. Compress PDF using online tools (e.g., SmallPDF, iLovePDF)
2. Reduce scan resolution (300 DPI sufficient)
3. Scan in grayscale instead of color

### Issue: Translation Not Accepted
**Error:** "Translation not by recognized translator"  
**Solution:**  
1. Use sworn translator from official list
2. Translator must include stamp and signature
3. Original document must accompany translation

### Issue: Document Expired
**Error:** "Police clearance certificate expired"  
**Solution:**  
1. Check validity period for document type
2. Request new certificate if expired
3. Submit updated document via admin email (until update feature implemented)

---

## Links to Related Documentation

- [Wizard Logic](./wizard-logic.md) — Conditional document requirements
- [Backend Architecture](./backend-architecture.md) — Database schema for document types
- [Admin User Guide](./admin-user-guide.md) — Document validation procedures

---

**Document Control:**  
- Version: 1.0
- Last Updated: 2025-01-20
- Owner: Content Team
- Next Review: 2025-07-20 (6 months)
