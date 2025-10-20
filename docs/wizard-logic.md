# Wizard Logic & Decision Tree
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Status:** Design Complete — Implementation Pending (Phase 3)  

---

## Overview

The **Application Wizard** is a multi-step guided process that:
1. Asks conditional questions to determine the correct application type
2. Dynamically generates a document checklist based on answers
3. Validates user inputs at each step
4. Persists progress to allow users to resume later
5. Generates a unique agenda number upon submission

**Total Steps:** 6-8 (depending on branching logic)  
**Average Completion Time:** 15-20 minutes  
**Supported Application Types:** 10 (Residence, Naturalization, Declarations, etc.)  

---

## Decision Tree Structure

### Root Question (Step 1)
**Question:** "Wat wilt u aanvragen?" (What do you wish to apply for?)  
**Type:** Single choice (radio buttons)

**Options:**
1. **Verblijfsvergunning** (Residence Permit) → Step 2
2. **Naturalisatie** (Naturalization) → Step 3
3. **Verklaring** (Declaration) → Step 4
4. **Duplicaat** (Duplicate) → Step 5
5. **Conversie** (Conversion) → Step 6
6. **Asiel** (Asylum) → Step 7

---

### Branch 1: Residence Permit (Verblijfsvergunning)

**Step 2:**  
**Question:** "Bent u van Surinaamse origine?" (Are you of Surinamese origin?)  
**Type:** Single choice

**Options:**
- **Ja** (Yes) → **Result:** `VERBLIJF_SUR` (Residence - Surinamese Origin)
- **Nee** (No) → **Result:** `VERBLIJF_OTH` (Residence - Other)

**Document Checklist (VERBLIJF_SUR):**
1. Paspoort (houderpagina) — Required, per person
2. Geboorteakte — Required, per person, translation required
3. Bewijs van Ingezetenschap — Required (within 6 months)
4. Bewijs van Inkomen — Required (last 3 months)
5. Verklaring van Goed Gedrag — Required (within 6 months)
6. Pasfoto (3.5cm × 4.5cm) — Required, per person
7. Garantstellingsformulier — Required (if applicable)

**Document Checklist (VERBLIJF_OTH):**
1-7. Same as VERBLIJF_SUR, plus:
8. Marriage Certificate (if married to Surinamese citizen) — Conditional, translation required

---

### Branch 2: Naturalization (Naturalisatie)

**Step 3:**  
**Question:** "Bent u van Surinaamse origine?" (Are you of Surinamese origin?)  
**Type:** Single choice

**Options:**
- **Ja** (Yes) → **Result:** `NAT_SUR` (Naturalization - Surinamese Origin)
- **Nee** (No) → **Step 8** (Determine naturalization sub-type)

---

**Step 8:**  
**Question:** "Wat is uw situatie?" (What is your situation?)  
**Type:** Single choice

**Options:**
1. **Getrouwd met Surinaams staatsburger** (Married to Surinamese citizen) → **Result:** `NAT_ART12` (Art. 12 - Marriage)
2. **Ik heb een optieverklaring** (I have an option declaration) → **Result:** `NAT_ART5` (Art. 5 - Option)
3. **Anders** (Other) → **Result:** `NAT_SUR` (Standard Naturalization)

**Document Checklist (NAT_SUR):**
1. Paspoort (houderpagina) — Required, per person
2. Geboorteakte — Required, per person, translation required
3. Bewijs van Ingezetenschap (minimaal 5 jaar) — Required
4. Bewijs van Inkomen — Required (last 6 months)
5. Verklaring van Goed Gedrag — Required (within 6 months)
6. Pasfoto — Required, per person
7. Diploma Nederlands (A2 niveau) — Required
8. Legesbetalingsbewijs — Required (SRD 1,500)

**Document Checklist (NAT_ART12):**
1-8. Same as NAT_SUR, plus:
9. Huwelijksakte — Required, translation required
10. Bewijs van huwelijksduur (minimaal 5 jaar) — Required

**Document Checklist (NAT_ART5):**
1-8. Same as NAT_SUR, plus:
9. Optieverklaring — Required (original document)

---

### Branch 3: Declaration (Verklaring)

**Step 4:**  
**Question:** "Welke verklaring hebt u nodig?" (Which declaration do you need?)  
**Type:** Single choice

