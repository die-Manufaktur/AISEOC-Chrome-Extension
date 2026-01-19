---
name: wordpress-deployment-automation
description: Use when deploying WordPress to production, setting up CI/CD pipelines, configuring GitHub Actions workflows, or automating deployment processes. Keywords: deployment, CI/CD, GitHub Actions, production deploy, continuous deployment, WordPress deploy automation
---

# WordPress Deployment Automation

## Overview

WordPress deployment requires systematic automation to ensure consistency, reduce errors, and enable rollback. Modern deployment uses CI/CD pipelines (GitHub Actions), WP-CLI for remote operations, and environment-specific configurations.

**Core Principle:** NEVER deploy manually. ALWAYS use automated pipelines, ALWAYS backup before deploy, ALWAYS test in staging first, ALWAYS have rollback plan.

## When to Use

Use this skill when:
- Setting up CI/CD for WordPress projects
- Deploying WordPress to production/staging
- Configuring GitHub Actions workflows
- Automating asset compilation and deployment
- Setting up environment-specific configurations
- Creating deployment rollback procedures

**Symptoms that trigger this skill:**
- "deploy to production"
- "CI/CD setup"
- "GitHub Actions"
- "automate deployment"
- "staging environment"
- "continuous deployment"

## Quick Reference

### Deployment Workflow Stages

| Stage | Purpose | Tools |
|-------|---------|-------|
| Build | Compile assets (CSS/JS) | npm, webpack, composer |
| Test | Run PHPUnit tests | phpunit, wp-cli |
| Stage | Deploy to staging | rsync, git, wp-cli |
| Verify | Test on staging | Manual QA, automated tests |
| Backup | Backup production | wp db export, file backup |
| Deploy | Deploy to production | rsync, wp-cli, git hooks |
| Rollback | Revert if issues | Previous backup, git revert |

## Implementation Patterns

### Pattern 1: GitHub Actions - Complete CI/CD

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:5.7
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: wordpress_test
        ports:
          - 3306:3306

    steps:
      - uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.0'

      - name: Install Composer dependencies
        run: composer install --no-dev --optimize-autoloader

      - name: Install WordPress test suite
        run: bash bin/install-wp-tests.sh wordpress_test root root 127.0.0.1 latest

      - name: Run PHPUnit tests
        run: vendor/bin/phpunit

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install npm dependencies
        run: npm ci

      - name: Build assets
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: |
            assets/dist/
            vendor/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Backup production database
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          "cd ${{ secrets.REMOTE_PATH }} && wp db export backups/pre-deploy-$(date +%Y%m%d-%H%M%S).sql"

      - name: Deploy via rsync
        run: |
          rsync -avz --delete \
            --exclude='.git' \
            --exclude='wp-config.php' \
            --exclude='wp-content/uploads' \
            --exclude='node_modules' \
            ./ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.REMOTE_PATH }}/

      - name: Run database migrations
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          "cd ${{ secrets.REMOTE_PATH }} && wp core update-db"

      - name: Flush cache
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          "cd ${{ secrets.REMOTE_PATH }} && wp cache flush && wp rewrite flush"

      - name: Verify deployment
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          "cd ${{ secrets.REMOTE_PATH }} && wp core verify-checksums"
```

### Pattern 2: Deployment Script with WP-CLI

**File:** `scripts/deploy.sh`

```bash
#!/bin/bash

set -e # Exit on error

# Configuration
REMOTE_USER="username"
REMOTE_HOST="example.com"
REMOTE_PATH="/var/www/html"
LOCAL_PATH="."

echo "Starting deployment to production..."

# 1. Run tests locally
echo "Running tests..."
vendor/bin/phpunit
if [ $? -ne 0 ]; then
    echo "Tests failed! Aborting deployment."
    exit 1
fi

# 2. Build assets
echo "Building assets..."
npm run build

# 3. Backup remote database
echo "Backing up production database..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp db export backups/pre-deploy-$(date +%Y%m%d-%H%M%S).sql"

# 4. Backup remote files
echo "Backing up production files..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && tar -czf backups/pre-deploy-$(date +%Y%m%d-%H%M%S).tar.gz wp-content/themes wp-content/plugins"

# 5. Deploy files via rsync
echo "Deploying files..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='wp-config.php' \
    --exclude='wp-content/uploads' \
    --exclude='backups' \
    "${LOCAL_PATH}/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

# 6. Update database
echo "Updating database..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp core update-db"

# 7. Flush cache
echo "Flushing cache..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp cache flush && wp rewrite flush"

# 8. Verify deployment
echo "Verifying deployment..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp core verify-checksums"

echo "Deployment complete!"
```

### Pattern 3: Environment-Specific Configurations

**File:** `wp-config-production.php` (template)

```php
<?php
/**
 * Production WordPress configuration
 * DO NOT commit actual credentials - use environment variables
 */

