# Implementation Plan: Figma-to-FSE Autonomous Template Conversion

**Created:** 2026-01-19
**Project:** Claude Code WordPress Template
**Goal:** Enable single-prompt autonomous conversion of Figma designs to pixel-perfect WordPress FSE templates

---

## Executive Summary

Build a comprehensive autonomous workflow that converts 6-15 Figma templates to WordPress FSE themes without "should I continue?" interruptions. The solution uses a hybrid approach:

1. **Clarifying Phase (1-2 min):** Locate design system, extract ALL design tokens wholesale, translate to theme.json, confirm scope, create plan
2. **Autonomous Execution:** Use `superpowers:executing-plans` for uninterrupted work until pixel-perfect

**Key Innovation:** New `figma-fse-converter` agent + `figma-to-fse-autonomous-workflow` skill that orchestrates Figma MCP, existing WordPress skills, and automated quality hooks.

---

## Current State Analysis

### What Exists ✅
- Figma MCP installed with 4 tools (get_code, get_image, get_variable_defs, get_code_connect_map)
- Strong FSE skills (fse-block-theme-development, block-pattern-creation)
- Autonomous patterns (executing-plans skill, hooks, episodic-memory)
- WordPress security/quality automation (PHPCS, security-scan, performance checks)

### What's Missing ❌
- No Figma design token → theme.json extraction workflow
- No Figma component → WordPress block mapping guidance
- No autonomous markup generation from designs
- Existing agents (frontend-developer, ui-designer) are web-app focused, not FSE-aware

### The Gap
Need a **translation layer** that bridges Figma designs to WordPress FSE foundation.

---

## Architecture Overview

### Three-Layer Solution

**Layer 1: Orchestration Skill**
- `figma-to-fse-autonomous-workflow` - Master workflow coordinating entire pipeline
- Triggers: "Turn Figma designs into FSE templates", "convert Figma to WordPress", "pixel-perfect FSE"

**Layer 2: Specialized Agent**
- `figma-fse-converter` - New agent with FSE + Figma expertise
- Configured for autonomous execution (no checkpoint prompts)
- Uses Opus model for advanced design interpretation

**Layer 3: Automation Hooks**
- Post-template creation: Security scan, coding standards, token validation
- Completion: Generate comparison report, visual verification

---

## Workflow Phases

### Phase 1: Discovery & Planning (1-2 minutes)

```
Input: Figma file URL + "Turn all designs into FSE templates"

Steps:
1. **Find/Ask for Design System location in Figma**
   - Ask user: "Where is your design system? (Figma page, frame, or component library)"
   - Or use Figma MCP to search for common design system patterns
   - Locate: color styles, typography styles, spacing tokens, component library

2. Use get_variable_defs → extract ALL design system tokens
   - Colors: primary, secondary, neutrals, semantic colors
   - Typography: font families, weights, sizes, line heights
   - Spacing: scale (4px, 8px, 16px, 24px, 32px, etc.)
   - Layout: breakpoints, container widths

3. Translate design system wholesale into theme.json
   - Map every color variable → settings.color.palette
   - Map every text style → settings.typography
   - Map every spacing token → settings.spacing.spacingSizes
   - This becomes the foundation for all templates

4. Use Figma MCP get_image → capture all template screenshots
5. Count total templates (6-15 expected)
6. Map Figma components → WordPress blocks
7. Generate implementation plan using superpowers:writing-plans
8. Present plan to user with complete token mapping

Output: Detailed plan + confirmation prompt
```

### Phase 2: Autonomous Execution (No interruptions)

```
Trigger: User approves plan → /superpowers:executing-plans

Subagent execution:
1. Create theme.json from Figma design tokens
2. For each template (1-15):
   a. Use get_code to extract component structure
   b. Generate FSE template HTML using WordPress blocks
   c. Apply theme.json tokens (no hardcoded values)
   d. Create responsive layouts (mobile/tablet/desktop)
   e. Add accessibility attributes
3. Create supporting block patterns
4. Run automated verification hooks
5. Generate comparison screenshots

Output: Complete FSE theme with all templates
```

### Phase 3: Verification & Iteration (Autonomous until pixel-perfect)

```
Loop until pixel-perfect:
1. Compare Figma screenshots vs. rendered templates
2. Identify visual discrepancies
3. Fix spacing/typography/color issues
4. Re-verify
5. Continue without asking permission

Exit: Visual match within 5px tolerance OR user intervention
```

