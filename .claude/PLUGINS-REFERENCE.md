# Claude Code Plugins Reference

**Last Updated:** 2026-03-11
**Installed Plugins:** 4 user plugins + 1 local plugin

---

## episodic-memory

Semantic search and persistent memory across Claude Code sessions.

**What it does:**
- Archives conversations automatically
- Provides semantic search over past sessions
- Maintains context across the 30-day conversation deletion window

**Commands:**
```bash
/search-conversations [query]    # Search previous conversations
/remember [context]              # Store important context
```

**Technical notes:**
- Uses SQLite with vector search
- Archives stored in `~/.config/superpowers/conversations-archive`

---

## commit-commands

Git workflow automation with structured commits and PR helpers.

**Commands:**

| Command | What it Does |
|---------|-------------|
| `/commit` | Analyzes staged changes, suggests a structured commit message, creates the commit |
| `/commit-push-pr` | Commits, pushes to remote, and opens a GitHub PR in one step |
| `/clean_gone` | Removes local branches already deleted on remote |

**Commit message conventions:**
```
feat: Add new component or feature
fix: Bug fix
refactor: Code restructuring without behavior change
test: Adding or updating tests
docs: Documentation changes
style: Formatting, linting (no logic change)
chore: Build process, dependencies
```

---

## github (gh CLI)

GitHub integration for repos, PRs, issues, and actions.

**Prerequisites:** GitHub CLI (`gh`) installed and authenticated (`gh auth login`).

**Common commands:**
```bash
gh repo list                          # List repositories
gh pr create --title "Title" --body "Description"   # Create PR
gh pr list                            # List open PRs
gh pr view 123                        # View PR details
gh issue create --title "Bug" --body "Details"      # Create issue
gh issue list                         # List issues
gh run list                           # List CI workflow runs
gh run view 12345                     # View workflow run details
```

---

## superpowers

Advanced development workflows and best practices enforcement.

**Capabilities:**
- Brainstorming and ideation workflows
- Code review with confidence-rated findings
- Systematic debugging approaches
- Test-driven development guidance
- Implementation planning and plan verification

**Usage:** Activated automatically based on task context, or through `/` commands.

---

## ai-taskmaster (Local)

Task management and development planning.

**What it does:**
- Project task tracking and prioritization
- Development milestone planning
- Task dependency management

**Note:** Local plugin, not published to registry.

---

## Security

- Never commit GitHub PATs or API keys
- Store secrets in environment variables or a credential manager
- Rotate tokens every 90 days
- Use fine-grained tokens with minimal scopes
- Check `.claude/settings.local.json` for configured permissions

---

## Quick Commands Cheat Sheet

```bash
# Memory
/search-conversations [query]   # Search past sessions
/remember [context]             # Save context

# Git
/commit                         # Structured commit
/commit-push-pr                 # Commit + push + PR
/clean_gone                     # Clean merged branches

# GitHub
gh pr create                    # Create pull request
gh pr list                      # List PRs
gh issue create                 # Create issue
gh auth status                  # Check auth

# Plugins
/plugin list                    # List installed plugins
/plugin install <name>          # Install plugin
/plugin uninstall <name>        # Remove plugin
```
