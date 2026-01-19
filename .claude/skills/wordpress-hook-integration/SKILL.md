---
name: wordpress-hook-integration
description: Use when creating Claude Code agent hooks, implementing PreToolUse or PostToolUse patterns, or integrating WordPress workflows with custom agents in this template. Keywords: agent hooks, PreToolUse, PostToolUse, Claude Code hooks, custom agents, workflow automation, WordPress automation
---

# WordPress Hook Integration for Claude Code Agents

## Overview

Claude Code agent hooks enable custom workflows that execute before/after tool use. For WordPress development, hooks can trigger security scans, performance checks, automated testing, or report generation based on specific agent actions.

**Core Principle:** Hooks automate repetitive tasks, enforce quality standards, and provide feedback loops without manual intervention.

## When to Use

Use this skill when:
- Creating hooks for custom agents in this template
- Automating security scans after code changes
- Triggering performance checks after deployments
- Generating reports after agent completions
- Enforcing coding standards automatically
- Integrating WordPress-specific tooling with agents

**Symptoms that trigger this skill:**
- "create hook"
- "agent hook"
- "automate after deployment"
- "run security scan after..."
- "trigger performance check"
- "PreToolUse"
- "PostToolUse"

## Hook Types

| Hook Type | When It Runs | Use Cases |
|-----------|--------------|-----------|
| **PreToolUse** | Before tool execution | Validate inputs, check permissions, backup |
| **PostToolUse** | After tool execution | Security scans, tests, deployments, cleanup |
| **Stop** | On agent stop/completion | Final reports, summary generation |

## Implementation Patterns

### Pattern 1: Security Scan After Code Edits

**File:** `.claude/hooks/security-scan-post-edit.sh`

```bash
#!/bin/bash

# Hook: PostToolUse - Edit tool
# Purpose: Run security scan after editing PHP files

TOOL_NAME="$1"
FILE_PATH="$2"

# Only trigger for Edit tool
if [ "$TOOL_NAME" != "Edit" ]; then
    exit 0
fi

# Only scan PHP files
if [[ ! "$FILE_PATH" =~ \.php$ ]]; then
    exit 0
fi

# Check if file is in theme or plugin directory
if [[ "$FILE_PATH" =~ wp-content/(themes|plugins) ]]; then
    echo "🔒 Running security scan on edited file..."

    # Run security scan
    ./scripts/wordpress/security-scan.sh "$FILE_PATH"

    if [ $? -ne 0 ]; then
        echo "⚠️  Security issues detected in $FILE_PATH"
        echo "Please review and fix before continuing."
    else
        echo "✅ Security scan passed for $FILE_PATH"
    fi
fi
```

**Configuration in `.claude/hooks.json`:**

```json
{
  "PostToolUse": {
    "Edit": ".claude/hooks/security-scan-post-edit.sh"
  }
}
```

### Pattern 2: Performance Check After Deployment

**File:** `.claude/hooks/performance-check-post-deploy.sh`

```bash
#!/bin/bash

# Hook: PostToolUse - Bash tool
# Purpose: Run performance check after deployment commands

TOOL_NAME="$1"
COMMAND="$2"

# Only trigger for Bash tool
if [ "$TOOL_NAME" != "Bash" ]; then
    exit 0
fi

# Check if command contains deployment keywords
if [[ "$COMMAND" =~ (deploy|rsync.*production|git\ push.*main) ]]; then
    echo "⚡ Running performance check after deployment..."

    # Wait for deployment to settle
    sleep 5

    # Run performance check
    ./scripts/wordpress/check-performance.sh

    if [ $? -ne 0 ]; then
        echo "⚠️  Performance issues detected"
        echo "Review output above for optimization opportunities."
    else
        echo "✅ Performance check passed"
    fi
fi
```

### Pattern 3: Automated Testing Before Git Commit

**File:** `.claude/hooks/test-pre-commit.sh`

```bash
#!/bin/bash

# Hook: PreToolUse - Bash tool
# Purpose: Run tests before git commit

TOOL_NAME="$1"
COMMAND="$2"

# Only trigger for Bash tool
if [ "$TOOL_NAME" != "Bash" ]; then
    exit 0
fi

# Check if command is a git commit
if [[ "$COMMAND" =~ git\ commit ]]; then
    echo "🧪 Running tests before commit..."

    # Run PHPUnit tests
    if [ -f "vendor/bin/phpunit" ]; then
        vendor/bin/phpunit

        if [ $? -ne 0 ]; then
            echo "❌ Tests failed! Please fix before committing."
            exit 1 # Block commit
        else
            echo "✅ All tests passed"
        fi
    fi

    # Run coding standards check
    if [ -f "./scripts/wordpress/check-coding-standards.sh" ]; then
        ./scripts/wordpress/check-coding-standards.sh

        if [ $? -ne 0 ]; then
            echo "⚠️  Coding standards violations detected"
            echo "Fix violations or commit with --no-verify"
            exit 1 # Block commit
        fi
    fi
fi
```

**Configuration:**

```json
{
  "PreToolUse": {
    "Bash": ".claude/hooks/test-pre-commit.sh"
  }
}
```

### Pattern 4: Report Generation After Agent Completion

**File:** `.claude/hooks/generate-report-stop.sh`

