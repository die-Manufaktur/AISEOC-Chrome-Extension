# WordPress FSE Boilerplate Template - Design Document

**Date:** 2026-01-12
**Purpose:** Version-controlled wp-content development template for modern FSE WordPress development

## Overview

This is a clean `wp-content` directory structure optimized for full-stack WordPress FSE (Full Site Editing) development. It provides empty directories with Git tracking, comprehensive tooling integration via Claude Code, and zero scaffolding code for maximum flexibility.

## Core Philosophy

- **Pure structure, no code** - Empty directories ready for custom development
- **Git-friendly** - Strategic .gitkeep files maintain structure while .gitignore keeps repo clean
- **Modern FSE-first** - Optimized for block themes, patterns, and Gutenberg development
- **Claude Code integrated** - Specialized agents, MCP servers, and workflow commands

## Architecture

### Directory Structure

```
wp-content-template/
├── .claude/
│   ├── agents/           # WordPress-specific agents
│   ├── commands/         # Workflow commands
│   ├── mcp-servers/      # WP-CLI integration
│   └── settings.local.json
├── themes/               # Empty, ready for FSE theme development
├── plugins/              # Empty, ready for plugin development
├── mu-plugins/           # Empty, ready for must-use plugins
├── uploads/.gitkeep      # Tracked structure, ignored contents
├── languages/.gitkeep    # For translation files
├── upgrade/.gitkeep      # WordPress upgrade directory
├── .gitignore           # Comprehensive ignores
├── CLAUDE.md            # Project instructions (existing)
└── README.md            # Template usage guide
```

### Key Design Decisions

1. **No build tooling** - No package.json or composer.json in template root. Developers add per-project as needed.
2. **Empty directories** - All development directories (themes, plugins, mu-plugins) are empty. Maximum flexibility for custom development.
3. **Comprehensive .gitignore** - Handles WordPress-generated files, modern dev tooling (node_modules, vendor), IDE files, build artifacts.
4. **Minimal documentation** - Single README.md with essential usage info. CLAUDE.md already exists with detailed development standards.

## Claude Code Configuration

### WordPress-Specific Agents (6 agents)

1. **fse-theme-builder**
   - Purpose: Creates FSE block themes from scratch
   - Approach: Hybrid autonomy - asks about design system (colors, typography, spacing) before generating
   - Outputs: theme.json, templates/, template-parts/, patterns/, functions.php, style.css

2. **block-pattern-creator**
   - Purpose: Builds block patterns using core or custom blocks
   - Approach: Clarifies layout intent, then generates pattern PHP with proper registration
   - Outputs: Pattern PHP files in theme's patterns/ directory

3. **custom-block-builder**
   - Purpose: Scaffolds custom Gutenberg blocks
   - Approach: Asks about block attributes and controls before building
   - Outputs: Block directory with block.json, edit.js, save.js, style.css, @wordpress/scripts setup

4. **wordpress-security-auditor**
   - Purpose: Scans themes/plugins for security vulnerabilities
   - Approach: Autonomous scanning with detailed reports
   - Checks: SQL injection, XSS, CSRF, nonce validation, capability checks, data sanitization

5. **wordpress-performance-optimizer**
   - Purpose: Analyzes and optimizes WordPress performance
   - Approach: Asks about performance priorities before suggesting changes
   - Focus: Asset loading, database queries, caching strategies, image optimization

6. **wordpress-accessibility-auditor**
   - Purpose: WCAG 2.1 AA compliance checking
   - Approach: Autonomous audits with fix suggestions
   - Checks: Semantic HTML, ARIA attributes, keyboard navigation, color contrast, screen readers

### MCP Server

**wp-cli-mcp**
- Wraps WP-CLI commands as MCP tools
- Enables Claude to run WordPress management commands directly
- Examples: `wp core download`, `wp theme activate`, `wp db export`, `wp scaffold`
- Requirement: WP-CLI must be installed locally

### Custom Commands (3 workflow commands)

1. **/wp-setup**
   - Guides through initial WordPress installation
   - Steps: Download core, create wp-config, run install, setup database

2. **/wp-deploy**
   - Pre-deployment checklist and verification
   - Runs: Security audit, performance check, accessibility audit
   - Verifies: Backups exist, critical paths tested

3. **/wp-audit**
   - Comprehensive audit runner
   - Executes all three auditors (security, performance, accessibility)
   - Generates combined report

## .gitignore Strategy

Comprehensive ignores for modern FSE development:

```gitignore
# WordPress Generated Files
uploads/*
!uploads/.gitkeep
upgrade/*
!upgrade/.gitkeep
cache/*
*.log

# Development Dependencies
node_modules/
vendor/
.pnpm-store/

# Build Artifacts
dist/
build/
*.min.js
*.min.css
*.map

# IDE & System Files
.DS_Store
.vscode/
.idea/
*.swp
*.swo
*~

# Environment & Config
.env
.env.local
wp-config.php
.htaccess

# Temporary Files
*.tmp
.cache/
```

## README Content

Minimal, focused documentation:

```markdown
# WordPress Development Template

A clean `wp-content` structure for modern FSE WordPress development.

## Quick Start

1. Place this folder inside a WordPress installation as `wp-content/`
2. Or develop here and sync to WordPress install
3. Use WP-CLI commands for WordPress operations

## Structure

- `/themes/` - FSE block themes
- `/plugins/` - Custom plugins
- `/mu-plugins/` - Must-use plugins
- `/uploads/` - Media files (gitignored)
- `/languages/` - Translation files

## Claude Code Integration

Custom agents available:
- fse-theme-builder
- block-pattern-creator
- custom-block-builder
- wordpress-security-auditor
- wordpress-performance-optimizer
- wordpress-accessibility-auditor

Commands: `/wp-setup`, `/wp-deploy`, `/wp-audit`

## Development

Follow WordPress Coding Standards. See CLAUDE.md for detailed guidance.
```

## Implementation Considerations

1. **Agent development** - Each agent needs detailed instructions on WordPress coding standards, FSE patterns, and security best practices
2. **MCP server integration** - wp-cli-mcp requires WP-CLI detection and error handling
3. **Command workflows** - Commands should invoke appropriate agents and provide clear progress feedback
4. **Testing strategy** - Agents should be tested against real WordPress FSE development scenarios

## Success Criteria

- Empty wp-content structure with all standard directories
- All 6 WordPress agents functional and following hybrid autonomy model
- WP-CLI MCP server successfully wrapping common commands
- 3 workflow commands operational
- Comprehensive .gitignore preventing unwanted files
- Clear, minimal README for template usage
