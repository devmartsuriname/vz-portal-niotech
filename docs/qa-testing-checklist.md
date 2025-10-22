# QA Testing Checklist — Phase 6.6
**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-10-22  
**Testing Period:** [Start Date] - [End Date]

---

## 📋 Overview

This document provides a comprehensive checklist for testing all modules and features of the VZ Juspol Admin Portal and Frontend. Each test case should be marked as ✅ Pass, ❌ Fail, or ⚠️ Partial.

---

## 🎯 Day 1: Module and Functional Testing

### 1️⃣ Dashboard Testing (30 minutes)

**Test Environment:** `/admin/dashboard`

- [ ] **Stats Display**
  - [ ] Total Aanvragen count displays correctly
  - [ ] Ingediend count matches filtered submissions
  - [ ] In Behandeling count accurate
  - [ ] Goedgekeurd count accurate
  - [ ] Stats update on page refresh
  - [ ] Loading states show properly

- [ ] **Recent Submissions Widget**
  - [ ] Displays latest 5 submissions
  - [ ] Reference IDs display correctly (8 characters)
  - [ ] Application type shows correctly
  - [ ] Status badges have correct colors
  - [ ] Dates format as nl-NL (DD-MM-YYYY)
  - [ ] "Bekijk Alles" link navigates to submissions page

- [ ] **Content Overview Widget**
  - [ ] Pages count accurate
  - [ ] FAQs count accurate
  - [ ] Announcements count accurate
  - [ ] "Beheer Content" link works
  - [ ] Icons display correctly

- [ ] **Theme & Layout**
  - [ ] Dark theme toggle works
  - [ ] Compact mode toggle works
  - [ ] Sidebar collapses/expands
  - [ ] Responsive on mobile/tablet
  - [ ] No layout shifts on load

**Notes:**
```
[Add any issues found]
```

---

### 2️⃣ Submissions Module (1 hour)

**Test Environment:** `/admin/submissions`

#### Submissions List
- [ ] **Display & Loading**
  - [ ] Table loads with all submissions
  - [ ] Pagination works (if >50 records)
  - [ ] Loading skeleton displays during fetch
  - [ ] Empty state shows when no results
  - [ ] Columns: Checkbox, Ref, Type, Status, Submitted, Updated, Actions

- [ ] **Search Functionality**
  - [ ] Search by submission ID (partial match)
  - [ ] Search by application type
  - [ ] Search is case-insensitive
  - [ ] Results update immediately
  - [ ] Clear search resets results

- [ ] **Filtering**
  - [ ] "Alle Statussen" shows all
  - [ ] Filter by "Concept" works
  - [ ] Filter by "Ingediend" works
  - [ ] Filter by "In Behandeling" works
  - [ ] Filter by "Goedgekeurd" works
  - [ ] Filter by "Afgewezen" works
  - [ ] Filter by "Info Vereist" works
  - [ ] Result count updates with filter

- [ ] **Bulk Actions**
  - [ ] Select all checkbox works
  - [ ] Individual checkboxes work
  - [ ] Bulk action bar appears when items selected
  - [ ] "Zet op In Behandeling" updates all selected
  - [ ] "Goedkeuren" updates all selected
  - [ ] "Afwijzen" updates all selected
  - [ ] "Info Vereist" updates all selected
  - [ ] Success toast shows with count
  - [ ] Selection clears after action
  - [ ] Loading spinner shows during processing

- [ ] **Row Actions**
  - [ ] "Details" button navigates to detail page
  - [ ] Table row hover effect works
  - [ ] Keyboard navigation (Enter/Space) works

#### Submission Details
- [ ] **Display**
  - [ ] Submission ID displays correctly
  - [ ] Applicant data shows all fields
  - [ ] Application type displays
  - [ ] Current status displays correctly
  - [ ] Created/updated dates show
  - [ ] Wizard answers display (if present)

