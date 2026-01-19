# Custom Agents Reference Guide

**Last Updated:** 2026-01-18
**Total Custom Agents:** 24
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

## Not WordPress-Specific ❌

These agents were designed for app/product development, not WordPress:

### **Marketing & Business (8 agents)**
- **tiktok-strategist** - Social media marketing strategy
- **trend-researcher** - Market trend analysis
- **brand-guardian** - Brand consistency management
- **visual-storyteller** - Marketing content creation
- **support-responder** - Customer support automation
- **feedback-synthesizer** - User feedback analysis
- **project-shipper** - Product launch coordination
- **legal-compliance-checker** - Legal/regulatory compliance

**WordPress relevance:** Low - these are for business/product ops, not theme development

### **Infrastructure & Tooling (4 agents)**
- **mcp-expert** - Model Context Protocol integration
- **tool-evaluator** - Development tool evaluation
- **rapid-prototyper** - Rapid application prototyping
- **db-reader** - Direct database querying

**WordPress relevance:** Low to none - niche use cases

### **Product/UX (2 agents)**
- **experiment-tracker** - A/B testing and experiments
- **whimsy-injector** - Delightful UI micro-interactions

**WordPress relevance:** Very low - more for app development

---

## Recommended WordPress FSE Agent Stack

For focused WordPress theme development, these agents provide the most value:

```
✅ frontend-developer       (JS/CSS implementation)
✅ test-writer-fixer        (PHP testing)
✅ ui-designer              (Block pattern design)
✅ ux-researcher            (Theme usability)
✅ performance-benchmarker  (Performance optimization)
⚠️ api-tester              (REST API development)
⚠️ analytics-reporter      (Performance metrics)
⚠️ workflow-optimizer      (Process improvement)
```

**Total recommended:** 5 core + 3 situational = **8 agents**

---

## Optional Cleanup (If Desired)

The surgical cleanup plan retained all 24 custom agents. If you want to streamline further, consider removing these 16 agents that aren't WordPress-relevant:

**Safe to Remove (Marketing/Business):**
```bash
rm .claude/agents/tiktok-strategist.md
rm .claude/agents/trend-researcher.md
rm .claude/agents/brand-guardian.md
rm .claude/agents/visual-storyteller.md
rm .claude/agents/support-responder.md
rm .claude/agents/feedback-synthesizer.md
rm .claude/agents/project-shipper.md
rm .claude/agents/legal-compliance-checker.md
```

**Safe to Remove (Infrastructure/Tooling):**
```bash
rm .claude/agents/mcp-expert.md
rm .claude/agents/tool-evaluator.md
rm .claude/agents/rapid-prototyper.md
rm .claude/agents/db-reader.md
```

**Safe to Remove (Product/UX):**
```bash
rm .claude/agents/experiment-tracker.md
rm .claude/agents/whimsy-injector.md
```

**Consider Keeping:**
- **test-results-analyzer** - Pairs with test-writer-fixer
- **docusaurus-expert** - Useful for theme documentation

**Potential Reduction:** 24 agents → 8-10 agents (66% reduction)

---

## Agent Consolidation Ideas

If you want to keep capabilities but reduce file count:

### **Merge into "theme-ux-expert":**
- ui-designer
- ux-researcher
- whimsy-injector (optional)

### **Merge into "performance-expert":**
- performance-benchmarker
- analytics-reporter

### **Merge into "test-expert":**
- test-writer-fixer
- test-results-analyzer

**Result:** 24 agents → 5-7 consolidated experts

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

## Current Architecture Status

**Plugins:** ✅ Already optimized (5 user + 1 local)
**Custom Agents:** 📦 All 24 retained (as per surgical cleanup plan)

**Next steps (optional):**
1. Review agent list above
2. Decide if you want to remove non-WordPress agents
3. Run removal commands if desired
4. Update this guide with final agent count

**No action required** - current setup works for WordPress development, just has extra agents available if needed.

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

---

**Architecture Assessment:** While 16 agents aren't WordPress-specific, they don't harm performance and may be useful for future projects. The surgical cleanup successfully streamlined plugins (the heavy lifting), while preserving agent flexibility.
