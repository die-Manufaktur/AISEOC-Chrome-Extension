# Hooks Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up orphaned scripts from deleted agents, add hooks to new agents that need them, and create project-level hooks that protect all agents from common mistakes.

**Architecture:** Four-phase approach: (1) delete orphaned scripts, (2) create new hook scripts for new agents, (3) add hook configurations to agent YAML frontmatter, (4) create project-level hooks for universal protections. All scripts follow the existing pattern of reading JSON from stdin, checking file paths, and exiting 0 (warn) or 1/2 (block).

**Tech Stack:** Bash scripts, Claude Code agent YAML frontmatter, jq for JSON parsing

---

## Context for Implementer

### Project Structure
```
C:/Users/Paul Mulligan/PMDS/Projects/Claude Code WordPress Template/
├── .claude/
│   ├── agents/              ← Agent definitions (YAML frontmatter + markdown)
│   ├── hooks/               ← Project-level hook scripts (2 existing)
│   ├── settings.local.json  ← Permission settings
│   └── reports/             ← Generated reports
├── scripts/
│   ├── wordpress/           ← Shared WordPress quality scripts (3)
│   ├── figma-fse/           ← Figma-to-FSE scripts (8)
│   ├── frontend-developer/  ← ORPHANED (3 scripts, agent rewritten)
│   ├── experiment-tracker/  ← ORPHANED (3 scripts, agent deleted)
│   ├── rapid-prototyper/    ← ORPHANED (3 scripts, agent deleted)
│   ├── mcp-expert/          ← ORPHANED (3 scripts, agent deleted)
│   └── [other agent dirs]/  ← Active scripts
└── themes/                  ← WordPress themes (development root)
```

### Hook Architecture

**Agent-level hooks** are defined in YAML frontmatter of `.claude/agents/*.md`:
```yaml
hooks:
  PreToolUse:           # Runs BEFORE a tool executes (can block with exit 1/2)
    - matcher: "Write|Edit"  # Tool name regex
      hooks:
        - type: command
          command: "./scripts/path/to/script.sh"
  PostToolUse:          # Runs AFTER a tool executes (warn or block)
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./scripts/path/to/script.sh"
  SubagentStart:        # Runs when agent is first invoked
    - matcher: "agent-name"
      hooks:
        - type: command
          command: "./scripts/path/to/setup.sh"
  Stop:                 # Runs when agent completes
    - matcher: ".*"
      hooks:
        - type: command
          command: "./scripts/path/to/report.sh"
```

**Project-level hooks** are in `.claude/hooks/` and referenced from `.claude/settings.local.json` or a project hooks config.

### Existing Script Patterns

All hook scripts follow this pattern:
```bash
#!/bin/bash
# Description
# Exit codes: 0 = pass/warn, 1 = block (PreToolUse), 2 = block (PostToolUse)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Filter: only process relevant files
if [[ ! "$FILE_PATH" =~ \.php$ ]]; then
    exit 0
fi

# Validation logic here...

# Output to stderr (stdout is captured by Claude Code)
echo "Message" >&2

exit 0  # or exit 1/2 to block
```

### Key Reference Files
- Existing hook examples: `.claude/agents/figma-fse-converter.md` (most comprehensive hooks)
- Shared scripts: `scripts/wordpress/security-scan.sh`, `check-coding-standards.sh`, `check-performance.sh`
- Figma-FSE scripts: `scripts/figma-fse/validate-pattern-architecture.sh`, `validate-template.sh`, `validate-theme-location.sh`

---

## Task 1: Delete Orphaned Scripts from Deleted Agents

**Files:**
- Delete: `scripts/experiment-tracker/` (3 files: validate-config.sh, update-registry.sh, save-state.sh)
- Delete: `scripts/rapid-prototyper/` (3 files: check-dependencies.sh, validate-package-json.sh, verify-runnable.sh)
- Delete: `scripts/mcp-expert/` (3 files: validate-mcp-schema.sh, test-config.sh, generate-docs.sh)
- Delete: `scripts/frontend-developer/` (3 files: lint-and-format.sh, check-build.sh, build-report.sh)

**Why:** These agents were deleted or rewritten. The scripts are never invoked.

**Step 1: Verify no remaining agent references these scripts**

Run:
```bash
grep -r "experiment-tracker\|rapid-prototyper\|mcp-expert\|frontend-developer/lint\|frontend-developer/check-build\|frontend-developer/build-report" .claude/agents/ --include="*.md"
```
Expected: No matches (confirms scripts are truly orphaned)

**Step 2: Delete the orphaned script directories**

```bash
rm -rf scripts/experiment-tracker/
rm -rf scripts/rapid-prototyper/
rm -rf scripts/mcp-expert/
rm -rf scripts/frontend-developer/
```

**Step 3: Verify deletion**