- [ ] **Status Updates**
  - [ ] Status dropdown shows all options
  - [ ] Admin notes field accepts text
  - [ ] "Bijwerken" button works
  - [ ] Success toast shows
  - [ ] Status updates in real-time
  - [ ] Notification sent to user

- [ ] **File Management**
  - [ ] Uploaded files display with names
  - [ ] File types show (PDF, JPG, PNG, etc.)
  - [ ] File sizes display
  - [ ] Download file button works
  - [ ] Verification toggle works
  - [ ] "Geverifieerd" badge shows when verified

**Notes:**
```
[Add any issues found]
```

---

### 3️⃣ Vergunningen Page (30 minutes)

**Test Environment:** `/vergunningen`

- [ ] **Data Loading**
  - [ ] Page loads all 96+ permits
  - [ ] Loading state shows
  - [ ] Data displays in table format
  - [ ] No console errors

- [ ] **Search Functionality**
  - [ ] Search by agenda number (exact match)
  - [ ] Search by agenda number (partial match)
  - [ ] Search by last name (full)
  - [ ] Search by last name (partial)
  - [ ] Search by given names (full)
  - [ ] Search by given names (partial)
  - [ ] Search is case-insensitive
  - [ ] Clear search resets results
  - [ ] Result count updates

- [ ] **Display & Styling**
  - [ ] Card wrapper has hover lift effect
  - [ ] Table rows have hover effect
  - [ ] Purple gradient badges for permit codes (VVA, VTB, etc.)
  - [ ] Dates format correctly (DD-MM-YYYY)
  - [ ] Status badge colors correct (active = green)
  - [ ] Responsive on mobile/tablet

- [ ] **Empty State**
  - [ ] Shows when search has no results
  - [ ] Message is clear and helpful

**Notes:**
```
[Add any issues found]
```

---

### 4️⃣ Email Templates (45 minutes)

**Test Environment:** `/admin/settings` → Email Templates Tab

- [ ] **List View**
  - [ ] All 5 templates display
  - [ ] Template names show correctly
  - [ ] Subject lines display
  - [ ] Action buttons visible (Edit, Preview, Send Test)

- [ ] **Create Template**
  - [ ] "Create Template" button opens form
  - [ ] Name field required
  - [ ] Subject field required
  - [ ] Body field required (rich text editor?)
  - [ ] Variables dropdown/help text visible
  - [ ] Save button works
  - [ ] Success toast shows
  - [ ] New template appears in list

- [ ] **Edit Template**
  - [ ] Edit button opens form with existing data
  - [ ] All fields editable
  - [ ] Cancel button discards changes
  - [ ] Save button updates template
  - [ ] Success toast shows

- [ ] **Preview Template**
  - [ ] Preview button opens modal
  - [ ] Variables replaced with sample data
  - [ ] HTML renders correctly
  - [ ] Close button works

- [ ] **Send Test Email**
  - [ ] "Send Test" button prompts for email
  - [ ] Email validation works
  - [ ] Test email sends successfully
  - [ ] Confirmation toast shows
  - [ ] Actual email received (check inbox!)
  - [ ] Variables populated correctly
  - [ ] Formatting preserved

- [ ] **Delete Template**
  - [ ] Delete button shows confirmation
  - [ ] Cancel keeps template
  - [ ] Confirm deletes template
  - [ ] Success toast shows
  - [ ] Template removed from list

**Notes:**
```
[Add any issues found]
```

---

### 5️⃣ Content Manager (1.5 hours)

**Test Environment:** `/admin/content`

#### Pages Tab
- [ ] **List View**
  - [ ] All pages display (Over Ons, Privacy, FAQ, etc.)
  - [ ] Titles show correctly
  - [ ] Slugs display
  - [ ] Published status toggle visible
  - [ ] Action buttons (Edit, Delete)

- [ ] **Create Page**
  - [ ] "Create Page" button opens form
  - [ ] Title field required
  - [ ] Slug auto-generates from title
  - [ ] Slug editable manually
  - [ ] Content editor loads (rich text)
  - [ ] Meta title field available
  - [ ] Meta description field available
  - [ ] Published toggle works
  - [ ] Save button creates page
  - [ ] Success toast shows

