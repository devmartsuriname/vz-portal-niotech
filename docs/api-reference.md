# API Reference
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Status:** ✅ IMPLEMENTED (Phase 3 Complete)  

---

## Base URL

**Production:** `https://aexfhtrvblxjydnvtejr.supabase.co`  
**Local Development:** `http://localhost:54321`

---

## Authentication

All authenticated endpoints require a valid JWT token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

**How to Obtain Token:**
1. Sign in via `/auth/v1/token?grant_type=password`
2. Token returned in response body
3. Token stored in client (localStorage or cookie)
4. Token automatically refreshed by Supabase client

---

## REST API Endpoints (PostgREST)

### Base Pattern
```
GET    /rest/v1/{table}           - List records
GET    /rest/v1/{table}?id=eq.X   - Get single record
POST   /rest/v1/{table}           - Create record
PATCH  /rest/v1/{table}?id=eq.X   - Update record
DELETE /rest/v1/{table}?id=eq.X   - Delete record
```

---

## 1. Application Types

### GET /rest/v1/application_types

**Description:** Fetch all active application types  
**Authentication:** None (public)  
**RLS Policy:** `active = TRUE`

**Query Parameters:**
- `select` — Columns to return (default: `*`)
- `active=eq.true` — Filter active types
- `order=display_order.asc` — Sort by display order

**Example Request:**
```http
GET /rest/v1/application_types?select=*&active=eq.true&order=display_order.asc
```

**Example Response:**
```json
[
  {
    "id": "uuid-1",
    "code": "VERBLIJF_SUR",
    "category": "VERBLIJF",
    "title": "Verblijf (Surinaamse origine)",
    "description": "Verblijfsvergunning voor personen van Surinaamse origine",
    "processing_days": 30,
    "fee_amount": 500.00,
    "active": true,
    "display_order": 1,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z"
  },
  ...
]
```

---

## 2. Document Types

### GET /rest/v1/document_types

**Description:** Fetch all document types  
**Authentication:** None (public)  
**RLS Policy:** Anyone can view

**Query Parameters:**
- `select` — Columns to return
- `category=eq.Identity` — Filter by category

**Example Request:**
```http
GET /rest/v1/document_types?select=id,code,title,translation_required,max_size_kb
```

**Example Response:**
```json
[
  {
    "id": "uuid-1",
    "code": "PASSPORT",
    "title": "Paspoort (houderpagina)",
    "translation_required": false,
    "max_size_kb": 400
  },
  ...
]
```

---

## 3. Application Documents (Junction Table)

### GET /rest/v1/application_documents

**Description:** Fetch document requirements for application types  
**Authentication:** None (public)  
**RLS Policy:** Anyone can view

**Query Parameters:**
- `application_type_id=eq.{uuid}` — Filter by application type
- `select=*,document_types(*)` — Include related document type data

**Example Request:**
```http
GET /rest/v1/application_documents?application_type_id=eq.uuid-1&select=*,document_types(*)&order=display_order.asc
```

**Example Response:**
```json
[
  {
    "id": "uuid-1",
    "application_type_id": "uuid-1",
    "document_type_id": "uuid-10",
    "required": true,
    "per_person": true,
    "conditional_rule": null,
    "display_order": 1,
    "document_types": {
      "id": "uuid-10",
      "code": "PASSPORT",
      "title": "Paspoort (houderpagina)",
      "description": "Kopie van geldige paspoort met foto",
      "category": "Identity",
      "max_size_kb": 400,
      "translation_required": false
    }
  },
  ...
]
```

---

## 4. Wizard Rules

### GET /rest/v1/wizard_rules

**Description:** Fetch wizard questions for decision tree  
**Authentication:** None (public)  
**RLS Policy:** Anyone can view

**Query Parameters:**
- `is_start_question=eq.true` — Get root question
- `parent_step=eq.1` — Get child questions
- `order=step_number.asc` — Sort by step order

**Example Request:**
```http
GET /rest/v1/wizard_rules?is_start_question=eq.true
```