---

## Figma MCP Integration Strategy

### Design System Discovery (Critical First Step)

**Before extracting any templates, locate and extract the entire design system:**

1. **Ask user for design system location:**
   - "Where is your design system in Figma?"
   - Common locations: Separate "Design System" page, "Styles" page, component library
   - Could be in same file or linked library

2. **Use Figma MCP to search for design system patterns:**
   - Look for pages named: "Design System", "Styles", "Tokens", "Library"
   - Look for frames with organized color/typography/spacing documentation
   - Check for published component libraries

3. **Extract COMPLETE design system wholesale:**
   - ALL color variables (not just primary/secondary)
   - ALL typography styles (headings, body, captions, labels)
   - ALL spacing tokens (complete scale)
   - ALL layout settings (breakpoints, container widths)

### Tool Usage

**get_variable_defs:** Design token extraction (PRIMARY TOOL)
```
CRITICAL: Extract ENTIRE design system first, translate wholesale to theme.json

Figma variables → theme.json structure:
- Colors → settings.color.palette (ALL colors, not selective)
- Typography → settings.typography.fontFamilies + fontSizes (ALL styles)
- Spacing → settings.spacing.spacingSizes (COMPLETE scale)
- Layout → settings.layout.contentSize + wideSize

This creates the foundation. All templates MUST use these tokens exclusively.
```

**get_image:** Visual reference
```
- Initial context gathering (what needs to be built)
- Pixel-perfect comparison during verification
- Fallback when get_code fails (known annotation bug)
```

**get_code:** Component structure extraction
```
- Extract component markup
- Known issue: Fails if annotations present
- Workaround: Try get_code first, fallback to get_image + manual interpretation
```

### Dual-Mode Strategy

**Figma Desktop App + Dev Mode (Preferred)**
- Local MCP server at http://127.0.0.1:3845/sse
- Direct access to design data
- Real-time updates as designs change
- More reliable get_code results

**Figma Remote MCP (Fallback)**
- Remote MCP at https://mcp.figma.com/mcp
- Browser extension provides Figma URL
- get_image always works
- get_code may fail (use image analysis instead)

---

## Autonomous Execution Mechanism

### Leveraging superpowers:executing-plans

**Core Pattern:**
```
User: "Turn all Figma designs into FSE templates"

Claude (Main Agent):
1. Discovery phase (Figma MCP extraction)
2. Create implementation plan
3. Present plan to user
4. User: "Proceed"
5. Invoke: Skill(superpowers:executing-plans)

Subagent (Autonomous Executor):
- Receives plan as instruction
- NO "should I continue?" prompts
- Works until plan complete or error
- Main agent monitors, doesn't interrupt
- Executes for hours if needed (6-15 templates)
```

### Error Recovery Without Stopping

**Pattern:**
```
If error occurs during template conversion:

1. Log error to .claude/reports/errors.log
2. Try alternative approach:
   - get_code failed → use get_image
   - Block mapping unclear → use simpler block structure
   - Token missing → add to theme.json
3. Continue with next template
4. Don't ask "should I continue?"
5. Generate error summary at end

Only stop if:
- Figma MCP completely unreachable
- WordPress file structure missing
- User manually interrupts
```

### Episodic Memory for Context Persistence

**Problem:** Context runs out after 2-3 templates

**Solution:** Checkpoint every 3 templates
```
After every 3 templates:

1. Save state to episodic memory:
   - Templates completed (list)
   - Templates remaining (list)
   - Design token mappings
   - Known component patterns
   - Common issues encountered

2. If context approaches limit:
   - Trigger episodic-memory:save
   - Start fresh session
   - Load state from memory
   - Continue from checkpoint
```

---

## Component Mapping Guide

### Figma → WordPress Block Mapping

| Figma Component | WordPress Block | Notes |
|----------------|-----------------|-------|
| Hero sections | Cover block | Full-width background with overlay content |
| Card grids | Columns + Group blocks | Responsive column layouts |
| Navigation | Navigation block | Header/footer menus |
| Forms | Form blocks | Contact, newsletter forms |
| CTAs | Buttons block | Call-to-action sections |
| Testimonials | Quote block + Group | Customer quotes with attribution |
| Image galleries | Gallery block | Grid or masonry layouts |
| Text sections | Paragraph + Heading | Content blocks |
| Accordions | Details block | Collapsible content |
| Spacers | Spacer block | Vertical spacing control |

