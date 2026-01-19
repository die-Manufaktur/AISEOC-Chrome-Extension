---
name: fse-block-theme-development
description: Use when creating FSE block themes, working with theme.json, creating templates or template parts, or building block patterns. Keywords: FSE, Full Site Editing, block theme, theme.json, templates, patterns, WordPress theme development
---

# FSE Block Theme Development

## Overview

FSE (Full Site Editing) block themes require a systematic, design-system-first approach. The theme.json file defines the design system (colors, typography, spacing), templates use those tokens, and patterns compose blocks into reusable UI components.

**Core Principle:** theme.json FIRST → templates SECOND → patterns THIRD. Never skip theme.json setup or hardcode values.

## When to Use

Use this skill when:
- Creating a new FSE block theme
- Setting up theme.json configuration
- Creating or modifying theme templates
- Building template parts (header, footer, sidebar)
- Configuring block supports and settings
- Creating style variations
- Migrating a classic theme to FSE

**Symptoms that trigger this skill:**
- "create block theme"
- "setup theme.json"
- "add template"
- "FSE development"
- "Full Site Editing"
- "block theme structure"

When NOT to use:
- Classic WordPress themes (non-FSE)
- Plugin development (use wp-cli-workflows instead)
- Simple CSS-only changes to existing theme

## Required File Structure

### ⚠️ CRITICAL: File Location

**This project uses ROOT-LEVEL folders during development:**

```
project-root/
└── themes/theme-name/      ← Create themes HERE (NOT wp-content/themes/)
```

**NEVER create files in `wp-content/themes/` during development.** All theme development happens in the root-level `themes/` directory. Testing environments copy files to WordPress `wp-content/` for deployment.

### Minimal FSE Theme Structure

**Minimal FSE theme requires:**

```
themes/theme-name/          ← ROOT-LEVEL (not wp-content/themes/)
├── style.css               # Theme header (REQUIRED)
├── theme.json              # Design system (REQUIRED)
├── templates/
│   └── index.html          # Fallback template (REQUIRED)
└── parts/                  # Optional but recommended
    ├── header.html
    └── footer.html
```

**Complete FSE theme structure:**

```
themes/theme-name/              ← ROOT-LEVEL (not wp-content/themes/)
├── style.css
├── theme.json
├── functions.php               # Optional: custom functionality
├── templates/
│   ├── index.html              # Required fallback
│   ├── front-page.html
│   ├── home.html               # Blog index
│   ├── single.html             # Single post
│   ├── page.html               # Single page
│   ├── archive.html            # Archive pages
│   ├── search.html
│   └── 404.html
├── parts/
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/                   # Custom block patterns
│   ├── hero.php
│   ├── call-to-action.php
│   └── testimonial.php
└── assets/                     # Theme assets
    ├── css/
    ├── js/
    └── images/
```

## Quick Reference

### theme.json Development Workflow

| Step | Action | Purpose |
|------|--------|---------|
| 1 | Create style.css header | Theme metadata |
| 2 | Create theme.json schema | Design system foundation |
| 3 | Define color palette | Brand colors as tokens |
| 4 | Define typography | Font families, sizes, line heights |
| 5 | Define spacing scale | Consistent padding/margin values |
| 6 | Configure layout settings | Content width, wide width |
| 7 | Set block supports | Enable/disable block features |
| 8 | Create templates | Use theme.json tokens |
| 9 | Create template parts | Reusable header/footer |
| 10 | Build patterns | Compose blocks into UI |

### Template Hierarchy (FSE)

Templates follow WordPress template hierarchy, with `.html` extension:

```
Front page:     front-page.html → home.html → index.html
Blog index:     home.html → index.html
Single post:    single-{post-type}-{slug}.html → single-{post-type}.html → single.html → singular.html → index.html
Page:           page-{slug}.html → page-{id}.html → page.html → singular.html → index.html
Archive:        archive-{post-type}.html → archive.html → index.html
Search:         search.html → index.html
404:            404.html → index.html
```

## Implementation

### Step 1: Create style.css Header

**Minimal theme header:**

```css
/*
Theme Name: My Block Theme
Theme URI: https://example.com/my-block-theme
Author: Your Name
Author URI: https://example.com
Description: A custom FSE block theme
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: my-block-theme
Tags: block-themes, full-site-editing, accessibility-ready
*/
```

### Step 2: Create theme.json (Design System)