**Options:**
1. **Verklaring van Ingezetenschap (Art. 21)** → **Result:** `VERKL_ART21`
2. **Verklaring van Naturalisatie (NATSO)** → **Result:** `VERKL_NATSO`

**Document Checklist (VERKL_ART21):**
1. Paspoort (houderpagina) — Required
2. Geboorteakte — Required, translation required
3. Bewijs van Ingezetenschap — Required (within 3 months)
4. Legesbetalingsbewijs — Required (SRD 250)

**Document Checklist (VERKL_NATSO):**
1. Paspoort (houderpagina) — Required
2. Geboorteakte — Required, translation required
3. Naturalisatiebewijs — Required (original document)
4. Legesbetalingsbewijs — Required (SRD 250)

---

### Branch 4: Duplicate (Duplicaat)

**Step 5:**  
**Question:** "Welk document wilt u vervangen?" (Which document do you wish to replace?)  
**Type:** Single choice

**Options:**
1. **Verblijfsvergunning** → **Result:** `DUPL_VERBLIJF`
2. **Naturalisatiebewijs** → **Result:** `DUPL_NAT`

**Document Checklist (DUPL_VERBLIJF):**
1. Paspoort (houderpagina) — Required
2. Politierapport (bij verlies) — Required
3. Bewijs van betaling (oude vergunning indien beschadigd) — Optional
4. Pasfoto — Required
5. Legesbetalingsbewijs — Required (SRD 300)

---

### Branch 5: Conversion (Conversie)

**Step 6:**  
**Question:** "Wilt u uw verblijfsvergunning omzetten naar een vestigingsvergunning?" (Do you wish to convert your residence permit to a settlement permit?)  
**Type:** Confirmation

**Options:**
- **Ja** (Yes) → **Result:** `CONV_VESTIGING`
- **Nee** (No) → Return to Step 1

**Document Checklist (CONV_VESTIGING):**
1. Paspoort (houderpagina) — Required
2. Huidige verblijfsvergunning — Required (original)
3. Bewijs van ononderbroken verblijf (minimaal 5 jaar) — Required
4. Bewijs van Inkomen — Required (last 6 months)
5. Verklaring van Goed Gedrag — Required (within 6 months)
6. Legesbetalingsbewijs — Required (SRD 600)

---

### Branch 6: Asylum (Asiel)

**Step 7:**  
**Question:** "Beschikt u over een geldig UNHCR-certificaat?" (Do you have a valid UNHCR certificate?)  
**Type:** Single choice

**Options:**
- **Ja** (Yes) → **Result:** `ASIEL_UNHCR`
- **Nee** (No) → Error: "U moet eerst contact opnemen met UNHCR Suriname om een certificaat aan te vragen."

**Document Checklist (ASIEL_UNHCR):**
1. UNHCR Certificaat — Required (valid, within 60 days)
2. Paspoort of reisdocument — Required (if available)
3. Geboorteakte — Required, translation required
4. Pasfoto — Required, per person
5. Bewijs van verblijfplaats in Suriname — Required
6. Verklaring van omstandigheden — Required (written statement)

---

## Additional Questions (Conditional)

### Multi-Person Application

**Question:** "Hoeveel personen zijn bij deze aanvraag betrokken?" (How many people are involved in this application?)  
**Type:** Number input (1-10)  
**When Asked:** After main application type determined

**Impact:**
- Documents marked as `per_person: true` will be required for each person
- Example: If 3 people → 3 passports, 3 birth certificates, 3 photos

---

### Marital Status

**Question:** "Wat is uw burgerlijke staat?" (What is your marital status?)  
**Type:** Single choice  
**When Asked:** For residence and naturalization applications

**Options:**
- **Alleenstaand** (Single)
- **Getrouwd** (Married)
- **Gescheiden** (Divorced)
- **Weduwe/Weduwnaar** (Widowed)

**Impact:**
- If "Getrouwd" → Marriage certificate required (conditional document)

---

### Minor Children

**Question:** "Zijn er minderjarige kinderen bij deze aanvraag betrokken?" (Are there minor children involved in this application?)  
**Type:** Yes/No  
**When Asked:** For family applications

**Impact:**
- If "Ja" → Minor Children Form required (additional document)

