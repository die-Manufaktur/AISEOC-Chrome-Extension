# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code-integrated WordPress development template** providing a clean `wp-content` directory structure with WordPress-specific development tools and scripts.

The template is designed for:
- WordPress FSE (Full Site Editing) block theme development
- Custom WordPress plugin development
- WordPress security, performance, and accessibility auditing
- Integration with Claude Code for WordPress development workflows

## WordPress Development Scripts

This template includes WordPress-specific automation scripts:

### Security and Quality Tools
```bash
# Set up PHP CodeSniffer with WordPress standards
./scripts/wordpress/setup-phpcs.sh

# Check WordPress coding standards
./scripts/wordpress/check-coding-standards.sh

# Run security scan
./scripts/wordpress/security-scan.sh

# Check performance
./scripts/wordpress/check-performance.sh
```

## Development Commands

### WordPress Setup
```bash
# Download WordPress core files
wp core download

# Create wp-config.php
wp config create --dbname=dbname --dbuser=root --dbpass=password --dbhost=localhost

# Install WordPress
wp core install --url=example.com --title="Site Title" --admin_user=admin --admin_password=password --admin_email=admin@example.com

# Update WordPress core
wp core update

# Update all plugins
wp plugin update --all

# Update all themes
wp theme update --all
```

### Theme Development
```bash
# Activate a theme
wp theme activate theme-name

# Generate theme starter files
wp scaffold _s theme-name --theme_name="Theme Name" --author="Author Name"

# Check theme for errors
wp theme verify theme-name
```

### Plugin Development
```bash
# Activate a plugin
wp plugin activate plugin-name

# Deactivate a plugin
wp plugin deactivate plugin-name

# Generate plugin starter files
wp scaffold plugin plugin-name --plugin_name="Plugin Name"

# Run plugin tests (if PHPUnit is configured)
phpunit
```

### Database Operations
```bash
# Export database
wp db export backup.sql

# Import database
wp db import backup.sql

# Search and replace in database
wp search-replace 'old-domain.com' 'new-domain.com'

# Reset database
wp db reset
```

### Development Server
```bash
# Using PHP built-in server
php -S localhost:8000

# Using wp-cli server
wp server --host=localhost --port=8080

# Using Local by Flywheel, XAMPP, MAMP, or Docker
# Configure according to your local environment
```

## WordPress File Structure

When developing, follow these conventions:

### Theme Structure
```
wp-content/themes/theme-name/
├── style.css           # Theme information and main styles
├── functions.php       # Theme functions and hooks
├── index.php          # Main template file
├── header.php         # Header template
├── footer.php         # Footer template
├── sidebar.php        # Sidebar template
├── single.php         # Single post template
├── page.php           # Page template
├── archive.php        # Archive template
├── 404.php            # 404 error template
├── assets/
│   ├── css/          # Additional stylesheets
│   ├── js/           # JavaScript files
│   └── images/       # Theme images
└── template-parts/    # Reusable template parts
```

### Plugin Structure
```
wp-content/plugins/plugin-name/
├── plugin-name.php    # Main plugin file with header
├── includes/          # PHP includes
├── admin/            # Admin-specific functionality
├── public/           # Public-facing functionality
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── languages/        # Translation files
```

## WordPress Development Standards

### PHP Coding Standards
- Follow WordPress PHP Coding Standards
- Use WordPress functions and APIs where available
- Properly escape output: `esc_html()`, `esc_url()`, `esc_attr()`
- Sanitize input: `sanitize_text_field()`, `sanitize_email()`, etc.
- Use nonces for form submissions and AJAX requests

### Database Interactions
- Use `$wpdb` global for custom queries
- Prepare SQL queries to prevent injection: `$wpdb->prepare()`
- Use WordPress functions for common operations (get_posts, WP_Query, etc.)

### Hooks and Filters
- Use action hooks: `add_action()`, `do_action()`
- Use filter hooks: `add_filter()`, `apply_filters()`
- Follow WordPress hook naming conventions
- Document custom hooks

### JavaScript and CSS
- Enqueue scripts and styles properly using `wp_enqueue_script()` and `wp_enqueue_style()`
- Localize scripts for AJAX: `wp_localize_script()`
- Use `wp_register_script()` for conditional loading

### Security Best Practices
- Validate and sanitize all user input
- Escape all output
- Use nonces for state-changing operations
- Check user capabilities: `current_user_can()`
- Keep WordPress, themes, and plugins updated

## Testing

### PHPUnit Testing
```bash
# Install PHPUnit
composer require --dev phpunit/phpunit

# Run tests
vendor/bin/phpunit

# Run specific test file
vendor/bin/phpunit tests/test-sample.php
```

### WordPress Debugging
Add to wp-config.php:
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

## Common WordPress Functions

### Content Retrieval
- `get_posts()` - Retrieve posts
- `WP_Query` - Advanced post queries
- `get_pages()` - Retrieve pages
- `get_categories()` - Get categories
- `get_tags()` - Get tags