- [ ] **Edit Page**
  - [ ] Edit button loads existing content
  - [ ] All fields editable
  - [ ] Slug updates URL preview
  - [ ] Save updates page
  - [ ] Changes reflect on frontend immediately

- [ ] **Publish/Unpublish**
  - [ ] Toggle updates status instantly
  - [ ] Published pages visible on frontend
  - [ ] Unpublished pages return 404 on frontend
  - [ ] Status persists after page reload

- [ ] **Delete Page**
  - [ ] Confirmation modal appears
  - [ ] Cancel keeps page
  - [ ] Confirm deletes page
  - [ ] Page removed from list
  - [ ] Frontend returns 404 for deleted page

#### Page Builder (Dynamic Sections)
- [ ] **Section Management**
  - [ ] "Add Section" button opens section type picker
  - [ ] Available types: Hero, Text, Image, CTA, FAQ, Services
  - [ ] Drag-and-drop reordering works
  - [ ] Move up/down buttons work
  - [ ] Delete section button works with confirmation

- [ ] **Hero Section**
  - [ ] Title field editable
  - [ ] Subtitle field editable
  - [ ] Background image upload works
  - [ ] Button text/link fields work
  - [ ] Preview updates in real-time
  - [ ] Saved section renders on frontend

- [ ] **Text Section**
  - [ ] Rich text editor loads
  - [ ] Formatting options work (bold, italic, lists)
  - [ ] Links insertable
  - [ ] Saved text renders correctly on frontend

- [ ] **Image Section**
  - [ ] Image upload works
  - [ ] Image URL field works
  - [ ] Alt text field required
  - [ ] Caption field optional
  - [ ] Image displays correctly on frontend

- [ ] **CTA Section**
  - [ ] Heading field editable
  - [ ] Description field editable
  - [ ] Button text/link fields work
  - [ ] Background color picker works
  - [ ] Frontend renders correctly

- [ ] **FAQ Section**
  - [ ] Links to FAQ items from database
  - [ ] FAQ items display in accordion
  - [ ] Frontend renders FAQs correctly

- [ ] **Services Section**
  - [ ] Service cards editable (title, icon, description)
  - [ ] Add/remove service cards
  - [ ] Icons selectable from library
  - [ ] Frontend renders service grid correctly

- [ ] **Preview & Save**
  - [ ] Preview button shows page with sections
  - [ ] Save page button persists sections to JSONB
  - [ ] Page loads with sections on frontend
  - [ ] Section order correct on frontend

#### FAQ Tab
- [ ] **List View**
  - [ ] All 15 FAQ items display
  - [ ] Grouped by category
  - [ ] Question and answer preview visible
  - [ ] Display order editable
  - [ ] Published toggle visible

- [ ] **Create FAQ**
  - [ ] "Create FAQ" button opens form
  - [ ] Category dropdown loads categories
  - [ ] Question field required
  - [ ] Answer field required (rich text)
  - [ ] Display order field (numeric)
  - [ ] Published toggle works
  - [ ] Save creates FAQ
  - [ ] Success toast shows

- [ ] **Edit FAQ**
  - [ ] Edit button loads existing FAQ
  - [ ] All fields editable
  - [ ] Save updates FAQ
  - [ ] Changes reflect on frontend

- [ ] **Reorder FAQs**
  - [ ] Drag-and-drop reordering works
  - [ ] Display order updates in database
  - [ ] Frontend FAQ order matches admin

- [ ] **Publish/Unpublish**
  - [ ] Toggle updates status
  - [ ] Published FAQs show on frontend
  - [ ] Unpublished FAQs hidden on frontend

- [ ] **Delete FAQ**
  - [ ] Confirmation modal appears
  - [ ] Confirm deletes FAQ
  - [ ] FAQ removed from list

#### Announcements Tab
- [ ] **List View**
  - [ ] All 5 announcements display
  - [ ] Title and message preview visible
  - [ ] Start/end dates display
  - [ ] Active status toggle visible