**Example Response:**
```json
[
  {
    "id": "uuid-1",
    "step_number": 1,
    "question": "Wat wilt u aanvragen?",
    "question_type": "single_choice",
    "options": [
      {"value": "residence", "label": "Verblijfsvergunning", "next_step": 2},
      {"value": "naturalization", "label": "Naturalisatie", "next_step": 3}
    ],
    "is_start_question": true,
    "help_text": "Selecteer het type aanvraag"
  }
]
```

---

## 5. Submissions

### POST /rest/v1/submissions

**Description:** Create new application submission  
**Authentication:** None (public can create)  
**RLS Policy:** Anyone can insert

**Request Body:**
```json
{
  "application_type_id": "uuid-1",
  "status": "SUBMITTED",
  "first_name": "Maria",
  "last_name": "Santos",
  "date_of_birth": "1988-05-15",
  "nationality": "Brazilian",
  "email": "maria.santos@example.com",
  "phone": "+5975551234",
  "address": "Waterkant 123, Paramaribo",
  "wizard_answers": {
    "step_1": "residence",
    "step_2": "yes",
    "number_of_people": 1
  },
  "additional_notes": null
}
```

**Example Response:**
```json
{
  "id": "uuid-submission-1",
  "agenda_number": "VZ-2025-000001",
  "application_type_id": "uuid-1",
  "status": "SUBMITTED",
  "first_name": "Maria",
  "last_name": "Santos",
  "email": "maria.santos@example.com",
  "submitted_at": "2025-01-20T14:30:00Z",
  "created_at": "2025-01-20T14:25:00Z"
}
```

---

### GET /rest/v1/submissions

**Description:** Fetch submissions (RLS-filtered by email or admin role)  
**Authentication:** Optional (anonymous can query by email via custom header)  
**RLS Policy:** Users see own submissions (by email), admins see all

**Query Parameters:**
- `email=eq.maria@example.com` — Filter by email (for user lookup)
- `status=eq.SUBMITTED` — Filter by status (admin only)
- `select=*,application_types(title)` — Include related data

**Example Request (User):**
```http
GET /rest/v1/submissions?email=eq.maria@example.com&select=*,application_types(title)
```

**Example Request (Admin):**
```http
GET /rest/v1/submissions?status=eq.SUBMITTED&select=*,application_types(title)&order=created_at.desc
Authorization: Bearer <admin_token>
```

**Example Response:**
```json
[
  {
    "id": "uuid-1",
    "agenda_number": "VZ-2025-000001",
    "status": "SUBMITTED",
    "first_name": "Maria",
    "last_name": "Santos",
    "email": "maria.santos@example.com",
    "submitted_at": "2025-01-20T14:30:00Z",
    "application_types": {
      "title": "Verblijf (Surinaamse origine)"
    }
  }
]
```

---

### PATCH /rest/v1/submissions

**Description:** Update submission status (admin only)  
**Authentication:** Required (admin role)  
**RLS Policy:** Admin only

**Request Body:**
```json
{
  "status": "APPROVED",
  "status_notes": "Alle documenten zijn goedgekeurd",
  "reviewed_by": "uuid-admin-user",
  "reviewed_at": "2025-01-22T10:00:00Z"
}
```

**Example Request:**
```http
PATCH /rest/v1/submissions?id=eq.uuid-1
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "APPROVED",
  "status_notes": "Goedgekeurd na verificatie"
}
```

---

## 6. Submission Files

### POST /rest/v1/submission_files

**Description:** Create file metadata record (after upload to Storage)  
**Authentication:** None (public can insert if linked to own submission)  
**RLS Policy:** User can insert files for own submissions

**Request Body:**
```json
{
  "submission_id": "uuid-submission-1",
  "document_type_id": "uuid-doc-type-1",
  "file_name": "passport.pdf",
  "file_path": "submission-files/uuid-submission-1/passport-1.pdf",
  "file_size_kb": 350,
  "mime_type": "application/pdf",
  "uploaded_by_person": 1
}
```

