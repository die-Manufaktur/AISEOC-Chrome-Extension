# Figma-to-FSE Implementation Guide

**Technical implementation details for converting Figma designs to WordPress FSE themes**

**Audience:** Developers, agents executing conversion workflow

---

## Table of Contents

1. [Overview](#overview)
2. [Design Token Extraction](#design-token-extraction)
3. [Template Conversion](#template-conversion)
4. [Pattern Generation](#pattern-generation)
5. [Validation & Quality](#validation--quality)
6. [Error Recovery](#error-recovery)

---

## Overview

### Conversion Pipeline

```
Figma Design
    ↓
[Figma MCP: get_variable_defs]
    ↓
Design System (JSON)
    ↓
[Translation Layer]
    ↓
theme.json
    ↓
[Figma MCP: get_design_context or get_screenshot]
    ↓
Template Structure (JSON or visual)
    ↓
[Component Mapping]
    ↓
FSE Template HTML + PHP Patterns
    ↓
[Validation Hooks]
    ↓
Complete WordPress Theme
```

### Key Technologies

- **Figma MCP** - Design extraction (desktop + remote APIs)
- **theme.json** - WordPress design token standard
- **FSE Blocks** - WordPress block editor markup
- **PHP Patterns** - WordPress pattern registration
- **Validation Hooks** - Quality enforcement

---

## Design Token Extraction

### Step 1: Auto-Detect Design System (Optional)

**Auto-detection searches common locations:**

```javascript
const COMMON_DESIGN_SYSTEM_NAMES = [
  "Design System",
  "Styles",
  "Tokens",
  "Library",
  "Components",
  "Style Guide"
];

async function autoDetectDesignSystem(figmaFileKey) {
  // Use get_metadata to search pages
  const metadata = await figma_mcp.get_metadata({
    nodeId: "0:1", // Root
    fileKey: figmaFileKey
  });

  // Parse XML for pages matching common names
  const pages = parsePages(metadata);
  const designSystem = pages.find(page =>
    COMMON_DESIGN_SYSTEM_NAMES.some(name =>
      page.name.toLowerCase().includes(name.toLowerCase())
    )
  );

  return designSystem ? { nodeId: designSystem.nodeId, name: designSystem.name } : null;
}
```

### Step 2: Extract Variables with Figma MCP

**Use get_variable_defs to extract ALL design tokens:**

```typescript
// Input
{
  nodeId: "123:456",  // Design system node ID
  fileKey: "abc123"   // From Figma URL
}

// Output structure
{
  variables: {
    colors: {
      "primary": "#0066CC",
      "secondary": "#FF6B35",
      "neutral-100": "#FFFFFF",
      "neutral-900": "#000000"
    },
    typography: {
      fontFamilies: {
        "primary": "Inter, sans-serif",
        "secondary": "Playfair Display, serif"
      },
      fontSizes: {
        "xs": "12px",
        "base": "16px",
        "2xl": "24px"
      },
      fontWeights: {
        "normal": 400,
        "bold": 700
      }
    },
    spacing: {
      "1": "4px",
      "4": "16px",
      "8": "32px"
    },
    layout: {
      "contentWidth": "720px",
      "wideWidth": "1200px"
    }
  }
}
```

### Step 3: Translate to theme.json

**Translation rules:**

#### Colors: Figma → settings.color.palette

```javascript
function translateColors(figmaColors) {
  return Object.entries(figmaColors).map(([slug, color]) => ({
    slug: slug,                        // "primary"
    color: color,                      // "#0066CC"
    name: slugToTitle(slug)            // "Primary"
  }));
}

// slugToTitle: "neutral-100" → "Neutral 100"
function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

#### Typography: Figma → settings.typography

```javascript
function translateFontSizes(figmaFontSizes) {
  return Object.entries(figmaFontSizes).map(([slug, size]) => ({
    slug: slug,                        // "base"
    size: pxToRem(size),              // "1rem" (from "16px")
    name: slugToTitle(slug)            // "Base"
  }));
}

// Convert px to rem (16px base)
function pxToRem(pxValue) {
  const px = parseInt(pxValue);
  return `${px / 16}rem`;
}
```

#### Spacing: Figma → settings.spacing.spacingSizes

```javascript
function translateSpacing(figmaSpacing) {
  return Object.entries(figmaSpacing).map(([name, size], index) => ({
    slug: `${(index + 2) * 10}`,      // "20", "30", "40"...
    size: size,                        // "4px", "8px", "16px"
    name: name                         // "1", "2", "4"
  }));
}

// Note: WordPress uses slug numbers (20, 30, 40...)
// Map Figma spacing to WP convention
```

### Step 4: Generate theme.json

**Complete theme.json structure:**

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "appearanceTools": true,
    "useRootPaddingAwareAlignments": true,
    "color": {
      "custom": false,
      "customDuotone": false,
      "customGradient": false,
      "defaultPalette": false,
      "palette": [
        /* Translated colors */
      ]
    },
    "typography": {
      "customFontSize": false,
      "dropCap": false,
      "fontFamilies": [
        /* Translated font families */
      ],
      "fontSizes": [
        /* Translated font sizes */
      ]
    },
    "spacing": {
      "spacingSizes": [
        /* Translated spacing */
      ],
      "units": ["px", "rem", "em", "%"]
    },
    "layout": {
      "contentSize": "720px",
      "wideSize": "1200px"
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--neutral-100)",
      "text": "var(--wp--preset--color--neutral-900)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--primary)",
      "fontSize": "var(--wp--preset--font-size--base)",
      "lineHeight": "1.5"
    },
    "spacing": {
      "padding": {
        "top": "0",
        "right": "var(--wp--preset--spacing--40)",
        "bottom": "0",
        "left": "var(--wp--preset--spacing--40)"
      }
    }
  }
}
```

### Step 5: Fallback Design Tokens

**When no design system found, use professional defaults:**

```javascript
const FALLBACK_DESIGN_TOKENS = {
  colors: {
    "primary": "#2271b1",       // WordPress blue
    "accent": "#72aee6",        // Light blue
    "neutral-50": "#f9fafb",
    "neutral-100": "#f3f4f6",
    "neutral-200": "#e5e7eb",
    "neutral-300": "#d1d5db",
    "neutral-700": "#374151",
    "neutral-800": "#1f2937",
    "neutral-900": "#111827",
    "success": "#059669",
    "warning": "#d97706",
    "error": "#dc2626",
    "white": "#ffffff",
    "black": "#000000"
  },
  fontSizes: {
    "xs": "14px",
    "sm": "16px",
    "base": "18px",
    "lg": "20px",
    "xl": "24px",
    "2xl": "30px",
    "3xl": "36px",
    "4xl": "48px",
    "5xl": "72px"
  },
  spacing: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  },
  layout: {
    "contentSize": "768px",
    "wideSize": "1280px"
  }
};
```

---

## Template Conversion

### Step 1: Survey Templates

**Identify Figma frames that represent WordPress templates:**

```javascript
async function surveyTemplates(figmaFileKey) {
  // Get file structure
  const metadata = await figma_mcp.get_metadata({
    nodeId: "0:1",
    fileKey: figmaFileKey
  });

  // Find template frames
  const pages = parsePages(metadata);
  const templates = pages.filter(page => isTemplateFrame(page.name));

  // Capture screenshots
  const templateData = [];
  for (const template of templates) {
    const screenshot = await figma_mcp.get_screenshot({
      nodeId: template.nodeId,
      fileKey: figmaFileKey
    });

    templateData.push({
      name: template.name,
      nodeId: template.nodeId,
      screenshot: screenshot,
      wpTemplateName: figmaNameToWpTemplate(template.name)
    });
  }

  return templateData;
}

// Determine if frame is a template
function isTemplateFrame(name) {
  const keywords = [
    'homepage', 'home', 'front-page',
    'about', 'contact', 'services',
    'blog', 'archive', 'single',
    'page', '404', 'search'
  ];

  return keywords.some(keyword =>
    name.toLowerCase().includes(keyword)
  );
}

// Map Figma name to WordPress template file
function figmaNameToWpTemplate(figmaName) {
  const mapping = {
    'homepage': 'front-page.html',
    'home': 'home.html',
    'about': 'page-about.html',
    'contact': 'page-contact.html',
    'blog': 'home.html',
    'single post': 'single.html',
    'archive': 'archive.html',
    '404': '404.html',
    'search': 'search.html'
  };

  const lowerName = figmaName.toLowerCase();
  for (const [key, value] of Object.entries(mapping)) {
    if (lowerName.includes(key)) return value;
  }

  return 'page.html'; // Default
}
```

### Step 2: Extract Structure from Figma

**Primary method: get_design_context**

```javascript
async function extractTemplateStructure(nodeId, fileKey) {
  try {
    // Try get_design_context (most detailed)
    const designContext = await figma_mcp.get_design_context({
      nodeId: nodeId,
      fileKey: fileKey,
      clientLanguages: "html,css",
      clientFrameworks: "wordpress"
    });

    return {
      success: true,
      method: 'design_context',
      structure: designContext.code,
      assets: designContext.assets
    };

  } catch (error) {
    // Fallback to screenshot analysis
    return await extractFromScreenshot(nodeId, fileKey);
  }
}
```

**Fallback method: get_screenshot + visual analysis**

```javascript
async function extractFromScreenshot(nodeId, fileKey) {
  const screenshot = await figma_mcp.get_screenshot({
    nodeId: nodeId,
    fileKey: fileKey
  });

  // Agent uses vision capabilities to analyze
  const analysis = analyzeScreenshotVisually(screenshot);

  return {
    success: true,
    method: 'screenshot_analysis',
    structure: analysis
  };
}
```

### Step 3: Component Mapping

**Map Figma components to WordPress blocks:**

```javascript
const COMPONENT_MAP = {
  // Layout
  'frame': generateGroup,
  'container': generateGroup,
  'section': generateGroup,
  'grid': generateColumns,

  // Content
  'heading': generateHeading,
  'text': generateParagraph,
  'paragraph': generateParagraph,
  'image': generateImage,
  'button': generateButton,

  // Complex
  'hero': generateCover,
  'card': generateCardGroup,
  'navigation': generateNavigation
};
```

**Example: Generate Group block**

```javascript
function generateGroup(props) {
  const {backgroundColor, textColor, spacing, children} = props;

  return `<!-- wp:group {
  "backgroundColor": "${mapColorToSlug(backgroundColor)}",
  "textColor": "${mapColorToSlug(textColor)}",
  "style": {
    "spacing": {
      "padding": {
        "top": "var(--wp--preset--spacing--${mapSpacingToSlug(spacing.top)})",
        "bottom": "var(--wp--preset--spacing--${mapSpacingToSlug(spacing.bottom)})"
      }
    }
  }
} -->
<div class="wp-block-group">${children}</div>
<!-- /wp:group -->`;
}
```

**Helper: Map Figma values to theme.json slugs**

```javascript
function mapColorToSlug(hexColor) {
  const palette = getThemeJsonPalette();
  const match = palette.find(c =>
    c.color.toLowerCase() === hexColor.toLowerCase()
  );
  return match ? match.slug : 'primary'; // Fallback
}

function mapFontSizeToSlug(pxSize) {
  const sizes = {
    '12px': 'xs',
    '14px': 'sm',
    '16px': 'base',
    '18px': 'lg',
    '20px': 'xl',
    '24px': '2xl'
  };
  return sizes[pxSize] || 'base';
}

function mapSpacingToSlug(pxSpacing) {
  const spacing = {
    '4px': '20',
    '8px': '30',
    '16px': '40',
    '24px': '50',
    '32px': '60',
    '48px': '70'
  };
  return spacing[pxSpacing] || '40';
}
```

---

## Pattern Generation

### Decision Rules

**When to create PHP patterns:**

1. Section contains images
2. Section contains media (video, audio)
3. Component is reusable across templates
4. Dynamic content needed

**When to inline in templates:**

1. Text-only content
2. Page-specific layouts
3. Template structure (header/footer references)

### Pattern File Structure

```php
<?php
/**
 * Title: Hero Section
 * Slug: themename/hero-section
 * Categories: banner
 * Keywords: hero, banner, cover
 */
?>
<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero.png","dimRatio":50,"align":"full"} -->
<div class="wp-block-cover alignfull">
  <span aria-hidden="true" class="wp-block-cover__background"></span>
  <img class="wp-block-cover__image-background" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero.png" alt=""/>
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"level":1,"textColor":"white","fontSize":"3xl"} -->
    <h1 class="wp-block-heading">Welcome</h1>
    <!-- /wp:heading -->
  </div>
</div>
<!-- /wp:cover -->
```

### Pattern Registration

**WordPress auto-registers patterns from `patterns/` folder if:**

1. File is `.php` extension
2. File has proper header comment
3. Slug format: `themename/pattern-name`

**No additional registration needed!**

### Reference Pattern in Template

```html
<!-- templates/front-page.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:pattern {"slug":"themename/hero-section"} /-->
<!-- wp:pattern {"slug":"themename/features"} /-->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Validation & Quality

### Automated Validation Hooks

**PostToolUse hooks run after Write/Edit:**

1. `validate-theme-location.sh` - Blocks wp-content writes
2. `validate-pattern-architecture.sh` - Enforces pattern-first
3. `validate-template.sh` - Checks template syntax
4. `security-scan.sh` - Security checks
5. `check-coding-standards.sh` - WordPress standards

### Pattern Architecture Validation

**What validate-pattern-architecture.sh checks:**

```bash
#!/bin/bash
# Check for PHP in HTML templates
if grep -q "<?php" "$template_file"; then
  echo "❌ PHP code found in HTML template"
  echo "Solution: Move to PHP pattern in patterns/"
  exit 1
fi

# Check for empty src attributes
if grep -q 'src=""' "$template_file"; then
  echo "❌ Empty src attribute found"
  echo "Images must use PHP patterns with get_template_directory_uri()"
  exit 1
fi

# Verify referenced patterns exist
pattern_slugs=$(grep -o 'wp:pattern.*slug":"[^"]*"' "$template_file" | grep -o 'slug":"[^"]*"' | cut -d'"' -f3)
for slug in $pattern_slugs; do
  pattern_name="${slug#*/}"  # Remove theme prefix
  if [ ! -f "patterns/$pattern_name.php" ]; then
    echo "⚠️  Referenced pattern not found: patterns/$pattern_name.php"
  fi
done
```

### Template Quality Checks

**Validation checklist:**

```javascript
async function validateTemplate(filePath) {
  const content = await readFile(filePath);

  // 1. No hardcoded hex colors
  const hexMatches = content.match(/#[0-9A-Fa-f]{6}/g);
  if (hexMatches) {
    console.warn(`⚠️ Found ${hexMatches.length} hardcoded colors`);
  }

  // 2. No hardcoded pixel sizes
  const pxMatches = content.match(/:\s*"[0-9]+px"/g);
  if (pxMatches) {
    console.warn(`⚠️ Found ${pxMatches.length} hardcoded pixel sizes`);
  }

  // 3. Balanced blocks
  const openBlocks = (content.match(/<!-- wp:/g) || []).length;
  const closeBlocks = (content.match(/<!-- \/wp:/g) || []).length;
  if (openBlocks !== closeBlocks) {
    throw new Error(`Unbalanced blocks: ${openBlocks} open, ${closeBlocks} close`);
  }

  // 4. Run validation script
  await runHook('validate-template.sh', filePath);
}
```

---

## Error Recovery

### Pattern 1: Figma MCP Unreachable

```javascript
async function extractWithFallback(nodeId, fileKey) {
  try {
    // Try desktop MCP
    return await figma_desktop_mcp.get_design_context({nodeId, fileKey});
  } catch (desktopError) {
    try {
      // Try remote MCP
      return await figma_remote_mcp.get_design_context({nodeId, fileKey});
    } catch (remoteError) {
      // Both failed - this is a blocker
      throw new Error("Figma MCP unreachable. Cannot extract design.");
    }
  }
}
```

### Pattern 2: get_design_context Fails (Annotations)

```javascript
async function extractStructure(nodeId, fileKey) {
  try {
    return await figma_mcp.get_design_context({nodeId, fileKey});
  } catch (error) {
    if (error.message.includes('annotations')) {
      // Fallback to screenshot
      return await extractFromScreenshot(nodeId, fileKey);
    }
    throw error;
  }
}
```

### Pattern 3: Missing Design Token

```javascript
function mapColorToSlug(hexColor) {
  const palette = getThemeJsonPalette();
  let match = palette.find(c => c.color === hexColor);

  if (!match) {
    // Add missing token to theme.json
    const newSlug = generateSlugFromHex(hexColor);
    addColorToThemeJson({
      slug: newSlug,
      color: hexColor,
      name: slugToTitle(newSlug)
    });
    return newSlug;
  }

  return match.slug;
}
```

### Pattern 4: Complex Component Simplification

```javascript
function mapComplexComponent(figmaComponent) {
  const simplifications = {
    'carousel': 'gallery',        // Carousel → Gallery block
    'accordion': 'group',          // Accordion → Group + Headings
    'tabs': 'columns',             // Tabs → Columns
    'modal': 'group'               // Modal → Group
  };

  const simplified = simplifications[figmaComponent.type];
  if (simplified) {
    console.log(`ℹ️  Simplified ${figmaComponent.type} to ${simplified}`);
    return generateBlock(simplified, figmaComponent.props);
  }

  // Can't simplify - use placeholder
  return generatePlaceholder(figmaComponent);
}
```

---

## Performance Optimization

### Single Template: < 5 minutes

**Steps:**
1. Extract design system: 30s
2. Create theme.json: 15s
3. Extract template structure: 45s
4. Generate template HTML: 1m
5. Create patterns: 1m
6. Validation: 1m

### Multiple Templates: < 90 minutes

**For 15 templates:**
- Design system extraction: 1x (30s)
- theme.json creation: 1x (15s)
- Per-template work: 15x (5m each) = 75m
- Final validation: 5m

**Parallelization opportunities:**
- Template extraction (concurrent get_screenshot)
- Pattern generation (independent operations)
- Validation (run multiple checks concurrently)

---

## Testing & Verification

### Unit Tests

```bash
# Test design token extraction
echo '{"tool_input":{"file_path":"themes/test/theme.json"}}' | \
  ./scripts/figma-fse/extract-design-tokens.sh

# Test template validation
echo '{"tool_input":{"file_path":"themes/test/templates/front-page.html"}}' | \
  ./scripts/figma-fse/validate-template.sh

# Test pattern architecture
echo '{"tool_input":{"file_path":"themes/test/templates/front-page.html"}}' | \
  ./scripts/figma-fse/validate-pattern-architecture.sh
```

### Integration Tests

```javascript
async function testFullConversion() {
  // 1. Create test Figma file
  const figmaFile = createTestFigmaFile({
    designSystem: TEST_DESIGN_SYSTEM,
    templates: [TEST_HERO_TEMPLATE]
  });

  // 2. Run conversion
  const result = await convertFigmaToFSE(figmaFile.url);

  // 3. Verify output
  assert(fs.existsSync(`themes/${result.themeName}/theme.json`));
  assert(fs.existsSync(`themes/${result.themeName}/templates/front-page.html`));
  assert(fs.existsSync(`themes/${result.themeName}/patterns/hero-section.php`));

  // 4. Verify quality
  const template = fs.readFileSync(`themes/${result.themeName}/templates/front-page.html`, 'utf8');
  assert(!template.includes('#')); // No hex colors
  assert(template.includes('var(--wp--preset--')); // Uses tokens
}
```

---

## Advanced Topics

### Custom Block Development

For components not mappable to core blocks:

```php
// patterns/custom-carousel.php
<?php
/**
 * Title: Custom Carousel
 * Slug: themename/custom-carousel
 * Categories: media
 */
?>
<!-- wp:group {"className":"custom-carousel"} -->
<div class="wp-block-group custom-carousel">
  <!-- wp:gallery {"columns":3} -->
  <!-- Simplified to gallery, enhance with JS -->
  <!-- /wp:gallery -->
</div>
<!-- /wp:group -->

<script>
// Custom carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
});
</script>
```

### Style Variations

Generate multiple color schemes:

```json
{
  "settings": {
    "color": {
      "palette": [/* base colors */]
    }
  },
  "styles": {
    "variations": {
      "dark": {
        "color": {
          "background": "var(--wp--preset--color--neutral-900)",
          "text": "var(--wp--preset--color--white)"
        }
      }
    }
  }
}
```

### Block Pattern Categories

Organize patterns by category:

```php
<?php
/**
 * Title: Hero Section
 * Slug: themename/hero
 * Categories: banner, featured
 * Keywords: hero, banner, cover, headline
 * Block Types: core/cover
 */
?>
```

---

## Related Documentation

- [User Guide](./README.md) - Quick start and usage examples
- [Template Examples](./EXAMPLES.md) - FSE template syntax reference
- `.claude/skills/figma-to-fse-autonomous-workflow/SKILL.md` - Main skill orchestration
- `.claude/agents/figma-fse-converter.md` - Agent implementation

---

**Version:** 1.0.0
**Last Updated:** 2026-01-23
**Maintainer:** Claude Code WordPress Template Team