### Theme Functions
- `get_header()`, `get_footer()`, `get_sidebar()`
- `get_template_part()`
- `wp_head()`, `wp_footer()`
- `the_loop()`, `have_posts()`, `the_post()`

### User and Permissions
- `is_user_logged_in()`
- `current_user_can()`
- `wp_get_current_user()`
- `get_current_user_id()`

### Options and Settings
- `get_option()`, `update_option()`, `add_option()`
- `get_theme_mod()`, `set_theme_mod()`
- `get_site_option()` (for multisite)

---

## Claude Code Architecture & Configuration

### Installed Plugins (5 Total)

This project uses a lean, WordPress-optimized plugin configuration:

**User Plugins (4):**
1. **episodic-memory** - Semantic search and persistent memory across sessions
   - `/search-conversations` - Search previous conversations
   - `/remember` - Save important context
2. **commit-commands** - Structured git workflows (uses `gh` CLI)
   - `/commit` - Create structured commits
   - `/commit-push-pr` - Commit + push + create PR
   - `/clean_gone` - Clean up merged branches
3. **php-lsp** - PHP language server providing autocomplete, go-to-definition, and error detection
4. **superpowers** - Advanced development workflows and best practices skills

**Local Plugins (1):**
- **ai-taskmaster** - Task management and project planning