```bash
ls scripts/
```
Expected: Only `wordpress/`, `figma-fse/`, `test-writer-fixer/`, `test-results-analyzer/`, `analytics-reporter/`, `docusaurus-expert/`, `api-tester/`, `performance-benchmarker/`, `validate-readonly-query.sh` remain.

**Step 4: Commit**

```bash
git add -A scripts/experiment-tracker/ scripts/rapid-prototyper/ scripts/mcp-expert/ scripts/frontend-developer/
git commit -m "chore: Delete orphaned scripts from removed/rewritten agents

Remove 12 scripts from 4 directories:
- experiment-tracker/ (agent deleted)
- rapid-prototyper/ (agent deleted)
- mcp-expert/ (agent deleted)
- frontend-developer/ (agent rewritten, old React/Vite hooks no longer apply)"
```

---

## Task 2: Create Block Markup Validation Hook Script

**Files:**
- Create: `scripts/block-markup-validator/validate-block-markup.sh`

**Context:** The `block-markup-validator` agent has no hooks. This script should run as a PostToolUse hook after Write|Edit on `.html` and `.php` template/pattern files. It validates block comment syntax, HTML class consistency, and theme.json slug references — the exact issues we caught manually during the Ancient Baltimore build (e.g., `wp-element-button` class on `<h4>` headings, wrong fontSize slugs).

**Step 1: Create the script**

```bash
mkdir -p scripts/block-markup-validator
```

Create `scripts/block-markup-validator/validate-block-markup.sh`:

```bash
#!/bin/bash
# Block Markup Validator - PostToolUse hook
# Validates WordPress block comment syntax and HTML class consistency
# Exit 0 (warn) - displays issues but doesn't block

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Only check template HTML and pattern PHP files in themes/
if [[ ! "$FILE_PATH" =~ themes/.*\.(html|php)$ ]]; then
    exit 0
fi

if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

ISSUES=0

# --- Check 1: Block tag balance ---
OPEN_BLOCKS=$(grep -c '<!-- wp:[a-z]' "$FILE_PATH" 2>/dev/null || echo "0")
CLOSE_BLOCKS=$(grep -c '<!-- /wp:' "$FILE_PATH" 2>/dev/null || echo "0")
SELF_CLOSING=$(grep -c '<!-- wp:[a-z][^-]*/-->' "$FILE_PATH" 2>/dev/null || echo "0")

EXPECTED_CLOSE=$((OPEN_BLOCKS - SELF_CLOSING))
if [ "$EXPECTED_CLOSE" -ne "$CLOSE_BLOCKS" ]; then
    echo "  ❌ Unbalanced blocks: $OPEN_BLOCKS opening (${SELF_CLOSING} self-closing), $CLOSE_BLOCKS closing" >&2
    ISSUES=$((ISSUES + 1))
fi

# --- Check 2: backgroundColor without matching class ---
while IFS= read -r line_num_and_content; do
    LINE_NUM=$(echo "$line_num_and_content" | cut -d: -f1)
    # Extract the backgroundColor slug
    SLUG=$(echo "$line_num_and_content" | grep -oP '"backgroundColor"\s*:\s*"\K[^"]+' 2>/dev/null)
    if [ -n "$SLUG" ]; then
        # Look at the next HTML line for the matching class
        NEXT_LINES=$(sed -n "$((LINE_NUM)),+3p" "$FILE_PATH" 2>/dev/null)
        if ! echo "$NEXT_LINES" | grep -q "has-${SLUG}-background-color" 2>/dev/null; then
            echo "  ⚠️  Line $LINE_NUM: backgroundColor \"$SLUG\" but missing has-${SLUG}-background-color class" >&2
            ISSUES=$((ISSUES + 1))
        fi
    fi
done < <(grep -n '"backgroundColor"' "$FILE_PATH" 2>/dev/null || true)

# --- Check 3: textColor without matching class ---
while IFS= read -r line_num_and_content; do
    LINE_NUM=$(echo "$line_num_and_content" | cut -d: -f1)
    SLUG=$(echo "$line_num_and_content" | grep -oP '"textColor"\s*:\s*"\K[^"]+' 2>/dev/null)
    if [ -n "$SLUG" ]; then
        NEXT_LINES=$(sed -n "$((LINE_NUM)),+3p" "$FILE_PATH" 2>/dev/null)
        if ! echo "$NEXT_LINES" | grep -q "has-${SLUG}-color" 2>/dev/null; then
            echo "  ⚠️  Line $LINE_NUM: textColor \"$SLUG\" but missing has-${SLUG}-color class" >&2
            ISSUES=$((ISSUES + 1))
        fi
    fi
done < <(grep -n '"textColor"' "$FILE_PATH" 2>/dev/null || true)

# --- Check 4: fontSize without matching class ---
while IFS= read -r line_num_and_content; do
    LINE_NUM=$(echo "$line_num_and_content" | cut -d: -f1)
    SLUG=$(echo "$line_num_and_content" | grep -oP '"fontSize"\s*:\s*"\K[^"]+' 2>/dev/null)
    if [ -n "$SLUG" ]; then
        NEXT_LINES=$(sed -n "$((LINE_NUM)),+3p" "$FILE_PATH" 2>/dev/null)
        if ! echo "$NEXT_LINES" | grep -q "has-${SLUG}-font-size" 2>/dev/null; then
            echo "  ⚠️  Line $LINE_NUM: fontSize \"$SLUG\" but missing has-${SLUG}-font-size class" >&2
            ISSUES=$((ISSUES + 1))
        fi
    fi
done < <(grep -n '"fontSize"' "$FILE_PATH" 2>/dev/null || true)

# --- Check 5: wp-element-button class on non-button elements ---
if grep -n 'wp-element-button' "$FILE_PATH" | grep -v 'wp-block-button' > /dev/null 2>&1; then
    echo "  ❌ Found wp-element-button class on non-button element" >&2
    grep -n 'wp-element-button' "$FILE_PATH" | grep -v 'wp-block-button' | head -3 | while read line; do
        echo "     $line" >&2
    done
    ISSUES=$((ISSUES + 1))
fi

# --- Check 6: Heading level mismatch ---
while IFS= read -r line; do
    LINE_NUM=$(echo "$line" | cut -d: -f1)
    JSON_LEVEL=$(echo "$line" | grep -oP '"level"\s*:\s*\K[0-9]+' 2>/dev/null)
    if [ -n "$JSON_LEVEL" ]; then
        NEXT_LINES=$(sed -n "$((LINE_NUM)),+2p" "$FILE_PATH" 2>/dev/null)
        HTML_TAG=$(echo "$NEXT_LINES" | grep -oP '<h\K[0-9]' 2>/dev/null | head -1)
        if [ -n "$HTML_TAG" ] && [ "$JSON_LEVEL" != "$HTML_TAG" ]; then
            echo "  ❌ Line $LINE_NUM: Block says level:$JSON_LEVEL but HTML is <h$HTML_TAG>" >&2
            ISSUES=$((ISSUES + 1))
        fi
    fi
done < <(grep -n '"level"' "$FILE_PATH" 2>/dev/null || true)

# --- Check 7: Theme.json slug validation (if theme.json exists) ---
THEME_DIR=$(echo "$FILE_PATH" | grep -oP 'themes/[^/]+' 2>/dev/null)
THEME_JSON="$THEME_DIR/theme.json"

if [ -f "$THEME_JSON" ] && command -v jq &> /dev/null; then
    # Get valid color slugs
    VALID_COLORS=$(jq -r '.settings.color.palette[]?.slug // empty' "$THEME_JSON" 2>/dev/null | tr '\n' '|')
    VALID_COLORS="${VALID_COLORS}transparent"  # transparent is always valid

    # Check backgroundColor slugs
    for slug in $(grep -oP '"backgroundColor"\s*:\s*"\K[^"]+' "$FILE_PATH" 2>/dev/null); do
        if ! echo "$VALID_COLORS" | grep -qw "$slug"; then
            echo "  ⚠️  backgroundColor \"$slug\" not found in theme.json palette" >&2
            ISSUES=$((ISSUES + 1))
        fi
    done

    # Check textColor slugs
    for slug in $(grep -oP '"textColor"\s*:\s*"\K[^"]+' "$FILE_PATH" 2>/dev/null); do
        if ! echo "$VALID_COLORS" | grep -qw "$slug"; then
            echo "  ⚠️  textColor \"$slug\" not found in theme.json palette" >&2
            ISSUES=$((ISSUES + 1))
        fi
    done

    # Get valid fontSize slugs
    VALID_SIZES=$(jq -r '.settings.typography.fontSizes[]?.slug // empty' "$THEME_JSON" 2>/dev/null | tr '\n' '|')
    for slug in $(grep -oP '"fontSize"\s*:\s*"\K[^"]+' "$FILE_PATH" 2>/dev/null); do
        if ! echo "$VALID_SIZES" | grep -qw "$slug"; then
            echo "  ⚠️  fontSize \"$slug\" not found in theme.json fontSizes" >&2
            ISSUES=$((ISSUES + 1))
        fi
    done
fi

# --- Summary ---
if [ $ISSUES -eq 0 ]; then
    echo "  ✅ Block markup validation passed: $(basename "$FILE_PATH")" >&2
else
    echo "  ⚠️  $ISSUES issue(s) found in $(basename "$FILE_PATH")" >&2
fi

exit 0
```

**Step 2: Make executable**

```bash
chmod +x scripts/block-markup-validator/validate-block-markup.sh
```

**Step 3: Commit**

```bash
git add scripts/block-markup-validator/
git commit -m "feat: Add block markup validation hook script

Validates block comment syntax, HTML class consistency, heading level
matches, wp-element-button misuse, and theme.json slug references."
```