- [ ] **Create Announcement**
  - [ ] "Create Announcement" button opens form
  - [ ] Title field required
  - [ ] Message field required
  - [ ] Start date picker works
  - [ ] End date picker works (optional)
  - [ ] Active toggle works
  - [ ] Save creates announcement
  - [ ] Success toast shows

- [ ] **Edit Announcement**
  - [ ] Edit button loads existing data
  - [ ] All fields editable
  - [ ] Save updates announcement

- [ ] **Active Status**
  - [ ] Toggle updates status
  - [ ] Active announcements show on frontend banner
  - [ ] Inactive announcements hidden
  - [ ] Expired announcements hidden (end date < today)

- [ ] **Delete Announcement**
  - [ ] Confirmation modal appears
  - [ ] Confirm deletes announcement

**Notes:**
```
[Add any issues found]
```

---

### 6️⃣ Settings Module (45 minutes)

**Test Environment:** `/admin/settings`

#### General Settings Tab
- [ ] **System Settings**
  - [ ] System name field editable
  - [ ] Maintenance mode toggle works
  - [ ] Save button updates settings
  - [ ] Success toast shows

#### Email Settings Tab
- [ ] **Resend API Configuration**
  - [ ] API key field (password type)
  - [ ] Sender email field (validation)
  - [ ] "Test Connection" button works
  - [ ] Success toast on valid connection
  - [ ] Error toast on invalid connection
  - [ ] Save button persists settings

#### Document Settings Tab
- [ ] **Document Type Management**
  - [ ] All document types display
  - [ ] "Add Document Type" button works
  - [ ] Name field required
  - [ ] File size limit field (MB)
  - [ ] Allowed formats field (comma-separated)
  - [ ] Save creates document type
  - [ ] Edit updates document type
  - [ ] Delete removes document type

**Notes:**
```
[Add any issues found]
```

---

### 7️⃣ User & Wizard Management (45 minutes)

**Test Environment:** `/admin/user-roles`, `/admin/wizard-rules`, `/admin/document-mapping`

#### User Roles Manager
- [ ] **List View**
  - [ ] All users display
  - [ ] Email addresses show
  - [ ] Current role displays (user/admin)
  - [ ] Change role dropdown works

- [ ] **Role Changes**
  - [ ] Change user to admin
  - [ ] Change admin to user
  - [ ] Confirmation modal appears
  - [ ] Role updates in database
  - [ ] Success toast shows
  - [ ] RLS permissions update correctly

- [ ] **Verify RLS**
  - [ ] Users can only see own submissions
  - [ ] Admins can see all submissions
  - [ ] Log in as user to verify

#### Wizard Rules Manager
- [ ] **Question List**
  - [ ] All wizard questions display
  - [ ] Question text editable
  - [ ] Question type shows (radio, checkbox, text)
  - [ ] Options editable (for radio/checkbox)
  - [ ] Display order editable

- [ ] **Edit Question**
  - [ ] Edit button opens form
  - [ ] Question text field
  - [ ] Type dropdown (radio, checkbox, text, select)
  - [ ] Options field (JSON array)
  - [ ] Conditional logic field (optional)
  - [ ] Save updates question
  - [ ] Success toast shows

- [ ] **Test Decision Tree**
  - [ ] Navigate to frontend wizard
  - [ ] Answer questions
  - [ ] Verify conditional logic works
  - [ ] Correct application type recommended

#### Document Mapping Manager
- [ ] **Mapping List**
  - [ ] All application types display
  - [ ] Required documents listed per type
  - [ ] Optional documents listed per type

- [ ] **Add Document Mapping**
  - [ ] Select application type dropdown
  - [ ] Select document type dropdown
  - [ ] Mandatory/Optional toggle
  - [ ] Display order field
  - [ ] Save creates mapping
  - [ ] Success toast shows

- [ ] **Verify on Frontend**
  - [ ] Start wizard for application type
  - [ ] Required documents marked correctly
  - [ ] Optional documents shown
  - [ ] Cannot submit without required docs

