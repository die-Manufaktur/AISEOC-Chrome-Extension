# Custom Agents Reference Guide

**Last Updated:** 2026-03-06
**Total Custom Agents:** 18
**Location:** `.claude/agents/`

This guide categorizes all custom agents by relevance to WordPress FSE theme development.

---

## WordPress FSE Development - Highly Relevant ✅

These agents directly support WordPress block theme development:

### **frontend-developer**
- **Purpose:** Full-stack frontend implementation for themes
- **Use for:** Building block patterns, customizing block editor UI, theme JavaScript/CSS
- **WordPress relevance:** High - FSE themes require significant frontend work

### **test-writer-fixer**
- **Purpose:** Write tests, run them, fix failures
- **Use for:** PHPUnit tests for theme functions, block registration testing
- **WordPress relevance:** High - quality themes need test coverage

### **ui-designer**
- **Purpose:** User interface design and components
- **Use for:** Designing block patterns, theme layouts, editor UI
- **WordPress relevance:** High - FSE is UI-focused

### **ux-researcher**
- **Purpose:** User experience research and testing
- **Use for:** Theme usability testing, editor experience optimization
- **WordPress relevance:** High - themes must be user-friendly

### **performance-benchmarker**
- **Purpose:** Performance testing and profiling
- **Use for:** Theme performance optimization, measuring page load times
- **WordPress relevance:** Critical - WordPress performance is a key concern

### **visual-qa-agent** (NEW)
- **Purpose:** Visual regression testing and design comparison
- **Use for:** Comparing rendered WordPress pages against Figma designs, catching wrong images, layout issues
- **WordPress relevance:** Critical - ensures pixel-perfect Figma-to-FSE conversion

### **asset-cataloger** (NEW)
- **Purpose:** Image/asset semantic mapping and validation
- **Use for:** Viewing hash-named images, creating semantic mappings, validating correct image usage in patterns
- **WordPress relevance:** Critical - prevents wrong-image-assignment errors

### **wp-environment-manager** (NEW)
- **Purpose:** Local WordPress development environment management
- **Use for:** Docker, WP-CLI, theme activation, user management, environment troubleshooting
- **WordPress relevance:** Critical - eliminates dev environment friction

### **block-markup-validator** (NEW)
- **Purpose:** WordPress block syntax validation
- **Use for:** Validating block JSON attributes, HTML class consistency, heading hierarchy, theme.json slug references
- **WordPress relevance:** Critical - catches silent rendering bugs

### **accessibility-auditor** (NEW)
- **Purpose:** WCAG 2.1 AA compliance auditing
- **Use for:** Color contrast, heading hierarchy, ARIA labels, alt text, keyboard navigation, Lighthouse audits
- **WordPress relevance:** Critical - WordPress themes must be accessible

### **theme-token-auditor** (NEW)
- **Purpose:** Design token compliance auditing
- **Use for:** Detecting hardcoded colors/pixels, validating CSS variable references, ensuring 100% theme.json token usage
- **WordPress relevance:** High - enforces design system discipline

### **content-seeder** (NEW)
- **Purpose:** WordPress demo content generation
- **Use for:** Creating pages matching templates, sample posts, navigation menus, homepage configuration
- **WordPress relevance:** High - fully populated sites for testing

### **seo-schema-agent** (NEW)
- **Purpose:** SEO and structured data auditing
- **Use for:** Heading hierarchy, meta tags, Open Graph, Schema.org recommendations, image SEO
- **WordPress relevance:** High - themes must support good SEO

---

## WordPress Development - Moderately Relevant ⚠️

These agents can be useful but aren't WordPress-specific:

### **api-tester**
- **Purpose:** API testing and validation
- **Use for:** Testing WordPress REST API endpoints, custom API integrations
- **WordPress relevance:** Moderate - useful for headless WordPress or custom APIs

### **test-results-analyzer**
- **Purpose:** Analyze test data and trends
- **Use for:** CI/CD test result analysis for theme releases
- **WordPress relevance:** Moderate - complements test-writer-fixer

### **docusaurus-expert**
- **Purpose:** Documentation site creation
- **Use for:** Theme documentation, developer guides
- **WordPress relevance:** Moderate - if documenting complex themes

### **workflow-optimizer**
- **Purpose:** Development process improvement
- **Use for:** Optimizing theme development workflows
- **WordPress relevance:** Moderate - applicable to any development

### **analytics-reporter**
- **Purpose:** Metrics and reporting
- **Use for:** Theme performance metrics, usage analytics
- **WordPress relevance:** Moderate - useful for theme analytics