**Example Response:**
```json
{
  "id": "uuid-file-1",
  "submission_id": "uuid-submission-1",
  "document_type_id": "uuid-doc-type-1",
  "file_name": "passport.pdf",
  "file_path": "submission-files/uuid-submission-1/passport-1.pdf",
  "file_size_kb": 350,
  "validation_status": "pending",
  "uploaded_at": "2025-01-20T14:35:00Z"
}
```

---

### GET /rest/v1/submission_files

**Description:** Fetch files for a submission  
**Authentication:** Optional (RLS-filtered)  
**RLS Policy:** Users see files for own submissions, admins see all

**Query Parameters:**
- `submission_id=eq.{uuid}` — Filter by submission
- `select=*,document_types(title)` — Include document type info

**Example Request:**
```http
GET /rest/v1/submission_files?submission_id=eq.uuid-1&select=*,document_types(title)
```

**Example Response:**
```json
[
  {
    "id": "uuid-file-1",
    "file_name": "passport.pdf",
    "file_path": "submission-files/uuid-1/passport-1.pdf",
    "file_size_kb": 350,
    "validation_status": "valid",
    "document_types": {
      "title": "Paspoort (houderpagina)"
    }
  }
]
```

---

## 7. Storage API (Supabase Storage)

### POST /storage/v1/object/submission-files/{path}

**Description:** Upload file to storage bucket  
**Authentication:** None (public can upload)  
**Storage Policy:** Anyone can upload to `submission-files`

**Request Headers:**
- `Content-Type: application/pdf`
- `apikey: <anon_key>`

**Request Body:** Binary file data

**Example Request (JavaScript):**
```javascript
const { data, error } = await supabase.storage
  .from('submission-files')
  .upload(`${submissionId}/passport-1.pdf`, file, {
    contentType: 'application/pdf'
  });
```

**Example Response:**
```json
{
  "Key": "submission-files/uuid-1/passport-1.pdf",
  "Id": "uuid-storage-object"
}
```

---

### GET /storage/v1/object/submission-files/{path}

**Description:** Download file from storage  
**Authentication:** None (RLS-filtered by submission ownership)  
**Storage Policy:** Users can download own files, admins can download all

**Example Request:**
```http
GET /storage/v1/object/submission-files/uuid-1/passport-1.pdf
apikey: <anon_key>
```

**Example Response:** Binary PDF file

---

## Edge Functions

### 1. send-submission-notification

**Endpoint:** `/functions/v1/send-submission-notification`  
**Method:** POST  
**Authentication:** None (invoked by server-side trigger)

**Request Body:**
```json
{
  "submissionId": "uuid-1"
}
```

**Response:**
```json
{
  "success": true,
  "emailSent": {
    "applicant": true,
    "admin": true
  }
}
```

**Errors:**
- `400` — Missing `submissionId`
- `404` — Submission not found
- `500` — Email service error

---

### 2. validate-file

**Endpoint:** `/functions/v1/validate-file`  
**Method:** POST  
**Authentication:** None (invoked by server-side trigger)

**Request Body:**
```json
{
  "fileId": "uuid-file-1"
}
```

**Response:**
```json
{
  "valid": true,
  "issues": []
}
```

**Error Response:**
```json
{
  "valid": false,
  "issues": [
    "File size (450KB) exceeds maximum (400KB)",
    "Invalid file type: image/jpeg. Only PDF allowed."
  ]
}
```

---

### 3. evaluate-wizard

**Endpoint:** `/functions/v1/evaluate-wizard`  
**Method:** POST  
**Authentication:** None (public)

**Request Body:**
```json
{
  "answers": [
    {"step_number": 1, "answer_value": "residence"},
    {"step_number": 2, "answer_value": "yes"}
  ]
}
```