---

## Task 3: Create Token Audit Hook Script

**Files:**
- Create: `scripts/theme-token-auditor/audit-tokens.sh`

**Context:** Catches hardcoded hex colors, pixel values, and font stacks in templates/patterns immediately when files are written. Complements the existing `validate-template.sh` but is more thorough and runs for PHP patterns too.

**Step 1: Create the script**

```bash
mkdir -p scripts/theme-token-auditor
```

Create `scripts/theme-token-auditor/audit-tokens.sh`:

```bash
#!/bin/bash
# Theme Token Auditor - PostToolUse hook
# Detects hardcoded values that should use theme.json tokens
# Exit 0 (warn) - displays issues but doesn't block

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Only check template/pattern files in themes/
if [[ ! "$FILE_PATH" =~ themes/.*\.(html|php)$ ]]; then
    exit 0
fi

if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

ISSUES=0
BASENAME=$(basename "$FILE_PATH")

# --- Check 1: Hardcoded hex colors in style attributes ---
# Match hex colors in style="" attributes (not in block comment JSON)
HEX_IN_STYLES=$(grep -n 'style="[^"]*#[0-9A-Fa-f]\{3,8\}' "$FILE_PATH" 2>/dev/null | wc -l)
if [ "$HEX_IN_STYLES" -gt 0 ]; then
    echo "  ⚠️  $BASENAME: $HEX_IN_STYLES hardcoded hex color(s) in style attributes" >&2
    grep -n 'style="[^"]*#[0-9A-Fa-f]\{3,8\}' "$FILE_PATH" 2>/dev/null | head -3 | while read line; do
        echo "     $line" >&2
    done
    ISSUES=$((ISSUES + HEX_IN_STYLES))
fi

# --- Check 2: Hardcoded hex colors in block JSON (outside of border-color which is acceptable) ---
HEX_IN_JSON=$(grep -oP '<!-- wp:[^>]+"[^"]*#[0-9A-Fa-f]{6}[^"]*"' "$FILE_PATH" 2>/dev/null | grep -v '"border"' | wc -l)
if [ "$HEX_IN_JSON" -gt 0 ]; then
    echo "  ⚠️  $BASENAME: $HEX_IN_JSON hardcoded hex color(s) in block JSON attributes" >&2
    ISSUES=$((ISSUES + HEX_IN_JSON))
fi

# --- Check 3: Hardcoded pixel spacing (padding/margin in styles, not border-width) ---
HARDCODED_SPACING=$(grep -oP 'style="[^"]*(?:padding|margin|gap)[^"]*?[0-9]+px' "$FILE_PATH" 2>/dev/null | wc -l)
if [ "$HARDCODED_SPACING" -gt 0 ]; then
    echo "  ⚠️  $BASENAME: $HARDCODED_SPACING hardcoded px spacing value(s) — should use var(--wp--preset--spacing--XX)" >&2
    ISSUES=$((ISSUES + HARDCODED_SPACING))
fi

# --- Check 4: Hardcoded font-size in styles ---
HARDCODED_FONT=$(grep -oP 'style="[^"]*font-size:\s*[0-9]+px' "$FILE_PATH" 2>/dev/null | wc -l)
if [ "$HARDCODED_FONT" -gt 0 ]; then
    echo "  ⚠️  $BASENAME: $HARDCODED_FONT hardcoded font-size(s) — should use fontSize preset slug" >&2
    ISSUES=$((ISSUES + HARDCODED_FONT))
fi

# --- Check 5: Hardcoded font-family in styles ---
HARDCODED_FAMILY=$(grep -oP 'style="[^"]*font-family:' "$FILE_PATH" 2>/dev/null | wc -l)
if [ "$HARDCODED_FAMILY" -gt 0 ]; then
    echo "  ⚠️  $BASENAME: $HARDCODED_FAMILY hardcoded font-family — should use fontFamily preset slug" >&2
    ISSUES=$((ISSUES + HARDCODED_FAMILY))
fi

# --- Summary ---
if [ $ISSUES -eq 0 ]; then
    echo "  ✅ Token audit passed: $BASENAME (zero hardcoded values)" >&2
else
    echo "  ⚠️  Token audit: $ISSUES hardcoded value(s) in $BASENAME" >&2
fi

exit 0
```

**Step 2: Make executable**

```bash
chmod +x scripts/theme-token-auditor/audit-tokens.sh
```

**Step 3: Commit**

```bash
git add scripts/theme-token-auditor/
git commit -m "feat: Add theme token audit hook script

Detects hardcoded hex colors, pixel spacing, font-size, and font-family
values in templates and patterns that should use theme.json tokens."
```

---

## Task 4: Create Content Seeder Verification Script

**Files:**
- Create: `scripts/content-seeder/verify-pages.sh`

**Context:** Runs when the content-seeder agent completes (Stop hook). Verifies all pages exist, have correct slugs, and the homepage is configured.

