# Claude Code Plugins Quick Reference

**Installation Date:** 2026-01-18
**Installed Plugins:** 5 user plugins + 1 local plugin
**Status:** Lean, WordPress-optimized configuration ✅

## Currently Installed Plugins

**User Plugins (5):**
- `claude-mem` - Memory and context management
- `commit-commands` - Git workflow automation
- `github` - GitHub integration
- `php-lsp` - PHP language server
- `superpowers` - Advanced development workflows

**Local Plugins (1):**
- `ai-taskmaster` - Task management and planning

---

## 🔧 php-lsp Plugin

### Purpose
Provides PHP language server integration for code intelligence in WordPress theme and plugin development.

### Features
- **Autocomplete:** WordPress functions, classes, and your custom code
- **Go-to-Definition:** Jump to function/class definitions (Ctrl+Click or F12)
- **Hover Info:** Documentation and type information on hover
- **Error Detection:** Real-time PHP syntax and semantic errors
- **Symbol Search:** Find functions, classes, variables across files

### WordPress Development Use Cases
```php
// Autocomplete WordPress functions
wp_enqueue_script(...)  // Shows parameters and documentation
get_template_part(...)  // Suggests available template parts
add_action(...)         // Lists available hooks

// Navigate theme structure
function my_theme_setup() {  // Click to jump to definition
    // ...
}
```

### Configuration
- **Prerequisite:** Requires `intelephense` language server
- **Installation:** `npm install -g intelephense` (if not already installed)
- **Workspace:** Automatically discovers PHP files in project
- **Performance:** Indexes on startup; may take a moment for large themes

### Troubleshooting
- If autocomplete isn't working, verify intelephense is installed: `which intelephense`
- Restart Claude Code after installing intelephense
- Check LSP logs if issues persist

---

## 🐙 github Plugin

### Purpose
GitHub integration for version control, pull requests, and issue management directly from Claude Code.

### Authentication Setup
**Required:** GitHub Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens/new
2. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
3. Generate token and save securely
4. Configure in Claude Code when prompted

### Common Commands
```bash
# List repositories
gh repo list

# View repository info
gh repo view owner/repo

# Create a pull request
gh pr create --title "Add feature" --body "Description"

# List pull requests
gh pr list

# View PR details
gh pr view 123

# Create an issue
gh issue create --title "Bug report" --body "Details"

# List issues
gh issue list
```

### WordPress Development Workflows

#### Theme Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-block-pattern

# 2. Make changes to theme files
# ... edit files ...

# 3. Commit changes (use commit-commands)
# See commit-commands section below

# 4. Create PR for review
gh pr create --title "Add hero block pattern" \
  --body "Adds responsive hero section pattern for FSE themes"
```

#### Managing WordPress Security Updates
```bash
# Check for plugin/theme security issues
gh issue list --label security

# Create security update PR
gh pr create --title "Security: Update WordPress to 6.5" \
  --label security
```

### Integration with WordPress
- Track theme/plugin development iterations
- Manage client feedback as GitHub issues
- Create PRs for staging/production deployments
- Document block patterns and custom blocks

---

## 📝 commit-commands Plugin

### Purpose
Structured git commit workflows and PR creation helpers.

### Available Commands

#### `/commit` - Structured Commit Creation
Creates well-formatted commits following best practices.

**Usage:**
```bash
/commit
```

Claude Code will:
1. Analyze staged changes
2. Suggest a commit message
3. Follow repository commit conventions
4. Add co-authorship attribution

**WordPress Commit Message Conventions:**
```
feat: Add new hero block pattern for FSE themes
fix: Resolve mobile responsive issue in navigation block
style: Update block editor color palette
docs: Add installation instructions to README
refactor: Extract template parts for better reusability
test: Add PHPUnit tests for custom post type registration
```

#### `/commit-push-pr` - Complete Workflow
Creates commit, pushes to remote, and opens a pull request in one command.

**Usage:**
```bash
/commit-push-pr
```

**Workflow:**
1. Stages relevant changes
2. Creates structured commit
3. Pushes to remote branch
4. Opens GitHub PR with auto-generated description

**Ideal for:**
- Feature releases
- Bug fixes ready for review
- Theme updates for client approval

#### `/clean_gone` - Cleanup Stale Branches
Removes local branches that have been deleted on remote.

**Usage:**
```bash
/clean_gone
```

Cleans up branches after PR merges, keeping your workspace tidy.

### WordPress Development Integration

#### Feature Development Cycle
```bash
# 1. Create feature branch
git checkout -b feature/custom-query-block

# 2. Develop and test
# ... code your custom block ...

# 3. Commit with structure
/commit
# Suggested: "feat: Add custom query loop block for post filtering"

# 4. Push and create PR
git push -u origin feature/custom-query-block
gh pr create --title "Add custom query block"
```

#### Hotfix Workflow
```bash
# 1. Create hotfix branch
git checkout -b hotfix/security-escaping

# 2. Fix the issue
# ... sanitize output ...

# 3. Quick commit, push, and PR
/commit-push-pr
# Auto-generates PR with security context
```

#### Maintenance Tasks
```bash
# After merging multiple PRs
/clean_gone
# Removes merged feature branches
```

---

## 🎯 WordPress FSE Development Workflows

### Block Theme Development

**1. Create New Block Pattern**
```bash
# Create pattern file
# wp-content/themes/my-theme/patterns/hero-section.php