**Response:**
```json
{
  "application_type": {
    "id": "uuid-1",
    "code": "VERBLIJF_SUR",
    "title": "Verblijf (Surinaamse origine)",
    "fee_amount": 500.00
  },
  "required_documents": [
    {
      "id": "uuid-doc-1",
      "code": "PASSPORT",
      "title": "Paspoort (houderpagina)",
      "required": true,
      "per_person": true,
      "max_size_kb": 400,
      "translation_required": false
    },
    ...
  ]
}
```

**Errors:**
- `400` — Invalid wizard answers
- `404` — No matching application type found

---

### 4. send-status-update-notification

**Endpoint:** `/functions/v1/send-status-update-notification`  
**Method:** POST  
**Authentication:** Required (admin only)

**Request Body:**
```json
{
  "submissionId": "uuid-1",
  "newStatus": "APPROVED"
}
```

**Response:**
```json
{
  "success": true,
  "emailSent": true,
  "recipient": "maria.santos@example.com"
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "constraint": "not_null"
    }
  }
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Record fetched successfully |
| 201 | Created | Submission created |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions (RLS block) |
| 404 | Not Found | Record does not exist |
| 409 | Conflict | Unique constraint violation |
| 500 | Server Error | Database error |

---

## Rate Limiting

**Current:** No rate limiting (to be implemented in Phase 5)

**Planned Limits:**
- Public endpoints: 100 requests/minute per IP
- Authenticated endpoints: 500 requests/minute per user
- File uploads: 10 uploads/minute per IP

---

## Pagination

**PostgREST Pagination (Range Header):**

```http
GET /rest/v1/submissions?limit=10&offset=20
Range: 0-9
```

**Response Headers:**
```
Content-Range: 20-29/150
```

**Example (JavaScript):**
```javascript
const { data, count } = await supabase
  .from('submissions')
  .select('*', { count: 'exact' })
  .range(0, 9);
```

---

## CORS Configuration

**Allowed Origins:** `*` (all origins allowed for public portal)  
**Allowed Methods:** `GET, POST, PATCH, DELETE, OPTIONS`  
**Allowed Headers:** `Authorization, Content-Type, apikey, x-client-info`

---

## Example: Complete Submission Flow

### Step 1: Fetch Wizard Rules
```http
GET /rest/v1/wizard_rules?is_start_question=eq.true
```

### Step 2: Evaluate Wizard Answers
```http
POST /functions/v1/evaluate-wizard
Content-Type: application/json

{
  "answers": [
    {"step_number": 1, "answer_value": "residence"},
    {"step_number": 2, "answer_value": "yes"}
  ]
}
```

### Step 3: Upload Documents
```javascript
for (const doc of requiredDocuments) {
  const { data, error } = await supabase.storage
    .from('submission-files')
    .upload(`${tempId}/${doc.code}-1.pdf`, file);
}
```

### Step 4: Create Submission
```http
POST /rest/v1/submissions
Content-Type: application/json

{
  "application_type_id": "uuid-1",
  "status": "SUBMITTED",
  "first_name": "Maria",
  "last_name": "Santos",
  ...
}
```

### Step 5: Link Files to Submission
```http
POST /rest/v1/submission_files
Content-Type: application/json

{
  "submission_id": "uuid-submission-1",
  "document_type_id": "uuid-doc-1",
  "file_path": "submission-files/uuid-1/passport-1.pdf",
  ...
}
```

### Step 6: Trigger Notification
```http
POST /functions/v1/send-submission-notification
Content-Type: application/json

{
  "submissionId": "uuid-submission-1"
}
```

---

## 9. Wizard Hooks

The wizard implementation provides three custom React hooks for managing the multi-step application flow.

---

### useWizardRules()

**Description:** Fetches and caches wizard rules (questions) from the database  
**Return Type:** `{ data, error, isLoading }` (React Query result)

**Example Usage:**
```javascript
import { useWizardRules } from '@/hooks/useWizardRules';