---

## Removed Agents (14 total)

The following agents were removed as they had zero relevance to WordPress FSE development:

**Marketing/Business (8):** tiktok-strategist, trend-researcher, brand-guardian, visual-storyteller, support-responder, feedback-synthesizer, project-shipper, legal-compliance-checker

**Infrastructure/Tooling (4):** mcp-expert, tool-evaluator, rapid-prototyper, db-reader

**Product/UX (2):** experiment-tracker, whimsy-injector

---

## Using Custom Agents

Custom agents are invoked through Claude Code's Task tool:

```
User: "Can you help optimize the theme performance?"
Claude: [Uses Task tool with subagent_type="performance-benchmarker"]
```

Agents are automatically selected based on task context, or you can explicitly request:

```
User: "Use the frontend-developer agent to help me build this block pattern"
```

---

## How Agents Work with WordPress Skills

**NEW:** This template includes 8 custom WordPress development skills that complement the agents.

### Skills vs Agents

| Type | Purpose | When Triggered | Example |
|------|---------|----------------|---------|
| **Skills** | Systematic workflows and best practices | Keyword detection in conversation | "create block theme" triggers `fse-block-theme-development` |
| **Agents** | Specialized task execution | Task tool invocation | frontend-developer builds block patterns |

### Agent-Skill Integration

**frontend-developer agent** + WordPress Skills:
- Works with `fse-block-theme-development` for theme structure
- Works with `block-pattern-creation` for pattern registration
- Works with `wordpress-security-hardening` for secure code
- Works with `wp-cli-workflows` for theme scaffolding

**test-writer-fixer agent** + WordPress Skills:
- Works with `wordpress-testing-workflows` for PHPUnit setup
- Works with `wp-cli-workflows` for test scaffolding
- Works with `wordpress-security-hardening` for security tests

**All agents** benefit from:
- `wordpress-security-hardening` - Security best practices
- `wp-cli-workflows` - WordPress automation
- `wordpress-hook-integration` - Agent-specific hooks

### Complete WordPress Development Stack

```
WordPress Skills (8)
    ↓ Provide workflows and best practices
Agents (24)
    ↓ Execute specialized tasks
Plugins (6)
    ↓ Provide tooling and memory
Automation Scripts (4)
    ↓ Run security/performance checks
```

**Skills Documentation:** See `.claude/skills/README.md` for complete catalog

---

## Current Architecture Status

**Plugins:** ✅ Already optimized (5 user + 1 local)
**Custom Agents:** 18 total (all WordPress-relevant)

---

## Quick Reference: When to Use Which Agent

| Task | Agent | Alternative |
|------|-------|-------------|
| Build block pattern | frontend-developer | ui-designer (design first) |
| Theme performance | performance-benchmarker | analytics-reporter (metrics) |
| Write PHP tests | test-writer-fixer | - |
| Design theme UI | ui-designer | ux-researcher (research first) |
| Test REST API | api-tester | - |
| Optimize workflow | workflow-optimizer | - |
| Document theme | docusaurus-expert | - |
| Usability testing | ux-researcher | - |
| **Compare render vs Figma** | **visual-qa-agent** | - |
| **Identify/map images** | **asset-cataloger** | - |
| **Docker/WP-CLI setup** | **wp-environment-manager** | - |
| **Validate block markup** | **block-markup-validator** | theme-token-auditor |
| **Accessibility audit** | **accessibility-auditor** | - |
| **Token compliance** | **theme-token-auditor** | block-markup-validator |
| **Seed demo content** | **content-seeder** | wp-environment-manager |
| **SEO audit** | **seo-schema-agent** | - |

---

## Figma-to-FSE Conversion Pipeline

The new agents form an automated quality pipeline for Figma-to-WordPress conversions:

```
Figma Design
    ↓
figma-fse-converter (generates theme)
    ↓
asset-cataloger (maps images semantically)
    ↓
block-markup-validator (validates block syntax)
    ↓
theme-token-auditor (ensures 100% token usage)
    ↓
wp-environment-manager (starts WordPress)
    ↓
content-seeder (creates pages/posts/menus)
    ↓
visual-qa-agent (compares render vs Figma)
    ↓
accessibility-auditor (WCAG compliance)
    ↓
seo-schema-agent (SEO best practices)
    ↓
Ready for release
```

---

**Architecture Assessment:** 32 agents provide comprehensive WordPress FSE development coverage. The 8 new agents close critical gaps in visual QA, asset management, environment management, markup validation, accessibility, token compliance, content seeding, and SEO.
