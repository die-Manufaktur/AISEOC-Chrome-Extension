# WordPress Skills Catalog

This directory contains custom WordPress development skills for Claude Code, optimized for FSE (Full Site Editing) block theme development.

## Skill Index

### Core WordPress Workflows (Priority 1)

1. **fse-block-theme-development**
   - Systematic workflow for FSE block theme creation
   - Triggers: "create block theme", "add template", "create block pattern", "theme.json"
   - Complements: frontend-developer agent, ui-designer agent

2. **block-pattern-creation**
   - Systematic approach to creating reusable block patterns
   - Triggers: "create pattern", "register pattern", "pattern category"
   - Complements: fse-block-theme-development skill, ui-designer agent

3. **wordpress-security-hardening**
   - Security best practices beyond automated scripts
   - Triggers: "security review", "sanitize input", "escape output", "nonce verification"
   - Complements: security-scan.sh script

4. **wp-cli-workflows**
   - Automate common WP-CLI tasks
   - Triggers: "scaffold theme", "create plugin", "export database", "search-replace"
   - Complements: commit-commands plugin

### Advanced Workflows (Priority 2)

5. **wordpress-testing-workflows**
   - PHPUnit test creation and execution for WordPress
   - Triggers: "write tests", "run phpunit", "test coverage", "integration tests"
   - Complements: test-writer-fixer agent

6. **wordpress-deployment-automation**
   - CI/CD and deployment workflows for WordPress
   - Triggers: "deploy to production", "CI/CD setup", "environment sync"
   - Complements: git workflows, WP-CLI workflows

7. **wordpress-internationalization**
   - i18n/l10n workflows for themes and plugins
   - Triggers: "translate", "i18n", "pot file", "localization"
   - Complements: theme/plugin development workflows

8. **wordpress-hook-integration**
   - Creating pre/post hooks for custom agents
   - Triggers: "add hook", "create agent hook", "lifecycle event"
   - Complements: all 24 custom agents in this template

## When to Use Each Skill

### Starting a New FSE Theme
1. Use **fse-block-theme-development** for theme.json setup and template structure
2. Use **block-pattern-creation** for reusable UI patterns
3. Use **wordpress-security-hardening** during development
4. Use **wordpress-testing-workflows** for quality assurance

### Scaffolding and Automation
1. Use **wp-cli-workflows** for theme/plugin scaffolding
2. Use **wordpress-deployment-automation** for production deployment
3. Use **wordpress-hook-integration** for custom agent workflows

### Internationalization
1. Use **wordpress-internationalization** when preparing theme/plugin for translation

## Integration with Existing Agents

Each skill is designed to work seamlessly with the 24 custom agents in this template:

- **frontend-developer** + fse-block-theme-development
- **ui-designer** + block-pattern-creation
- **test-writer-fixer** + wordpress-testing-workflows
- **performance-benchmarker** + wordpress-deployment-automation
- All agents + wordpress-security-hardening

## Testing Methodology

All skills were created using TDD (Test-Driven Documentation):

1. **RED Phase:** Create pressure scenarios and watch Claude fail without the skill
2. **GREEN Phase:** Write minimal skill to address baseline failures
3. **REFACTOR Phase:** Close loopholes and bulletproof the skill

Each skill includes:
- Clear triggering description with keywords
- Quick reference tables
- Implementation patterns
- Common mistakes section
- Rationalization counters

## Skill Structure

```yaml
---
name: skill-name-with-hyphens
description: Use when [specific triggers]. Keywords: relevant, search, terms
---

# Skill Name
## Overview
## When to Use
## Quick Reference
## Implementation
## Common Mistakes
```

## Maintenance

Skills are version-controlled and updated when:
- WordPress core changes require updates
- New security vulnerabilities are discovered
- Better patterns emerge from community feedback
- Baseline testing reveals new rationalizations

---

**Created:** 2026-01-18
**Template Version:** FSE-focused WordPress development
**Total Skills:** 8
