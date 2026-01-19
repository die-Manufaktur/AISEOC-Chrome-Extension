---
name: figma-to-fse-autonomous-workflow
description: Use when converting Figma designs to WordPress FSE block themes. Orchestrates autonomous workflow from design token extraction through pixel-perfect template generation. Keywords: Figma to WordPress, FSE conversion, design tokens, autonomous template generation, pixel-perfect FSE
---

# Figma-to-FSE Autonomous Workflow

## Overview

This skill orchestrates the complete autonomous conversion of Figma designs into WordPress Full Site Editing (FSE) block themes. It bridges Figma design systems with WordPress theme.json, enabling single-prompt conversion of 1-15 templates without "should I continue?" interruptions.

**Core Innovation:** Hybrid approach with brief clarification phase (1-2 min) followed by fully autonomous execution using `superpowers:executing-plans`.

**Key Principle:** Design system FIRST → theme.json foundation SECOND → templates THIRD → verification FOURTH. Extract ALL design tokens wholesale before generating any templates.

## When to Use

Use this skill when:
- Converting Figma designs to WordPress FSE themes
- Building WordPress themes from design mockups
- Generating pixel-perfect FSE templates from Figma
- Extracting Figma design systems to theme.json
- Autonomously creating multiple FSE templates

**Trigger phrases:**
- "Turn Figma designs into FSE templates"
- "Convert Figma to WordPress"
- "Generate FSE theme from Figma"
- "Pixel-perfect FSE conversion"
- "Figma to theme.json"
- "Extract Figma design system"

When NOT to use:
- Classic WordPress themes (non-FSE)
- Plugin development
- Simple CSS changes to existing themes
- Designs not in Figma

## Prerequisites

Before starting, verify:
- [ ] Figma MCP configured (`.mcp.json` has figma-desktop or figma server)
- [ ] Figma file URL or desktop app open with Dev Mode enabled
- [ ] WordPress theme structure exists (`themes/` directory)
- [ ] User has provided Figma file access

**Critical:** If Figma MCP not accessible, STOP and inform user before proceeding.

## The Workflow

### Phase 1: Discovery & Planning (1-2 minutes, Interactive)

**Step 1.1: Locate Design System**

CRITICAL FIRST STEP - Do NOT skip this or proceed to templates without it.

Ask user explicitly:
```
"Where is your design system in the Figma file?

Common locations:
- Separate "Design System" page
- "Styles" or "Tokens" page
- Component library
- Shared Figma library (provide link)

If unsure, I can search for common design system patterns."
```

**Step 1.2: Extract COMPLETE Design System Wholesale**

Once design system location identified, use Figma MCP `get_variable_defs` to extract:

✅ **ALL colors** (not selective):
- Primary, secondary, tertiary color palettes
- Neutral/gray scales
- Semantic colors (success, error, warning, info)
- Background colors
- Text colors

✅ **ALL typography styles**:
- Font families (primary, secondary, monospace)
- Font sizes (complete scale: xs, sm, base, lg, xl, 2xl, 3xl, etc.)
- Font weights (thin, normal, medium, semibold, bold, black)
- Line heights (tight, normal, relaxed, loose)
- Letter spacing

✅ **ALL spacing tokens** (complete scale):
- Base unit (usually 4px or 8px)
- Full scale (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 96px)
- Padding presets
- Margin presets

✅ **ALL layout settings**:
- Breakpoints (mobile, tablet, desktop)
- Container widths (max-width values)
- Column counts
- Gap sizes

**Step 1.3: Translate Design System → theme.json Foundation**