---

## JSONB Schema for wizard_rules

### Example Rule (Step 1 - Root Question)

```json
{
  "step_number": 1,
  "question": "Wat wilt u aanvragen?",
  "question_type": "single_choice",
  "is_start_question": true,
  "help_text": "Selecteer het type aanvraag dat u wilt indienen.",
  "options": [
    {
      "value": "residence",
      "label": "Verblijfsvergunning",
      "next_step": 2
    },
    {
      "value": "naturalization",
      "label": "Naturalisatie",
      "next_step": 3
    },
    {
      "value": "declaration",
      "label": "Verklaring",
      "next_step": 4
    },
    {
      "value": "duplicate",
      "label": "Duplicaat",
      "next_step": 5
    },
    {
      "value": "conversion",
      "label": "Conversie",
      "next_step": 6
    },
    {
      "value": "asylum",
      "label": "Asiel",
      "next_step": 7
    }
  ]
}
```

---

### Example Rule (Step 2 - Surinamese Origin)

```json
{
  "step_number": 2,
  "question": "Bent u van Surinaamse origine?",
  "question_type": "single_choice",
  "parent_step": 1,
  "help_text": "Selecteer 'Ja' indien u of uw ouders in Suriname geboren zijn.",
  "options": [
    {
      "value": "yes",
      "label": "Ja",
      "result": "VERBLIJF_SUR"
    },
    {
      "value": "no",
      "label": "Nee",
      "result": "VERBLIJF_OTH"
    }
  ],
  "resulting_application_types": [
    "uuid-of-verblijf-sur",
    "uuid-of-verblijf-oth"
  ]
}
```

---

## Document Checklist Generation Algorithm

### Pseudocode

```javascript
function generateChecklist(applicationType, wizardAnswers) {
  // 1. Fetch base documents for application type
  const baseDocuments = fetchApplicationDocuments(applicationType.id);
  
  // 2. Filter based on conditional rules
  const filteredDocuments = baseDocuments.filter(doc => {
    if (!doc.conditional_rule) return true; // No condition = always required
    
    const { condition, type, value } = doc.conditional_rule;
    const userAnswer = wizardAnswers[condition];
    
    // Evaluate condition
    switch (type) {
      case 'equals':
        return userAnswer === value;
      case 'not_equals':
        return userAnswer !== value;
      case 'in_array':
        return value.includes(userAnswer);
      default:
        return true;
    }
  });
  
  // 3. Expand per_person documents
  const numberOfPeople = wizardAnswers.number_of_people || 1;
  const expandedDocuments = [];
  
  for (const doc of filteredDocuments) {
    if (doc.per_person) {
      for (let i = 1; i <= numberOfPeople; i++) {
        expandedDocuments.push({
          ...doc,
          title: `${doc.title} (Persoon ${i})`,
          person_number: i
        });
      }
    } else {
      expandedDocuments.push(doc);
    }
  }
  
  // 4. Sort by display order
  return expandedDocuments.sort((a, b) => a.display_order - b.display_order);
}
```

---

## Validation Rules

### Step Validation

Each wizard step must be validated before allowing progression:

```javascript
const stepValidationSchema = z.object({
  step_1: z.enum(['residence', 'naturalization', 'declaration', 'duplicate', 'conversion', 'asylum']),
  step_2: z.enum(['yes', 'no']).optional(), // Only if from step 1
  step_3: z.enum(['yes', 'no']).optional(),
  // ... etc
});
```

---

### File Validation Rules

**Size:** ≤400KB per file  
**Type:** PDF only (`application/pdf`)  
**Naming:** `[document_type]-[person_number].pdf`  
**Content:** PDF header verification (not corrupted)  

**Client-Side Validation:**
```javascript
const fileValidationSchema = z.object({
  file: z.instanceof(File)
    .refine(f => f.type === 'application/pdf', 'Alleen PDF bestanden toegestaan')
    .refine(f => f.size <= 400 * 1024, 'Maximaal 400KB per bestand')
});
```

**Server-Side Validation:** Edge Function `validate-file`

---

### Personal Info Validation

