# 🧪 Phase 2.2 Testing Guide
**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-10-21

## 📋 Overview
This document provides step-by-step instructions for testing all Phase 2.2 backend functionality, including authentication, role-based access, submissions, and Edge Functions.

---

## 👥 Test User Accounts

### Current Test Accounts

| Email | Password | Role | User ID | Status |
|-------|----------|------|---------|--------|
| info@devmart.sr | (your password) | **admin** | 93efb951-9a59-41bd-af96-a350a88d97ca | ✅ Active |

### Creating Additional Test Users

To create moderator and regular user accounts:

1. **Open the Sign-Up Page:**
   - Navigate to `/admin/auth/sign-up`
   - Or click "Create Account" from sign-in page

2. **Create Test Accounts:**
   
   **Moderator Account:**
   - Email: `moderator@test.local`
   - Password: `TestMod123!`
   
   **Regular User Account:**
   - Email: `user@test.local`
   - Password: `TestUser123!`

3. **Assign Roles via SQL:**
   
   After creating the accounts, run this SQL in Lovable Cloud backend:
   
   ```sql
   -- Get the new user IDs
   SELECT id, email FROM auth.users 
   WHERE email IN ('moderator@test.local', 'user@test.local');
   
   -- Assign moderator role (replace USER_ID_HERE)
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('USER_ID_HERE', 'moderator');
   
   -- Assign user role (replace USER_ID_HERE)
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('USER_ID_HERE', 'user');
   ```

---

## 🔐 Authentication Testing

### Test Case 1: Sign Up Flow
**Expected Duration:** 5 minutes

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/admin/auth/sign-up` | Sign-up form displays | ☐ |
| 2 | Enter new email & password | Fields accept input | ☐ |
| 3 | Check "I agree to terms" | Checkbox toggles | ☐ |
| 4 | Click "Create Account" | Success toast appears | ☐ |
| 5 | Check confirmation | Auto-redirects to sign-in | ☐ |
| 6 | Verify email auto-confirm | Can sign in immediately | ☐ |

**Pass Criteria:** User created and can sign in without email verification.

---

### Test Case 2: Sign In Flow
**Expected Duration:** 3 minutes

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/admin/auth/sign-in` | Sign-in form displays | ☐ |
| 2 | Enter `info@devmart.sr` credentials | Fields accept input | ☐ |
| 3 | Check "Remember me" | Checkbox toggles | ☐ |
| 4 | Click "Sign In" | Success toast appears | ☐ |
| 5 | Check redirect | Navigates to `/admin/dashboard` | ☐ |
| 6 | Verify session persistence | Refresh page, still logged in | ☐ |

**Pass Criteria:** User authenticates and session persists across page refreshes.

---

### Test Case 3: Sign Out Flow
**Expected Duration:** 2 minutes

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Click profile dropdown (top-right) | Dropdown opens | ☐ |
| 2 | Click "Logout" | User signed out | ☐ |
| 3 | Check redirect | Navigates to `/admin/auth/sign-in` | ☐ |
| 4 | Try accessing `/admin/dashboard` | Redirects to sign-in | ☐ |

**Pass Criteria:** User logs out and protected routes redirect to sign-in.

---

## 🛡️ Role-Based Access Control Testing

### Test Case 4: Admin Role Verification
**User:** info@devmart.sr (admin)  
**Expected Duration:** 10 minutes

| Action | Expected Result | Status |
|--------|-----------------|--------|
| View Dashboard | Shows all statistics | ☐ |
| View Submissions List | Shows ALL submissions | ☐ |
| Update submission status | Can change any status | ☐ |
| View Content Manager | Can edit pages/FAQs/announcements | ☐ |
| Access User Roles page | Can assign/remove roles | ☐ |
| Verify all files | Can mark files as verified | ☐ |

**Pass Criteria:** Admin has full access to all features.

---

### Test Case 5: Moderator Role Verification
**User:** moderator@test.local  
**Expected Duration:** 8 minutes

| Action | Expected Result | Status |
|--------|-----------------|--------|
| View Dashboard | Shows statistics | ☐ |
| View Submissions List | Shows ALL submissions | ☐ |
| Update submission status | Can change status | ☐ |
| View Content Manager | Can edit content | ☐ |
| Access User Roles page | **DENIED** (admin only) | ☐ |
| Verify files | Can verify files | ☐ |