---

## Implementation Phases

### Phase 1: MVP (Week 1) - Core Autonomous Pipeline

**Goal:** Single template conversion, fully autonomous

**Build:**
1. Create `figma-to-fse-autonomous-workflow` skill (minimal version)
2. Create `figma-fse-converter` agent
3. Implement design token extraction (get_variable_defs → theme.json)
4. Implement single template conversion (Figma frame → FSE template)
5. Integrate with superpowers:executing-plans for autonomous execution

**Test:**
- User: "Convert this Figma hero section to FSE"
- Agent: Extracts tokens, creates theme.json, generates template, no interruptions
- Success: Pixel-perfect hero section in < 5 minutes

**Critical Files:**
- `.claude/skills/figma-to-fse-autonomous-workflow/SKILL.md`
- `.claude/agents/figma-fse-converter.md`
- `scripts/figma-fse/extract-design-tokens.sh`
- `.claude/hooks/figma-fse-post-template.sh`

### Phase 2: Multi-Template Orchestration (Week 2)

**Goal:** Handle 6-15 templates autonomously

**Build:**
1. Enhance skill to handle multiple templates
2. Add episodic memory checkpoints (every 3 templates)
3. Implement error recovery (get_code fails → get_image fallback)
4. Create comparison verification loop
5. Add hooks for automated quality gates

**Test:**
- User: "Turn all 12 Figma templates into FSE theme"
- Agent: Works for 1-2 hours autonomously, completes all templates
- Success: Complete FSE theme, pixel-perfect, no manual intervention

**Critical Files:**
- Enhanced skill with multi-template orchestration
- `scripts/figma-fse/batch-convert-templates.sh`
- `.claude/hooks/figma-fse-completion.sh`

### Phase 3: Pixel-Perfect Iteration (Week 3)

**Goal:** Autonomous refinement until designs match exactly

**Build:**
1. Visual comparison algorithm (screenshot diff)
2. Automated layout adjustment logic
3. Typography/spacing fine-tuning
4. Responsive breakpoint optimization
5. Accessibility verification

**Test:**
- Agent generates template
- Compares vs. Figma screenshot
- Identifies 10px spacing issue
- Fixes automatically without asking
- Re-verifies until perfect

**Critical Files:**
- `scripts/figma-fse/screenshot-compare.sh`
- `scripts/figma-fse/validate-template.sh`
- `scripts/figma-fse/generate-comparison-report.sh`

### Phase 4: Production Hardening (Week 4)

**Goal:** Handle edge cases, errors, complex designs

**Build:**
1. Handle Figma annotations (known get_code issue)
2. Complex component mapping (nested groups, custom blocks)
3. Block pattern extraction from repetitive sections
4. Style variation support
5. Comprehensive error reporting

**Test:**
- Convert complex e-commerce template (15 sections, 50+ components)
- Handle Figma file with annotations
- Recover from MCP timeouts
- Success: Complete theme with complex patterns

---

## Critical Files to Create/Modify

### New Skill (Priority 1)
**File:** `.claude/skills/figma-to-fse-autonomous-workflow/SKILL.md`

Core orchestration skill coordinating the entire Figma-to-FSE pipeline, integrates with Figma MCP tools, manages autonomous execution flow.

### New Agent (Priority 1)
**File:** `.claude/agents/figma-fse-converter.md`

Specialized agent with WordPress FSE + Figma expertise, system prompt configured for autonomous execution without checkpoints, uses Opus model.

### Automation Scripts (Priority 2)
- `scripts/figma-fse/extract-design-tokens.sh` - Extract Figma variables → theme.json
- `scripts/figma-fse/generate-comparison-report.sh` - Screenshot comparison and verification
- `scripts/figma-fse/validate-template.sh` - Template syntax and token validation
- `scripts/figma-fse/screenshot-compare.sh` - Visual diff algorithm

### Hooks (Priority 2)
- `.claude/hooks/figma-fse-post-template.sh` - Runs after each template creation
- `.claude/hooks/figma-fse-completion.sh` - Runs when agent completes work

### Enhanced Skill (Priority 3)
**File:** `.claude/skills/fse-block-theme-development/SKILL.md`

Add Figma design token mapping section and autonomous mode instructions.

---

## Design Decisions & Trade-offs

