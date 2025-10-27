# Hostinger VPS Deployment Guide
**Version:** 1.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-10-27

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial VPS Setup](#initial-vps-setup)
3. [Installing Dependencies](#installing-dependencies)
4. [Application Deployment](#application-deployment)
5. [Nginx Configuration](#nginx-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Environment Configuration](#environment-configuration)
8. [Deployment Scripts](#deployment-scripts)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### VPS Requirements
- **Hostinger VPS Plan:** Minimum VPS 1 (2 vCPU, 4GB RAM, 50GB NVMe)
- **OS:** Ubuntu 22.04 LTS (recommended)
- **Domain:** Custom domain pointed to VPS IP
- **Access:** SSH root access

### Local Requirements
- Git installed
- SSH client (Terminal, PuTTY, etc.)
- Code editor for configuration files

### Required Accounts
- Hostinger VPS account with active subscription
- Supabase project (via Lovable Cloud)
- Domain registrar access for DNS configuration

---

## Initial VPS Setup

### Step 1: Connect to VPS via SSH

```bash
# Connect using Hostinger-provided credentials
ssh root@your-vps-ip-address

# Example:
# ssh root@123.456.789.012
```

### Step 2: Update System Packages

```bash
# Update package list
apt update

# Upgrade all packages
apt upgrade -y

# Install essential utilities
apt install -y curl wget git build-essential ufw
```

### Step 3: Create Non-Root User

```bash
# Create new user for deployment
adduser vzportal

# Add user to sudo group
usermod -aG sudo vzportal

# Switch to new user
su - vzportal
```

### Step 4: Configure Firewall

```bash
# Allow SSH (port 22)
sudo ufw allow 22/tcp

# Allow HTTP (port 80)
sudo ufw allow 80/tcp

# Allow HTTPS (port 443)
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Installing Dependencies

### Step 1: Install Node.js 20.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should output v20.x.x
npm --version   # Should output v10.x.x
```

### Step 2: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 3: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version

# Configure PM2 to start on boot
pm2 startup systemd -u vzportal --hp /home/vzportal
```

### Step 4: Install Certbot (for SSL)

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx
```

---

## Application Deployment

### Step 1: Clone Repository

```bash
# Navigate to home directory
cd /home/vzportal

# Clone your repository (replace with actual repo URL)
git clone https://github.com/your-org/vz-portal.git

# Navigate into project
cd vz-portal
```

### Step 2: Install Dependencies

```bash
# Install production dependencies
npm ci --production=false

# Build the application
npm run build
```

### Step 3: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add the following content:

```env
# Supabase Configuration (from Lovable Cloud)
VITE_SUPABASE_URL=https://aexfhtrvblxjydnvtejr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleGZodHJ2Ymx4anlkbnZ0ZWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjI5NTksImV4cCI6MjA3NjUzODk1OX0.xWpdyzlz_FyVdPu3YPrr_crpR8uF79ON0ZhzwnywLlQ
VITE_SUPABASE_PROJECT_ID=aexfhtrvblxjydnvtejr

# Production Settings
NODE_ENV=production
VITE_DIAG_LOGS=false
```

Save and exit (Ctrl+X, Y, Enter)

### Step 4: Test Build

```bash
# Preview the built application
npm run preview -- --host 0.0.0.0 --port 3000
```

Test by visiting `http://your-vps-ip:3000` in your browser.

Press Ctrl+C to stop the preview server.

---

## Nginx Configuration

### Step 1: Create Nginx Configuration File

```bash
# Create new site configuration
sudo nano /etc/nginx/sites-available/vzportal
```

Add the following configuration:

```nginx
# VZ Portal - Vreemdelingenzaken Juspol Portal
# Hostinger VPS Deployment Configuration

upstream vzportal_backend {
    server localhost:3000;
    keepalive 64;
}

# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Let's Encrypt ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect all HTTP to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server - Main Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificate paths (will be configured by Certbot)
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Root directory for static files
    root /home/vzportal/vz-portal/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json 
               image/svg+xml;

    # Logging
    access_log /var/log/nginx/vzportal_access.log;
    error_log /var/log/nginx/vzportal_error.log warn;

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed for edge functions)
    location /api/ {
        proxy_pass http://vzportal_backend/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

Save and exit.

### Step 2: Enable Site Configuration

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/vzportal /etc/nginx/sites-enabled/

# Remove default Nginx site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## SSL Certificate Setup

### Step 1: Configure DNS

Before obtaining SSL certificate, ensure your domain's DNS is properly configured:

1. Log in to your domain registrar
2. Add/Update A record:
   - **Type:** A
   - **Name:** @ (or your subdomain)
   - **Value:** Your VPS IP address
   - **TTL:** 3600

3. Add/Update CNAME record (optional, for www):
   - **Type:** CNAME
   - **Name:** www
   - **Value:** yourdomain.com
   - **TTL:** 3600

Wait 5-10 minutes for DNS propagation.

### Step 2: Obtain SSL Certificate

```bash
# Obtain certificate for domain and www subdomain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to terms of service
# 3. Choose whether to share email with EFF
# 4. Select option 2: Redirect all HTTP to HTTPS
```

### Step 3: Test SSL Auto-Renewal

```bash
# Test renewal process (dry run)
sudo certbot renew --dry-run

# If successful, auto-renewal is configured
# Certificates will auto-renew before expiration
```

### Step 4: Verify SSL Certificate

Visit your domain in a browser:
- `https://yourdomain.com` should show secure lock icon
- HTTP should automatically redirect to HTTPS

---

## Environment Configuration

### Production Environment Variables

Create a secure `.env.production` file:

```bash
# Navigate to project directory
cd /home/vzportal/vz-portal

# Create production environment file
nano .env.production
```

Add production-specific variables:

```env
# Production Environment Configuration
NODE_ENV=production

# Supabase (Lovable Cloud)
VITE_SUPABASE_URL=https://aexfhtrvblxjydnvtejr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleGZodHJ2Ymx4anlkbnZ0ZWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjI5NTksImV4cCI6MjA3NjUzODk1OX0.xWpdyzlz_FyVdPu3YPrr_crpR8uF79ON0ZhzwnywLlQ
VITE_SUPABASE_PROJECT_ID=aexfhtrvblxjydnvtejr

# Disable diagnostic logs in production
VITE_DIAG_LOGS=false

# Application Settings
VITE_APP_URL=https://yourdomain.com
VITE_APP_NAME="Vreemdelingenzaken Juspol Portal"

# Performance Settings
VITE_ENABLE_ANALYTICS=true
VITE_CACHE_DURATION=3600
```

---

## Deployment Scripts

### Deployment Script: `deploy.sh`

Create an automated deployment script:

```bash
# Create deployment script
nano /home/vzportal/deploy.sh
```

Add the following content:

```bash
#!/bin/bash

# VZ Portal Deployment Script
# Hostinger VPS - Production Deployment

set -e  # Exit on error

echo "🚀 Starting deployment for VZ Portal..."

# Configuration
APP_DIR="/home/vzportal/vz-portal"
BACKUP_DIR="/home/vzportal/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Step 1: Create backup
echo "📦 Creating backup..."
mkdir -p $BACKUP_DIR
if [ -d "$APP_DIR/dist" ]; then
    tar -czf "$BACKUP_DIR/dist_backup_$DATE.tar.gz" -C "$APP_DIR" dist
    print_success "Backup created: dist_backup_$DATE.tar.gz"
else
    print_warning "No existing dist folder to backup"
fi

# Step 2: Navigate to app directory
cd $APP_DIR
print_success "Changed to app directory"

# Step 3: Pull latest changes
echo "📥 Pulling latest changes from repository..."
git fetch origin
CURRENT_BRANCH=$(git branch --show-current)
git pull origin $CURRENT_BRANCH
print_success "Code updated from branch: $CURRENT_BRANCH"

# Step 4: Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false
print_success "Dependencies installed"

# Step 5: Build application
echo "🔨 Building application..."
npm run build
print_success "Build completed successfully"

# Step 6: Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx
print_success "Nginx reloaded"

# Step 7: Clean old backups (keep last 5)
echo "🧹 Cleaning old backups..."
cd $BACKUP_DIR
ls -t dist_backup_*.tar.gz | tail -n +6 | xargs -r rm
print_success "Old backups cleaned"

# Step 8: Deployment complete
echo ""
echo "======================================"
print_success "🎉 Deployment completed successfully!"
echo "======================================"
echo "Deployed at: $(date)"
echo "Build artifacts: $APP_DIR/dist"
echo "Latest backup: $BACKUP_DIR/dist_backup_$DATE.tar.gz"
echo ""
```

Make the script executable:

```bash
chmod +x /home/vzportal/deploy.sh
```

### Rollback Script: `rollback.sh`

Create a rollback script for emergencies:

```bash
# Create rollback script
nano /home/vzportal/rollback.sh
```

Add the following content:

```bash
#!/bin/bash

# VZ Portal Rollback Script
# Quickly restore previous version

set -e

APP_DIR="/home/vzportal/vz-portal"
BACKUP_DIR="/home/vzportal/backups"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }

echo "🔙 VZ Portal Rollback Utility"
echo "======================================"

# List available backups
echo "Available backups:"
ls -lht $BACKUP_DIR/dist_backup_*.tar.gz | head -5

# Get latest backup
LATEST_BACKUP=$(ls -t $BACKUP_DIR/dist_backup_*.tar.gz | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    print_error "No backups found!"
    exit 1
fi

echo ""
print_warning "Latest backup: $(basename $LATEST_BACKUP)"
read -p "Restore this backup? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelled."
    exit 0
fi

# Perform rollback
echo "🔄 Starting rollback..."

# Remove current dist
if [ -d "$APP_DIR/dist" ]; then
    rm -rf "$APP_DIR/dist"
    print_success "Removed current dist"
fi

# Extract backup
tar -xzf "$LATEST_BACKUP" -C "$APP_DIR"
print_success "Backup restored"

# Reload Nginx
sudo systemctl reload nginx
print_success "Nginx reloaded"

echo ""
echo "======================================"
print_success "🎉 Rollback completed successfully!"
echo "======================================"
echo "Restored from: $(basename $LATEST_BACKUP)"
echo ""
```

Make the script executable:

```bash
chmod +x /home/vzportal/rollback.sh
```

### Health Check Script: `healthcheck.sh`

Create a health monitoring script:

```bash
# Create health check script
nano /home/vzportal/healthcheck.sh
```

Add the following content:

```bash
#!/bin/bash

# VZ Portal Health Check Script
# Monitor application and services

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_ok() { echo -e "${GREEN}✓ $1${NC}"; }
print_fail() { echo -e "${RED}✗ $1${NC}"; }
print_warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

echo "🏥 VZ Portal Health Check"
echo "======================================"

# Check Nginx
if systemctl is-active --quiet nginx; then
    print_ok "Nginx is running"
else
    print_fail "Nginx is not running"
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -lt 80 ]; then
    print_ok "Disk usage: ${DISK_USAGE}%"
else
    print_warn "Disk usage: ${DISK_USAGE}% (High!)"
fi

# Check memory
MEM_USAGE=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')
if [ $MEM_USAGE -lt 80 ]; then
    print_ok "Memory usage: ${MEM_USAGE}%"
else
    print_warn "Memory usage: ${MEM_USAGE}% (High!)"
fi

# Check application accessibility
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com)
if [ $HTTP_CODE -eq 200 ]; then
    print_ok "Application is accessible (HTTP $HTTP_CODE)"
else
    print_fail "Application returned HTTP $HTTP_CODE"
fi

# Check SSL certificate expiry
CERT_EXPIRY=$(echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
DAYS_UNTIL_EXPIRY=$(( ($(date -d "$CERT_EXPIRY" +%s) - $(date +%s)) / 86400 ))

if [ $DAYS_UNTIL_EXPIRY -gt 30 ]; then
    print_ok "SSL certificate expires in $DAYS_UNTIL_EXPIRY days"
elif [ $DAYS_UNTIL_EXPIRY -gt 7 ]; then
    print_warn "SSL certificate expires in $DAYS_UNTIL_EXPIRY days"
else
    print_fail "SSL certificate expires in $DAYS_UNTIL_EXPIRY days (URGENT!)"
fi

echo "======================================"
echo "Health check completed at $(date)"
echo ""
```

Make the script executable:

```bash
chmod +x /home/vzportal/healthcheck.sh
```

---

## Monitoring & Maintenance

### Daily Health Checks

Set up automatic health checks with cron:

```bash
# Edit crontab
crontab -e
```

Add the following line to run health check every 6 hours:

```cron
0 */6 * * * /home/vzportal/healthcheck.sh >> /home/vzportal/logs/healthcheck.log 2>&1
```

### Log Rotation

Configure log rotation for application logs:

```bash
# Create log rotation config
sudo nano /etc/logrotate.d/vzportal
```

Add the following content:

```
/var/log/nginx/vzportal_*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}

/home/vzportal/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    missingok
    create 0644 vzportal vzportal
}
```

### Nginx Access Logs Analysis

Install and configure GoAccess for real-time log analysis:

```bash
# Install GoAccess
sudo apt install -y goaccess

# Analyze logs
goaccess /var/log/nginx/vzportal_access.log --log-format=COMBINED
```

### System Resource Monitoring

Install htop for real-time monitoring:

```bash
# Install htop
sudo apt install -y htop

# Run htop
htop
```

### Automated Backups

Create a weekly backup script:

```bash
# Create backup script
nano /home/vzportal/weekly-backup.sh
```

```bash
#!/bin/bash

BACKUP_DIR="/home/vzportal/backups/weekly"
DATE=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf "$BACKUP_DIR/vz-portal-$DATE.tar.gz" \
    --exclude='node_modules' \
    --exclude='.git' \
    /home/vzportal/vz-portal

# Clean backups older than 30 days
find $BACKUP_DIR -name "vz-portal-*.tar.gz" -mtime +30 -delete

echo "Weekly backup completed: vz-portal-$DATE.tar.gz"
```

```bash
chmod +x /home/vzportal/weekly-backup.sh
```

Add to crontab (runs every Sunday at 2 AM):

```cron
0 2 * * 0 /home/vzportal/weekly-backup.sh
```

---

## Troubleshooting

### Issue 1: Application Not Accessible

**Symptoms:** Cannot access application via domain

**Diagnosis:**
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/vzportal_error.log

# Test Nginx configuration
sudo nginx -t

# Check if port 443 is listening
sudo netstat -tlnp | grep :443
```

**Solution:**
```bash
# Restart Nginx
sudo systemctl restart nginx

# If config error, fix and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Issue 2: SSL Certificate Errors

**Symptoms:** Browser shows SSL warning

**Diagnosis:**
```bash
# Check certificate status
sudo certbot certificates

# Check certificate expiry
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

**Solution:**
```bash
# Renew certificate manually
sudo certbot renew --force-renewal

# Reload Nginx
sudo systemctl reload nginx
```

### Issue 3: Build Failures

**Symptoms:** `npm run build` fails

**Diagnosis:**
```bash
# Check Node.js version
node --version

# Check available disk space
df -h

# Check build logs
npm run build 2>&1 | tee build.log
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Issue 4: High Memory Usage

**Symptoms:** Server becomes slow or unresponsive

**Diagnosis:**
```bash
# Check memory usage
free -h

# Check processes
top

# Check Nginx worker processes
ps aux | grep nginx
```

**Solution:**
```bash
# Optimize Nginx worker processes
sudo nano /etc/nginx/nginx.conf

# Set worker_processes to number of CPU cores
# worker_processes auto;
# worker_connections 1024;

# Restart Nginx
sudo systemctl restart nginx
```

### Issue 5: DNS Not Resolving

**Symptoms:** Domain doesn't point to VPS

**Diagnosis:**
```bash
# Check DNS propagation
dig yourdomain.com

# Check DNS from different locations
nslookup yourdomain.com 8.8.8.8
```

**Solution:**
1. Verify A record points to correct IP
2. Wait for DNS propagation (up to 48 hours)
3. Clear local DNS cache:
   ```bash
   sudo systemd-resolve --flush-caches
   ```

### Emergency Contacts

**Hostinger Support:**
- Website: https://hostinger.com/support
- Live Chat: Available 24/7
- Email: support@hostinger.com

**Lovable Cloud Support:**
- Discord: https://discord.com/channels/1119885301872070706
- Documentation: https://docs.lovable.dev

---

## Quick Reference Commands

### Deployment
```bash
# Deploy latest changes
~/deploy.sh

# Rollback to previous version
~/rollback.sh

# Run health check
~/healthcheck.sh
```

### Nginx Management
```bash
# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/vzportal_error.log

# View access logs
sudo tail -f /var/log/nginx/vzportal_access.log
```

### SSL Certificate
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### System Monitoring
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check running processes
htop

# Check system logs
sudo journalctl -xe
```

### Application Management
```bash
# Navigate to app directory
cd ~/vz-portal

# Pull latest code
git pull

# Install dependencies
npm ci

# Build application
npm run build

# View build output
ls -lh dist/
```

---

## Maintenance Schedule

### Daily
- [x] Automatic health checks (via cron)
- [x] Log monitoring via GoAccess

### Weekly
- [x] Review error logs
- [x] Check disk space
- [x] Automated full backup
- [x] Security updates

### Monthly
- [ ] Manual security audit
- [ ] Performance optimization review
- [ ] Clean old backups (beyond 30 days)
- [ ] Review Nginx access patterns

### Quarterly
- [ ] Full system upgrade
- [ ] SSL certificate renewal (automatic)
- [ ] Backup restore test
- [ ] Disaster recovery drill

---

## Support & Resources

### Official Documentation
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Hostinger VPS Tutorials](https://www.hostinger.com/tutorials/vps)
- [Lovable Documentation](https://docs.lovable.dev)

### Related Documents
- [PRD.md](./PRD.md) - Project Requirements
- [backend-architecture.md](./backend-architecture.md) - Backend Architecture
- [api-reference.md](./api-reference.md) - API Documentation
- [admin-user-guide.md](./admin-user-guide.md) - Admin Guide

---

**Document Status:** ✅ Complete  
**Next Review Date:** 2025-11-27  
**Maintained By:** Devmart Suriname
