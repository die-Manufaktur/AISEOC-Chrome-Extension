# React App Development Framework

A Claude Code-integrated framework for building React applications with TypeScript, Tailwind CSS, and an automated Figma-to-React pipeline.

## What This Framework Provides

- **44 Custom Agents** -- Specialized AI agents for engineering, design, testing, marketing, operations, and more
- **6 Development Skills** -- Automated workflows for React development, testing, accessibility, and Figma conversion
- **Figma-to-React Pipeline** -- Convert Figma designs directly into production-ready React components
- **Testing Stack** -- Vitest, React Testing Library, Playwright (cross-browser), and Storybook
- **Code Quality Scripts** -- Linting, formatting, type checking, bundle analysis, and accessibility scanning

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd coding-framework

# Set up the project
./scripts/setup-project.sh

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## Directory Structure

```
project-root/
├── src/                  # Application source code
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── types/            # TypeScript types
│   ├── styles/           # Global styles
│   └── assets/           # Static assets
├── scripts/              # Automation scripts
│   ├── setup-project.sh
│   ├── setup-playwright.sh
│   ├── run-tests.sh
│   ├── cross-browser-test.sh
│   ├── check-types.sh
│   ├── lint-and-format.sh
│   ├── check-bundle-size.sh
│   └── check-accessibility.sh
├── docs/                 # Documentation
│   ├── figma-to-react/   # Figma pipeline guide
│   └── react-development/# Development standards
├── .claude/              # Claude Code configuration
│   ├── agents/           # 44 custom agents
│   ├── skills/           # 6 development skills
│   ├── CUSTOM-AGENTS-GUIDE.md
│   ├── PLUGINS-REFERENCE.md
│   └── AGENT-NAMING-GUIDE.md
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## Key Features

### Figma-to-React Conversion

Convert Figma designs into React components automatically:

```
User: "Convert this Figma design to React: [Figma URL]"
```

The pipeline extracts design tokens, generates a Tailwind config, creates typed React components, maps assets, and runs visual QA. See `docs/figma-to-react/README.md`.

### 44 Custom Agents

Agents are auto-selected by Claude Code based on your task:

| Category | Agents | Examples |
|----------|--------|---------|
| Engineering | 7 | frontend-developer, backend-architect, test-writer-fixer |
| Design | 5 | ui-designer, ux-researcher, brand-guardian |
| Design-to-Code | 2 | figma-react-converter, asset-cataloger |
| Testing & QA | 7 | api-tester, performance-benchmarker, visual-qa-agent |
| Product | 3 | sprint-prioritizer, feedback-synthesizer |
| Marketing | 7 | content-creator, growth-hacker |
| Project Mgmt | 3 | studio-producer, project-shipper |
| Operations | 5 | analytics-reporter, infrastructure-maintainer |
| Other | 5 | docusaurus-expert, agent-expert, joker |

Full catalog: `.claude/CUSTOM-AGENTS-GUIDE.md`

### 6 Development Skills

Skills auto-trigger based on conversation keywords:

1. **figma-to-react-workflow** -- Figma conversion pipeline orchestration
2. **react-component-development** -- Component patterns and best practices
3. **react-testing-workflows** -- Vitest, RTL, Playwright, Storybook
4. **react-performance-optimization** -- Profiling, bundle analysis, Web Vitals
5. **react-accessibility** -- WCAG patterns for React
6. **visual-qa-verification** -- Post-conversion visual QA

Full catalog: `.claude/skills/README.md`

### Testing

```bash
./scripts/run-tests.sh           # Vitest unit/component tests
./scripts/cross-browser-test.sh  # Playwright E2E (Chromium, Firefox, WebKit)
./scripts/check-accessibility.sh # Automated a11y scanning
```

### Code Quality

```bash
./scripts/check-types.sh         # TypeScript type checking
./scripts/lint-and-format.sh     # ESLint + Prettier
./scripts/check-bundle-size.sh   # Bundle size analysis
```

## Claude Code Plugins

```
episodic-memory    # Persistent memory across sessions
commit-commands    # Git workflow automation (/commit, /commit-push-pr)
github             # GitHub integration (gh CLI)
superpowers        # Advanced development workflows
ai-taskmaster      # Task management (local)
```

Details: `.claude/PLUGINS-REFERENCE.md`

## Documentation

| Document | Location |
|----------|----------|
| Figma-to-React pipeline | `docs/figma-to-react/README.md` |
| React development standards | `docs/react-development/README.md` |
| Agent catalog | `.claude/CUSTOM-AGENTS-GUIDE.md` |
| Plugin reference | `.claude/PLUGINS-REFERENCE.md` |
| Skills catalog | `.claude/skills/README.md` |
| Agent naming guide | `.claude/AGENT-NAMING-GUIDE.md` |

## License

MIT