### 1. New Agent vs. Skill-Only
**Choice:** New specialized agent (figma-fse-converter)

**Rationale:**
- Frontend-developer is web-app focused (React, Vue) - adding WordPress would dilute focus
- Orchestration complexity requires dedicated agent
- Can be invoked automatically via skill trigger
- Hooks can be agent-specific

### 2. Figma MCP vs. Browser Extension
**Choice:** Figma MCP primary, browser extension as prompt source

**Rationale:**
- MCP provides structured data (variables, code, images)
- Browser extension good for initial URL/context
- MCP enables programmatic token extraction
- Hybrid approach handles both workflows

### 3. Fully Autonomous vs. Hybrid
**Choice:** Hybrid (1-min clarification → autonomous execution)

**Rationale:**
- 6-15 templates is large scope (need validation before proceeding)
- Design token mapping needs human verification
- After plan approval, zero interruptions
- User's pain point is "should I continue?" during execution - this eliminates that

### 4. Single Skill vs. Multiple Coordinated Skills
**Choice:** Single orchestration skill + leverage existing skills

**Rationale:**
- figma-to-fse-autonomous-workflow is the conductor
- Delegates to fse-block-theme-development for theme.json
- Delegates to block-pattern-creation for patterns
- Composition over duplication

### 5. Episodic Memory for Long Sessions
**Choice:** Checkpoint state every 3 templates

**Rationale:**
- Context window limits (6-15 templates is extensive)
- Enables multi-session work if needed
- Preserves design token mappings
- Allows recovery from interruptions

---

## Success Metrics

**Performance Targets:**
- Single template: < 5 minutes
- 6 templates: < 30 minutes
- 15 templates: < 90 minutes
- Zero "should I continue?" prompts during execution
- Pixel-perfect match (within 5px tolerance)
- 100% theme.json token usage (no hardcoded values)

**Quality Targets:**
- All security scans pass
- All coding standards pass
- All templates responsive (mobile/tablet/desktop)
- All accessibility attributes present
- All content editable through block editor

---

## Example User Experience

**User:** "Turn all designs into FSE templates"

**Claude (Main Agent):**
```
I'll analyze your Figma file and convert all designs to WordPress FSE templates.

First, I need to locate your design system. Where is it in your Figma file?
(Common locations: "Design System" page, "Styles" page, component library)
```

**User:** "It's on the 'Design System' page"

**Claude (Main Agent):**
```
Perfect! Extracting complete design system...

[Uses Figma MCP get_variable_defs on Design System page]

✅ Design system extracted wholesale:
- Colors: 12 total (primary, secondary, accent, neutrals, semantic colors)
- Typography: 3 font families, 8 size scales, 4 weights
- Spacing: 9-point scale (4px to 96px)
- Layout: 3 breakpoints, max-width 1200px

Translating to theme.json...

✅ theme.json foundation created

Now analyzing templates:
- Found 12 templates to convert
- All will use theme.json tokens (no hardcoded values)

Here's what I'll build:

1. theme.json with design system
2. 12 FSE templates (Homepage, About, Services, etc.)
3. 5 reusable block patterns
4. Responsive layouts (mobile/tablet/desktop)
5. Pixel-perfect match verification

Estimated time: 45-60 minutes of autonomous work.

Proceed?
```

**User:** "Yes"

**Claude:** Starting autonomous execution...

**[55 minutes of uninterrupted work]**

**Claude:**
```
✅ Conversion complete!

Your FSE theme is ready:
- 12 templates created
- 0 hardcoded values (100% theme.json tokens)
- Fully responsive
- Accessibility attributes included

See: .claude/reports/figma-fse-comparison.md
```

**Key Point:** ZERO "should I continue?" prompts during execution.

---

## Implementation Checklist

### Phase 1: MVP (Starting Point)

- [x] Create `.claude/skills/figma-to-fse-autonomous-workflow/SKILL.md`
- [x] Create `.claude/agents/figma-fse-converter.md`
- [x] Create `scripts/figma-fse/extract-design-tokens.sh`
- [x] Create `.claude/hooks/figma-fse-post-template.sh`
- [x] Implement design token extraction (Figma → theme.json) - IMPLEMENTATION-GUIDE.md created
- [x] Implement single template conversion (Figma frame → FSE template) - TEMPLATE-EXAMPLES.md created
- [x] Integrate with superpowers:executing-plans - AUTONOMOUS-EXECUTION.md created
- [ ] Test: Hero section conversion, zero interruptions

