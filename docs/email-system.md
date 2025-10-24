# Email System Documentation
**VZ Juspol Portal 2.0**

**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-01-23  

---

## Overview

The VZ Juspol Portal uses a dual-provider email system with automatic fallback for maximum reliability. SMTP (Hostinger) is the primary provider, with Resend API as a fallback when SMTP encounters transient failures.

---

## Architecture

### Provider Selection
Email provider is configured via `system_settings.smtp_provider`:
- `'smtp'` — Use Hostinger SMTP (primary)
- `'resend'` — Use Resend API (legacy)

### Automatic Fallback
When using SMTP, the system automatically falls back to Resend if:
- Authentication fails (`EAUTH`)
- Connection timeout (`ETIMEDOUT`)
- Socket error (`ESOCKET`)
- Connection refused (`ECONNREFUSED`)

**AND** Resend API key is configured.

---

## Edge Functions

### 1. send-email

**Endpoint:** `/functions/v1/send-email`  
**Method:** POST  
**Authentication:** Service role (internal use only)

**Purpose:** Universal email sender with provider detection and automatic fallback.

**Request Body:**
```json
{
  "to": "user@example.com",
  "subject": "Uw aanvraag is ontvangen",
  "html": "<h1>Bedankt</h1><p>We hebben uw aanvraag ontvangen.</p>",
  "text": "Bedankt. We hebben uw aanvraag ontvangen.",
  "from_override": {
    "email": "custom@vz-juspol.sr",
    "name": "Custom Sender"
  }
}
```

**Request Fields:**
- `to` (string | string[]) — Recipient email(s), max 50
- `subject` (string) — Email subject, max 255 characters
- `html` (string) — HTML email body (required)
- `text` (string) — Plain text version (auto-generated if omitted)
- `from_override` (object, optional) — Override default sender

**Response (Success):**
```json
{
  "success": true,
  "id": "msg_abc123",
  "provider": "smtp"
}
```

**Response (Fallback):**
```json
{
  "success": true,
  "id": "re_xyz789",
  "provider": "smtp->resend",
  "fallback": true
}
```

**Error Codes:**
- `400` — Invalid input (missing to/subject/html, too many recipients)
- `500` — Email delivery failed (both SMTP and fallback)

**Input Validation:**
- Recipients: 1-50 email addresses
- Subject: 1-255 characters
- HTML: Required, no size limit enforced
- Automatic HTML stripping for text version

---

### 2. test-smtp-connection

**Endpoint:** `/functions/v1/test-smtp-connection`  
**Method:** POST  
**Authentication:** None (CORS enabled for admin UI)

**Purpose:** Test SMTP configuration and send test email. Automatically retrieves password from Vault if not provided.

**Request Body:**
```json
{
  "smtp_host": "smtp.hostinger.com",
  "smtp_port": 587,
  "smtp_secure": true,
  "smtp_username": "noreply@vz-juspol.sr",
  "smtp_password": "optional_or_masked",
  "from_email": "noreply@vz-juspol.sr",
  "from_name": "VZ Juspol Portal",
  "test_email": "admin@vz-juspol.sr"
}
```

**Password Behavior:**
- If `smtp_password` is omitted, empty, or equals `'••••••••'`:
  - Function fetches password from Vault using `get_smtp_password()` RPC
- Otherwise, uses provided password

**Response (Success):**
```json
{
  "success": true,
  "message": "Test email succesvol verzonden",
  "messageId": "msg_abc123"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Authenticatie mislukt. Controleer gebruikersnaam en wachtwoord."
}
```

**Error Handling:**
- `ETIMEDOUT` / `ECONNREFUSED` → Connection error message
- `EAUTH` / `535` → Authentication error message
- `ESOCKET` → SSL/TLS error message
- Other errors → Generic error with original message

**Input Validation:**
- Email format validation (regex + length ≤ 255)
- Port range validation (1-65535)
- Required fields: host, username, test_email

---

## Database Functions

### store_smtp_password(password_value text)

**Purpose:** Securely store SMTP password in Supabase Vault.

**Security:**
- Admin-only access (verified via `has_role(auth.uid(), 'admin')`)
- Overwrites existing password
- Password never stored in `system_settings` table

**Usage:**
```sql
SELECT store_smtp_password('my_secure_password_123');
```

---

### get_smtp_password()

**Purpose:** Retrieve decrypted SMTP password from Vault.

**Returns:** `text` — Decrypted password or `NULL` if not found

**Usage:**
```sql
SELECT get_smtp_password();
```

**Edge Function Usage:**
```typescript
const { data: password, error } = await supabase.rpc('get_smtp_password');
```

---

## Admin UI Configuration

### Location
Admin Panel → Settings → Email Settings Tab

### SMTP Configuration Fields