// Database
define( 'DB_NAME', getenv('DB_NAME') );
define( 'DB_USER', getenv('DB_USER') );
define( 'DB_PASSWORD', getenv('DB_PASSWORD') );
define( 'DB_HOST', getenv('DB_HOST') ?: 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Security keys (generate at https://api.wordpress.org/secret-key/1.1/salt/)
define( 'AUTH_KEY',         getenv('AUTH_KEY') );
define( 'SECURE_AUTH_KEY',  getenv('SECURE_AUTH_KEY') );
define( 'LOGGED_IN_KEY',    getenv('LOGGED_IN_KEY') );
define( 'NONCE_KEY',        getenv('NONCE_KEY') );
define( 'AUTH_SALT',        getenv('AUTH_SALT') );
define( 'SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT') );
define( 'LOGGED_IN_SALT',   getenv('LOGGED_IN_SALT') );
define( 'NONCE_SALT',       getenv('NONCE_SALT') );

// WordPress database table prefix
$table_prefix = 'wp_';

// Production settings
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', false );
define( 'SAVEQUERIES', false );

// Security
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
define( 'FORCE_SSL_ADMIN', true );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );

// Performance
define( 'WP_CACHE', true );
define( 'COMPRESS_CSS', true );
define( 'COMPRESS_SCRIPTS', true );
define( 'CONCATENATE_SCRIPTS', true );
define( 'ENFORCE_GZIP', true );

// Absolute path to WordPress directory
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
```

### Pattern 4: Rollback Script

**File:** `scripts/rollback.sh`

```bash
#!/bin/bash

set -e

REMOTE_USER="username"
REMOTE_HOST="example.com"
REMOTE_PATH="/var/www/html"

# List available backups
echo "Available backups:"
ssh "${REMOTE_USER}@${REMOTE_HOST}" "ls -lh ${REMOTE_PATH}/backups/"

# Prompt for backup file
read -p "Enter backup SQL file name to restore: " BACKUP_FILE

# Confirm
read -p "This will restore ${BACKUP_FILE} to production. Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Rollback cancelled."
    exit 0
fi

# Backup current state first
echo "Backing up current state before rollback..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp db export backups/pre-rollback-$(date +%Y%m%d-%H%M%S).sql"

# Restore database
echo "Restoring database..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp db import backups/${BACKUP_FILE}"

# Flush cache
echo "Flushing cache..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
    "cd ${REMOTE_PATH} && wp cache flush && wp rewrite flush"

echo "Rollback complete!"
```

## Common Mistakes

### 1. Deploying Without Testing

**WRONG:**
```bash
git push production main # Deploy without testing
```

**WHY THIS FAILS:**
- Broken code in production
- Downtime for customers
- Emergency rollback needed

**CORRECT:**
```bash
# Test locally first
vendor/bin/phpunit

# Deploy to staging
git push staging main

# Test on staging, THEN deploy to production
git push production main
```

### 2. Not Backing Up Before Deployment

**WRONG:**
```bash
rsync -avz ./ user@server:/path/ # No backup
```

**WHY THIS FAILS:**
- Cannot rollback if deployment fails
- Data loss risk
- No recovery path

**CORRECT:**
```bash
# Backup first
ssh user@server "cd /path && wp db export backups/pre-deploy.sql"
# Then deploy
rsync -avz ./ user@server:/path/
```

### 3. Deploying Sensitive Files

**WRONG:**
```bash
rsync -avz ./ user@server:/path/
# Deploys .env, wp-config.php, secrets
```

**WHY THIS FAILS:**
- Overwrites production credentials
- Exposes secrets in version control
- Security vulnerability

**CORRECT:**
```bash
rsync -avz --exclude='.env' --exclude='wp-config.php' ./ user@server:/path/
```

### 4. Not Flushing Cache After Deployment

**WRONG:**
```bash
# Deploy files, don't flush cache
rsync -avz ./ user@server:/path/
```

**WHY THIS FAILS:**
- Users see old cached content
- CSS/JS changes not visible
- Confusion about "broken" deployment

**CORRECT:**
```bash
ssh user@server "wp cache flush && wp rewrite flush"
```

### 5. Committing Build Artifacts to Git

**WRONG:**
```bash
git add assets/dist/
git commit -m "Add compiled assets"
```

**WHY THIS FAILS:**
- Large repository size
- Merge conflicts on build files
- Unnecessary version control

**CORRECT:**
```bash
# Add to .gitignore
echo "assets/dist/" >> .gitignore

# Build during deployment
npm run build
```

## No Exceptions

**NEVER skip these deployment practices:**

1. ✅ **Test before deploying** - Run PHPUnit, manual QA
2. ✅ **Backup before deploying** - Database AND files
3. ✅ **Deploy to staging first** - Verify before production
4. ✅ **Exclude sensitive files** - wp-config.php, .env, secrets
5. ✅ **Flush cache after deploy** - Cache, rewrites, object cache
6. ✅ **Have rollback plan** - Know how to revert quickly
7. ✅ **Use automated pipelines** - No manual FTP uploads

## Integration with This Template

This skill works with:
- **wp-cli-workflows skill** - WP-CLI deployment commands
- **wordpress-testing-workflows skill** - Pre-deployment testing
- **commit-commands plugin** - Git-based deployment triggers

## Resources

- [Deployer PHP](https://deployer.org/) - PHP deployment tool
- [GitHub Actions for WordPress](https://github.com/10up/actions-wordpress)
- [WP-CLI Deploy](https://aaemnnost.tv/wp-cli-commands/deploy/)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-18
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