**Step 1: Create the script**

```bash
mkdir -p scripts/content-seeder
```

Create `scripts/content-seeder/verify-pages.sh`:

```bash
#!/bin/bash
# Content Seeder Verification - Stop hook
# Verifies all required pages exist and are accessible
# Exit 0 (informational only)

echo "" >&2
echo "📋 Content Seeder Verification" >&2
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2

# Find the active theme
THEME_DIR=$(find themes/ -maxdepth 1 -type d -not -name "themes" -printf '%T@ %p\n' 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)

if [ -z "$THEME_DIR" ]; then
    echo "  ⚠️  No theme directory found" >&2
    exit 0
fi

THEME_NAME=$(basename "$THEME_DIR")

# List expected pages from template filenames
echo "  Theme: $THEME_NAME" >&2
echo "" >&2
echo "  Expected pages (from templates/):" >&2

EXPECTED_PAGES=()
for template in "$THEME_DIR/templates"/page-*.html; do
    if [ -f "$template" ]; then
        SLUG=$(basename "$template" .html | sed 's/^page-//')
        EXPECTED_PAGES+=("$SLUG")
        echo "    - $SLUG (from $(basename "$template"))" >&2
    fi
done

if [ -f "$THEME_DIR/templates/front-page.html" ]; then
    echo "    - home (from front-page.html)" >&2
    EXPECTED_PAGES+=("home")
fi

# Check if Docker/WP-CLI is available to verify
if command -v docker &> /dev/null && docker compose ps 2>/dev/null | grep -q "wordpress.*running"; then
    echo "" >&2
    echo "  WordPress status:" >&2

    # List actual pages
    ACTUAL_PAGES=$(docker compose exec -T wordpress wp post list --post_type=page --fields=post_name,post_status --format=csv --allow-root 2>/dev/null)

    for slug in "${EXPECTED_PAGES[@]}"; do
        if echo "$ACTUAL_PAGES" | grep -q "^$slug,publish"; then
            echo "    ✅ $slug (published)" >&2
        elif echo "$ACTUAL_PAGES" | grep -q "^$slug"; then
            echo "    ⚠️  $slug (exists but not published)" >&2
        else
            echo "    ❌ $slug (MISSING — needs creation)" >&2
        fi
    done

    # Check homepage setting
    FRONT_PAGE=$(docker compose exec -T wordpress wp option get page_on_front --allow-root 2>/dev/null)
    SHOW_ON_FRONT=$(docker compose exec -T wordpress wp option get show_on_front --allow-root 2>/dev/null)

    echo "" >&2
    if [ "$SHOW_ON_FRONT" = "page" ] && [ "$FRONT_PAGE" != "0" ]; then
        echo "  ✅ Static homepage configured (page ID: $FRONT_PAGE)" >&2
    else
        echo "  ⚠️  No static homepage configured" >&2
    fi
else
    echo "" >&2
    echo "  ℹ️  WordPress not running — skipping live verification" >&2
    echo "  Run wp-environment-manager to start WordPress" >&2
fi

echo "" >&2
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
exit 0
```

**Step 2: Make executable**

```bash
chmod +x scripts/content-seeder/verify-pages.sh
```

**Step 3: Commit**

```bash
git add scripts/content-seeder/
git commit -m "feat: Add content seeder verification hook script

Stop hook that verifies all required pages exist with correct slugs
and homepage is configured as static page."
```

---

## Task 5: Create WP Environment Manager Check Script

**Files:**
- Create: `scripts/wp-environment-manager/check-environment.sh`

**Context:** Runs as a SubagentStart hook when the wp-environment-manager agent is invoked. Checks Docker status, container health, and WP-CLI availability upfront so the agent knows what to fix.

**Step 1: Create the script**

```bash
mkdir -p scripts/wp-environment-manager
```

Create `scripts/wp-environment-manager/check-environment.sh`:

```bash
#!/bin/bash
# WP Environment Manager - SubagentStart hook
# Checks Docker, containers, and WP-CLI status
# Exit 0 (informational - never blocks agent start)

echo "" >&2
echo "🔍 WordPress Environment Status Check" >&2
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2

# Check Docker
if command -v docker &> /dev/null; then
    if docker info &> /dev/null; then
        echo "  ✅ Docker: Running" >&2
    else
        echo "  ❌ Docker: Installed but not running" >&2
        echo "     → Start Docker Desktop before proceeding" >&2
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
        exit 0
    fi
else
    echo "  ❌ Docker: Not installed" >&2
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
    exit 0
fi

# Check docker-compose.yml exists
if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ]; then
    echo "  ✅ docker-compose.yml: Found" >&2
else
    echo "  ❌ docker-compose.yml: Not found" >&2
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
    exit 0
fi

# Check containers
WP_STATUS=$(docker compose ps --format "{{.Service}} {{.State}}" 2>/dev/null | grep wordpress | awk '{print $2}')
DB_STATUS=$(docker compose ps --format "{{.Service}} {{.State}}" 2>/dev/null | grep -E "db|mysql|mariadb" | awk '{print $2}')

if [ "$WP_STATUS" = "running" ]; then
    echo "  ✅ WordPress container: Running" >&2
else
    echo "  ❌ WordPress container: ${WP_STATUS:-Not started}" >&2
fi

if [ "$DB_STATUS" = "running" ]; then
    echo "  ✅ Database container: Running" >&2
else
    echo "  ❌ Database container: ${DB_STATUS:-Not started}" >&2
fi

# Check WP-CLI
if [ "$WP_STATUS" = "running" ]; then
    if docker compose exec -T wordpress wp --version --allow-root &> /dev/null; then
        WP_VERSION=$(docker compose exec -T wordpress wp --version --allow-root 2>/dev/null)
        echo "  ✅ WP-CLI: $WP_VERSION" >&2
    else
        echo "  ❌ WP-CLI: Not installed in container" >&2
        echo "     → Will need to install during setup" >&2
    fi

    # Check active theme
    ACTIVE_THEME=$(docker compose exec -T wordpress wp theme list --status=active --field=name --allow-root 2>/dev/null)
    if [ -n "$ACTIVE_THEME" ]; then
        echo "  ✅ Active theme: $ACTIVE_THEME" >&2
    fi

    # Check WordPress URL
    SITE_URL=$(docker compose exec -T wordpress wp option get siteurl --allow-root 2>/dev/null)
    if [ -n "$SITE_URL" ]; then
        echo "  ✅ Site URL: $SITE_URL" >&2
    fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
echo "" >&2
exit 0
```

**Step 2: Make executable**

```bash
chmod +x scripts/wp-environment-manager/check-environment.sh
```

**Step 3: Commit**

```bash
git add scripts/wp-environment-manager/
git commit -m "feat: Add WP environment manager status check hook

SubagentStart hook that reports Docker, container, WP-CLI, and
active theme status when wp-environment-manager agent is invoked."
```

---

## Task 6: Add Hook Configurations to New Agents

**Files:**
- Modify: `.claude/agents/block-markup-validator.md` (add hooks YAML)
- Modify: `.claude/agents/theme-token-auditor.md` (add hooks YAML)
- Modify: `.claude/agents/content-seeder.md` (add hooks YAML)
- Modify: `.claude/agents/wp-environment-manager.md` (add hooks YAML)

**Context:** Add YAML frontmatter hooks to these 4 agents, referencing the scripts created in Tasks 2-5. Read each agent file first — the hooks go in the YAML frontmatter between the `---` markers.

**Step 1: Add hooks to block-markup-validator**

In `.claude/agents/block-markup-validator.md`, add hooks to YAML frontmatter after `permissionMode: bypassPermissions`:

```yaml
hooks:
  PostToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./scripts/block-markup-validator/validate-block-markup.sh"
          description: "Validates block comment syntax and HTML class consistency"
```

**Step 2: Add hooks to theme-token-auditor**

In `.claude/agents/theme-token-auditor.md`, add hooks to YAML frontmatter:

```yaml
hooks:
  PostToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./scripts/theme-token-auditor/audit-tokens.sh"
          description: "Detects hardcoded values that should use theme.json tokens"
```

**Step 3: Add hooks to content-seeder**

In `.claude/agents/content-seeder.md`, add hooks to YAML frontmatter:

```yaml
hooks:
  Stop:
    - matcher: ".*"
      hooks:
        - type: command
          command: "./scripts/content-seeder/verify-pages.sh"
          description: "Verifies all required pages exist with correct slugs"
```

**Step 4: Add hooks to wp-environment-manager**

In `.claude/agents/wp-environment-manager.md`, add hooks to YAML frontmatter:

```yaml
hooks:
  SubagentStart:
    - matcher: "wp-environment-manager"
      hooks:
        - type: command
          command: "./scripts/wp-environment-manager/check-environment.sh"
          description: "Reports Docker, container, and WP-CLI status"
```

**Step 5: Commit**

```bash
git add .claude/agents/block-markup-validator.md .claude/agents/theme-token-auditor.md .claude/agents/content-seeder.md .claude/agents/wp-environment-manager.md
git commit -m "feat: Add hook configurations to 4 new agents

- block-markup-validator: PostToolUse validates block syntax on Write|Edit
- theme-token-auditor: PostToolUse detects hardcoded values on Write|Edit
- content-seeder: Stop hook verifies pages exist with correct slugs
- wp-environment-manager: SubagentStart checks Docker/WP-CLI status"
```

---

## Task 7: Create Project-Level Theme Location Hook

**Files:**
- Create: `.claude/hooks/validate-theme-location.sh`
- Modify: `.claude/settings.local.json` (if project-level hooks are configured there)