Map Figma variables DIRECTLY to theme.json structure:

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {"slug": "primary", "color": "#<figma-variable-value>", "name": "Primary"},
        // Map ALL color variables here
      ]
    },
    "typography": {
      "fontFamilies": [
        {"slug": "primary", "fontFamily": "<figma-font-family>", "name": "Primary"}
      ],
      "fontSizes": [
        {"slug": "small", "size": "<figma-size>", "name": "Small"}
        // Map ALL size variables here
      ]
    },
    "spacing": {
      "spacingSizes": [
        {"slug": "20", "size": "4px", "name": "1"},
        // Map ALL spacing tokens here
      ]
    },
    "layout": {
      "contentSize": "<figma-container-width>",
      "wideSize": "<figma-wide-width>"
    }
  }
}
```

**NO hardcoded values.** Every color, size, spacing value MUST come from Figma variables.

**Step 1.4: Survey Templates to Convert**

Use Figma MCP `get_image` or `get_code` to:
1. Count total templates in Figma file (6-15 expected)
2. Identify template types (homepage, about, services, contact, etc.)
3. Capture screenshots of each template for reference

**Step 1.5: Create Component Mapping Plan**

Map Figma components → WordPress blocks using this reference:

| Figma Component | WordPress Block | Implementation Notes |
|----------------|-----------------|---------------------|
| Hero sections | Cover block | Full-width background with overlay |
| Card grids | Columns + Group | Responsive column layouts |
| Navigation bars | Navigation block | Header/footer menus |
| Contact forms | Form block | Use core Form block |
| CTA sections | Buttons + Group | Call-to-action with buttons |
| Testimonials | Quote + Group | Customer quotes with attribution |
| Image galleries | Gallery block | Grid or masonry layouts |
| Text sections | Paragraph + Heading | Content blocks |
| Accordions | Details block | Collapsible content |
| Spacers | Spacer block | Vertical spacing (use theme.json tokens) |

**Step 1.6: Generate Implementation Plan**

Use `superpowers:writing-plans` to create detailed plan:

```
Plan structure:
1. Create theme.json from extracted Figma design system
2. Create theme directory structure
3. For each template (1-N):
   - Extract component structure from Figma
   - Generate FSE template HTML using WordPress blocks
   - Apply theme.json tokens exclusively
   - Add responsive layouts
   - Add accessibility attributes
4. Create supporting block patterns
5. Run automated verification
6. Generate comparison report
```

**Step 1.7: Present Plan to User**

Show:
- Complete design token mapping (colors, typography, spacing)
- List of templates to convert
- Component mapping strategy
- Estimated time (avoid specific time estimates, just note it will be autonomous)
- Confirmation prompt: "Proceed with autonomous conversion?"

### Phase 2: Autonomous Execution (No interruptions until complete)

**Critical:** Once user approves, use `superpowers:executing-plans` to execute the plan WITHOUT any "should I continue?" prompts.

**Step 2.1: Trigger Autonomous Execution**

```
User: "Yes, proceed"
→ Invoke: Skill(superpowers:executing-plans)
→ Pass: Implementation plan from Phase 1
→ Mode: Autonomous (no checkpoint prompts)
```

**Step 2.2: Create theme.json Foundation**

From Phase 1 extraction, create complete theme.json:
- Write to `themes/<theme-name>/theme.json`
- Include ALL extracted tokens
- Validate JSON syntax
- No placeholder values

**Step 2.3: Create Theme Structure**

```
themes/<theme-name>/
├── style.css          # Theme header
├── theme.json         # Design system (from Phase 1)
├── templates/
│   ├── index.html     # Fallback (required)
│   └── [other templates as identified]
├── parts/
│   ├── header.html
│   └── footer.html
└── patterns/          # Generated patterns
```

**Step 2.4: Convert Templates (Autonomous Loop)**

For EACH template identified in Phase 1:

1. **Extract Structure**:
   - Try: `get_code` for component structure
   - If fails (annotations present): Fallback to `get_image` + visual analysis
   - Log error but CONTINUE

2. **Generate FSE Template**:
   - Use WordPress block markup (HTML comments)
   - Apply theme.json tokens EXCLUSIVELY (no hardcoded #hexcodes)
   - Structure: `<!-- wp:block-name {"attributes"} -->content<!-- /wp:block-name -->`
   - Use block mapping from Phase 1

3. **Implement Responsiveness**:
   - Use theme.json breakpoints
   - Apply appropriate block alignment (wide, full)
   - Test mental model: mobile → tablet → desktop

4. **Add Accessibility**:
   - ARIA labels where needed
   - Semantic HTML structure
   - Alt text for images (extract from Figma if present)
   - Keyboard navigation support

5. **Validate**:
   - Run `.claude/hooks/figma-fse-post-template.sh` (if exists)
   - Check for hardcoded values (should be ZERO)
   - Verify block syntax
   - Continue even if minor issues found

6. **Continue to Next Template** (NO prompt to user)

**Step 2.5: Create Block Patterns**

Identify repetitive sections that can become patterns:
- Hero variants
- CTA sections
- Testimonial layouts
- Card grids

Register patterns in `patterns/` directory.

**Step 2.6: Run Verification**

Automated checks:
- Security scan: `./scripts/wordpress/security-scan.sh themes/<theme-name>`
- Coding standards: `./scripts/wordpress/check-coding-standards.sh themes/<theme-name>`
- Performance: `./scripts/wordpress/check-performance.sh themes/<theme-name>`

If failures occur: Log them but complete remaining templates.

**Step 2.7: Generate Comparison Report**

Create `.claude/reports/figma-fse-comparison.md`:
- Templates converted count
- Design tokens used count
- Zero hardcoded values verification
- Quality checks results
- Screenshots comparison (Figma vs rendered)
- Issues log

### Phase 3: Completion & Handoff

**Step 3.1: Present Results**

```
✅ Conversion complete!