**Notes:**
```
[Add any issues found]
```

---

## 🌐 Day 2: Cross-Platform and Security Testing

### 8️⃣ Cross-Browser Testing (3 hours)

#### Chrome (Latest) — 1 hour
**Test Environment:** Chrome v120+

- [ ] **Admin Panel**
  - [ ] Dashboard loads correctly
  - [ ] Navigation works
  - [ ] Forms submit successfully
  - [ ] Tables display correctly
  - [ ] Modals open/close
  - [ ] No console errors
  - [ ] Animations smooth
  - [ ] CSS gradients render correctly

- [ ] **Frontend**
  - [ ] Homepage loads
  - [ ] Wizard navigation works
  - [ ] Forms submit
  - [ ] Vergunningen search works
  - [ ] No console errors

#### Firefox (Latest) — 45 minutes
**Test Environment:** Firefox v120+

- [ ] **Admin Panel**
  - [ ] Dashboard loads
  - [ ] Navigation works
  - [ ] Forms submit
  - [ ] Tables display
  - [ ] File uploads work
  - [ ] CSS compatibility good
  - [ ] No console errors

- [ ] **Frontend**
  - [ ] All pages load
  - [ ] Wizard works
  - [ ] Search works
  - [ ] Styling consistent

#### Safari (macOS/iOS) — 45 minutes
**Test Environment:** Safari 16+

- [ ] **Admin Panel (Desktop)**
  - [ ] Dashboard loads
  - [ ] Navigation works
  - [ ] Forms submit
  - [ ] Date pickers work (native)
  - [ ] CSS compatibility (gradients, shadows)
  - [ ] Font rendering acceptable

- [ ] **Frontend (Mobile)**
  - [ ] Touch interactions work
  - [ ] Buttons easy to tap
  - [ ] Forms usable on iPhone
  - [ ] No horizontal scroll

#### Edge (Latest) — 30 minutes
**Test Environment:** Edge v120+

- [ ] **Admin Panel**
  - [ ] Basic navigation works
  - [ ] Forms submit
  - [ ] No critical errors
  - [ ] Chromium compatibility

**Browser Compatibility Matrix:**

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Dashboard | ✅ | | | |
| Submissions | ✅ | | | |
| Content Manager | ✅ | | | |
| Email Templates | ✅ | | | |
| Vergunningen | ✅ | | | |
| Wizard | ✅ | | | |
| File Upload | ✅ | | | |
| Date Pickers | ✅ | | | |
| CSS Animations | ✅ | | | |

**Notes:**
```
[Add any issues found per browser]
```

---

### 9️⃣ Responsive Testing (2 hours)

#### Mobile (375px - 767px) — 1 hour
**Test Devices:** iPhone 12/13, Samsung Galaxy S21

- [ ] **Admin Panel**
  - [ ] Hamburger menu appears
  - [ ] Sidebar slides in/out correctly
  - [ ] Topbar stacks properly
  - [ ] Forms stack vertically
  - [ ] Input fields full width
  - [ ] Tables scroll horizontally
  - [ ] Buttons minimum 44×44px
  - [ ] Touch targets adequate
  - [ ] No horizontal overflow
  - [ ] Font sizes readable (≥16px for body)
  - [ ] Modal fits screen

- [ ] **Frontend**
  - [ ] Homepage hero responsive
  - [ ] Navigation hamburger menu
  - [ ] Wizard steps stack
  - [ ] Forms full width
  - [ ] Vergunningen table scrolls
  - [ ] Footer stacks vertically

#### Tablet (768px - 1023px) — 45 minutes
**Test Devices:** iPad, iPad Pro, Samsung Tab

- [ ] **Admin Panel**
  - [ ] Sidebar behavior (fixed or collapsible)
  - [ ] Two-column layouts work
  - [ ] Tables fit without scroll (or scroll gracefully)
  - [ ] Cards arrange in grid (2 columns)
  - [ ] Touch interactions smooth
  - [ ] Forms layout optimized