**Context:** Currently, `validate-theme-location.sh` only runs for the `figma-fse-converter` agent. But ANY agent writing theme files could make the same mistake. This project-level hook should block Write|Edit operations to `wp-content/themes/` regardless of which agent is running.

The existing script at `scripts/figma-fse/validate-theme-location.sh` is agent-specific (reads from `CLAUDE_TOOL_INPUT` env var). The project-level version should read from stdin (standard hook protocol).

**Step 1: Create project-level hook**

Create `.claude/hooks/validate-theme-location.sh`:

```bash
#!/bin/bash
# Project-Level Hook: Validate Theme File Location
# Blocks ANY Write/Edit operation targeting wp-content/themes/
# This runs for ALL agents, not just figma-fse-converter
#
# Exit 0: Path is valid
# Exit 2: Path is invalid (blocks operation)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# No file path = not a file operation, allow
if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# Check if path targets wp-content
if echo "$FILE_PATH" | grep -qE 'wp-content/(themes|plugins|mu-plugins)/'; then
    echo "" >&2
    echo "❌ BLOCKED: File targets wp-content/ directory" >&2
    echo "   Path: $FILE_PATH" >&2
    echo "" >&2
    echo "   This project uses root-level folders:" >&2
    echo "   ✅ themes/[name]/...     (not wp-content/themes/)" >&2
    echo "   ✅ plugins/[name]/...    (not wp-content/plugins/)" >&2
    echo "" >&2

    # Suggest the corrected path
    CORRECTED=$(echo "$FILE_PATH" | sed 's|wp-content/themes/|themes/|; s|wp-content/plugins/|plugins/|; s|wp-content/mu-plugins/|mu-plugins/|')
    echo "   Suggested: $CORRECTED" >&2
    echo "" >&2
    exit 2
fi

exit 0
```

**Step 2: Make executable**

```bash
chmod +x .claude/hooks/validate-theme-location.sh
```

**Step 3: Add to agents that write theme files but don't have this protection**

The following agents can write theme files and need this PreToolUse hook added to their YAML frontmatter:

- `.claude/agents/frontend-developer.md` — Add PreToolUse hook
- `.claude/agents/block-markup-validator.md` — Already has PostToolUse, add PreToolUse
- `.claude/agents/ui-designer.md` — Add PreToolUse hook
- `.claude/agents/theme-token-auditor.md` — Already has PostToolUse, add PreToolUse

For each of these agents, add to the hooks section (or create hooks section):

```yaml
  PreToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./.claude/hooks/validate-theme-location.sh"
          description: "Blocks writes to wp-content/ - must use root-level themes/"
```

**Note:** The `figma-fse-converter` agent already has its own version via `scripts/figma-fse/validate-theme-location.sh`. That can remain as-is (both do the same thing).

**Step 4: Commit**

```bash
git add .claude/hooks/validate-theme-location.sh .claude/agents/frontend-developer.md .claude/agents/block-markup-validator.md .claude/agents/ui-designer.md .claude/agents/theme-token-auditor.md
git commit -m "feat: Add project-level theme location validation hook

Creates universal PreToolUse hook that blocks writes to wp-content/
directories. Applied to frontend-developer, block-markup-validator,
ui-designer, and theme-token-auditor agents.

Previously only figma-fse-converter had this protection."
```

---

## Task 8: Add Block Markup Validation to figma-fse-converter

**Files:**
- Modify: `.claude/agents/figma-fse-converter.md` (add block markup validation to PostToolUse hooks)

**Context:** The figma-fse-converter generates ALL templates and patterns. It should run the block markup validator automatically after every Write|Edit, catching class mismatches and slug errors at generation time rather than during review.

**Step 1: Read and modify figma-fse-converter.md**

In the YAML frontmatter PostToolUse section for `"Write|Edit"`, add the block markup validator script after the existing hooks:

```yaml
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "./scripts/figma-fse/validate-pattern-architecture.sh"
        - type: command
          command: "./scripts/figma-fse/validate-template.sh"
        - type: command
          command: "./scripts/block-markup-validator/validate-block-markup.sh"
        - type: command
          command: "./scripts/theme-token-auditor/audit-tokens.sh"
        - type: command
          command: "./scripts/wordpress/security-scan.sh"
        - type: command
          command: "./scripts/wordpress/check-coding-standards.sh"
```

This adds `validate-block-markup.sh` and `audit-tokens.sh` to the existing chain.

**Step 2: Commit**

```bash
git add .claude/agents/figma-fse-converter.md
git commit -m "feat: Add block markup and token audit hooks to figma-fse-converter

Adds validate-block-markup.sh and audit-tokens.sh to PostToolUse chain,
catching class mismatches, slug errors, and hardcoded values at
generation time."
```

---

## Task 9: Clean Up Unreferenced Figma-FSE Utility Scripts