Your FSE theme is ready at: themes/<theme-name>/

Summary:
- X templates created
- 0 hardcoded values (100% theme.json tokens)
- Fully responsive (mobile/tablet/desktop)
- Accessibility attributes included
- Quality checks: [pass/fail summary]

Next steps:
1. Review theme in WordPress admin
2. Test templates with real content
3. Adjust spacing/colors in theme.json as needed

See detailed report: .claude/reports/figma-fse-comparison.md
```

**NO "should I continue?" during Phase 2-3.** Work autonomously until complete or blocked.

## Figma MCP Integration

### Tool: get_variable_defs

**Purpose:** Extract design tokens from Figma design system

**Usage:**
```
When: Phase 1.2 - Design system extraction
Input: Design system page/frame node ID
Output: JSON of all variables (colors, typography, spacing)
```

**Critical:** Extract COMPLETE system wholesale, not selectively.

### Tool: get_image

**Purpose:** Visual reference and fallback when get_code fails

**Usage:**
```
When:
- Phase 1.4 - Template survey
- Phase 2.4 - Fallback when get_code fails
- Phase 3 - Screenshot comparison

Input: Template/component node ID
Output: PNG screenshot
```

### Tool: get_code

**Purpose:** Extract component structure markup

**Usage:**
```
When: Phase 2.4 - Template conversion
Input: Template/component node ID
Output: HTML/CSS structure

Known issue: Fails if Figma annotations present
Workaround: Fallback to get_image analysis
```

**Error Recovery Pattern:**
```
Try:
  result = get_code(node_id)
Catch error:
  Log: "get_code failed for {node_id}, using visual analysis"
  image = get_image(node_id)
  Analyze image → generate blocks