### Phase 2: Multi-Template (Future)

- [ ] Enhance skill for 6-15 template handling
- [ ] Add episodic memory checkpointing
- [ ] Implement error recovery (get_code → get_image fallback)
- [ ] Create automated quality hooks
- [ ] Create `.claude/hooks/figma-fse-completion.sh`
- [ ] Test: 12 template project, autonomous completion

### Phase 3: Pixel-Perfect (Future)

- [ ] Create `scripts/figma-fse/screenshot-compare.sh`
- [ ] Create `scripts/figma-fse/validate-template.sh`
- [ ] Create `scripts/figma-fse/generate-comparison-report.sh`
- [ ] Implement automated layout adjustment
- [ ] Add responsive breakpoint optimization
- [ ] Test: Visual match verification loop

### Phase 4: Production (Future)

- [ ] Handle Figma annotation edge case
- [ ] Complex component mapping (nested blocks)
- [ ] Block pattern extraction
- [ ] Comprehensive error reporting
- [ ] Test: Complex e-commerce template

---

## Verification Plan

### After Phase 1 Completion

1. **Create test Figma file** with single hero section
2. **Enable Figma Dev Mode** in desktop app
3. **Run conversion:** "Convert this hero section to FSE"
4. **Verify outputs:**
   - theme.json created with design tokens
   - templates/front-page.html created
   - No hardcoded hex colors
   - Security scan passed
   - Coding standards passed
   - No "should I continue?" prompts
5. **Visual comparison:** Screenshot rendered vs. Figma design
6. **Success criteria:** < 5 minutes, pixel-perfect (within 5px)

### After Phase 2 Completion

1. **Create test Figma file** with 6 templates
2. **Run conversion:** "Turn all designs into FSE theme"
3. **Verify autonomous execution:**
   - Works for 15-30 minutes uninterrupted
   - All 6 templates created
   - Episodic memory checkpoint saved
   - All quality gates passed
4. **Success criteria:** < 30 minutes, all templates pixel-perfect

---

## Dependencies & Prerequisites

**Required:**
- Figma MCP installed and configured ✅
- Figma desktop app with Dev Mode enabled
- Superpowers plugin active ✅
- fse-block-theme-development skill working ✅
- block-pattern-creation skill working ✅
- WordPress theme directory structure (themes/)
- WP-CLI available for validation

**Nice to Have:**
- Local WordPress install for rendering
- Screenshot comparison tool (Playwright/Puppeteer)
- Automated browser testing setup

---

## Risk Mitigation

**Risk 1: Figma MCP unreliable (get_code fails with annotations)**

**Mitigation:**
- Implement fallback: get_code → get_image analysis
- Test with annotated Figma files before Phase 2
- Document workaround in skill

**Risk 2: Context window exhaustion (15 templates is extensive)**

**Mitigation:**
- Episodic memory checkpointing every 3 templates
- Test multi-session resume in Phase 2
- Clear session state between templates

**Risk 3: Design interpretation errors (wrong block choice)**

**Mitigation:**
- Component mapping guide in skill
- User validates plan before autonomous execution
- Iteration loop fixes visual mismatches

**Risk 4: WordPress block constraints (design not possible with FSE)**

**Mitigation:**
- Document block limitations in skill
- Flag non-FSE-compatible designs early
- Suggest alternative approaches

---

## Next Steps

1. **Get user confirmation** on hybrid autonomous approach ✅
2. **Start Phase 1 implementation:**
   - Create figma-to-fse-autonomous-workflow skill
   - Create figma-fse-converter agent
   - Build design token extraction
3. **Test with single template** (hero section)
4. **Iterate and refine** based on results
5. **Move to Phase 2** for multi-template orchestration

---

**Status:** ✅ Phase 1 MVP COMPLETE (2026-01-19)
**Next:** User testing - Run Test 1 from TESTING-GUIDE.md to verify single template conversion

**Phase 1 Deliverables:**
- figma-to-fse-autonomous-workflow skill (6 documentation files, 106KB total)
- figma-fse-converter agent (18KB, Opus model, autonomous mode)
- 4 automation scripts (validation, logging, reporting)
- 1 quality hook (post-template validation)
- Complete implementation guides and testing documentation

**End of Plan**