**Files:**
- Keep: `scripts/figma-fse/extract-design-tokens.sh` (useful — validates theme.json after creation)
- Keep: `scripts/figma-fse/optimize-tokens.sh` (useful — standalone utility for token analysis)
- Keep: `scripts/figma-fse/batch-convert-templates.sh` (useful — tracks batch conversion progress)

**Context:** These 3 scripts are NOT orphaned — they're standalone utilities that can be run manually or referenced in agent instructions. They just don't have automatic hooks. No action needed other than verifying they exist and documenting them.

**Step 1: Verify the scripts are functional**

```bash
# Check they're executable
ls -la scripts/figma-fse/extract-design-tokens.sh scripts/figma-fse/optimize-tokens.sh scripts/figma-fse/batch-convert-templates.sh
```

If not executable:
```bash
chmod +x scripts/figma-fse/extract-design-tokens.sh scripts/figma-fse/optimize-tokens.sh scripts/figma-fse/batch-convert-templates.sh
```

**Step 2: No commit needed** (no changes made)

---

## Task 10: Update Documentation

**Files:**
- Modify: `.claude/CUSTOM-AGENTS-GUIDE.md` (update hook information)

**Step 1: Read the current file**

Read `.claude/CUSTOM-AGENTS-GUIDE.md`.

**Step 2: Add a "Hook Configuration" section**

After the "Figma-to-FSE Conversion Pipeline" section, add:

```markdown
## Agent Hook Configurations

Agents with automated hooks (12 of 18):

### WordPress Core Quality Hooks (shared scripts)
These scripts are shared across multiple agents:
- `scripts/wordpress/security-scan.sh` — Used by: frontend-developer, figma-fse-converter, performance-benchmarker, test-writer-fixer
- `scripts/wordpress/check-coding-standards.sh` — Used by: frontend-developer, figma-fse-converter, test-writer-fixer
- `scripts/wordpress/check-performance.sh` — Used by: frontend-developer, performance-benchmarker, test-writer-fixer

### Theme Protection Hooks
- `.claude/hooks/validate-theme-location.sh` — Blocks writes to wp-content/ (project-level, applied to: frontend-developer, block-markup-validator, ui-designer, theme-token-auditor)
- `scripts/figma-fse/validate-theme-location.sh` — Same protection for figma-fse-converter

### New Agent Hooks
| Agent | Hook Type | Script | Purpose |
|-------|-----------|--------|---------|
| block-markup-validator | PostToolUse | validate-block-markup.sh | Block syntax, class consistency, slug validation |
| theme-token-auditor | PostToolUse | audit-tokens.sh | Hardcoded value detection |
| content-seeder | Stop | verify-pages.sh | Page existence verification |
| wp-environment-manager | SubagentStart | check-environment.sh | Docker/WP-CLI status check |

### Agents Without Hooks (6)
These agents are research/audit-only and don't need automated hooks:
- accessibility-auditor (runs Lighthouse on demand)
- asset-cataloger (views images on demand)
- visual-qa-agent (captures screenshots on demand)
- seo-schema-agent (audits on demand)
- ux-researcher (research only)
- workflow-optimizer (analysis only)
```

**Step 3: Commit**

```bash
git add .claude/CUSTOM-AGENTS-GUIDE.md
git commit -m "docs: Document hook configurations for all agents

Adds Hook Configuration section covering shared scripts, theme
protection hooks, new agent hooks, and agents without hooks."
```

---

## Final Verification

After all tasks are complete, run this verification:

```bash
# 1. Confirm orphaned scripts deleted (should return 0)
ls scripts/experiment-tracker/ scripts/rapid-prototyper/ scripts/mcp-expert/ scripts/frontend-developer/ 2>&1 | grep -c "No such"

# 2. Confirm new scripts exist and are executable
ls -la scripts/block-markup-validator/validate-block-markup.sh
ls -la scripts/theme-token-auditor/audit-tokens.sh
ls -la scripts/content-seeder/verify-pages.sh
ls -la scripts/wp-environment-manager/check-environment.sh
ls -la .claude/hooks/validate-theme-location.sh

# 3. Confirm agents have hooks (should show hooks: in YAML for each)
head -20 .claude/agents/block-markup-validator.md
head -20 .claude/agents/theme-token-auditor.md
head -20 .claude/agents/content-seeder.md
head -20 .claude/agents/wp-environment-manager.md

# 4. Confirm figma-fse-converter has new hooks
grep "validate-block-markup\|audit-tokens" .claude/agents/figma-fse-converter.md

# 5. Count total commits made
git log --oneline -10
```

**Expected results:**
- 4 orphaned directories deleted (12 scripts removed)
- 5 new scripts created (4 agent-specific + 1 project-level)
- 4 agents updated with hook configurations
- 1 agent (figma-fse-converter) updated with additional hooks
- 1 documentation file updated
- ~8 commits total