- [ ] **Frontend**
  - [ ] Homepage layout adapts
  - [ ] Wizard layout comfortable
  - [ ] Navigation adequate
  - [ ] Content readable

#### Desktop (1024px - 1920px) — 30 minutes
**Test Resolutions:** 1366×768, 1920×1080

- [ ] **Admin Panel**
  - [ ] Sidebar fixed left
  - [ ] Content area utilizes space
  - [ ] Tables display without scroll
  - [ ] Cards in 3-4 column grid
  - [ ] No excessive whitespace
  - [ ] Optimal reading line length

- [ ] **Frontend**
  - [ ] Hero full width
  - [ ] Content max-width centered
  - [ ] Multi-column layouts
  - [ ] Optimal spacing

#### Large Screens (>1920px) — 15 minutes
**Test Resolutions:** 2560×1440, 4K

- [ ] **Admin Panel**
  - [ ] Content centers or uses space wisely
  - [ ] No excessive stretching
  - [ ] Sidebar width reasonable
  - [ ] Font sizes don't become too small

- [ ] **Frontend**
  - [ ] Content max-width applied
  - [ ] Background covers correctly
  - [ ] No excessive empty space

**Responsive Breakpoint Matrix:**

| Breakpoint | Admin Dashboard | Submissions | Vergunningen | Frontend |
|------------|----------------|-------------|--------------|----------|
| 375px | | | | |
| 768px | | | | |
| 1024px | | | | |
| 1920px | | | | |

**Notes:**
```
[Add any responsive issues found]
```

---

### 🔒 Security Review (2 hours)

#### Row Level Security (RLS) Policies
**Test Environment:** Database + Admin Panel + Frontend

- [ ] **issued_permits Table**
  - [ ] Public can view `status = 'active'` permits
  - [ ] Public cannot view expired permits
  - [ ] Admin can view all permits
  - [ ] Admin can create/update/delete permits
  - [ ] Users cannot modify permits

- [ ] **submissions Table**
  - [ ] Users can view only their own submissions
  - [ ] Users can create submissions for themselves
  - [ ] Users can update their own draft submissions
  - [ ] Users cannot view other users' submissions
  - [ ] Admins can view all submissions
  - [ ] Admins can update any submission
  - [ ] Test by logging in as user and admin

- [ ] **submission_files Table**
  - [ ] Users can upload files to their own submissions
  - [ ] Users can view their own submission files
  - [ ] Users cannot view other users' files
  - [ ] Admins can view all files
  - [ ] Admins can verify/unverify files

- [ ] **pages Table**
  - [ ] Public can view published pages only
  - [ ] Public cannot view unpublished pages
  - [ ] Admins can view all pages
  - [ ] Admins can create/update/delete pages

- [ ] **faq_items Table**
  - [ ] Public can view published FAQs only
  - [ ] Admins can manage all FAQs

- [ ] **announcements Table**
  - [ ] Public can view active announcements only
  - [ ] Admins can manage all announcements

- [ ] **email_templates Table**
  - [ ] Admins only can view/manage templates
  - [ ] Users cannot access templates

- [ ] **user_roles Table**
  - [ ] Users can view their own role
  - [ ] Users cannot modify their own role
  - [ ] Admins can view all roles
  - [ ] Admins can modify any role

- [ ] **activity_logs Table**
  - [ ] Users can view their own activity
  - [ ] Admins can view all activity
  - [ ] Activity logged automatically on key actions

- [ ] **notifications Table**
  - [ ] Users can view/update only their own notifications
  - [ ] Admins can create notifications for any user
  - [ ] Users cannot create notifications

#### Authentication Testing
- [ ] **Sign Up Flow**
  - [ ] New user can create account
  - [ ] Email validation works
  - [ ] Password strength enforced (if applicable)
  - [ ] User assigned default role
  - [ ] User redirected after signup
  - [ ] Auto-confirm email enabled (non-production)