**Schema version 3 (WordPress 6.6+):**

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "primary",
          "color": "#0073aa",
          "name": "Primary"
        },
        {
          "slug": "secondary",
          "color": "#23282d",
          "name": "Secondary"
        },
        {
          "slug": "foreground",
          "color": "#000000",
          "name": "Foreground"
        },
        {
          "slug": "background",
          "color": "#ffffff",
          "name": "Background"
        }
      ],
      "defaultPalette": false,
      "defaultGradients": false
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
          "slug": "system",
          "name": "System"
        }
      ],
      "fontSizes": [
        {
          "slug": "small",
          "size": "0.875rem",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "1rem",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "1.5rem",
          "name": "Large"
        },
        {
          "slug": "x-large",
          "size": "2rem",
          "name": "Extra Large"
        }
      ],
      "defaultFontSizes": false
    },
    "spacing": {
      "spacingScale": {
        "steps": 0
      },
      "spacingSizes": [
        {
          "slug": "small",
          "size": "1rem",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "2rem",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "4rem",
          "name": "Large"
        }
      ],
      "padding": true,
      "margin": true
    },
    "layout": {
      "contentSize": "650px",
      "wideSize": "1200px"
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--background)",
      "text": "var(--wp--preset--color--foreground)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--system)",
      "fontSize": "var(--wp--preset--font-size--medium)",
      "lineHeight": "1.6"
    },
    "spacing": {
      "padding": {
        "top": "0px",
        "right": "var(--wp--preset--spacing--medium)",
        "bottom": "0px",
        "left": "var(--wp--preset--spacing--medium)"
      }
    }
  }
}
```

### Step 3: Create index.html Template

**Minimal fallback template:**

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:query {"queryId":0,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":true}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-title {"isLink":true} /-->
            <!-- wp:post-date /-->
            <!-- wp:post-excerpt /-->
        <!-- /wp:post-template -->

        <!-- wp:query-pagination -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->

        <!-- wp:query-no-results -->
            <!-- wp:paragraph -->
            <p>No posts found.</p>
            <!-- /wp:paragraph -->
        <!-- /wp:query-no-results -->
    </div>
    <!-- /wp:query -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### Step 4: Using theme.json Tokens in Templates

**CORRECT - Using CSS variables:**

```html
<!-- wp:group {"style":{"color":{"background":"var(--wp--preset--color--primary)"},"spacing":{"padding":{"top":"var(--wp--preset--spacing--large)","bottom":"var(--wp--preset--spacing--large)"}}}} -->
<div class="wp-block-group has-background" style="background-color:var(--wp--preset--color--primary);padding-top:var(--wp--preset--spacing--large);padding-bottom:var(--wp--preset--spacing--large)">
    <!-- Block content -->