```javascript
const personalInfoSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  dateOfBirth: z.string().refine(val => {
    const age = calculateAge(new Date(val));
    return age >= 18 && age <= 120;
  }, 'Leeftijd moet tussen 18 en 120 jaar zijn'),
  nationality: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/).optional(),
  address: z.string().min(10).max(500)
});
```

---

## Progress Persistence

**Strategy:** Save wizard state to `localStorage` after each step

**Data Stored:**
```javascript
{
  currentStep: 3,
  answers: {
    step_1: 'naturalization',
    step_2: 'yes',
    step_3: 'no'
  },
  applicationType: { id: 'uuid', code: 'NAT_SUR', title: '...' },
  uploadedFiles: [
    { id: 'uuid', document_type_id: 'uuid', file_name: 'passport.pdf' }
  ],
  personalInfo: { firstName: 'Maria', lastName: 'Santos', ... },
  savedAt: '2025-01-20T14:30:00Z'
}
```

**Expiration:** 24 hours (cleared if older)

**Resume Logic:**
```javascript
const loadProgress = () => {
  const saved = localStorage.getItem('wizard_progress');
  if (!saved) return null;
  
  const progress = JSON.parse(saved);
  const hoursSinceSave = (Date.now() - new Date(progress.savedAt)) / (1000 * 60 * 60);
  
  if (hoursSinceSave > 24) {
    localStorage.removeItem('wizard_progress');
    return null;
  }
  
  return progress;
};
```

---

## Error Handling

### User-Friendly Messages

| Error Code | Message (NL) | Message (EN) |
|-----------|--------------|--------------|
| `FILE_TOO_LARGE` | Het bestand is te groot. Maximaal 400KB toegestaan. | File is too large. Max 400KB allowed. |
| `INVALID_FILE_TYPE` | Ongeldig bestandstype. Alleen PDF toegestaan. | Invalid file type. PDF only. |
| `MISSING_DOCUMENT` | Verplicht document ontbreekt: [naam] | Required document missing: [name] |
| `VALIDATION_ERROR` | Sommige velden zijn onjuist ingevuld. | Some fields are incorrectly filled. |
| `NETWORK_ERROR` | Netwerkfout. Controleer uw verbinding. | Network error. Check your connection. |

---

## Testing Scenarios

### Scenario 1: Basic Residence Application (Surinamese Origin)
1. Select "Verblijfsvergunning"
2. Select "Ja" (Surinamese origin)
3. Enter 1 person
4. Upload 7 required documents
5. Fill personal info
6. Submit
7. **Expected:** `VERBLIJF_SUR` application created, 7 files linked, email sent

---

### Scenario 2: Naturalization by Marriage
1. Select "Naturalisatie"
2. Select "Nee" (not Surinamese origin)
3. Select "Getrouwd met Surinaams staatsburger"
4. Enter 1 person
5. Upload 10 required documents (including marriage certificate)
6. Fill personal info
7. Submit
8. **Expected:** `NAT_ART12` application created, 10 files linked

---

### Scenario 3: Multi-Person Residence Application
1. Select "Verblijfsvergunning"
2. Select "Nee" (other origin)
3. Enter 3 people
4. Upload 21 documents (7 per person × 3)
5. Fill personal info
6. Submit
7. **Expected:** `VERBLIJF_OTH` application created, 21 files linked

---

### Scenario 4: Asylum with Missing UNHCR Certificate
1. Select "Asiel"
2. Select "Nee" (no UNHCR certificate)
3. **Expected:** Error message displayed, submission blocked

---

## Performance Considerations

**Target Response Times:**
- Wizard step transition: ≤500ms
- Document checklist generation: ≤300ms
- File upload (400KB): ≤3s
- Submission creation: ≤1s

**Optimization Strategies:**
- Cache `wizard_rules` in localStorage (24hr TTL)
- Preload next wizard step while user answers current step
- Use Web Workers for file validation (client-side)
- Implement request debouncing for real-time validation

---

## Links to Related Documentation

- [Backend Architecture (Database Schema)](./backend-architecture.md)
- [API Reference](./api-reference.md)
- [Admin User Guide](./admin-user-guide.md)
- [Document Reference Index](./DocumentReferenceIndex.md)

---

**Document Control:**  
- Version: 1.0
- Last Updated: 2025-01-20
- Owner: Product Team
- Status: Design Complete — Phase 3 Implementation