- [ ] **Sign In Flow**
  - [ ] Valid credentials allow login
  - [ ] Invalid credentials rejected
  - [ ] Error messages displayed
  - [ ] Session persists on refresh
  - [ ] Redirect to intended page after login

- [ ] **Access Control**
  - [ ] Unauthenticated users redirected to login
  - [ ] Users cannot access `/admin/` routes
  - [ ] Admins can access all `/admin/` routes
  - [ ] Users can access their own submission pages
  - [ ] Users cannot access other users' submissions

- [ ] **Sign Out Flow**
  - [ ] Sign out button works
  - [ ] Session cleared
  - [ ] Redirect to login page
  - [ ] Cannot access protected routes after signout

#### Input Validation & Security
- [ ] **SQL Injection Prevention**
  - [ ] Test search fields with SQL injection payloads
  - [ ] Example: `' OR '1'='1`
  - [ ] Queries parameterized (Supabase handles this)
  - [ ] No raw SQL execution from user input

- [ ] **XSS Prevention**
  - [ ] Test content fields with script tags
  - [ ] Example: `<script>alert('XSS')</script>`
  - [ ] HTML sanitized on output
  - [ ] Rich text editor sanitizes input

- [ ] **File Upload Validation**
  - [ ] Only allowed file types accepted (PDF, JPG, PNG)
  - [ ] File size limit enforced (10MB?)
  - [ ] Executable files rejected (.exe, .sh, .bat)
  - [ ] File names sanitized
  - [ ] Files stored securely (Supabase Storage)

- [ ] **Form Validation**
  - [ ] Client-side validation present
  - [ ] Server-side validation enforced
  - [ ] Error messages clear
  - [ ] Required fields enforced
  - [ ] Email format validation
  - [ ] Date format validation
  - [ ] Number range validation

#### Data Privacy
- [ ] **User Data Isolation**
  - [ ] User A cannot see User B's submissions
  - [ ] User A cannot modify User B's data
  - [ ] Test by creating two user accounts

- [ ] **Admin Notes Privacy**
  - [ ] Admin notes not visible to users
  - [ ] Only visible in admin panel
  - [ ] Not returned in API responses to users

- [ ] **Personal Data Protection**
  - [ ] Sensitive fields encrypted (if applicable)
  - [ ] Passwords hashed (Supabase handles this)
  - [ ] No sensitive data in logs
  - [ ] No sensitive data in URLs

**Security Checklist Summary:**

| Security Check | Status | Notes |
|----------------|--------|-------|
| RLS Enabled on All Tables | | |
| Authentication Required | | |
| Admin Access Control | | |
| User Data Isolation | | |
| SQL Injection Protected | | |
| XSS Protected | | |
| File Upload Secure | | |
| Form Validation | | |
| Session Management | | |

**Notes:**
```
[Add any security vulnerabilities found]
```

---

### ⚡ Performance Testing (1 hour)

#### Lighthouse Audits

**Test Pages:**
1. `/admin/dashboard`
2. `/admin/submissions`
3. `/vergunningen`
4. `/` (Homepage)

**Target Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 90 (frontend only)

**Instructions:**
1. Open Chrome DevTools (F12)
2. Navigate to Lighthouse tab
3. Select all categories
4. Select "Desktop" or "Mobile" mode
5. Click "Analyze page load"

**Results:**

| Page | Performance | Accessibility | Best Practices | SEO | Notes |
|------|-------------|---------------|----------------|-----|-------|
| /admin/dashboard | | | | | |
| /admin/submissions | | | | | |
| /vergunningen | | | | | |
| / (Homepage) | | | | | |

**Key Metrics:**

| Metric | Target | /admin/dashboard | /admin/submissions | /vergunningen | / |
|--------|--------|-----------------|-------------------|---------------|---|
| First Contentful Paint | < 1.8s | | | | |
| Largest Contentful Paint | < 2.5s | | | | |
| Time to Interactive | < 3.8s | | | | |
| Cumulative Layout Shift | < 0.1 | | | | |
| Total Blocking Time | < 300ms | | | | |