</div>
<!-- /wp:group -->
```

**INCORRECT - Hardcoding values:**

```html
<!-- NEVER DO THIS -->
<div style="background-color:#0073aa;padding-top:4rem;">
```

## Common Mistakes

### 1. Skipping theme.json Setup

**WRONG:**
```
"The client needs the theme today, let's skip theme.json for now and just hardcode the styles."
```

**WHY THIS FAILS:**
- theme.json is REQUIRED for FSE themes
- Without it, WordPress uses default colors/fonts
- Cannot be "added later" without refactoring all templates
- Hardcoded values break the design system

**CORRECT:**
Start with minimal theme.json (10 minutes), even if you only define primary color and base font. You can always expand it later.

### 2. Hardcoding Colors Instead of Using Tokens

**WRONG:**
```html
<!-- wp:group {"style":{"color":{"background":"#0073aa"}}} -->
```

**WHY THIS FAILS:**
- Changes require find-replace across all templates
- No consistency enforcement
- Cannot be customized by users
- Breaks theme variations

**CORRECT:**
```html
<!-- wp:group {"style":{"color":{"background":"var(--wp--preset--color--primary)"}}} -->
```

### 3. Not Following Template Hierarchy

**WRONG:**
Creating only `index.html` and expecting different layouts for posts vs pages.

**WHY THIS FAILS:**
- All pages look identical
- No specialized layouts for archives, search, 404
- Users cannot customize specific page types

**CORRECT:**
Create specific templates for different contexts:
- `single.html` for blog posts
- `page.html` for static pages
- `archive.html` for category/tag archives
- `404.html` for not found pages

### 4. Missing Required index.html Template

**WRONG:**
Creating `front-page.html` and `single.html` but no `index.html`.

**WHY THIS FAILS:**
- WordPress REQUIRES index.html as ultimate fallback
- Theme will not work if index.html is missing
- Validation errors in theme checker

**CORRECT:**
Always create `templates/index.html` first, even if you plan to override it with specific templates.

### 5. Inline Styles Instead of theme.json

**WRONG:**
Adding CSS to style.css for block spacing, colors, typography.

**WHY THIS FAILS:**
- Bypasses the block editor's design system
- Users cannot customize values in Site Editor
- No support for theme variations
- Harder to maintain consistency

**CORRECT:**
Define all design tokens in theme.json, let WordPress generate CSS automatically.

### 6. Not Testing with Different Block Combinations

**WRONG:**
Testing theme only with default paragraph and heading blocks.

**WHY THIS FAILS:**
- Breaks with complex blocks (columns, cover, group)
- Spacing issues with nested blocks
- Accessibility problems not caught

**CORRECT:**
Test with diverse blocks:
- Columns and nested groups
- Cover blocks with overlay
- Query loops with pagination
- Forms and interactive blocks

### 7. Skipping Accessibility Testing

**WRONG:**
"We'll add accessibility later after launch."

**WHY THIS FAILS:**
- Accessibility must be built in from start
- Retrofitting is expensive and incomplete
- Legal liability in many jurisdictions
- Excludes users with disabilities

**CORRECT:**
During development:
- Use semantic HTML in templates
- Test with keyboard navigation
- Verify color contrast ratios
- Add ARIA labels where needed
- Test with screen reader

## Red Flags - Rationalization Detection

These thoughts indicate you're about to violate FSE best practices:

| Rationalization | Reality | Correct Action |
|----------------|---------|----------------|
| "Let's skip theme.json for now" | theme.json is REQUIRED and foundational | Create minimal theme.json (10 min) |
| "We'll just hardcode this color" | Breaks design system, not customizable | Add color to theme.json palette |
| "index.html isn't needed yet" | It's the required fallback template | Create index.html FIRST |
| "Inline styles are faster" | Bypasses WordPress design system | Use theme.json tokens |
| "We don't have time for testing" | Bugs compound and are harder to fix later | Test incrementally as you build |
| "Accessibility can wait" | Must be built in from start | Use semantic HTML, test as you go |
| "Users won't customize this" | Cannot predict future needs | Follow design system principles |
| "This is just a prototype" | Prototypes become production | Build it right from the start |

## No Exceptions

**NEVER skip these requirements, regardless of pressure:**

1. ✅ **theme.json MUST exist** - Even if minimal, it's required
2. ✅ **index.html MUST exist** - It's the ultimate fallback
3. ✅ **Use theme.json tokens** - Never hardcode colors/fonts/spacing
4. ✅ **Follow template hierarchy** - Create specific templates for different contexts
5. ✅ **Test with diverse blocks** - Don't assume it works with just paragraphs
6. ✅ **Build in accessibility** - Semantic HTML, keyboard navigation, ARIA

**Time pressure is not a valid reason to skip these.**
**Client deadlines are not a valid reason to skip these.**
**"We'll fix it later" is not a valid reason to skip these.**

## Integration with This Template

This skill works with:
- **frontend-developer agent** - Building block patterns and theme CSS/JS
- **ui-designer agent** - Designing block patterns and theme layouts
- **test-writer-fixer agent** - Writing PHPUnit tests for theme functions
- **performance-benchmarker agent** - Optimizing theme performance
- **workflow-optimizer agent** - Streamlining theme development process

Complements these skills:
- **block-pattern-creation** - For building reusable UI patterns
- **wordpress-security-hardening** - Security best practices during theme development
- **wp-cli-workflows** - Scaffolding theme with WP-CLI

## Testing Checklist

Before considering an FSE theme complete:

- [ ] theme.json exists with complete design system
- [ ] style.css has valid theme header
- [ ] index.html template exists (minimum requirement)
- [ ] Specific templates created for different contexts (single, page, archive)
- [ ] Template parts created for header/footer
- [ ] All colors use theme.json tokens (no hardcoded hex values)
- [ ] All spacing uses theme.json spacing scale
- [ ] All typography uses theme.json font definitions
- [ ] Tested with diverse block combinations (columns, cover, group, query)
- [ ] Keyboard navigation works throughout
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Semantic HTML used in all templates
- [ ] Site Editor allows customization of design tokens
- [ ] Theme variations work correctly (if implemented)
- [ ] No PHP errors or warnings
- [ ] Passes WordPress theme checker

## Resources

- [WordPress Block Theme Developer Handbook](https://developer.wordpress.org/themes/block-themes/)
- [theme.json Reference](https://developer.wordpress.org/themes/global-settings-and-styles/theme-json/)
- [Block Template Parts](https://developer.wordpress.org/themes/block-themes/templates-and-template-parts/)
- [WordPress Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-18
**Tested Against:** WordPress 6.7+
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
