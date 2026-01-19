# Testing Guide: Figma-to-FSE Autonomous Workflow

**Purpose:** Step-by-step testing instructions to verify Phase 1 MVP implementation

**Status:** Ready for user testing

---

## Pre-Test Setup

### 1. Verify Prerequisites

```bash
# Check Figma MCP configuration
cat .mcp.json

# Expected: Both figma-desktop and figma servers configured
# {
#   "mcpServers": {
#     "figma-desktop": {
#       "type": "http",
#       "url": "http://127.0.0.1:3845/mcp"
#     },
#     "figma": {
#       "type": "http",
#       "url": "https://mcp.figma.com/mcp"
#     }
#   }
# }

# Check theme directory exists
ls -la themes/

# Check skills and agents created
ls -la .claude/skills/figma-to-fse-autonomous-workflow/
ls -la .claude/agents/figma-fse-converter.md

# Check scripts created
ls -la scripts/figma-fse/
ls -la .claude/hooks/figma-fse-post-template.sh
```

**All checks should pass before proceeding.**

### 2. Prepare Test Figma File

Create a simple Figma file for testing (or use an existing one):

**Minimum requirements:**
- 1 page named "Design System" with:
  - 3-6 color variables (primary, secondary, neutrals)
  - 3-5 typography styles (heading, body, small)
  - 4-6 spacing tokens (4px, 8px, 16px, 24px, 32px, 48px)

- 1 frame named "Hero Section" with:
  - Background image or color
  - Heading (large text)
  - Paragraph (body text)
  - Button (CTA)

**Example structure:**
```
Figma File: "Test FSE Theme"
├── Page: Design System
│   ├── Colors: primary (#0066CC), secondary (#FF6B35), white (#FFFFFF), black (#000000)
│   ├── Typography: Heading (32px), Body (16px), Small (14px)
│   └── Spacing: 4px, 8px, 16px, 24px, 32px, 48px
└── Page: Templates
    └── Frame: Hero Section (1920x800px)
        ├── Background (#0066CC)
        ├── H1: "Welcome to Our Site" (white, 48px)
        ├── P: "Description text" (white, 18px)
        └── Button: "Get Started" (secondary color)
```

### 3. Enable Figma Dev Mode