#### Load Testing
- [ ] **High Data Volume**
  - [ ] Load page with 100+ submissions
  - [ ] Load page with 100+ permits
  - [ ] Performance acceptable (<3s load time)
  - [ ] Pagination/virtual scrolling implemented

- [ ] **Concurrent Users** (Manual simulation)
  - [ ] Multiple tabs open (simulate 5+ users)
  - [ ] Realtime updates work
  - [ ] No performance degradation
  - [ ] Database queries optimized

#### Network Performance
- [ ] **Slow 3G Simulation**
  - [ ] Enable "Slow 3G" in Chrome DevTools
  - [ ] Test dashboard load time
  - [ ] Test image loading
  - [ ] Progressive enhancement works
  - [ ] Loading states clear

- [ ] **Bundle Size Analysis**
  - [ ] Admin JS bundle < 500KB
  - [ ] Frontend JS bundle < 300KB
  - [ ] Code splitting implemented
  - [ ] Lazy loading for routes

**Performance Issues Found:**
```
[List any performance issues]
```

---

## 📝 Bug Tracking & Documentation

### Bug Report Template

**Bug ID:** [Auto-increment: BUG-001, BUG-002, etc.]  
**Title:** [Short, descriptive title]  
**Severity:** [ ] Critical | [ ] High | [ ] Medium | [ ] Low  
**Priority:** [ ] P0 (Blocker) | [ ] P1 (High) | [ ] P2 (Medium) | [ ] P3 (Low)  
**Status:** [ ] Open | [ ] In Progress | [ ] Fixed | [ ] Verified | [ ] Closed  
**Found By:** [Tester name]  
**Found On:** [Date]  
**Module/Page:** [e.g., Dashboard, Submissions List]  
**Browser/Device:** [e.g., Chrome 120 / Desktop, Safari / iPhone 13]

**Description:**
[Detailed description of the issue]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Result]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots/Videos:**
[Attach or link to visual evidence]

**Console Errors:**
```
[Copy any console errors]
```

**Additional Context:**
[Any other relevant information]

**Fix Notes:**
[Developer notes on the fix]

---

### Known Issues & Limitations

**Current Limitations:**
```
[List any known limitations that are not bugs]
```

**Future Enhancements:**
```
[List features/improvements for future phases]
```

---

## ✅ QA Sign-Off

### Testing Summary

**Total Test Cases:** [Count from checklist]  
**Test Cases Passed:** [Count]  
**Test Cases Failed:** [Count]  
**Test Cases Skipped:** [Count with reason]  

**Pass Rate:** [Passed / Total × 100]%

### Critical Issues

**Blockers (P0):** [Count and list]  
**High Priority (P1):** [Count and list]

### Sign-Off Criteria

- [ ] All P0 (Critical) bugs resolved
- [ ] 90% of P1 (High) bugs resolved
- [ ] All core workflows tested and working
- [ ] Cross-browser compatibility confirmed
- [ ] Responsive design verified
- [ ] Security review passed
- [ ] Performance targets met
- [ ] Accessibility targets met (≥ 95)
- [ ] Documentation complete

### Approvals

**Tested By:**  
Name: ___________________  
Date: ___________________  
Signature: _______________

**Approved By (Project Lead):**  
Name: ___________________  
Date: ___________________  
Signature: _______________

**Approved By (Client/Stakeholder):**  
Name: ___________________  
Date: ___________________  
Signature: _______________

---

## 📞 Support & Resources

**Documentation:**
- [Admin User Guide](/docs/admin-user-guide.md)
- [Accessibility Testing Guide](/docs/accessibility-testing-guide.md)
- [Backend Architecture](/docs/backend-architecture.md)

**Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [BrowserStack](https://www.browserstack.com/) (cross-browser testing)

**Contact:**
- **QA Lead:** qa@devmart.sr
- **Development Team:** dev@devmart.sr
- **Project Manager:** pm@devmart.sr

---

**End of QA Testing Checklist**