**Pass Criteria:** Moderator has review access but cannot manage roles.

---

### Test Case 6: Regular User Role Verification
**User:** user@test.local  
**Expected Duration:** 5 minutes

| Action | Expected Result | Status |
|--------|-----------------|--------|
| View Dashboard | **DENIED** or shows only own data | ☐ |
| View Submissions List | Shows ONLY own submissions | ☐ |
| Create new submission | Can create | ☐ |
| Update own draft | Can edit | ☐ |
| Update submitted submission | **DENIED** | ☐ |
| Access admin pages | **DENIED** / Not visible in menu | ☐ |

**Pass Criteria:** Regular users can only access their own submissions.

---

## 📝 Submission Workflow Testing

### Test Case 7: Create & Submit Application
**User:** Any authenticated user  
**Expected Duration:** 15 minutes

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/aanvraag-indienen` | Wizard loads | ☐ |
| 2 | Answer wizard questions | Questions appear sequentially | ☐ |
| 3 | Complete wizard | Application type determined | ☐ |
| 4 | Fill applicant form | Form validation works | ☐ |
| 5 | Upload required documents | Files upload successfully | ☐ |
| 6 | Submit application | Status changes to `submitted` | ☐ |
| 7 | Check email notification | **Email sent** (if Resend configured) | ☐ |
| 8 | View in Submissions List | Appears in list | ☐ |

**Pass Criteria:** Full submission flow completes without errors.

---

### Test Case 8: Admin Review & Status Update
**User:** info@devmart.sr (admin)  
**Expected Duration:** 10 minutes

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open Submissions List | Shows all submissions | ☐ |
| 2 | Click on a submission | Details page opens | ☐ |
| 3 | Review uploaded files | Files display correctly | ☐ |
| 4 | Verify a file | Checkmark appears, `verified_at` set | ☐ |
| 5 | Change status to `under_review` | Status updates | ☐ |
| 6 | Check email notification | **Email sent to applicant** | ☐ |
| 7 | Add admin notes | Notes save successfully | ☐ |
| 8 | Change status to `approved` | Final status update | ☐ |

**Pass Criteria:** Admin can review and update submission status, triggering notifications.

---

## 🔧 Edge Functions Testing

### Test Case 9: Submission Notification
**Trigger:** New submission created  
**Expected Duration:** 5 minutes

**Steps:**
1. Create a new submission (Test Case 7)
2. Check Supabase Edge Function logs:
   ```
   View Backend → Edge Functions → send-submission-notification
   ```
3. Verify email sent via Resend dashboard (if configured)

**Expected Results:**
- ✅ Function executes without errors
- ✅ Email payload logged
- ✅ Email delivered (if Resend domain verified)

**Pass Criteria:** Function runs on INSERT trigger.

---

### Test Case 10: Status Update Notification
**Trigger:** Admin changes submission status  
**Expected Duration:** 5 minutes

**Steps:**
1. Update submission status (Test Case 8, Step 5)
2. Check Edge Function logs:
   ```
   View Backend → Edge Functions → send-status-update-notification
   ```
3. Verify email content includes status change

**Expected Results:**
- ✅ Function receives correct payload
- ✅ Email includes old/new status
- ✅ Admin notes included (if present)

**Pass Criteria:** Function triggers on status change with correct data.

---

### Test Case 11: File Validation
**Trigger:** File upload  
**Expected Duration:** 5 minutes

**Steps:**
1. Upload a valid PDF file (Test Case 7, Step 5)
2. Upload an invalid file (e.g., .exe)
3. Upload an oversized file (>5MB for most document types)

**Expected Results:**
- ✅ Valid PDF accepted
- ❌ Invalid file type rejected
- ❌ Oversized file rejected
- ✅ Error messages displayed

**Pass Criteria:** Only valid files within size limits are accepted.

---

### Test Case 12: Wizard Evaluation
**Trigger:** Wizard completion  
**Expected Duration:** 5 minutes

**Steps:**
1. Complete wizard with different answer combinations
2. Check that correct `application_type_id` is determined
3. Verify appropriate document list is shown

**Expected Results:**
- ✅ Different answers → different application types
- ✅ Correct documents required for each type

**Pass Criteria:** Wizard logic maps correctly to application types.

---

## 💾 Database & RLS Testing

### Test Case 13: Row-Level Security Validation
**Expected Duration:** 10 minutes

**Test Matrix:**

| Table | Action | Admin | Moderator | User | Anonymous |
|-------|--------|-------|-----------|------|-----------|
| submissions | SELECT all | ✅ | ✅ | Own only | ❌ |
| submissions | INSERT | ✅ | ✅ | ✅ | ❌ |
| submissions | UPDATE | ✅ | ✅ | Own draft | ❌ |
| submissions | DELETE | ❌ | ❌ | ❌ | ❌ |
| submission_files | SELECT all | ✅ | ✅ | Own only | ❌ |
| submission_files | INSERT | ✅ | ✅ | Own only | ❌ |
| submission_files | UPDATE (verify) | ✅ | ✅ | ❌ | ❌ |
| user_roles | SELECT all | ✅ | ❌ | Own only | ❌ |
| user_roles | INSERT | ✅ | ❌ | ❌ | ❌ |
| user_roles | UPDATE | ✅ | ❌ | ❌ | ❌ |
| user_roles | DELETE | ✅ | ❌ | ❌ | ❌ |

**Pass Criteria:** All access controls enforced as specified.

---

### Test Case 14: Realtime Subscriptions
**Expected Duration:** 5 minutes

**Steps:**
1. Open Submissions List in one browser tab (as admin)
2. Open another tab (as regular user)
3. Create a new submission in the user tab
4. Check if admin tab updates automatically

**Expected Results:**
- ✅ New submission appears in admin tab without refresh
- ✅ Status updates propagate in real-time

**Pass Criteria:** Realtime updates work across sessions.

---

## 📧 Email Notification Testing

### Prerequisites
⚠️ **Requires Resend Configuration:**
1. Domain verified in Resend dashboard
2. `RESEND_API_KEY` configured in Lovable Cloud secrets
3. `from` email address matches verified domain

---

### Test Case 15: Email Delivery Verification
**Expected Duration:** 10 minutes

| Email Type | Trigger | Expected Content | Status |
|------------|---------|------------------|--------|
| Submission Received | New submission | Application type, reference number | ☐ |
| Status Update | Status change | Old status → New status | ☐ |
| Approved | Status → `approved` | Approval message | ☐ |
| Rejected | Status → `rejected` | Rejection reason (admin notes) | ☐ |
| Under Review | Status → `under_review` | Review timeline | ☐ |

**Pass Criteria:** All emails deliver with correct content and formatting.

---

## 🎨 Admin UI Testing

### Test Case 16: Dashboard Functionality
**Expected Duration:** 5 minutes

| Element | Expected Behavior | Status |
|---------|-------------------|--------|
| Total Submissions count | Matches database count | ☐ |
| Status breakdown | Shows correct distribution | ☐ |
| Recent submissions table | Shows last 5 submissions | ☐ |
| Content stats | Shows correct counts | ☐ |
| Navigation links | All links work | ☐ |

**Pass Criteria:** Dashboard displays accurate real-time data.

---

### Test Case 17: Submissions List Features
**Expected Duration:** 8 minutes

| Feature | Test Action | Expected Result | Status |
|---------|-------------|-----------------|--------|
| Search | Enter applicant name | Filters results | ☐ |
| Status filter | Select "under_review" | Shows only matching | ☐ |
| Pagination | (Future) Navigate pages | Loads correctly | ☐ |
| Sort | Click column headers | Sorts by column | ☐ |
| View details | Click submission | Opens detail page | ☐ |

**Pass Criteria:** All list features work smoothly.

---

### Test Case 18: Content Manager
**Expected Duration:** 10 minutes

| Action | Expected Result | Status |
|--------|-----------------|--------|
| Create new page | Page saves to database | ☐ |
| Edit existing page | Changes persist | ☐ |
| Publish/unpublish | Toggle updates `is_published` | ☐ |
| Add FAQ item | Saves with correct order | ☐ |
| Create announcement | Saves with date range | ☐ |
| Delete content | Removes from database | ☐ |

**Pass Criteria:** All CRUD operations work for all content types.

---

## 🔒 Security Testing

### Test Case 19: Privilege Escalation Prevention
**Expected Duration:** 10 minutes

**Attack Scenarios:**

| Scenario | Attack Method | Expected Defense | Status |
|----------|---------------|------------------|--------|
| User tries to access admin panel | Direct URL navigation | Redirect to sign-in or 403 | ☐ |
| User modifies localStorage role | Set `role: 'admin'` in browser | **NO EFFECT** (server validates) | ☐ |
| User calls admin-only API | Direct Supabase query | RLS blocks query | ☐ |
| User updates another user's submission | Modify `user_id` in request | RLS rejects update | ☐ |
| Anonymous user tries CRUD | No auth token | All operations blocked | ☐ |

**Pass Criteria:** All privilege escalation attempts fail.

---

### Test Case 20: SQL Injection Prevention
**Expected Duration:** 5 minutes

**Test Inputs:**
```
'; DROP TABLE submissions; --
' OR '1'='1
<script>alert('XSS')</script>
```

| Input Field | Malicious Input | Expected Result | Status |
|-------------|-----------------|-----------------|--------|
| Email field | SQL injection | Input sanitized | ☐ |
| Search box | SQL injection | No error, no data leak | ☐ |
| Admin notes | XSS payload | Escaped/sanitized | ☐ |

**Pass Criteria:** No SQL injection or XSS vulnerabilities.

---

## 📊 Performance Testing

### Test Case 21: Load Testing
**Expected Duration:** 15 minutes

| Test | Action | Target | Result | Status |
|------|--------|--------|--------|--------|
| Page load time | Load Dashboard | <2s | | ☐ |
| API response time | Fetch submissions list | <500ms | | ☐ |
| File upload | Upload 4MB PDF | <5s | | ☐ |
| Realtime latency | Status update propagation | <1s | | ☐ |

**Pass Criteria:** All operations complete within target times.

---

## ✅ Testing Completion Checklist

### Authentication & Authorization
- [ ] Sign-up flow works
- [ ] Sign-in flow works
- [ ] Sign-out flow works
- [ ] Session persistence works
- [ ] Admin role has full access
- [ ] Moderator role has review access
- [ ] Regular user has limited access
- [ ] Anonymous users blocked

### Submissions Workflow
- [ ] Can create submission
- [ ] Can upload files
- [ ] Can submit application
- [ ] Admin can review
- [ ] Admin can update status
- [ ] RLS enforced correctly

### Edge Functions
- [ ] Submission notification sends
- [ ] Status update notification sends
- [ ] File validation works
- [ ] Wizard evaluation works

### Admin Pages
- [ ] Dashboard displays data
- [ ] Submissions list works
- [ ] Submission details work
- [ ] Content manager works
- [ ] User roles manager works

### Security
- [ ] RLS prevents unauthorized access
- [ ] Privilege escalation blocked
- [ ] SQL injection prevented
- [ ] XSS attacks prevented

### Email Notifications
- [ ] Resend domain verified
- [ ] Submission emails deliver
- [ ] Status update emails deliver

---

## 🐛 Known Issues & Workarounds

### Issue 1: Email Notifications Not Sending
**Symptom:** Edge Functions run but emails don't arrive  
**Cause:** Resend domain not verified or API key missing  
**Workaround:**
1. Verify domain in Resend dashboard
2. Check `RESEND_API_KEY` is set
3. Use `onboarding@resend.dev` for testing (pre-verified)

---

### Issue 2: User Can't Access Admin Pages After Role Assignment
**Symptom:** User has role in database but still can't access admin  
**Cause:** Session cached before role assignment  
**Workaround:** User must sign out and sign back in to refresh session

---

## 📝 Test Results Template

```markdown
## Test Session Results
**Date:** YYYY-MM-DD  
**Tester:** [Name]  
**Environment:** Production / Staging  

### Summary
- Total Tests: 21
- Passed: __
- Failed: __
- Blocked: __
- Pass Rate: __%

### Failed Tests
1. [Test Case #] - [Issue Description]
   - Expected: [Expected Result]
   - Actual: [Actual Result]
   - Severity: Critical / High / Medium / Low

### Recommendations
- [Action Item 1]
- [Action Item 2]

### Sign-off
All critical functionality verified and ready for production: ✅ YES / ❌ NO
```

---

## 🚀 Post-Testing Actions

Once all tests pass:

1. ✅ Update `tasks.md` → Mark Phase 2.2 as **COMPLETE**
2. ✅ Update `backend-architecture.md` → Add test results
3. ✅ Create backup/snapshot of working database
4. ✅ Document any configuration changes
5. ✅ Begin **Phase 3: Wizard Logic & Document Mapping**

---

**End of Testing Guide**  
For questions or issues, refer to `backend-architecture.md` or `api-reference.md`.