**Note:** GitHub integration works through the `gh` CLI (installed separately), not a plugin. See [GitHub CLI workflows](#github-cli-workflows) below.

**Documentation:** See `.claude/PLUGINS-REFERENCE.md` for detailed plugin usage

---

### Custom Agents (24 Total)

Custom agents provide specialized capabilities for specific development tasks.

**WordPress FSE Development (8 agents):**
- `frontend-developer` - Build block patterns, theme JS/CSS
- `test-writer-fixer` - Write and fix PHP unit tests
- `ui-designer` - Design block patterns and theme layouts
- `ux-researcher` - Theme usability testing
- `performance-benchmarker` - Performance optimization
- `api-tester` - REST API testing
- `analytics-reporter` - Performance metrics
- `workflow-optimizer` - Development process improvement

**General Development (16 agents):**
- Marketing, infrastructure, tooling, and product agents available for multi-purpose development

**Documentation:** See `.claude/CUSTOM-AGENTS-GUIDE.md` for complete agent catalog

---

### Agent Naming Conflicts

**⚠️ Important:** Multiple agents share the name "code-reviewer"

Use this guide to select the right one:
- **feature-dev/code-reviewer** - General development code reviews
- **pr-review-toolkit/code-reviewer** - Pull request reviews before merge
- **superpowers/code-reviewer** - Plan alignment verification

**Quick rule:** Use the most specific agent for your context (PR → pr-review-toolkit, plan verification → superpowers, general → feature-dev)

**Full guide:** See `.claude/AGENT-NAMING-GUIDE.md`

---

### Custom WordPress Skills (8 Total)

This template includes custom WordPress development skills that provide systematic workflows and best practices:

**Core WordPress Workflows (Priority 1):**

1. **fse-block-theme-development**
   - Systematic workflow for FSE block theme creation
   - theme.json-first approach with template hierarchy
   - Triggers: "create block theme", "theme.json", "FSE", "block theme"
   - Location: `.claude/skills/fse-block-theme-development/`

2. **block-pattern-creation**
   - Creating and registering reusable block patterns
   - Pattern categories, keywords, and best practices
   - Triggers: "create pattern", "register pattern", "block pattern"
   - Location: `.claude/skills/block-pattern-creation/`

3. **wordpress-security-hardening**
   - Security best practices: sanitize input, escape output, nonces
   - XSS, SQL injection, and CSRF prevention
   - Triggers: "security review", "sanitize", "escape", "nonce"
   - Location: `.claude/skills/wordpress-security-hardening/`

4. **wp-cli-workflows**
   - WP-CLI automation for scaffolding, database ops, WordPress management
   - Safe workflows with backups and dry-runs
   - Triggers: "scaffold theme", "wp command", "database export"
   - Location: `.claude/skills/wp-cli-workflows/`

**Advanced Workflows (Priority 2):**

5. **wordpress-testing-workflows**
   - PHPUnit testing for WordPress themes/plugins
   - Test fixtures, factories, and WordPress test suite integration
   - Triggers: "write tests", "PHPUnit", "test coverage"
   - Location: `.claude/skills/wordpress-testing-workflows/`

6. **wordpress-deployment-automation**
   - CI/CD pipelines with GitHub Actions
   - Deployment workflows with WP-CLI and rsync
   - Triggers: "deploy to production", "CI/CD", "GitHub Actions"
   - Location: `.claude/skills/wordpress-deployment-automation/`

7. **wordpress-internationalization**
   - i18n/l10n implementation with translation functions
   - POT file generation and GlotPress workflows
   - Triggers: "translate", "i18n", "localization", "POT file"
   - Location: `.claude/skills/wordpress-internationalization/`

8. **wordpress-hook-integration**
   - Creating Claude Code agent hooks for WordPress workflows
   - PreToolUse/PostToolUse patterns for automation
   - Triggers: "agent hook", "create hook", "automate"
   - Location: `.claude/skills/wordpress-hook-integration/`

**Skills Documentation:** See `.claude/skills/README.md` for complete skill catalog and usage guide.

**Key Features:**
- All skills created using TDD methodology (RED-GREEN-REFACTOR)
- Comprehensive quick reference tables
- Common mistakes and rationalization detection
- Integration with existing agents and plugins
- No-exceptions lists for critical practices

**When Skills Are Triggered:**
Skills are automatically invoked when Claude Code detects relevant keywords in your requests. Each skill provides systematic workflows, prevents common mistakes, and enforces WordPress best practices.

---

### Development Workflow with Claude Code

**1. Theme Development Cycle**
```bash
# Start feature branch
git checkout -b feature/hero-block-pattern

# Develop with Claude Code
# - Use php-lsp for autocomplete
# - Use frontend-developer agent for UI work
# - Use test-writer-fixer for PHP tests

# Commit with structure
/commit
# Suggested: "feat: Add hero section block pattern"

# Create PR
/commit-push-pr
# Auto-generates PR with test plan
```

**2. Code Quality Workflow**
```bash
# Check coding standards
./scripts/wordpress/check-coding-standards.sh themes/my-theme

# Security scan
./scripts/wordpress/security-scan.sh themes/my-theme

# Performance check
./scripts/wordpress/check-performance.sh themes/my-theme

# Fix issues and commit
/commit
```

**3. Using Custom Agents**
Agents are invoked automatically based on task context, or explicitly:
```
User: "Help me optimize theme performance"
Claude: [Uses performance-benchmarker agent]

User: "Build a hero block pattern"
Claude: [Uses frontend-developer agent]

User: "Write tests for my custom post type"
Claude: [Uses test-writer-fixer agent]
```

---

### WordPress + Claude Code Best Practices

**When Claude Code should:**
- ✅ Follow WordPress coding standards automatically
- ✅ Use WordPress functions instead of raw PHP/MySQL
- ✅ Escape output with `esc_html()`, `esc_url()`, `esc_attr()`
- ✅ Sanitize input with `sanitize_text_field()`, etc.
- ✅ Use nonces for form submissions
- ✅ Check user capabilities with `current_user_can()`
- ✅ Enqueue scripts/styles with `wp_enqueue_script()`
- ✅ Use `$wpdb->prepare()` for custom queries
- ✅ Create structured git commits with `/commit`
- ✅ Use appropriate specialized agents for tasks

**Security Reminders for Claude Code:**
- Never trust user input
- Always escape output
- Use nonces for state-changing operations
- Verify user capabilities before sensitive operations
- Keep WordPress, themes, and plugins updated

---

### Architecture Notes

**Plugin Philosophy:**
- Lean configuration (5 plugins total)
- WordPress-specific focus (php-lsp, not 9+ language servers)
- No redundant or duplicate plugins
- All plugins serve WordPress development
- GitHub integration via `gh` CLI (not a plugin)

**Agent Philosophy:**
- 24 custom agents available (8 WordPress-focused)
- Agents invoked contextually by Claude Code
- No action required - automatic selection
- Optional: Remove 16 non-WordPress agents (see `.claude/CUSTOM-AGENTS-GUIDE.md`)

**Documentation Structure:**
- `CLAUDE.md` (this file) - WordPress development guidance
- `.claude/PLUGINS-REFERENCE.md` - Plugin commands and usage
- `.claude/AGENT-NAMING-GUIDE.md` - Agent disambiguation
- `.claude/CUSTOM-AGENTS-GUIDE.md` - Agent catalog
- `.claude/skills/README.md` - WordPress skills catalog and usage

---

### Quick Command Reference

**WordPress Development:**
```bash
wp core download              # Download WordPress
wp theme activate my-theme    # Activate theme
wp plugin list                # List plugins
wp db export backup.sql       # Backup database
```

**Git Workflows (via commit-commands):**
```bash
/commit                       # Structured commit
/commit-push-pr              # Commit + push + PR
/clean_gone                   # Clean merged branches
```

**GitHub CLI Workflows:**
```bash
gh pr create                  # Create pull request
gh pr list                    # List pull requests
gh issue create               # Create issue
gh repo view                  # View repository info
gh auth status                # Check authentication
```

**Code Quality:**
```bash
./scripts/wordpress/check-coding-standards.sh [path]
./scripts/wordpress/security-scan.sh [path]
./scripts/wordpress/check-performance.sh [path]
```

**Plugin Management:**
```bash
/plugin list                  # List installed plugins
/plugin install <name>        # Install plugin
/plugin uninstall <name>      # Uninstall plugin
```

---

**Last Updated:** 2026-01-19
**Architecture Status:** ✅ Lean, WordPress-optimized configuration (5 plugins + gh CLI)