```bash
#!/bin/bash

# Hook: Stop
# Purpose: Generate development report after agent completes

AGENT_NAME="$1"
SESSION_ID="$2"

echo "📊 Generating development report..."

# Create reports directory
mkdir -p .claude/reports

# Generate report filename
REPORT_FILE=".claude/reports/report-$(date +%Y%m%d-%H%M%S).md"

# Collect information
{
    echo "# Development Session Report"
    echo ""
    echo "**Agent:** $AGENT_NAME"
    echo "**Session:** $SESSION_ID"
    echo "**Date:** $(date)"
    echo ""
    echo "## Git Changes"
    git status --short
    echo ""
    echo "## Files Modified"
    git diff --name-only
    echo ""
    echo "## Test Results"
    if [ -f "vendor/bin/phpunit" ]; then
        vendor/bin/phpunit --testdox 2>&1 | tail -20
    fi
    echo ""
    echo "## Security Scan"
    ./scripts/wordpress/security-scan.sh 2>&1 | tail -10
    echo ""
    echo "## Performance Check"
    ./scripts/wordpress/check-performance.sh 2>&1 | tail -10
} > "$REPORT_FILE"

echo "✅ Report generated: $REPORT_FILE"
```

### Pattern 5: Conditional Hook Based on File Type

**File:** `.claude/hooks/conditional-scan.sh`

```bash
#!/bin/bash

# Hook: PostToolUse - Write/Edit tools
# Purpose: Conditional actions based on file type

TOOL_NAME="$1"
FILE_PATH="$2"

# Get file extension
EXT="${FILE_PATH##*.}"

case "$EXT" in
    php)
        echo "🔍 PHP file detected - running PHPCS..."
        ./scripts/wordpress/check-coding-standards.sh "$FILE_PATH"
        ;;
    js)
        echo "🔍 JavaScript file detected - running ESLint..."
        npx eslint "$FILE_PATH" --fix
        ;;
    css|scss)
        echo "🎨 Stylesheet detected - running Stylelint..."
        npx stylelint "$FILE_PATH" --fix
        ;;
    *)
        # No action for other file types
        ;;
esac
```

### Pattern 6: Integration with WordPress CLI

**File:** `.claude/hooks/wp-cli-integration.sh`

```bash
#!/bin/bash

# Hook: PostToolUse - Edit/Write tools
# Purpose: Flush WordPress cache after theme/plugin modifications

TOOL_NAME="$1"
FILE_PATH="$2"

# Check if WordPress is available
if ! command -v wp &> /dev/null; then
    exit 0
fi

# Check if file is in theme or plugin
if [[ "$FILE_PATH" =~ wp-content/(themes|plugins) ]]; then
    echo "🔄 Flushing WordPress cache..."

    # Flush object cache
    wp cache flush 2>/dev/null

    # Flush rewrite rules if functions.php was modified
    if [[ "$FILE_PATH" =~ functions\.php$ ]]; then
        echo "🔄 Flushing rewrite rules..."
        wp rewrite flush 2>/dev/null
    fi

    echo "✅ Cache flushed"
fi
```

## Common Patterns by Agent

### frontend-developer Agent Hooks

```bash
# After editing theme files
- Run coding standards check
- Flush WordPress cache
- Regenerate CSS from SCSS
- Run accessibility checks
```

### test-writer-fixer Agent Hooks

```bash
# After editing test files
- Run PHPUnit tests
- Generate coverage report
- Verify all tests pass
```

### performance-benchmarker Agent Hooks

```bash
# After performance optimizations
- Run performance check
- Compare before/after metrics
- Generate performance report
```

## Hook Best Practices

1. **Fast execution:** Hooks should complete quickly (< 5 seconds)
2. **Clear output:** Echo status messages for user visibility
3. **Conditional logic:** Only run when relevant (check file types, commands)
4. **Exit codes:** Use proper exit codes (0 = success, 1 = failure)
5. **Error handling:** Don't fail silently - report issues
6. **Idempotent:** Can run multiple times safely
7. **Non-blocking:** Use `&` for long-running tasks

## Testing Hooks

```bash
# Test hook manually
bash .claude/hooks/security-scan-post-edit.sh "Edit" "wp-content/themes/mytheme/functions.php"

# Verify exit code
echo $?

# Test with different file types
bash .claude/hooks/conditional-scan.sh "Write" "test.php"
bash .claude/hooks/conditional-scan.sh "Write" "test.js"
bash .claude/hooks/conditional-scan.sh "Write" "test.css"
```

## No Exceptions

**NEVER create hooks that:**

1. ❌ Run for extended periods (> 10 seconds) without user notification
2. ❌ Modify files without user knowledge
3. ❌ Make network requests without disclosure
4. ❌ Block critical operations silently
5. ❌ Ignore error conditions
6. ❌ Run destructive operations (delete, reset) without confirmation

## Integration with This Template

This skill enables:
- **Automated security scans** after code edits (security-scan.sh)
- **Performance validation** after deployments (check-performance.sh)
- **Coding standards enforcement** before commits (check-coding-standards.sh)
- **Test execution** before git operations
- **Cache flushing** after WordPress modifications

Works with all 24 custom agents in this template.

## Example Hook Library

```
.claude/hooks/
├── security-scan-post-edit.sh       # Security after edits
├── performance-check-post-deploy.sh # Performance after deploy
├── test-pre-commit.sh               # Tests before commit
├── generate-report-stop.sh          # Report on completion
├── conditional-scan.sh              # File type conditional
├── wp-cli-integration.sh            # WordPress cache flush
└── hooks.json                       # Hook configuration
```

## Resources

- [Claude Code Hooks Documentation](https://docs.anthropic.com/claude/docs/hooks)
- [Bash Scripting Guide](https://tldp.org/LDP/abs/html/)
- [WordPress WP-CLI](https://wp-cli.org/)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-18
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
