# Figma-to-React Pipeline

Convert Figma designs into production-ready React components with Tailwind CSS and TypeScript.

## What the Pipeline Does

1. Extracts design tokens (colors, typography, spacing, shadows) from Figma
2. Generates a Tailwind CSS configuration from those tokens
3. Converts Figma frames into React components with TypeScript
4. Maps exported assets to semantic names
5. Runs visual QA to verify fidelity against the original design

The process is orchestrated by the `figma-to-react-workflow` skill and the `figma-react-converter` agent.

## Prerequisites

- **Figma MCP** configured in Claude Code (provides `mcp__figma__*` tools)
- **Figma file URL** with designs ready for development
- **Design tokens** defined in Figma (colors, text styles, spacing) for best results
- **Node.js 18+** and **pnpm** installed

## Quick Start

```
User: "Convert this Figma design to React: [Figma URL]"

Claude: [Autonomous workflow]
        1. Reads Figma file structure and metadata
        2. Extracts design system tokens
        3. Generates tailwind.config.ts
        4. Creates React components with TypeScript
        5. Maps and validates assets
        6. Runs visual QA comparison
```

Typical runtime: 5-30 minutes depending on design complexity.

## What Gets Generated

```
src/
├── components/
│   ├── Hero.tsx              # React components from Figma frames
│   ├── Navigation.tsx
│   ├── Card.tsx
│   └── Footer.tsx
├── types/
│   └── design-system.ts     # TypeScript types for tokens
├── assets/
│   └── images/              # Exported and semantically named assets
├── styles/
│   └── globals.css           # Base styles, @tailwind directives
tailwind.config.ts            # Generated from Figma design tokens
```

### Generated Component Example

```tsx
interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export function Hero({ title, subtitle, ctaLabel, onCtaClick }: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-6 px-8 py-24 bg-surface-primary">
      <h1 className="text-heading-xl text-content-primary">{title}</h1>
      <p className="text-body-lg text-content-secondary max-w-2xl text-center">
        {subtitle}
      </p>
      <button
        onClick={onCtaClick}
        className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover"
      >
        {ctaLabel}
      </button>
    </section>
  );
}
```

### Tailwind Config Example

```ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-brand-primary)",
          "primary-hover": "var(--color-brand-primary-hover)",
        },
        surface: {
          primary: "var(--color-surface-primary)",
        },
        content: {
          primary: "var(--color-content-primary)",
          secondary: "var(--color-content-secondary)",
        },
      },
      fontSize: {
        "heading-xl": ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      },
    },
  },
};
```

## Agent Integration

Three agents form the core pipeline:

| Agent | Role |
|-------|------|
| **figma-react-converter** | Orchestrates the full conversion: reads Figma, generates components |
| **asset-cataloger** | Maps hash-named image exports to semantic filenames, validates usage |
| **visual-qa-agent** | Compares rendered output against Figma screenshots, flags differences |

Supporting agents:
- **accessibility-auditor** -- WCAG compliance check on generated components
- **performance-benchmarker** -- Bundle size and rendering performance review
- **frontend-developer** -- Manual refinement of generated components

## Design Token Strategy

Tokens flow from Figma to code in this order:

```
Figma Variables/Styles
    -> TypeScript token types (design-system.ts)
    -> CSS custom properties (globals.css)
    -> Tailwind config references (tailwind.config.ts)
    -> Component class names (*.tsx)
```

No hardcoded color values, font sizes, or spacing values in components. Everything references design tokens through Tailwind classes.

## Troubleshooting

- **Missing tokens:** Ensure Figma file uses named styles/variables, not inline overrides
- **Wrong images:** Run the asset-cataloger agent to verify semantic mapping
- **Layout drift:** Use the visual-qa-agent to screenshot-diff against Figma
- **Figma MCP errors:** Verify MCP configuration with `mcp__figma__whoami`

## Related Documentation

- `.claude/skills/README.md` -- Skills catalog
- `.claude/CUSTOM-AGENTS-GUIDE.md` -- Full agent catalog
- `docs/react-development/README.md` -- React development standards