function WizardComponent() {
  const { data: rules, isLoading, error } = useWizardRules();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading wizard rules</div>;
  
  return <div>{rules.length} questions loaded</div>;
}
```

**Helper Functions:**

**`getNextQuestionKey(currentRule, selectedAnswer)`**  
Returns the next question key based on the current rule and user's selected answer.

**`getRuleByQuestionKey(rules, questionKey)`**  
Finds and returns a specific rule by its question key.

**Example:**
```javascript
import { getNextQuestionKey, getRuleByQuestionKey } from '@/hooks/useWizardRules';

const currentRule = rules.find(r => r.question_key === 'step_1');
const selectedAnswer = 'residence';
const nextKey = getNextQuestionKey(currentRule, selectedAnswer);
const nextRule = getRuleByQuestionKey(rules, nextKey);
```

---

### useWizardState()

**Description:** Manages wizard navigation state with localStorage persistence  
**Return Type:** Object with state and navigation functions

**Returned Values:**
```javascript
{
  currentStep: number,           // Current step index (0-based)
  answers: object,               // Map of question keys to user answers
  questionPath: array,           // Array of visited question keys
  isComplete: boolean,           // Whether wizard is complete
  currentQuestionKey: string,    // Current question key (e.g., 'step_1')
  canGoBack: boolean,           // Whether user can navigate back
  updateAnswer: (key, value) => void,
  goToNextStep: (nextKey) => void,
  goToPreviousStep: () => void,
  resetWizard: () => void,
  completeWizard: () => void
}
```

**Example Usage:**
```javascript
import { useWizardState } from '@/hooks/useWizardState';

function WizardFlow() {
  const {
    currentStep,
    answers,
    currentQuestionKey,
    canGoBack,
    updateAnswer,
    goToNextStep,
    goToPreviousStep
  } = useWizardState();
  
  const handleAnswer = (value) => {
    updateAnswer(currentQuestionKey, value);
    const nextKey = determineNextQuestion(value);
    goToNextStep(nextKey);
  };
  
  return (
    <div>
      <h2>Step {currentStep + 1}</h2>
      {canGoBack && (
        <button onClick={goToPreviousStep}>Back</button>
      )}
      {/* Render current question */}
    </div>
  );
}
```

**Progress Persistence:**
- Automatically saves progress to `localStorage` after each step
- Progress expires after 24 hours
- Restored automatically on page reload

---

### useWizardSubmission()

**Description:** Handles wizard evaluation and final submission  
**Return Type:** Object with submission functions and state

**Returned Values:**
```javascript
{
  submitApplication: (wizardData) => Promise<submissionId>,
  evaluateWizard: (answers) => Promise<result>,
  isSubmitting: boolean,
  submissionId: string | null
}
```

**Example Usage:**
```javascript
import { useWizardSubmission } from '@/hooks/useWizardSubmission';

function SubmissionStep() {
  const { submitApplication, isSubmitting } = useWizardSubmission();
  
  const handleSubmit = async () => {
    try {
      const submissionId = await submitApplication({
        answers: wizardAnswers,
        personalInfo: {
          firstName: 'Maria',
          lastName: 'Santos',
          email: 'maria@example.com',
          // ...
        },
        files: uploadedFiles
      });
      
      // Navigate to confirmation page
      navigate(`/confirmation/${submissionId}`);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };
  
  return (
    <button onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit Application'}
    </button>
  );
}
```

**Submission Process:**
1. Evaluates wizard answers via `evaluate-wizard` Edge Function
2. Creates authenticated user session (or signs up if needed)
3. Creates submission record in database
4. Uploads all files to storage
5. Links files to submission via `submission_files` table
6. Triggers email notification via `send-submission-notification`

---

## Links to Related Documentation

- [Backend Architecture](./backend-architecture.md)
- [Wizard Logic](./wizard-logic.md)
- [Admin User Guide](./admin-user-guide.md)

---

**Document Control:**  
- Version: 1.0
- Last Updated: 2025-01-20
- Owner: Backend Development Team
- Status: Design Complete — Phase 2-3 Implementation