| Field | Description | Example | Notes |
|-------|-------------|---------|-------|
| **Provider** | Email provider selection | SMTP / Resend | Toggle between providers |
| **SMTP Host** | Mail server hostname | `smtp.hostinger.com` | Usually provider-specific |
| **SMTP Port** | Mail server port | `587` | 587 (TLS), 465 (SSL) |
| **Gebruik SSL/TLS** | Enable encryption | ☑ | Required for port 465 |
| **Username** | SMTP login username | `noreply@vz-juspol.sr` | Usually full email address |
| **Password** | SMTP login password | `••••••••` | Masked after first save |
| **From Email** | Sender email address | `noreply@vz-juspol.sr` | Shown to recipients |
| **From Name** | Sender display name | `VZ Juspol Portal` | Shown to recipients |
| **Wizard Result Recipient** | Wizard submission destination | `result@vz-juspol.sr` | Receives all wizard forms |

### Password Behavior

**First Configuration:**
1. Enter password in plain text
2. Click "Bewaar Instellingen"
3. Password encrypted and stored in Vault
4. `system_settings.smtp_password` set to empty string
5. UI shows `••••••••` on reload

**Password Already Stored:**
1. UI displays `••••••••` (masked)
2. Helper text: "🔒 Wachtwoord is versleuteld opgeslagen in Vault"
3. Test Email works without re-entering password
4. Leave field as `••••••••` to keep existing password
5. Enter new password to update

**Updating Password:**
1. Clear masked field
2. Enter new password
3. Click "Bewaar Instellingen"
4. New password overwrites Vault entry

---

## Testing Workflow

### Test SMTP Connection

1. Navigate to Admin → Settings → Email Settings
2. Fill in all SMTP fields (or ensure already configured)
3. Scroll to "Test Email" section
4. Enter test recipient email
5. Click "Test Email Versturen"
6. Wait for toast notification:
   - ✅ Success: "Test email succesvol verzonden"
   - ❌ Error: Specific error message (auth, connection, SSL)
7. Check test recipient inbox for test email

### Test Email Content
Subject: `VZ Juspol Portal - SMTP Test Email`

HTML body includes:
- Success message
- SMTP configuration details (host, port, security, username)
- Plain text fallback

---

## Common SMTP Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Authenticatie mislukt` | Wrong username/password | Verify credentials in Hostinger panel |
| `Kan geen verbinding maken` | Wrong host or port | Check host is `smtp.hostinger.com`, port 587 or 465 |
| `SSL/TLS verbinding mislukt` | SSL setting mismatch | Use SSL for port 465, disable for port 587 |
| `Wachtwoord niet gevonden` | No password in Vault | Save SMTP settings first to store password |

---

## Hostinger Configuration

### Required Mailboxes
- `noreply@vz-juspol.sr` — Outgoing email sender
- `result@vz-juspol.sr` — Wizard submission recipient

### SMTP Credentials (from Hostinger)
- **Host:** `smtp.hostinger.com`
- **Port:** `587` (STARTTLS) or `465` (SSL)
- **Username:** Full email address (e.g., `noreply@vz-juspol.sr`)
- **Password:** Mailbox password from Hostinger

### DNS Configuration
Add these DNS records to `vz-juspol.sr` domain:

**SPF Record:**
```
v=spf1 include:spf.hostinger.com ~all
```

**DKIM Record:**
Obtain from Hostinger control panel → Email → DKIM

**DMARC Record:**
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@vz-juspol.sr
```

---

## Security Considerations

### Password Storage
- NEVER stored in `system_settings` table (empty string placeholder)
- Encrypted in Supabase Vault (`vault.secrets`)
- Decrypted only during email sending
- Admin-only access via RLS

### Audit Logging
All email configuration changes logged to `activity_logs`:
- Trigger: `audit_system_settings_trigger`
- Function: `audit_system_settings_change()`
- Captures: old/new values, user_id, timestamp

### Input Validation
- Email addresses validated (regex + length)
- Port numbers validated (1-65535)
- Subject length limited (255 chars)
- Recipient count limited (50 max)
- HTML sanitized for text version

---

## Troubleshooting

### Test Email Fails with Masked Password
**Symptom:** "SMTP wachtwoord niet gevonden" error  
**Cause:** Password not stored in Vault  
**Solution:** Enter password and save settings first

### Resend Fallback Not Triggering
**Symptom:** SMTP error with no fallback  
**Cause:** Resend API key not configured  
**Solution:** Add `resend_api_key` to `system_settings` or `RESEND_API_KEY` secret

### Emails Not Delivered
**Symptom:** send-email succeeds but emails don't arrive  
**Cause:** DNS records not configured, SPF/DKIM missing  
**Solution:** Configure SPF, DKIM, DMARC records in DNS

### Authentication Fails Despite Correct Password
**Symptom:** `EAUTH` error with correct credentials  
**Cause:** Hostinger requires app-specific password or 2FA  
**Solution:** Generate app-specific password in Hostinger panel

---

## Links

- [Backend Architecture](./backend-architecture.md)
- [API Reference](./api-reference.md) (Edge Functions section)
- [Admin User Guide](./admin-user-guide.md) (Email Configuration section)
- [Tasks](./tasks.md) (Phase 7: Email Migration)

---

**Await Further Instructions**