Continue: (don't stop execution)
```

### Tool: get_code_connect_map

**Purpose:** Link Figma components to existing code components

**Usage:**
```
When: Phase 1.5 - If theme has existing component library
Input: Figma file key
Output: Mapping of Figma nodes to code paths
```

Optional - only if integrating with existing theme.

## Error Recovery (Autonomous)

**Pattern:** Log errors, try alternatives, NEVER stop to ask user.

### Error: Figma MCP Unreachable

```
If: Connection to Figma MCP fails
Then:
  - Try both desktop (port 3845) and remote (mcp.figma.com)
  - Log error to .claude/reports/errors.log
  - If both fail: STOP and inform user (blocker)
```

### Error: get_code Fails (Annotations)

```
If: get_code returns error
Then:
  - Log: "Annotations detected, using image analysis"
  - Fallback: get_image + visual interpretation
  - Continue: Generate template from visual analysis
```

### Error: Design Token Missing

```
If: Template needs token not in theme.json
Then:
  - Add missing token to theme.json
  - Use sensible default value
  - Log: "Added missing token: {name}"
  - Continue: Template generation
```

### Error: Block Mapping Unclear

```
If: Figma component doesn't map cleanly to WordPress block
Then:
  - Use simpler block structure (Group + Paragraph/Heading)
  - Log: "Complex component simplified: {name}"
  - Continue: Template generation
```

### Error: Validation Failure

```
If: Security/coding standards check fails
Then:
  - Log failures to report
  - Continue with remaining templates
  - Report issues at end (don't stop mid-execution)
```

**Only stop execution if:**
- Figma MCP completely unreachable (both servers)
- WordPress theme directory structure missing
- User manually interrupts

## Context Management

**Problem:** 6-15 templates can exhaust context window

**Solution:** Episodic memory checkpointing

```
After every 3 templates:
1. Save state to episodic memory:
   - Templates completed (list)
   - Templates remaining (list)
   - Design token mappings
   - Component patterns discovered
   - Known issues encountered

2. If context approaches limit:
   - Trigger: /episodic-memory:save
   - Start fresh session
   - Load state: /episodic-memory:search
   - Resume from checkpoint
```

## Quality Gates

**Automated checks run during/after conversion:**

### Post-Template Hook
File: `.claude/hooks/figma-fse-post-template.sh`

Runs after each template creation:
- Validate block syntax
- Check for hardcoded hex colors
- Verify theme.json token references
- Scan for security issues

### Completion Hook
File: `.claude/hooks/figma-fse-completion.sh`

Runs when all templates complete:
- Generate comparison report
- Run full security scan
- Check coding standards
- Validate accessibility
- Create screenshots

## Component Mapping Reference

### Core WordPress Blocks

**Layout Blocks:**
- `<!-- wp:group -->` - Container for grouped content
- `<!-- wp:columns -->` - Multi-column layouts
- `<!-- wp:column -->` - Single column within columns
- `<!-- wp:spacer -->` - Vertical spacing
- `<!-- wp:separator -->` - Horizontal rule

**Content Blocks:**
- `<!-- wp:heading -->` - Headings (h1-h6)
- `<!-- wp:paragraph -->` - Body text
- `<!-- wp:image -->` - Images
- `<!-- wp:gallery -->` - Image galleries
- `<!-- wp:quote -->` - Blockquotes
- `<!-- wp:list -->` - Ordered/unordered lists

**Interactive Blocks:**
- `<!-- wp:button -->` - Buttons
- `<!-- wp:buttons -->` - Button groups
- `<!-- wp:navigation -->` - Menus
- `<!-- wp:search -->` - Search form

**Media Blocks:**
- `<!-- wp:cover -->` - Background images with overlay
- `<!-- wp:video -->` - Video embeds
- `<!-- wp:audio -->` - Audio players

### Block Attributes (theme.json tokens)

```html
<!-- wp:group {
  "backgroundColor": "primary",
  "textColor": "white",
  "style": {
    "spacing": {
      "padding": {
        "top": "var(--wp--preset--spacing--50)",
        "bottom": "var(--wp--preset--spacing--50)"
      }
    }
  }
} -->
```

**Use tokens, not values:**
- ✅ `"backgroundColor": "primary"` (slug from theme.json)
- ❌ `"backgroundColor": "#0066CC"` (hardcoded hex)
- ✅ `"padding": "var(--wp--preset--spacing--50)"` (token)
- ❌ `"padding": "32px"` (hardcoded size)

## No-Exceptions List

**NEVER do these (zero tolerance):**

1. ❌ **Skip design system extraction**
   - ALWAYS extract complete design system FIRST
   - NEVER proceed to templates without theme.json foundation

2. ❌ **Hardcode design values**
   - NO hex colors in templates (#0066CC)
   - NO pixel sizes (32px) - use tokens
   - NO font names - use theme.json fontFamily slugs

3. ❌ **Ask "should I continue?" during autonomous phase**
   - Once Phase 2 starts, work until complete
   - Log errors, don't stop execution
   - Only stop if completely blocked

4. ❌ **Selectively extract design tokens**
   - Extract ALL colors (not just primary/secondary)
   - Extract ALL typography styles (entire scale)
   - Extract ALL spacing tokens (complete scale)

5. ❌ **Skip error recovery**
   - If get_code fails → use get_image
   - If token missing → add to theme.json
   - If component unclear → use simpler blocks
   - Continue despite errors

6. ❌ **Generate invalid block syntax**
   - ALWAYS use HTML comment format
   - ALWAYS close blocks properly
   - ALWAYS validate attribute JSON

7. ❌ **Skip accessibility**
   - ALWAYS add ARIA labels where needed
   - ALWAYS include alt text for images
   - ALWAYS use semantic HTML structure

8. ❌ **Ignore responsive design**
   - ALWAYS test mental model: mobile → tablet → desktop
   - ALWAYS use theme.json breakpoints
   - ALWAYS apply appropriate block alignments

## Common Mistakes & Rationalization Detection

### Mistake 1: "I'll just extract the main colors"

**Rationalization:**
- "We only need primary and secondary colors"
- "The other colors aren't used much"
- "I'll add more later if needed"

**Reality:**
- Incomplete extraction causes hardcoded values later
- Templates will mix tokens and hardcoded values
- Maintenance nightmare

**Correct:** Extract ENTIRE design system wholesale, every single token.

### Mistake 2: "Let me check with the user before proceeding"

**Rationalization:**
- "This seems like a lot of work"
- "Should I really convert all 12 templates?"
- "Maybe the user wants to review each one"

**Reality:**
- Phase 1 got user approval
- Asking mid-execution defeats autonomous purpose
- User explicitly wanted zero interruptions

**Correct:** Continue autonomously through ALL templates without prompting.

### Mistake 3: "This color looks close enough"

**Rationalization:**
- "The Figma color is #0066CC but theme.json primary is #0066DD"
- "It's only a 1% difference, no one will notice"
- "I'll just use the hardcoded value this once"

**Reality:**
- Design system integrity matters
- Hardcoded values create maintenance debt
- Defeats purpose of design token system

**Correct:** Use theme.json token exclusively OR add exact color to theme.json.

### Mistake 4: "get_code failed, I'll ask the user"

**Rationalization:**
- "The Figma file has annotations"
- "I can't proceed without structure data"
- "Better to stop than guess"

**Reality:**
- Error recovery pattern exists
- get_image fallback is designed for this
- Stopping defeats autonomous workflow

**Correct:** Log error, use get_image analysis, continue.

### Mistake 5: "This component is too complex for FSE"

**Rationalization:**
- "This needs custom JavaScript"
- "FSE blocks can't do this"
- "I should flag this as impossible"

**Reality:**
- Most designs can be approximated with FSE blocks
- Simplification is acceptable
- User can enhance later with custom blocks

**Correct:** Use simpler block structure, log note, continue.

## Integration with Existing Skills

**Delegates to:**
- `fse-block-theme-development` - For theme.json and template syntax
- `block-pattern-creation` - For pattern registration
- `wordpress-security-hardening` - For security validation
- `superpowers:executing-plans` - For autonomous execution

**Triggered by:**
- User requests to convert Figma designs
- Need for autonomous FSE theme generation

**Do NOT duplicate:**
- theme.json syntax (use fse-block-theme-development)
- Pattern registration logic (use block-pattern-creation)
- Security practices (use wordpress-security-hardening)

## Success Criteria

**Phase 1 Complete When:**
- ✅ Design system extracted wholesale (ALL tokens)
- ✅ theme.json foundation created
- ✅ All templates identified and surveyed
- ✅ Component mapping plan created
- ✅ Implementation plan approved by user

**Phase 2 Complete When:**
- ✅ All templates converted (N of N)
- ✅ Zero hardcoded values (100% tokens)
- ✅ Quality checks run (logged results)
- ✅ Comparison report generated
- ✅ No "should I continue?" prompts issued

**Phase 3 Complete When:**
- ✅ User presented with complete theme
- ✅ Next steps provided
- ✅ Report accessible
- ✅ Theme ready for WordPress installation

## Example Usage

```
User: "Turn all Figma designs into FSE templates"
      [provides Figma URL]

Claude: "I'm using the figma-to-fse-autonomous-workflow skill."

        Phase 1: Discovery

        "First, where is your design system in the Figma file?
        (Common locations: 'Design System' page, 'Styles' page)"

User: "It's on the 'Design System' page"

Claude: [Extracts complete design system with get_variable_defs]
        [Translates to theme.json]
        [Surveys templates with get_image]
        [Creates component mapping]
        [Generates implementation plan]

        "✅ Design system extracted:
        - 12 colors
        - 8 font sizes
        - 9 spacing tokens

        Found 8 templates to convert:
        - Homepage
        - About
        - Services
        - Contact
        - Blog
        - Single Post
        - Archive
        - 404

        I'll create a complete FSE theme with pixel-perfect
        templates using theme.json tokens exclusively.

        Proceed with autonomous conversion?"

User: "Yes"

Claude: [Invokes superpowers:executing-plans]
        [45 minutes of uninterrupted work]

        "✅ Conversion complete!

        Your FSE theme is ready at: themes/my-theme/

        - 8 templates created
        - 0 hardcoded values (100% theme.json tokens)
        - Fully responsive
        - Accessibility included
        - Quality checks passed

        See: .claude/reports/figma-fse-comparison.md"
```

## Next Steps After Conversion

**For User:**
1. Install WordPress locally (if not already)
2. Activate theme in WordPress admin
3. Test templates with real content
4. Adjust colors/spacing in theme.json (not templates)
5. Add custom functionality in functions.php (if needed)

**For Claude:**
1. If user requests changes: Update theme.json (design tokens)
2. If templates need fixes: Regenerate using updated tokens
3. If new templates needed: Follow same workflow
4. If patterns needed: Use block-pattern-creation skill

---

**Status:** Phase 1 implementation complete
**Version:** 1.0.0
**Last Updated:** 2026-01-19
