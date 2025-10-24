# 📦 Backup & Rollback Procedures
**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-10-23

---

## 🎯 Purpose
This document outlines backup and rollback procedures for the VZ Juspol Portal 2.0, ensuring safe deployment and recovery capabilities.

---

## 📋 Pre-Deployment Backup Checklist

### 1. Git Version Control
```bash
# Create pre-deployment tag
git tag -a v-email-hostinger-20251023 -m "SMTP Migration Complete - Phase 7"
git push origin v-email-hostinger-20251023

# Verify tag created
git tag -l "v-email-*"
```

### 2. Database Backup
**System Settings Export:**
1. Navigate to Lovable Cloud backend UI
2. Access `system_settings` table
3. Click "Export" → Select "CSV" format
4. Save as: `system_settings_backup_20251023.csv`
5. Store in: `/backups/database/`

**Manual SQL Backup (Optional):**
```sql
-- Export system settings
COPY (SELECT * FROM system_settings WHERE category = 'email') 
TO '/tmp/email_settings_backup.csv' 
WITH CSV HEADER;
```

### 3. Edge Functions Backup
**Directory Backup:**
```bash
# Create timestamped backup
cp -r supabase/functions/ backups/functions_20251023/

# Or create tar archive
tar -czf backups/functions_20251023.tar.gz supabase/functions/
```

**Critical Files to Backup:**
- `supabase/functions/send-email/index.ts`
- `supabase/functions/test-smtp-connection/index.ts`
- `supabase/functions/test-resend-connection/index.ts` (legacy)

### 4. Admin UI Backup
**Component Backup:**
```bash
# Backup email settings component
cp src/admin/pages/settings/tabs/EmailSettingsTab.tsx \
   backups/components/EmailSettingsTab_20251023.tsx
```

### 5. Documentation Backup
**Backup Documentation:**
```bash
# Create documentation snapshot
cp -r docs/ backups/docs_20251023/
```

---

## 🔄 Rollback Procedures

### Level 1: Configuration Rollback (No Code Changes)
**Scenario:** SMTP not working, revert to Resend only

**Steps:**
1. Navigate to Admin → Settings → Email Settings
2. Change provider from "Hostinger SMTP" to "Resend API"
3. Verify Resend API key is configured
4. Click "Bewaar Instellingen"
5. Test email delivery via Resend

**Timeline:** 5 minutes  
**Impact:** None (seamless provider switch)

---

### Level 2: Database Rollback (Restore Settings)
**Scenario:** Corrupted email settings, need to restore from backup

**Steps:**
1. Access Lovable Cloud backend UI
2. Navigate to `system_settings` table
3. Delete all rows with `category = 'email'`
4. Import CSV backup: `system_settings_backup_20251023.csv`
5. Verify settings restored correctly
6. Test email functionality

**Timeline:** 10 minutes  
**Impact:** Temporary email service interruption

---

### Level 3: Edge Function Rollback
**Scenario:** New edge functions causing errors, need previous version

**Steps:**
1. **Restore from backup:**
   ```bash
   # Stop if functions directory exists
   rm -rf supabase/functions/send-email/
   rm -rf supabase/functions/test-smtp-connection/
   
   # Restore from backup
   cp -r backups/functions_20251023/send-email/ supabase/functions/
   cp -r backups/functions_20251023/test-smtp-connection/ supabase/functions/
   ```

2. **Deploy restored functions:**
   - Edge functions auto-deploy on file changes
   - Wait 1-2 minutes for deployment
   - Monitor Lovable Cloud logs for success

3. **Verify functionality:**
   - Test email sending
   - Check admin UI integration
   - Review function logs

**Timeline:** 15 minutes  
**Impact:** Brief email service disruption during deployment

---

### Level 4: Full Git Rollback
**Scenario:** Critical system failure, need complete rollback

**Steps:**
1. **Identify rollback point:**
   ```bash
   git log --oneline --graph
   git tag -l "v-*"
   ```

2. **Create safety branch:**
   ```bash
   git checkout -b rollback-safety-20251023
   git push origin rollback-safety-20251023
   ```

3. **Rollback to previous tag:**
   ```bash
   git checkout v-pre-smtp-migration
   # Or specific commit
   git checkout <commit-hash>
   ```

4. **Force push (if on main branch):**
   ```bash
   git push origin main --force
   ```

5. **Verify rollback:**
   - Check application functionality
   - Test email delivery (will be Resend-only)
   - Review admin UI state
   - Monitor error logs

**Timeline:** 30 minutes  
**Impact:** Full service restoration to previous state

---

## 🔍 Verification After Rollback

### Post-Rollback Checklist
- [ ] Application loads without errors
- [ ] Admin authentication working
- [ ] Email settings accessible in admin UI
- [ ] Test email sends successfully
- [ ] Wizard submission triggers notification
- [ ] No console errors in browser
- [ ] Edge function logs show no errors
- [ ] Database queries executing normally

### Monitoring Commands
```bash
# Check Edge Function logs (via Lovable Cloud UI)
# Navigate to: Backend → Functions → send-email → Logs

# Check recent errors
SELECT * FROM logs 
WHERE level = 'error' 
AND timestamp > NOW() - INTERVAL '1 hour'
ORDER BY timestamp DESC;
```

---

## 📁 Backup Storage Structure

```
project-root/
└── backups/
    ├── database/
    │   ├── system_settings_backup_20251023.csv
    │   └── email_settings_backup.csv
    ├── functions_20251023/
    │   ├── send-email/
    │   ├── test-smtp-connection/
    │   └── test-resend-connection/
    ├── components/
    │   └── EmailSettingsTab_20251023.tsx
    └── docs_20251023/
        ├── email-system.md
        ├── backend.md
        └── api-reference.md
```

---

## ⚠️ Critical Notes

1. **Never Delete Backups:** Retain backups for minimum 90 days
2. **Test Rollback:** Test rollback procedures in staging first
3. **Document Changes:** Always document why rollback was needed
4. **Notify Team:** Inform all stakeholders before major rollbacks
5. **Vault Secrets:** Supabase Vault secrets are NOT included in backups - re-enter manually if needed

---

## 🔐 Security Considerations

- **Password Protection:** Encrypt CSV backups containing sensitive data
- **Access Control:** Restrict backup access to admin users only
- **Audit Trail:** Log all backup and rollback operations
- **Off-Site Storage:** Store critical backups off-site or in cloud storage
- **Retention Policy:** Follow organizational data retention policies

---

## 📞 Emergency Contacts

**For Critical Issues:**
- Technical Lead: [Contact Info]
- DevOps Team: [Contact Info]
- Hostinger Support: https://www.hostinger.com/contact
- Resend Support: support@resend.com

---

## 📚 Related Documentation
- [Email System Architecture](./email-system.md)
- [Backend Overview](./backend.md)
- [Admin User Guide](./admin-user-guide.md)
- [Tasks & Tracking](./tasks.md)

---

**Status:** ✅ Active  
**Next Review:** 2025-11-23
