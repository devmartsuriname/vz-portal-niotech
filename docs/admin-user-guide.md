# 📘 Admin User Guide — VZ Juspol Portal 2.0

**Version:** 1.0  
**Last Updated:** 2025-10-22  
**Target Audience:** System Administrators, Content Managers, Case Officers

---

## 📋 Table of Contents

1. [Introduction](#1-introduction)
2. [Login & User Roles](#2-login--user-roles)
3. [Dashboard Overview](#3-dashboard-overview)
4. [Managing Content](#4-managing-content)
5. [System Settings](#5-system-settings)
6. [Security & Best Practices](#6-security--best-practices)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Introduction

The **VZ Juspol Admin Portal** is the backend management system for the Vreemdelingenzaken (Immigration Affairs) digital services platform. It provides tools for:

- Managing citizen applications and submissions
- Publishing and updating content (pages, FAQs, announcements)
- Configuring wizard logic and document requirements
- Monitoring system activity and generating reports
- Managing user roles and permissions

### System Access
- **URL:** `/admin` (appended to your domain)
- **Browser Requirements:** Chrome, Firefox, Safari, or Edge (latest versions)
- **Screen Resolution:** Minimum 1280×720 (optimized for 1920×1080)

---

## 2. Login & User Roles

### 2.1 Accessing the Admin Panel

1. Navigate to `/admin/auth/sign-in`
2. Enter your registered email address
3. Enter your password
4. Click **Sign In**

**Note:** New users must be registered by an existing administrator. Self-registration is disabled for security.

### 2.2 User Roles & Permissions

The system uses three role levels:

| Role | Permissions | Use Case |
|------|-------------|----------|
| **Admin** | Full system access: manage users, settings, content, submissions | System administrators |
| **Moderator** | View and update submissions, manage content | Case officers, content managers |
| **User** | View own submissions only | Public citizens (frontend access) |

**Role Assignment:**  
Only administrators can assign roles via the **Users** module or database.

### 2.3 Password Reset

*Currently manual — contact system administrator*

---

## 3. Dashboard Overview

Upon successful login, you'll see the **Admin Dashboard** with the following sections:

### 3.1 Statistics Cards (Top Row)
- **Totale Aanvragen** — Total applications submitted
- **In Behandeling** — Applications currently under review
- **Goedgekeurd** — Approved applications
- **Afgewezen** — Rejected applications

### 3.2 Charts & Analytics
- **Aanvragen per Maand** — Monthly submission trends (bar chart)
- **Aanvraag Status Verdeling** — Status distribution (donut chart)

### 3.3 Sidebar Navigation

| Module | Purpose |
|--------|---------|
| 📊 **Dashboard** | Overview and statistics |
| 📝 **Aanvragen** (Submissions) | Manage citizen applications |
| 📄 **Vergunningen** (Permits) | Issued permits registry |
| ✉️ **Email Templates** | Configure notification emails |
| 📑 **Content Manager** | Pages, FAQs, Announcements |
| ⚙️ **Settings** | System configuration |
| 👥 **Gebruikers** (Users) | User management |
| 🧙 **Wizard Rules** | Configure application wizard logic |

---

## 4. Managing Content

### 4.1 Submissions (Aanvragen)

**Path:** `/admin/aanvragen`

#### Viewing Submissions
- **All Submissions Table:** Displays reference ID, applicant name, application type, status, and submission date
- **Search:** Filter by name, reference number, or application type
- **Filter by Status:** Draft, Submitted, Under Review, Approved, Rejected

#### Updating a Submission
1. Click on a submission row to view details
2. Review uploaded documents (right panel)
3. Add **Admin Notes** (optional)
4. Update **Status** dropdown:
   - `draft` → Application not yet submitted
   - `submitted` → Awaiting review
   - `under_review` → Currently being processed
   - `approved` → Application accepted
   - `rejected` → Application denied
5. Click **Save Changes**

**Automatic Emails:**  
Status changes trigger notification emails to the applicant (configured in Email Templates).

---

### 4.2 Vergunningen (Permits)

**Path:** `/admin/vergunningen`

#### Adding a New Permit
1. Click **Add New Permit**
2. Fill in required fields:
   - **Code:** Permit type code (e.g., `RV`, `NT`, `AS`)
   - **Agenda Number:** Official reference number
   - **Name:** Applicant surname
   - **Given Names:** Applicant first name(s)
   - **Issued Date:** Date permit was granted
   - **Expires At:** Expiration date (if applicable)
   - **Status:** `active`, `expired`, `revoked`
3. Click **Submit**

#### Managing Existing Permits
- **Search:** By name, agenda number, or code
- **Edit:** Click pencil icon to modify details
- **Delete:** Click trash icon (requires confirmation)

**Note:** Active permits are displayed on the public `/vergunningen` page.

---

### 4.3 Email Templates

**Path:** `/admin/email-templates`

#### Editing a Template
1. Select template from list:
   - `submission_received` — Initial confirmation email
   - `status_update` — Status change notification
   - `document_request` — Request for additional documents
   - `approval_notification` — Application approved
   - `rejection_notification` — Application denied
2. Edit **Subject** and **Body HTML**
3. Use variables:
   - `{{applicant_name}}` — Applicant's full name
   - `{{reference_number}}` — Submission reference ID
   - `{{status}}` — Current application status
   - `{{admin_notes}}` — Notes entered by case officer
4. Preview changes in right panel
5. Click **Save Template**

**Warning:** Do not remove required variables or emails may fail to send.

---

### 4.4 Content Manager

**Path:** `/admin/content`

#### Managing Pages
- **View All Pages:** List of CMS-managed pages
- **Create New Page:**
  1. Click **Add New Page**
  2. Enter **Title** and **Slug** (URL path)
  3. Add **Content** (supports Markdown)
  4. Set **Meta Description** (SEO)
  5. Toggle **Published** status
  6. Click **Save**

#### Managing FAQs
- **Add FAQ:**
  1. Click **Add FAQ**
  2. Enter **Question** and **Answer**
  3. Select **Category** (optional)
  4. Set **Display Order**
  5. Toggle **Published**
  6. Click **Save**

#### Managing Announcements
- **Create Announcement:**
  1. Click **Add Announcement**
  2. Enter **Title** and **Content**
  3. Select **Type:** `info`, `warning`, `success`, `error`
  4. Set **Start Date** and **End Date** (optional)
  5. Toggle **Active**
  6. Click **Save**

**Note:** Active announcements appear on the frontend homepage as alert banners.

---

### 4.5 Wizard Rules Configuration

**Path:** `/admin/wizard`

The wizard is a multi-step questionnaire that determines which application type a citizen needs.

#### Understanding Wizard Rules
Each rule consists of:
- **Question Key:** Unique identifier (e.g., `purpose_of_stay`)
- **Question Text:** Text displayed to user
- **Question Type:** `single_choice`, `multiple_choice`, `yes_no`
- **Options:** Array of possible answers (JSON format)
- **Next Question Map:** Navigation logic (JSON format)
- **Result Application Type:** Final outcome (if terminal question)

#### Editing a Rule
1. Click on a rule from the list
2. Modify **Question Text** or **Options**
3. Update **Next Question Map** to change conditional navigation:
   ```json
   {
     "work": "work_type",
     "study": "study_level",
     "family": "family_relation"
   }
   ```
4. Set **Result Application Type** if this is a terminal question
5. Toggle **Active** status
6. Click **Save**

**Caution:** Incorrect navigation logic can break the wizard flow. Test changes thoroughly.

---

## 5. System Settings

**Path:** `/admin/settings`

### 5.1 General Settings
- **Site Name:** Display name for frontend
- **Contact Email:** Default contact address
- **Office Hours:** Displayed on Contact page
- **Maintenance Mode:** Disable public access temporarily

### 5.2 Application Settings
- **Default Application Fee:** Base processing fee (SRD)
- **Max File Upload Size:** Per-document size limit (MB)
- **Allowed File Types:** Permitted document formats (PDF, JPG, PNG)
- **Processing Time Estimate:** Average days to process application

### 5.3 Email Configuration

**Provider Selection:** Choose between Hostinger SMTP (primary) or Resend API (legacy)

**Hostinger SMTP Settings:**
- Host: `smtp.hostinger.com`
- Port: 587 (TLS) or 465 (SSL)
- Username: Full mailbox address (e.g., `noreply@vz-juspol.sr`)
- Password: Securely encrypted in Vault (shows `••••••••` after saving)
- From Email/Name: Sender information shown to recipients
- Wizard Result Recipient: Destination for all wizard form submissions

**Testing:** Use "Test Email Versturen" to verify configuration before saving.

**Password Management:**
- First time: Enter password, click Save → encrypted in Vault
- Already saved: Password shows as `••••••••`, leave unchanged or enter new password to update
- Test email works with masked password (retrieves from Vault automatically)

**See:** [Email System Documentation](../email-system.md) for detailed setup guide

---

## 6. Security & Best Practices

### 6.1 Role-Based Access Control (RBAC)
- All tables use **Row Level Security (RLS)**
- Users can only access data relevant to their role
- Authentication is required for all admin routes

### 6.2 Data Privacy
- **PII Protection:** Submission data is encrypted at rest
- **Access Logging:** All admin actions are logged in `activity_logs` table
- **Audit Trail:** View user activity via **Activity Logs** (future module)

### 6.3 Best Practices
✅ **Do:**
- Log out when leaving your workstation
- Use strong passwords (min. 12 characters)
- Review submissions promptly (within 24-48 hours)
- Add clear admin notes when changing status

❌ **Don't:**
- Share your login credentials
- Leave sensitive data visible on screen in public areas
- Delete records without approval
- Modify wizard rules without testing

---

## 7. Troubleshooting

### Common Issues

#### 7.1 "Unable to view submissions"
**Cause:** Missing admin role  
**Solution:** Contact system administrator to assign `admin` role to your account

#### 7.2 "File upload failed"
**Cause:** File size exceeds limit or unsupported format  
**Solution:**
- Check file size (max 5MB per document by default)
- Ensure file is PDF, JPG, or PNG format
- Verify storage bucket has sufficient space

#### 7.3 "Email not sending"
**Cause:** Template missing variables or RESEND_API_KEY not configured  
**Solution:**
- Verify template includes all required variables (`{{applicant_name}}`, etc.)
- Check Supabase Edge Functions logs for errors
- Confirm RESEND_API_KEY is set in Secrets

#### 7.4 "Wizard not loading"
**Cause:** JavaScript error or missing wizard rules  
**Solution:**
- Check browser console for errors (F12)
- Verify at least one wizard rule is marked `is_active: true`
- Clear browser cache and reload

---

## 📞 Support & Contact

**Technical Support:**  
Email: support@vreemdelingenzaken.sr  
Phone: +597-XXX-XXXX (Office hours: 08:00-16:00 AST)

**System Administrator:**  
Email: admin@juspol.gov.sr

**Documentation:**  
Full technical documentation available at `/docs/` in project repository

---

**Last Updated:** 2025-10-22  
**Document Version:** 1.0  
**Next Review Date:** 2025-12-22
