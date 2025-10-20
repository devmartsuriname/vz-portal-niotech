# Admin User Guide
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Target Audience:** Admin Users, Moderators, VZ Case Officers  

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Submissions](#managing-submissions)
4. [Document Review](#document-review)
5. [User Management](#user-management)
6. [Content Management](#content-management)
7. [Wizard Configuration](#wizard-configuration)
8. [Reports & Analytics](#reports--analytics)
9. [System Settings](#system-settings)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Admin Portal

1. Navigate to: `https://vreemdelingenzaken.juspol.sr/admin/auth/sign-in`
2. Enter your email and password
3. Click **"Inloggen"** (Sign In)

**First-Time Login:**
- You will receive credentials from the system administrator
- Change your password immediately after first login
- Enable two-factor authentication (if available)

---

### Dashboard Orientation

After login, you will see the **Dashboard** with:
- **Stat Cards** — Total, Pending, Approved, Rejected submissions
- **Recent Submissions Table** — Last 10 applications
- **Status Distribution Chart** — Pie chart showing submission breakdown
- **Processing Time Trends** — Line chart (future feature)

**Navigation Sidebar (Left):**
- 🏠 Dashboard
- 📋 Aanvragen (Applications)
- 📄 Documenten (Documents)
- 🧙 Wizard Configuratie (Wizard Config)
- 👥 Gebruikers (Users)
- 📝 Content Beheer (Content Management)
- 📊 Rapporten (Reports)
- ⚙️ Instellingen (Settings)

---

## Dashboard Overview

### Stat Cards

**Total Submissions:**  
Shows the total number of applications submitted since system launch.

**Pending Review:**  
Applications with status `SUBMITTED` or `UNDER_REVIEW` that require action.

**Approved:**  
Applications with status `APPROVED` or `COMPLETED`.

**Rejected:**  
Applications with status `REJECTED`.

### Recent Submissions Table

Displays the 10 most recent submissions with:
- **Agenummer** — Unique agenda number (e.g., VZ-2025-000001)
- **Naam** — Applicant's full name
- **Type** — Application type (e.g., Verblijf, Naturalisatie)
- **Datum** — Submission date
- **Status** — Current status with color badge
- **Actie** — Quick action button (👁️ View)

**Quick Actions:**
- Click 👁️ icon to view submission details
- Hover over status badge to see status notes

---

## Managing Submissions

### Viewing Submissions List

1. Click **"Aanvragen"** in sidebar
2. You will see a searchable, filterable table

**Search & Filters:**
- **Search by:** Agenda number, name, email
- **Filter by Status:** All, Pending, Under Review, Approved, Rejected
- **Filter by Type:** Residence, Naturalization, Declaration, etc.
- **Date Range:** Select start and end dates

**Table Columns:**
- Agenummer
- Naam
- Type
- Email
- Telefoon
- Datum Ingediend
- Status
- Actie

**Pagination:**
- Default: 25 submissions per page
- Options: 10, 25, 50, 100 per page
- Navigate: Previous, 1, 2, 3..., Next

---

### Viewing Submission Details

1. Click **👁️ View** on any submission
2. Submission Details page opens

**Page Sections:**

**1. Applicant Information**
- Full Name
- Date of Birth
- Nationality
- Email
- Phone
- Address

**2. Application Information**
- Application Type (e.g., Verblijf - Surinaamse origine)
- Agenda Number
- Status
- Fee Amount
- Processing Days (estimated)
- Submitted Date
- Reviewed By (admin name, if reviewed)
- Reviewed Date

**3. Wizard Answers**
- Question: "Wat wilt u aanvragen?" → Answer: "Verblijfsvergunning"
- Question: "Bent u van Surinaamse origine?" → Answer: "Ja"
- Number of People: 1

**4. Uploaded Documents**
Table showing:
- Document Name (e.g., Paspoort)
- File Name (e.g., passport.pdf)
- File Size (e.g., 350KB)
- Upload Date
- Validation Status (Pending, Valid, Invalid)
- Actions (📥 Download, 👁️ Preview)

**5. Admin Notes**
Text area for internal notes (not visible to applicant)

**6. Status Update Section**
- Dropdown to change status
- Text area for status notes (sent to applicant via email)
- **Save Changes** button

---

### Updating Submission Status

**Step-by-Step:**

1. Open submission details
2. Scroll to **"Status Bijwerken"** (Update Status) section
3. Select new status from dropdown:
   - **SUBMITTED** — Initial state (auto-set on submission)
   - **UNDER_REVIEW** — You are currently reviewing
   - **ADDITIONAL_INFO** — Waiting for additional info from applicant
   - **APPROVED** — Application approved
   - **REJECTED** — Application rejected
   - **COMPLETED** — Process fully completed
4. Enter notes in **"Status Opmerkingen"** field (optional but recommended)
5. Click **"Status Bijwerken"** button
6. System will:
   - Update submission record
   - Send email notification to applicant
   - Log admin action

**Example Status Notes:**
- ✅ "Alle documenten zijn gecontroleerd en goedgekeurd"
- ❌ "Geboorteakte mist beëdigde vertaling. Graag opnieuw indienen."
- ⚠️ "Wachten op verificatie van UNHCR-certificaat"

---

## Document Review

### Viewing Uploaded Documents

From Submission Details page:
1. Scroll to **"Geüploade Documenten"** section
2. Table shows all uploaded files

**Document Validation Status:**
- 🟡 **Pending** — Not yet reviewed
- 🟢 **Valid** — Approved by admin
- 🔴 **Invalid** — Rejected (see notes)

### Downloading Documents

1. Click **📥 Download** icon next to file
2. PDF opens in new tab or downloads to your computer

### Previewing Documents

1. Click **👁️ Preview** icon
2. PDF preview opens in modal overlay
3. Review document quality, completeness
4. Close modal when done

### Validating Documents

**Manual Validation Steps:**

1. Download/preview document
2. Check:
   - ✅ Correct document type (e.g., passport, not driver's license)
   - ✅ Legible scan quality (no blurriness)
   - ✅ Valid date (not expired, if applicable)
   - ✅ Translation included (if required)
   - ✅ All pages included (for multi-page docs)
3. Update validation status:
   - If valid → Change to **"Valid"**
   - If invalid → Change to **"Invalid"** and add notes
4. Save changes

**Example Validation Notes:**
- ❌ "Paspoort is verlopen. Geldig tot 2023-05-10. Nieuwe kopie vereist."
- ❌ "Geboorteakte mist beëdigde vertaling naar het Nederlands."
- ❌ "Scan is onleesbaar. Graag opnieuw scannen met hogere resolutie."

---

## User Management

### Viewing Users

1. Click **"Gebruikers"** in sidebar
2. User list table displays:
   - Email
   - Role (Admin, Moderator, Viewer)
   - Status (Active, Inactive)
   - Last Login
   - Actions

### Adding New User

**⚠️ Only Admins can add users**

1. Click **"Nieuwe Gebruiker"** button
2. Fill in form:
   - **Email** — User's official work email
   - **Role** — Select: Admin, Moderator, or Viewer
3. Click **"Uitnodiging Versturen"** (Send Invitation)
4. User receives email with setup link
5. User sets their own password

**Role Permissions:**

| Permission | Admin | Moderator | Viewer |
|-----------|-------|-----------|--------|
| View submissions | ✅ | ✅ | ✅ |
| Update submission status | ✅ | ✅ | ❌ |
| Validate documents | ✅ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| Manage content (CMS) | ✅ | ✅ | ❌ |
| Configure wizard | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | ✅ |
| System settings | ✅ | ❌ | ❌ |

### Changing User Roles

1. Find user in list
2. Click **✏️ Edit** icon
3. Select new role from dropdown
4. Click **"Opslaan"** (Save)
5. User receives email notification of role change

### Deactivating Users

**⚠️ Only Admins can deactivate users**

1. Find user in list
2. Click **🚫 Deactivate** button
3. Confirm action in modal
4. User can no longer log in
5. User's past actions remain in audit log

---

## Content Management

### Managing Pages

**Purpose:** Edit static pages like "About", "Instructions", "Privacy"

1. Click **"Content Beheer"** → **"Pagina's"** (Pages)
2. Page list displays:
   - Slug (URL path, e.g., `/over-ons`)
   - Title
   - Status (Published, Draft)
   - Last Updated
   - Actions

**Editing a Page:**
1. Click **✏️ Edit** icon
2. WYSIWYG editor opens
3. Edit content (headings, paragraphs, lists, images)
4. Update SEO metadata:
   - **Meta Title** (for search engines)
   - **Meta Description** (max 160 characters)
   - **Keywords** (comma-separated)
5. Toggle **"Gepubliceerd"** (Published) switch
6. Click **"Opslaan"** (Save)

---

### Managing FAQs

**Purpose:** Add, edit, delete FAQ items

1. Click **"Content Beheer"** → **"FAQ"**
2. FAQ list displays:
   - Question
   - Category (General, Documents, Fees, etc.)
   - Status (Active, Inactive)
   - Display Order
   - Actions

**Adding New FAQ:**
1. Click **"Nieuwe FAQ"** button
2. Fill in form:
   - **Vraag** (Question) — Clear, concise question
   - **Antwoord** (Answer) — Detailed answer (supports Markdown)
   - **Categorie** — Select or create category
   - **Weergavevolgorde** — Display order (1 = first)
3. Click **"Opslaan"**

**Editing FAQ:**
1. Click **✏️ Edit** icon
2. Update question, answer, or category
3. Click **"Opslaan"**

**Deleting FAQ:**
1. Click **🗑️ Delete** icon
2. Confirm deletion in modal
3. FAQ removed from public site

---

### Managing Announcements

**Purpose:** Create news posts and policy updates

1. Click **"Content Beheer"** → **"Aankondigingen"**
2. Announcements list displays:
   - Title
   - Category (Beleid, Nieuws, Feestdag)
   - Published Date
   - Status (Published, Draft)
   - Actions

**Creating New Announcement:**
1. Click **"Nieuwe Aankondiging"** button
2. Fill in form:
   - **Titel** — Headline
   - **Samenvatting** (Excerpt) — Brief summary (150 characters)
   - **Inhoud** (Content) — Full article (WYSIWYG editor)
   - **Categorie** — Select category
   - **Featured Image** — Upload image (recommended: 600×400px)
   - **Gepubliceerd** — Toggle to publish immediately or save as draft
3. Click **"Opslaan"**

**Scheduling Announcements:**
- Set **"Publicatiedatum"** (Publication Date) to future date
- Announcement will appear on public site on that date

---

## Wizard Configuration

**⚠️ Advanced Feature — Only Admins with technical knowledge**

### Overview

The Wizard Configuration interface allows you to:
- Add, edit, delete wizard questions
- Configure conditional logic (if/then rules)
- Map questions to application type outcomes
- Test wizard flow

### Viewing Decision Tree

1. Click **"Wizard Configuratie"** in sidebar
2. Visual tree diagram displays:
   - Root question (Step 1)
   - Branching paths (Steps 2-8)
   - Outcomes (application types)

### Adding New Question

**Example: Add question for "Married to Surinamese citizen?"**

1. Click **"Nieuwe Vraag"** button
2. Fill in form:
   - **Step Number** — 8 (or next available)
   - **Question Text** — "Bent u getrouwd met een Surinaams staatsburger?"
   - **Question Type** — Single Choice
   - **Parent Step** — 3 (Naturalization branch)
   - **Help Text** — Additional guidance for users
3. Add **Options**:
   - Option 1: Value = `yes`, Label = `Ja`, Next Step = (empty), Result = `NAT_ART12`
   - Option 2: Value = `no`, Label = `Nee`, Next Step = 9 (or another question)
4. Click **"Opslaan"**

### Editing Existing Question

1. Click question node in tree diagram
2. Edit form appears
3. Update question text, options, or logic
4. Click **"Opslaan"**

### Testing Wizard Flow

1. Click **"Test Wizard"** button
2. Wizard opens in preview mode
3. Answer questions as a user would
4. Verify correct application type determined
5. Check document checklist generated correctly

**Common Issues:**
- ❌ Question not appearing → Check parent_step reference
- ❌ Wrong application type outcome → Verify options `result` field
- ❌ Document not appearing → Check `application_documents` mapping

---

## Reports & Analytics

### Viewing Reports

1. Click **"Rapporten"** in sidebar
2. Select report type:
   - **Submission Statistics**
   - **Document Analysis**
   - **User Activity**
   - **Performance Metrics**

---

### Submission Statistics Report

**Filters:**
- Date Range (Last 7 days, Last 30 days, Last 12 months, Custom)
- Application Type (All, Residence, Naturalization, etc.)
- Status (All, Approved, Rejected)

**Metrics Displayed:**
- Total Submissions (count)
- Approval Rate (percentage)
- Rejection Rate (percentage)
- Average Processing Time (days)
- Submissions by Month (bar chart)
- Application Type Distribution (pie chart)

**Exporting:**
- Click **"Exporteren naar CSV"** button
- File downloads with all data points

---

### Document Analysis Report

Shows:
- Most Frequently Required Documents (bar chart)
- Document Validation Failure Rate (percentage per document type)
- Translation Requirements Overview (how many docs need translation)

**Use Case:** Identify bottlenecks (e.g., if 60% of birth certificates fail validation, improve instructions)

---

### User Activity Report

**⚠️ Admin Only**

Shows:
- Admin Login History (timestamp, IP address)
- Actions Performed (approvals, rejections, status changes)
- Average Response Time (how long admin takes to review submission)

**Privacy Note:** This data is logged for audit purposes only.

---

## System Settings

**⚠️ Admin Only**

### General Settings

1. Click **"Instellingen"** → **"Algemeen"**
2. Configure:
   - **System Name** — "Vreemdelingenzaken Juspol Portal"
   - **Contact Email** — info@juspol.sr
   - **Office Hours** — Maandag-Vrijdag: 08:00-15:00
   - **Default Language** — Nederlands (NL)

---

### Email Settings

Configure email notifications:
- **SMTP Host** — e.g., smtp.gmail.com
- **SMTP Port** — e.g., 587
- **SMTP Username** — email account
- **SMTP Password** — encrypted password
- **Sender Name** — "VZ Juspol"
- **Sender Email** — noreply@juspol.sr

**Email Templates:**
- Submission Confirmation
- Status Update Notification
- Rejection Notification

**Testing:**
- Click **"Testmail Versturen"** to send test email

---

### Application Settings

Configure application rules:
- **Default Processing Times** (per application type)
- **Fee Amounts** (in SRD)
- **File Upload Limits** — Currently 400KB (change with caution)
- **Allowed File Types** — PDF only (do not change)

---

### Security Settings

- **Session Timeout** — Default: 24 hours
- **Password Requirements** — Min 8 characters, uppercase, lowercase, number
- **Two-Factor Authentication** — Enable/Disable (future feature)
- **IP Whitelist** — Restrict admin access to specific IPs (optional)

---

## Troubleshooting

### Issue: Cannot Log In

**Symptoms:**
- "Invalid email or password" error

**Solutions:**
1. Verify email address is correct (case-sensitive)
2. Check Caps Lock is off
3. Click **"Wachtwoord Vergeten"** (Forgot Password) to reset
4. Contact system administrator if issue persists

---

### Issue: Submission Not Appearing in List

**Symptoms:**
- User reports submission, but you don't see it

**Solutions:**
1. Check filters — Ensure "All Statuses" selected
2. Search by agenda number or email
3. Check date range filter — Expand to "All Time"
4. Query database directly (technical admin only)

---

### Issue: Email Notifications Not Sending

**Symptoms:**
- Applicants not receiving confirmation emails

**Solutions:**
1. Go to **Instellingen → Email**
2. Click **"Testmail Versturen"** to test SMTP connection
3. Check spam folder (ask applicant)
4. Verify Edge Function `send-submission-notification` is deployed
5. Check Edge Function logs for errors

---

### Issue: Document Won't Download

**Symptoms:**
- Click download icon, nothing happens

**Solutions:**
1. Check browser console for errors (F12 → Console tab)
2. Verify you have permission to view this submission
3. Check file still exists in Supabase Storage (technical admin only)
4. Try different browser (Chrome, Firefox)

---

### Issue: Wizard Configuration Changes Not Saving

**Symptoms:**
- Edit wizard question, click Save, changes revert

**Solutions:**
1. Check you have Admin role (only Admins can edit wizard)
2. Verify form validation — All required fields filled
3. Check browser console for errors
4. Clear browser cache and retry

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open search |
| `Ctrl + S` | Save changes (in forms) |
| `Esc` | Close modal |
| `/` | Focus search bar |

---

## Support & Contact

**Technical Issues:**  
Email: support@lovable.dev (for Lovable Cloud issues)  
Email: it@juspol.sr (for VZ-specific issues)

**Training:**  
Contact your supervisor to schedule training sessions.

**Feedback:**  
Submit feature requests via the "Feedback" button in the bottom-right corner.

---

## Appendix: Glossary

- **Agenda Number** — Unique identifier (e.g., VZ-2025-000001)
- **RLS** — Row Level Security (database access control)
- **Edge Function** — Serverless function running on Supabase
- **WYSIWYG** — What You See Is What You Get (visual editor)
- **CMS** — Content Management System

---

**Document Control:**  
- Version: 1.0
- Last Updated: 2025-01-20
- Owner: Product Team
- Feedback: admin-feedback@vz.juspol.sr