1. Open Figma desktop app
2. Open your test file
3. Enable Dev Mode (top right toggle)
4. Verify local MCP server running (check console or http://127.0.0.1:3845/health)

---

## Test 1: Single Template Conversion (MVP)

**Objective:** Verify complete workflow with one template

### Step 1: Invoke the Skill

```
User message to Claude:
"Convert the Hero Section from my Figma file to a WordPress FSE template.
File URL: [paste your Figma URL]"
```

**Expected: Claude recognizes trigger and invokes figma-to-fse-autonomous-workflow skill**

### Step 2: Phase 1 - Discovery

**Expected interactions:**

```
Claude: "Where is your design system in the Figma file?"

You: "It's on the 'Design System' page"

[Claude extracts design system using Figma MCP]

Claude: Shows summary:
- "✅ Design system extracted wholesale:
  - Colors: 4 (primary, secondary, white, black)
  - Font sizes: 3 (heading, body, small)
  - Spacing tokens: 6 (4px - 48px)

- Found 1 template to convert: Hero Section

- I'll create:
  1. theme.json with design system
  2. FSE template: templates/front-page.html
  3. Use theme.json tokens exclusively (no hardcoded values)

Proceed with autonomous conversion?"
```

**Verification checklist for Phase 1:**
- [ ] Claude asked for design system location
- [ ] Claude extracted ALL design tokens (not selective)
- [ ] Claude showed complete token counts
- [ ] Claude identified templates to convert
- [ ] Claude created clear implementation plan
- [ ] Claude asked for approval before proceeding

### Step 3: Phase 2 - Autonomous Execution

```
You: "Yes, proceed"

[Claude works autonomously for 3-5 minutes]
```

**Expected behavior during Phase 2:**
- ✅ Claude works continuously without prompts
- ✅ NO "should I continue?" interruptions
- ✅ Progress updates (optional): "Creating theme.json...", "Generating template..."
- ✅ Validation hooks run automatically (no user action needed)

**What Claude should be doing (you won't see all details):**
1. Creating `themes/[theme-name]/theme.json`
2. Creating `themes/[theme-name]/templates/front-page.html`
3. Applying theme.json tokens to template
4. Running validation hooks automatically
5. Checking security and coding standards
6. Generating comparison report

### Step 4: Phase 3 - Completion

**Expected output:**

```
Claude: "✅ Conversion complete!

Your FSE theme is ready at: themes/[theme-name]/

Summary:
- 1 template created (front-page.html)
- 0 hardcoded values (100% theme.json tokens)
- Design system: 4 colors, 3 font sizes, 6 spacing tokens
- Quality checks: All passed

Next steps:
1. Install WordPress locally (if not already)
2. Copy theme from themes/ to wp-content/themes/ (deployment step)
3. Activate theme in WordPress admin
4. View front page

Note: Development creates files in root-level themes/, then you copy to WordPress for testing.

See detailed report: .claude/reports/figma-fse-comparison.md"
```

**Verification checklist for Phase 2-3:**
- [ ] Claude worked autonomously (no interruptions)
- [ ] theme.json file created
- [ ] Template file created (templates/front-page.html)
- [ ] Comparison report generated
- [ ] Success summary presented

### Step 5: Manual Verification

**Check theme.json:**

```bash
# View theme.json
cat themes/[theme-name]/theme.json | jq

# Verify structure
jq '.settings.color.palette | length' themes/[theme-name]/theme.json
# Expected: 4 (or however many colors in Figma)

jq '.settings.typography.fontSizes | length' themes/[theme-name]/theme.json
# Expected: 3 (or however many sizes in Figma)

jq '.settings.spacing.spacingSizes | length' themes/[theme-name]/theme.json
# Expected: 6 (or however many spacing tokens in Figma)
```

**Check template file:**

```bash
# View template
cat themes/[theme-name]/templates/front-page.html

# Check for hardcoded hex colors (should be ZERO)
grep -c '#[0-9A-Fa-f]\{6\}' themes/[theme-name]/templates/front-page.html
# Expected: 0

# Check for hardcoded pixel sizes (should be minimal or zero)
grep -c '"[0-9]\+px"' themes/[theme-name]/templates/front-page.html
# Expected: 0 or very low

# Check block syntax is valid
grep -o '<!-- wp:' themes/[theme-name]/templates/front-page.html | wc -l
# Should match closing blocks
grep -o '<!-- /wp:' themes/[theme-name]/templates/front-page.html | wc -l
# Numbers should be equal
```

**Check comparison report:**

```bash
# View report
cat .claude/reports/figma-fse-comparison.md

# Should show:
# - Design system summary
# - Templates converted count
# - Zero hardcoded values
# - Quality checks results
```

**Verification checklist for files:**
- [ ] theme.json exists and valid JSON
- [ ] theme.json has all extracted design tokens
- [ ] template file exists
- [ ] template uses WordPress block syntax
- [ ] ZERO hardcoded hex colors in template
- [ ] Template uses theme.json slugs (backgroundColor: "primary", not "#0066CC")
- [ ] Block tags balanced (open = close)
- [ ] Comparison report generated

---

## Test 2: Quality Validation

### Run Scripts Manually

```bash
# Test design token validation
echo '{"tool_input":{"file_path":"themes/[theme-name]/theme.json"}}' | ./scripts/figma-fse/extract-design-tokens.sh

# Expected output:
# ✅ Comprehensive design system detected
# Colors: 4
# Font Sizes: 3
# Spacing Tokens: 6

# Test template validation
echo '{"tool_input":{"file_path":"themes/[theme-name]/templates/front-page.html"}}' | ./scripts/figma-fse/validate-template.sh

# Expected output:
# ✅ Template validation passed
# No hardcoded colors
# No hardcoded sizes
# Blocks balanced
```

**Verification checklist:**
- [ ] extract-design-tokens.sh runs without errors
- [ ] No warnings about incomplete design system
- [ ] validate-template.sh runs without errors
- [ ] No hardcoded value warnings

---

## Test 3: WordPress Integration (Optional)

If you have WordPress installed locally:

**Important:** This test demonstrates **DEPLOYMENT** - copying from development location (`themes/`) to WordPress installation (`wp-content/themes/`). Development always happens in root-level `themes/` folder.

### Install Theme

```bash
# Copy theme to WordPress (deployment step)
# Source: themes/[theme-name] (development location)
# Target: /path/to/wordpress/wp-content/themes/ (WordPress installation)
cp -r themes/[theme-name] /path/to/wordpress/wp-content/themes/

# Or create symlink (for live development)
ln -s $(pwd)/themes/[theme-name] /path/to/wordpress/wp-content/themes/[theme-name]
```

### Activate in WordPress

1. Log into WordPress admin (http://localhost/wp-admin)
2. Go to Appearance → Themes
3. Find your theme
4. Click "Activate"

### View Results

1. Visit site homepage (http://localhost)
2. Compare with Figma design
3. Check responsive behavior (resize browser)

**Verification checklist:**
- [ ] Theme appears in WordPress themes list
- [ ] Theme activates without errors
- [ ] Front page displays hero section
- [ ] Colors match Figma design
- [ ] Typography matches Figma design
- [ ] Layout matches Figma design
- [ ] Responsive on mobile (columns stack, text scales)

---

## Test 4: Error Recovery (Advanced)

### Test Scenario: Figma MCP Unavailable

1. Stop Figma desktop app (close it)
2. Try conversion again

**Expected:**
- Claude tries desktop MCP (fails)
- Claude tries remote MCP (may work if you're logged in via browser extension)
- If both fail: Claude reports error and stops (this is correct - it's a blocker)

**Verification:**
- [ ] Claude attempts fallback to remote MCP
- [ ] Clear error message if both fail
- [ ] Doesn't proceed without MCP access

### Test Scenario: Complex Figma Component

1. Add a complex component to Figma (e.g., custom carousel)
2. Try to convert

**Expected:**
- Claude simplifies to standard blocks (e.g., Gallery block for carousel)
- Claude adds note in report about simplification
- Claude continues without stopping

**Verification:**
- [ ] Complex component simplified successfully
- [ ] Note added to report
- [ ] Conversion completed

---

## Test 7: No Design System in Figma (Fallback Defaults)

**Purpose:** Verify workflow completes even when Figma file has NO design system, using professional fallback defaults.

### Setup

Create or use a Figma file with:
- **ONLY templates** (homepage, about, services, etc.)
- **NO "Design System" page** or similar
- **NO design variables/tokens defined**

### Test Procedure

1. Provide Figma file URL to Claude:
   ```
   User: "Convert this Figma file to FSE theme: [URL with templates only]"
   ```

2. Observe Phase 1.1 behavior

**Expected Phase 1.1 behavior:**
```
Claude: "Step 1.1: Creating theme.json foundation..."
Claude: "ℹ️  No design system found, using professional fallback tokens"
Claude: "✓ theme.json created at themes/[theme-name]/theme.json"
```

3. Verify theme.json was created with fallback defaults

### Expected Results

**Immediate theme.json creation:**
- [ ] theme.json created BEFORE template discovery
- [ ] No "where is your design system?" question
- [ ] No workflow blockage

**Fallback tokens used:**
- [ ] 13 colors in theme.json (primary, accent, neutrals)
- [ ] 9 font sizes (14px-72px scale)
- [ ] 10 spacing tokens (4px base unit)
- [ ] Layout settings (768px content, 1280px wide)

**Workflow proceeds normally:**
- [ ] Claude discovers templates
- [ ] Claude generates FSE templates using fallback theme.json
- [ ] Templates are pixel-perfect (using fallback colors/sizes)
- [ ] No hardcoded values in templates
- [ ] Workflow completes without errors

### Verification Commands

```bash
# Check theme.json exists
ls -la themes/[theme-name]/theme.json

# Verify fallback colors (should be 13)
jq '.settings.color.palette | length' themes/[theme-name]/theme.json
# Expected output: 13

# Verify fallback font sizes (should be 9)
jq '.settings.typography.fontSizes | length' themes/[theme-name]/theme.json
# Expected output: 9

# Verify fallback spacing (should be 10)
jq '.settings.spacing.spacingSizes | length' themes/[theme-name]/theme.json
# Expected output: 10

# Check NO hardcoded values in templates
grep -r "color:#" themes/[theme-name]/templates/
# Expected: No matches (should use var:preset|color| instead)
```

### Success Criteria

✅ Test passes if:
- theme.json created with 13+ colors, 9+ font sizes, 10+ spacing
- Workflow never blocked or prompted for design system location
- Templates generated successfully using fallback tokens
- Zero hardcoded values in template files
- Professional-looking theme with accessible color contrast

❌ Test fails if:
- Workflow blocks waiting for design system
- Claude asks "where is your design system?"
- theme.json has missing/incomplete token sets
- Templates contain hardcoded colors/sizes
- Workflow errors or stops

---

## Success Criteria

### Phase 1 MVP is successful if:

**Workflow:**
- ✅ User can trigger with natural language ("Convert Figma to FSE")
- ✅ Phase 1 discovery completes in < 3 minutes
- ✅ Phase 2 execution has ZERO interruptions
- ✅ Phase 3 presents clear results with report

**Quality:**
- ✅ theme.json created with ALL design tokens
- ✅ Template created with proper block syntax
- ✅ ZERO hardcoded values (#hexcodes or pixel sizes)
- ✅ All security scans pass
- ✅ All coding standards pass

**Autonomous Behavior:**
- ✅ NO "should I continue?" during Phase 2
- ✅ Errors logged but don't stop execution (unless blocker)
- ✅ Validation hooks run automatically
- ✅ Report generated automatically

**Output Quality:**
- ✅ Template is pixel-perfect (within 5px tolerance)
- ✅ Template is responsive (mobile/tablet/desktop)
- ✅ Template is accessible (ARIA labels, alt text)
- ✅ Template is editable in WordPress block editor

---

## Troubleshooting

### Issue: Claude doesn't recognize Figma URL

**Symptoms:**
- Claude asks for more information
- Doesn't invoke figma-to-fse-autonomous-workflow skill

**Solution:**
- Ensure URL is from Figma (figma.com/design/...)
- Try explicit trigger: "Use figma-to-fse-autonomous-workflow to convert this design"
- Provide design system location upfront: "Convert this Figma file (design system is on 'Design System' page)"

### Issue: Figma MCP not accessible

**Symptoms:**
- Error: "Figma MCP unreachable"
- Can't extract design system

**Solution:**
- Verify Figma desktop app is open
- Verify Dev Mode is enabled
- Check MCP server running: http://127.0.0.1:3845/health
- Try remote MCP (requires browser extension and login)

### Issue: Hardcoded values found in template

**Symptoms:**
- validate-template.sh warns about hex colors
- #0066CC appears in template instead of "primary"

**Solution:**
- This is a bug in mapping logic
- Report to developer
- Manually fix: Replace #0066CC with "backgroundColor": "primary"
- Re-run validation

### Issue: Claude stops during Phase 2

**Symptoms:**
- Claude asks "Should I continue?"
- Execution pauses mid-workflow

**Solution:**
- This should NOT happen (it's the core feature)
- If it does, this is a bug in autonomous execution
- Reply "Yes, continue" and note where it stopped
- Report to developer

### Issue: Theme doesn't activate in WordPress

**Symptoms:**
- WordPress error: "The theme is missing the style.css stylesheet"
- Theme doesn't appear in themes list

**Solution:**
- Check style.css exists: `ls themes/[theme-name]/style.css`
- If missing, create style.css with header:
  ```css
  /*
  Theme Name: Theme Name
  Version: 1.0
  */
  ```
- Verify theme.json exists: `ls themes/[theme-name]/theme.json`

---

## Test Results Template

After testing, fill out this template:

```markdown
# Figma-to-FSE Test Results

**Date:** YYYY-MM-DD
**Tester:** [Your Name]
**Figma File:** [File name/URL]

## Test 1: Single Template Conversion

### Phase 1 (Discovery)
- [ ] Design system extraction: ✅ Pass / ❌ Fail
- [ ] Token counts correct: ✅ Yes / ❌ No
  - Colors: ___ (expected: ___)
  - Font sizes: ___ (expected: ___)
  - Spacing: ___ (expected: ___)
- [ ] Plan presented clearly: ✅ Yes / ❌ No

### Phase 2 (Execution)
- [ ] Autonomous execution: ✅ Pass / ❌ Fail
- [ ] Zero interruptions: ✅ Yes / ❌ No
- [ ] Duration: ___ minutes
- [ ] Errors encountered: ___ (describe)

### Phase 3 (Completion)
- [ ] Success message shown: ✅ Yes / ❌ No
- [ ] Report generated: ✅ Yes / ❌ No
- [ ] Files created: ✅ All / ❌ Some missing

### File Verification
- [ ] theme.json valid: ✅ Yes / ❌ No
- [ ] Template valid: ✅ Yes / ❌ No
- [ ] Zero hardcoded values: ✅ Yes / ❌ No (found ___ instances)
- [ ] Blocks balanced: ✅ Yes / ❌ No

### WordPress Integration (if tested)
- [ ] Theme activates: ✅ Yes / ❌ No
- [ ] Displays correctly: ✅ Yes / ❌ No
- [ ] Responsive: ✅ Yes / ❌ No
- [ ] Pixel-perfect: ✅ Yes / ❌ Within 5px / ❌ No

## Overall Result

✅ **PASS** - All criteria met
❌ **FAIL** - Issues found (describe below)

### Issues Found
1.
2.
3.

### Notes
```

---

## Next Steps After Testing

### If tests pass:
1. Update implementation plan: Mark Test task as complete
2. Consider Phase 2 implementation (multi-template support)
3. Document any edge cases encountered
4. Create example themes for documentation

### If tests fail:
1. Document exact failure points
2. Check logs: `.claude/logs/figma-access.log`
3. Re-run with verbose output
4. Report bugs with:
   - Exact error messages
   - Figma file structure
   - Expected vs actual behavior
   - Steps to reproduce

---

**End of Testing Guide**

**Status:** Ready for user testing - Phase 1 MVP complete