# Test in editor, then commit
/commit
# Message: "feat: Add hero section block pattern"
```

**2. Update theme.json**
```bash
# Modify theme.json settings
# wp-content/themes/my-theme/theme.json

# Commit with context
/commit
# Message: "style: Update color palette and typography scale"
```

**3. Add Template Part**
```bash
# Create new template part
# wp-content/themes/my-theme/parts/footer-minimal.html

# Commit and document
/commit
# Message: "feat: Add minimal footer template part variant"
```

### Plugin Development

**1. Create Custom Block Plugin**
```bash
# Scaffold plugin structure
# wp-content/plugins/my-custom-blocks/

# Initial commit
/commit
# Message: "feat: Initialize custom blocks plugin with build setup"
```

**2. Security Fixes**
```bash
# Fix XSS vulnerability
# Update escaping in template output

/commit-push-pr
# Auto-creates PR: "fix: Add proper output escaping to prevent XSS"
# Labels: security, high-priority
```

### Theme Review Preparation

**Before Submitting to WordPress.org:**
```bash
# 1. Run theme checks
./scripts/wordpress/check-coding-standards.sh
./scripts/wordpress/security-scan.sh

# 2. Fix issues and commit
/commit
# Message: "fix: Address WordPress theme review requirements"

# 3. Create submission PR
gh pr create --title "Theme ready for WordPress.org submission" \
  --body "All theme check and security requirements met"
```

---

## 🔐 Security Best Practices

### GitHub Token Security
- **Never commit** your GitHub PAT to the repository
- Store in environment variables or secure credential manager
- Rotate tokens regularly (every 90 days recommended)
- Use fine-grained tokens with minimal required scopes

### Plugin Permissions
These plugins may require permissions for:
- Git operations (read/write)
- GitHub API access
- File system access for indexing (php-lsp)

Check `.claude/settings.local.json` for configured permissions.

---

## 🚀 Next Steps

### Verify PHP LSP is Working
1. Open a PHP file: `wp-content/themes/your-theme/functions.php`
2. Start typing `wp_` and check for autocomplete suggestions
3. Hover over a function to see documentation
4. Use Ctrl+Click to jump to definitions

### Test GitHub Integration
```bash
# View your repositories
gh repo list

# Check authentication
gh auth status
```

### Create Your First Structured Commit
```bash
# Make a small change (e.g., update README)
# Stage the change
git add README.md

# Use commit command
/commit
```

### Recommended Workflow Setup
1. ✅ Install WordPress locally (XAMPP, Local, Docker)
2. ✅ Configure theme development environment
3. ✅ Test PHP autocomplete in theme files
4. ✅ Set up GitHub repository for version control
5. ✅ Create first feature branch and PR using new plugins

---

## 📚 Additional Resources

### WordPress Development
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Theme Handbook](https://developer.wordpress.org/themes/)

### Git & GitHub
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

### Plugin Documentation
- Run `/plugin list` to see all installed plugins
- Check individual plugin docs for advanced features

---

## ⚡ Quick Commands Cheat Sheet

```bash
# PHP Development
# (Automatic - just start typing in PHP files)

# GitHub Operations
gh repo list                    # List repos
gh pr create                    # Create PR
gh pr list                      # List PRs
gh issue create                 # Create issue

# Git Workflows
/commit                         # Structured commit
/commit-push-pr                 # Commit + push + PR
/clean_gone                     # Clean merged branches

# Plugin Management
/plugin list                    # List all plugins
/plugin install <name>          # Install plugin
/plugin uninstall <name>        # Remove plugin
```

---

---

## 🎯 WordPress Development with claude-mem

The `claude-mem` plugin provides persistent memory across sessions:

**Benefits for WordPress Development:**
- Remembers project preferences and patterns
- Tracks theme architecture decisions
- Maintains context across development sessions
- Stores commonly used WordPress snippets and patterns

**Usage:**
- Automatic - Claude Code uses memory contextually
- Review memories with memory management commands
- Useful for long-term theme/plugin projects

---

## 🔧 ai-taskmaster (Local Plugin)

Task management and planning for WordPress development workflows.

**Usage:**
- Project task tracking
- Development milestone planning
- Integration with WordPress development cycles

**Commands:** Check plugin documentation for available task management commands.

---

## 📝 superpowers Plugin

Advanced development workflows and best practices enforcement.

**Key Features:**
- Code review workflows
- Development process guidance
- Best practices skills
- Systematic debugging approaches

**Skills Available:** Use `/` commands to access superpowers skills (e.g., `/commit`)

**Agent Naming Note:**
If you see agents named "code-reviewer" from different plugins, refer to `.claude/AGENT-NAMING-GUIDE.md` for disambiguation guidance.

---

## 🧹 Architecture Assessment (2026-01-18)

**Finding:** This project already has a lean, WordPress-optimized plugin configuration.

**Current State:**
- ✅ Only 5 user plugins installed (all WordPress-relevant)
- ✅ No bloat from unused language servers
- ✅ No duplicate or redundant plugins
- ✅ Focused on PHP, Git, and GitHub workflows

**No cleanup needed** - the plugin architecture is already optimal for WordPress FSE development.

**Documentation Added:**
- `.claude/AGENT-NAMING-GUIDE.md` - Clarifies agent naming conflicts (useful for superpowers agents)
- This file updated to reflect actual installed plugins

---

**Last Updated:** 2026-01-18
**Template Version:** 1.0.0
**Architecture Status:** ✅ Optimized (no cleanup required)
