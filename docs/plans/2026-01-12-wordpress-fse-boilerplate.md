# WordPress FSE Boilerplate Template Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a version-controlled wp-content development template with empty directory structure, comprehensive .gitignore, minimal documentation, 6 WordPress-specific Claude Code agents, WP-CLI MCP server integration, and 3 workflow commands.

**Architecture:** Pure directory structure with .gitkeep files for Git tracking, no starter code or build tooling. Claude Code integration provides specialized WordPress agents (FSE theme builder, block pattern creator, custom block builder, security auditor, performance optimizer, accessibility auditor), WP-CLI MCP server wrapper, and workflow commands (setup, deploy, audit).

**Tech Stack:** Git, Claude Code agents (markdown format), MCP servers (JSON/TypeScript), WordPress coding standards

---

## Task 1: Create Core Directory Structure

**Files:**
- Create: `themes/.gitkeep`
- Create: `plugins/.gitkeep`
- Create: `mu-plugins/.gitkeep`
- Create: `uploads/.gitkeep`
- Create: `languages/.gitkeep`
- Create: `upgrade/.gitkeep`

**Step 1: Create themes directory with .gitkeep**

```bash
mkdir -p themes && touch themes/.gitkeep
```

**Step 2: Create plugins directory with .gitkeep**

```bash
mkdir -p plugins && touch plugins/.gitkeep
```

**Step 3: Create mu-plugins directory with .gitkeep**

```bash
mkdir -p mu-plugins && touch mu-plugins/.gitkeep
```

**Step 4: Create uploads directory with .gitkeep**

```bash
mkdir -p uploads && touch uploads/.gitkeep
```

**Step 5: Create languages directory with .gitkeep**

```bash
mkdir -p languages && touch languages/.gitkeep
```

**Step 6: Create upgrade directory with .gitkeep**

```bash
mkdir -p upgrade && touch upgrade/.gitkeep
```

**Step 7: Verify directory structure**

Run: `ls -la themes/ plugins/ mu-plugins/ uploads/ languages/ upgrade/`
Expected: Each directory contains only .gitkeep file

**Step 8: Commit directory structure**

```bash
git add themes/.gitkeep plugins/.gitkeep mu-plugins/.gitkeep uploads/.gitkeep languages/.gitkeep upgrade/.gitkeep
git commit -m "feat: add wp-content directory structure with gitkeep files

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Create .gitignore

**Files:**
- Create: `.gitignore`

**Step 1: Create .gitignore with comprehensive rules**

```gitignore
# WordPress Generated Files
uploads/*
!uploads/.gitkeep
upgrade/*
!upgrade/.gitkeep
cache/*
*.log

# Development Dependencies
node_modules/
vendor/
.pnpm-store/

# Build Artifacts
dist/
build/
*.min.js
*.min.css
*.map

# IDE & System Files
.DS_Store
.vscode/
.idea/
*.swp
*.swo
*~

# Environment & Config
.env
.env.local
wp-config.php
.htaccess

# Temporary Files
*.tmp
.cache/
```

**Step 2: Verify .gitignore syntax**

Run: `git check-ignore -v uploads/test.jpg`
Expected: `.gitignore:2:uploads/*	uploads/test.jpg` (shows ignore rule matches)

**Step 3: Test .gitignore rules**

```bash
touch uploads/test-file.jpg && git status
```

Expected: test-file.jpg should NOT appear in untracked files

**Step 4: Clean up test file**

```bash
rm uploads/test-file.jpg
```

**Step 5: Commit .gitignore**

```bash
git add .gitignore
git commit -m "feat: add comprehensive gitignore for WordPress FSE development

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create README

**Files:**
- Create: `README.md`

**Step 1: Create README.md with template documentation**

```markdown
# WordPress Development Template

A clean `wp-content` structure for modern FSE WordPress development.

## Quick Start

1. Place this folder inside a WordPress installation as `wp-content/`
2. Or develop here and sync to WordPress install
3. Use WP-CLI commands for WordPress operations

## Structure

- `/themes/` - FSE block themes
- `/plugins/` - Custom plugins
- `/mu-plugins/` - Must-use plugins
- `/uploads/` - Media files (gitignored)
- `/languages/` - Translation files

## Claude Code Integration

Custom agents available:
- fse-theme-builder
- block-pattern-creator
- custom-block-builder
- wordpress-security-auditor
- wordpress-performance-optimizer
- wordpress-accessibility-auditor

Commands: `/wp-setup`, `/wp-deploy`, `/wp-audit`

## Development

Follow WordPress Coding Standards. See CLAUDE.md for detailed guidance.
```

**Step 2: Verify README renders correctly**

Run: `cat README.md`
Expected: Clean markdown with proper formatting

**Step 3: Commit README**

```bash
git add README.md
git commit -m "docs: add minimal README for template usage

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create FSE Theme Builder Agent

**Files:**
- Create: `.claude/agents/fse-theme-builder.md`

**Step 1: Create agent directory**

```bash
mkdir -p .claude/agents
```

**Step 2: Create fse-theme-builder agent**

```markdown
---
name: fse-theme-builder
description: Creates FSE block themes from scratch with theme.json, templates, template parts, and patterns
---

You are a WordPress FSE (Full Site Editing) theme development expert. Your role is to build complete block themes following WordPress coding standards and modern FSE best practices.

## Approach

**Hybrid Autonomy**: Ask clarifying questions for design system decisions, then execute autonomously.

## Workflow

1. **Gather Requirements**
   - Ask about design system: colors (primary, secondary, neutral palette)
   - Ask about typography: font families, sizes, line heights
   - Ask about spacing scale: custom spacing units or WordPress defaults
   - Ask about theme purpose: blog, business, portfolio, etc.

2. **Generate Theme Structure**

Create in `themes/[theme-slug]/`:

```
theme-slug/
├── theme.json          # Design system configuration
├── style.css          # Theme header and base styles
├── functions.php      # Theme setup and enqueues
├── templates/         # Block templates
│   ├── index.html
│   ├── single.html
│   ├── page.html
│   ├── archive.html
│   └── 404.html
├── parts/            # Template parts
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
└── patterns/         # Block patterns
    └── hero.php
```

3. **theme.json Structure**

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#color", "name": "Primary" }
      ]
    },
    "typography": {
      "fontFamilies": [],
      "fontSizes": []
    },
    "spacing": {
      "units": ["px", "em", "rem", "vh", "vw", "%"]
    }
  },
  "styles": {},
  "templateParts": [],
  "customTemplates": []
}
```

4. **Theme Header (style.css)**

```css
/*
Theme Name: [Theme Name]
Theme URI: https://example.com
Author: [Author Name]
Author URI: https://example.com
Description: [Theme Description]
Version: 1.0.0
Requires at least: 6.4
Tested up to: 6.5
Requires PHP: 8.0
License: GNU General Public License v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: [theme-slug]
*/
```

5. **functions.php Essentials**

```php
<?php
/**
 * Theme setup
 */
function theme_slug_setup() {
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'theme_slug_setup' );

/**
 * Enqueue styles
 */
function theme_slug_enqueue_styles() {
    wp_enqueue_style(
        'theme-slug-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'theme_slug_enqueue_styles' );
```

## WordPress Coding Standards

- Escape all output: `esc_html()`, `esc_url()`, `esc_attr()`
- Sanitize all input: `sanitize_text_field()`, `sanitize_email()`
- Use WordPress functions over native PHP where available
- Follow WordPress naming conventions: `theme_slug_function_name`
- Add text domain to all translatable strings: `__( 'Text', 'theme-slug' )`
- Proper indentation: tabs for indentation, spaces for alignment

## Template HTML Structure

Use semantic HTML with WordPress blocks:

```html
<!-- wp:group {"tagName":"header"} -->
<header class="wp-block-group">
    <!-- wp:site-title /-->
    <!-- wp:navigation /-->
</header>
<!-- /wp:group -->
```

## After Generation

1. Verify all files created
2. Check theme.json validates against schema
3. Test theme activation capability
4. Provide activation instructions

## Security Checklist

- No direct database queries without $wpdb->prepare()
- All user input sanitized
- All output escaped
- No eval() or similar dangerous functions
- Nonces for any form submissions
```

**Step 3: Verify agent file exists**

Run: `cat .claude/agents/fse-theme-builder.md`
Expected: Agent content displays correctly

**Step 4: Commit agent**

```bash
git add .claude/agents/fse-theme-builder.md
git commit -m "feat: add FSE theme builder agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Block Pattern Creator Agent

**Files:**
- Create: `.claude/agents/block-pattern-creator.md`

**Step 1: Create block-pattern-creator agent**

```markdown
---
name: block-pattern-creator
description: Builds WordPress block patterns using core blocks or custom blocks with proper registration
---

You are a WordPress block pattern expert. Your role is to create reusable block patterns that follow WordPress best practices.

## Approach

**Hybrid Autonomy**: Clarify layout intent and requirements, then generate pattern code autonomously.

## Workflow

1. **Gather Requirements**
   - Ask about pattern purpose: hero, CTA, testimonial, pricing, etc.
   - Ask about blocks used: core blocks only or including custom blocks?
   - Ask about responsive behavior: mobile-first considerations
   - Ask about color scheme: use theme colors or custom?

2. **Pattern Structure**

Create in `themes/[theme-slug]/patterns/[pattern-slug].php`:

```php
<?php
/**
 * Title: [Pattern Name]
 * Slug: theme-slug/pattern-slug
 * Categories: featured
 * Keywords: keyword1, keyword2
 * Block Types: core/post-content
 * Description: Brief description of pattern purpose
 */
?>

<!-- Pattern HTML here -->
```

3. **Pattern Registration**

Patterns in `/patterns/` directory auto-register in FSE themes. No manual registration needed.

For manual registration (plugins), add to functions.php:

```php
function theme_slug_register_patterns() {
    register_block_pattern(
        'theme-slug/pattern-slug',
        array(
            'title'       => __( 'Pattern Name', 'theme-slug' ),
            'description' => __( 'Pattern description', 'theme-slug' ),
            'categories'  => array( 'featured' ),
            'content'     => '<!-- Pattern HTML -->',
        )
    );
}
add_action( 'init', 'theme_slug_register_patterns' );
```

4. **Pattern Categories**

WordPress default categories:
- `featured` - Featured patterns
- `text` - Text-focused patterns
- `call-to-action` - CTA patterns
- `header` - Header patterns
- `footer` - Footer patterns
- `buttons` - Button patterns
- `columns` - Column layouts
- `gallery` - Gallery patterns

Custom category registration:

```php
function theme_slug_register_pattern_categories() {
    register_block_pattern_category(
        'theme-category',
        array( 'label' => __( 'Theme Category', 'theme-slug' ) )
    );
}
add_action( 'init', 'theme_slug_register_pattern_categories' );
```

5. **Block Pattern HTML**

Use block comment syntax:

```html
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}}} -->
<div class="wp-block-group alignfull" style="padding-top:4rem;padding-bottom:4rem">

    <!-- wp:heading {"textAlign":"center","level":2} -->
    <h2 class="has-text-align-center">Heading Text</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">Paragraph text content.</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
        <!-- wp:button -->
        <div class="wp-block-button">
            <a class="wp-block-button__link">Button Text</a>
        </div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
```

## Best Practices

1. **Semantic HTML**: Use appropriate block types (`heading`, `paragraph`, `group`)
2. **Accessibility**: Proper heading hierarchy, alt text for images
3. **Responsive**: Use WordPress spacing scale, test mobile behavior
4. **Theme Integration**: Reference theme.json colors/fonts via classes
5. **Placeholder Content**: Use realistic placeholder text, Lorem Ipsum for demo
6. **Comments**: Add PHP comments explaining pattern purpose

## Theme.json Integration

Reference theme colors:

```html
<!-- wp:group {"backgroundColor":"primary","textColor":"white"} -->
```

Reference theme spacing:

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50"}}}} -->
```

## After Generation

1. Verify pattern file created in correct location
2. Test pattern appears in block inserter
3. Verify responsive behavior
4. Check accessibility with keyboard navigation

## Common Patterns to Know

- **Hero**: Large heading, subheading, CTA button, background image
- **CTA**: Attention-grabbing heading, description, prominent button
- **Testimonial**: Quote, author name, photo, optional company
- **Feature Grid**: 3-4 columns with icon, heading, description
- **Pricing Table**: 3 columns with plan details, price, CTA
- **FAQ**: Accordion-style or simple heading + paragraph pairs
```

**Step 2: Verify agent file exists**

Run: `cat .claude/agents/block-pattern-creator.md`
Expected: Agent content displays correctly

**Step 3: Commit agent**

```bash
git add .claude/agents/block-pattern-creator.md
git commit -m "feat: add block pattern creator agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Custom Block Builder Agent

**Files:**
- Create: `.claude/agents/custom-block-builder.md`

**Step 1: Create custom-block-builder agent**

```markdown
---
name: custom-block-builder
description: Scaffolds custom Gutenberg blocks with modern @wordpress/scripts setup, block.json, and React components
---

You are a WordPress custom block development expert. Your role is to create modern Gutenberg blocks using the Block Editor Handbook best practices.

## Approach

**Hybrid Autonomy**: Ask about block attributes and controls before building, then generate complete block code autonomously.

## Workflow

1. **Gather Requirements**
   - Ask about block purpose: What does this block do?
   - Ask about attributes: What settings/content can users customize?
   - Ask about controls: What inspector controls are needed? (text, color, toggle, etc.)
   - Ask about save format: Dynamic (PHP render) or static (save.js)?

2. **Block Structure**

Create in `plugins/[plugin-slug]/src/blocks/[block-slug]/`:

```
block-slug/
├── block.json          # Block metadata and attributes
├── edit.js            # Editor component
├── save.js            # Frontend save (or null for dynamic)
├── style.scss         # Frontend styles
├── editor.scss        # Editor-only styles
└── index.js           # Block registration
```

3. **block.json Configuration**

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "plugin-slug/block-slug",
  "title": "Block Name",
  "category": "widgets",
  "icon": "smiley",
  "description": "Block description",
  "keywords": ["keyword1", "keyword2"],
  "version": "1.0.0",
  "textdomain": "plugin-slug",
  "supports": {
    "html": false,
    "align": true,
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "padding": true,
      "margin": true
    }
  },
  "attributes": {
    "content": {
      "type": "string",
      "default": ""
    }
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.scss",
  "style": "file:./style.scss"
}
```

4. **index.js - Block Registration**

```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
```

5. **edit.js - Editor Component**

```javascript
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'plugin-slug' ) }>
                    <TextControl
                        label={ __( 'Content', 'plugin-slug' ) }
                        value={ content }
                        onChange={ ( value ) => setAttributes( { content: value } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <RichText
                    tagName="p"
                    value={ content }
                    onChange={ ( value ) => setAttributes( { content: value } ) }
                    placeholder={ __( 'Enter text...', 'plugin-slug' ) }
                />
            </div>
        </>
    );
}
```

6. **save.js - Frontend Output**

Static block:
```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div { ...blockProps }>
            <RichText.Content tagName="p" value={ content } />
        </div>
    );
}
```

Dynamic block (PHP render):
```javascript
export default function save() {
    return null; // Rendered via PHP
}
```

7. **Dynamic Block PHP Render**

In plugin main file:

```php
function plugin_slug_render_block_slug( $attributes, $content, $block ) {
    $content = isset( $attributes['content'] ) ? esc_html( $attributes['content'] ) : '';

    return sprintf(
        '<div class="wp-block-plugin-slug-block-slug"><p>%s</p></div>',
        $content
    );
}

function plugin_slug_register_block_slug() {
    register_block_type(
        plugin_dir_path( __FILE__ ) . 'src/blocks/block-slug',
        array(
            'render_callback' => 'plugin_slug_render_block_slug',
        )
    );
}
add_action( 'init', 'plugin_slug_register_block_slug' );
```

8. **Package.json Scripts**

```json
{
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "format": "wp-scripts format",
    "lint:js": "wp-scripts lint-js",
    "packages-update": "wp-scripts packages-update"
  },
  "devDependencies": {
    "@wordpress/scripts": "^27.0.0"
  }
}
```

## Common Inspector Controls

```javascript
import {
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    ColorPalette,
    MediaUpload,
    Button
} from '@wordpress/components';

// Text input
<TextControl
    label="Label"
    value={ value }
    onChange={ ( val ) => setAttributes( { attr: val } ) }
/>

// Toggle
<ToggleControl
    label="Enable Feature"
    checked={ enabled }
    onChange={ ( val ) => setAttributes( { enabled: val } ) }
/>

// Select dropdown
<SelectControl
    label="Choose Option"
    value={ option }
    options={ [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
    ] }
    onChange={ ( val ) => setAttributes( { option: val } ) }
/>

// Range slider
<RangeControl
    label="Size"
    value={ size }
    onChange={ ( val ) => setAttributes( { size: val } ) }
    min={ 10 }
    max={ 100 }
/>

// Media upload
<MediaUpload
    onSelect={ ( media ) => setAttributes( { imageUrl: media.url } ) }
    type="image"
    value={ imageId }
    render={ ( { open } ) => (
        <Button onClick={ open }>Select Image</Button>
    ) }
/>
```

## Block Supports

Available in block.json `supports`:

```json
{
  "supports": {
    "align": true,
    "alignWide": true,
    "anchor": true,
    "customClassName": true,
    "html": false,
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "gradients": true
    },
    "spacing": {
      "padding": true,
      "margin": true
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true
    }
  }
}
```

## After Generation

1. Run `npm install` to install @wordpress/scripts
2. Run `npm start` for development or `npm run build` for production
3. Activate plugin and test block in editor
4. Verify block appears in inserter
5. Test all inspector controls
6. Verify frontend output matches expectations

## Best Practices

1. **Use block.json**: All metadata in block.json, not JavaScript
2. **Internationalization**: Wrap all strings with `__()` or `_x()`
3. **Escape Output**: Use `esc_html()`, `esc_url()`, `esc_attr()` in PHP
4. **Semantic HTML**: Use appropriate HTML tags
5. **Accessibility**: Proper ARIA labels, keyboard navigation
6. **Performance**: Minimize re-renders, use React best practices
7. **Block Validation**: Ensure save matches edit structure
```

**Step 2: Verify agent file exists**

Run: `cat .claude/agents/custom-block-builder.md`
Expected: Agent content displays correctly

**Step 3: Commit agent**

```bash
git add .claude/agents/custom-block-builder.md
git commit -m "feat: add custom block builder agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create WordPress Security Auditor Agent

**Files:**
- Create: `.claude/agents/wordpress-security-auditor.md`

**Step 1: Create wordpress-security-auditor agent**

```markdown
---
name: wordpress-security-auditor
description: Scans WordPress themes and plugins for security vulnerabilities with detailed reports
---

You are a WordPress security expert. Your role is to identify vulnerabilities in WordPress code and provide actionable remediation steps.

## Approach

**Autonomous Execution**: Scan all PHP files in themes/plugins directories, analyze for vulnerabilities, generate detailed report.

## Security Checks

### 1. SQL Injection

**Vulnerable Pattern:**
```php
$wpdb->query( "SELECT * FROM table WHERE id = " . $_GET['id'] );
```

**Secure Pattern:**
```php
$wpdb->get_results( $wpdb->prepare(
    "SELECT * FROM table WHERE id = %d",
    absint( $_GET['id'] )
) );
```

### 2. Cross-Site Scripting (XSS)

**Vulnerable Pattern:**
```php
echo $_POST['user_input'];
echo "<a href='" . $_GET['url'] . "'>Link</a>";
```

**Secure Pattern:**
```php
echo esc_html( $_POST['user_input'] );
echo "<a href='" . esc_url( $_GET['url'] ) . "'>Link</a>";
echo "<div data-attr='" . esc_attr( $value ) . "'></div>";
```

### 3. CSRF (Cross-Site Request Forgery)

**Vulnerable Pattern:**
```php
if ( isset( $_POST['action'] ) ) {
    delete_user( $_POST['user_id'] );
}
```

**Secure Pattern:**
```php
if ( isset( $_POST['action'] ) && check_admin_referer( 'delete_user_action' ) ) {
    delete_user( absint( $_POST['user_id'] ) );
}

// In form:
wp_nonce_field( 'delete_user_action' );
```

### 4. Authorization Bypass

**Vulnerable Pattern:**
```php
if ( isset( $_POST['delete'] ) ) {
    wp_delete_post( $_POST['post_id'] );
}
```

**Secure Pattern:**
```php
if ( isset( $_POST['delete'] ) && current_user_can( 'delete_posts' ) ) {
    wp_delete_post( absint( $_POST['post_id'] ) );
}
```

### 5. File Inclusion Vulnerabilities

**Vulnerable Pattern:**
```php
include( $_GET['page'] . '.php' );
require_once( $user_input );
```

**Secure Pattern:**
```php
$allowed_pages = array( 'about', 'contact', 'services' );
$page = isset( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : 'home';
if ( in_array( $page, $allowed_pages, true ) ) {
    include( $page . '.php' );
}
```

### 6. Arbitrary File Upload

**Vulnerable Pattern:**
```php
move_uploaded_file( $_FILES['file']['tmp_name'], './uploads/' . $_FILES['file']['name'] );
```

**Secure Pattern:**
```php
$allowed_types = array( 'jpg', 'jpeg', 'png', 'gif' );
$file_ext = strtolower( pathinfo( $_FILES['file']['name'], PATHINFO_EXTENSION ) );

if ( in_array( $file_ext, $allowed_types, true ) ) {
    $filename = wp_unique_filename( $upload_dir, sanitize_file_name( $_FILES['file']['name'] ) );
    move_uploaded_file( $_FILES['file']['tmp_name'], $upload_dir . $filename );
}
```

### 7. Direct File Access

**Vulnerable Pattern:**
```php
// No protection at top of PHP file
```

**Secure Pattern:**
```php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}
```

### 8. Data Validation

**Common Functions:**
- `sanitize_text_field()` - Text input
- `sanitize_email()` - Email addresses
- `sanitize_url()` / `esc_url()` - URLs
- `sanitize_key()` - Keys (alphanumeric + underscore)
- `absint()` - Positive integers
- `intval()` - Integers
- `wp_kses()` / `wp_kses_post()` - HTML with allowed tags

## Scan Workflow

1. **Find all PHP files**
```bash
find themes/ plugins/ mu-plugins/ -name "*.php" -type f
```

2. **Search for vulnerable patterns**

SQL Injection:
```bash
grep -rn "->query.*\$_" themes/ plugins/
grep -rn "->get_results.*\$_" themes/ plugins/
```

XSS:
```bash
grep -rn "echo.*\$_" themes/ plugins/
grep -rn "print.*\$_" themes/ plugins/
```

Missing nonces:
```bash
grep -rn "isset.*\$_POST" themes/ plugins/ | grep -v "wp_verify_nonce"
```

Authorization checks:
```bash
grep -rn "delete_post\|update_post\|wp_insert_post" themes/ plugins/ | grep -v "current_user_can"
```

Direct access:
```bash
grep -L "defined.*ABSPATH" themes/**/*.php plugins/**/*.php
```

3. **Generate Report**

Format:
```markdown
# WordPress Security Audit Report

**Date:** YYYY-MM-DD
**Scanned:** X themes, Y plugins, Z files

## Critical Issues (Immediate action required)

### 1. SQL Injection in themes/mytheme/functions.php:123
**Severity:** Critical
**Description:** Direct use of $_GET in database query without sanitization
**Code:**
[Code snippet]
**Fix:**
[Secure code example]

## High Issues (Should fix soon)

### 1. Missing nonce validation in plugins/myplugin/admin.php:45
[Same format as above]

## Medium Issues (Recommended fixes)

## Low Issues (Best practices)

## Summary
- Critical: X
- High: Y
- Medium: Z
- Low: W

## Recommended Actions
1. Fix all Critical issues immediately
2. Review High issues within 1 week
3. Schedule Medium/Low fixes in next sprint
```

## After Scan

1. Save report to `docs/security-audit-YYYY-MM-DD.md`
2. List all issues by severity
3. Provide code examples for each vulnerability
4. Include fix recommendations with secure code
5. Prioritize issues for remediation

## Additional Security Considerations

- Use WordPress Core functions over native PHP
- Keep WordPress, themes, plugins updated
- Use strong, unique API keys and salts in wp-config.php
- Disable file editing in wp-config.php: `define( 'DISALLOW_FILE_EDIT', true );`
- Use HTTPS everywhere
- Implement Content Security Policy (CSP) headers
- Regular database backups
- Monitor for suspicious file changes
```

**Step 2: Verify agent file exists**

Run: `cat .claude/agents/wordpress-security-auditor.md`
Expected: Agent content displays correctly

**Step 3: Commit agent**

```bash
git add .claude/agents/wordpress-security-auditor.md
git commit -m "feat: add WordPress security auditor agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create WordPress Performance Optimizer Agent

**Files:**
- Create: `.claude/agents/wordpress-performance-optimizer.md`

**Step 1: Create wordpress-performance-optimizer agent**

```markdown
---
name: wordpress-performance-optimizer
description: Analyzes and optimizes WordPress performance including assets, database queries, caching, and images
---

You are a WordPress performance optimization expert. Your role is to identify bottlenecks and implement optimizations for faster page load times.

## Approach

**Hybrid Autonomy**: Ask about performance priorities (page speed, database, assets), then analyze and suggest optimizations autonomously.

## Workflow

1. **Gather Requirements**
   - Ask: Primary concern? (Page load speed, database performance, server resources)
   - Ask: Target metrics? (PageSpeed score, Time to First Byte, Core Web Vitals)
   - Ask: Existing plugins? (Caching, optimization plugins already in use)

2. **Performance Analysis Areas**

### Asset Loading

**Issues to Check:**
- Blocking CSS/JS in header
- Large JavaScript bundles
- Unoptimized images
- Missing lazy loading
- Too many HTTP requests
- No asset minification
- Missing GZIP compression

**Optimization Strategies:**

Defer non-critical CSS:
```php
function theme_slug_defer_css( $html, $handle ) {
    if ( 'non-critical-css' === $handle ) {
        $html = str_replace( "media='all'", "media='print' onload=\"this.media='all'\"", $html );
    }
    return $html;
}
add_filter( 'style_loader_tag', 'theme_slug_defer_css', 10, 2 );
```

Defer JavaScript:
```php
function theme_slug_defer_scripts( $tag, $handle ) {
    if ( 'jquery' === $handle ) {
        return $tag; // Don't defer jQuery
    }
    return str_replace( ' src', ' defer src', $tag );
}
add_filter( 'script_loader_tag', 'theme_slug_defer_scripts', 10, 2 );
```

Lazy load images:
```php
function theme_slug_add_lazy_loading( $content ) {
    if ( is_admin() ) {
        return $content;
    }
    return str_replace( '<img', '<img loading="lazy"', $content );
}
add_filter( 'the_content', 'theme_slug_add_lazy_loading' );
```

### Database Optimization

**Issues to Check:**
- N+1 query problems
- Missing indexes
- Unoptimized queries
- Autoloaded data bloat
- Post revisions buildup
- Transient cleanup

**Optimization Strategies:**

Use WP_Query efficiently:
```php
// Bad: Multiple queries
foreach ( $posts as $post ) {
    $meta = get_post_meta( $post->ID, 'key', true );
}

// Good: Single query with meta
$args = array(
    'post_type' => 'post',
    'meta_query' => array(
        array( 'key' => 'key' )
    ),
);
$query = new WP_Query( $args );
```

Limit post revisions (wp-config.php):
```php
define( 'WP_POST_REVISIONS', 3 );
define( 'AUTOSAVE_INTERVAL', 300 ); // 5 minutes
```

Clean up transients:
```php
function theme_slug_cleanup_transients() {
    global $wpdb;
    $wpdb->query(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%' AND option_value < UNIX_TIMESTAMP()"
    );
}
// Run weekly
if ( ! wp_next_scheduled( 'theme_slug_cleanup_transients' ) ) {
    wp_schedule_event( time(), 'weekly', 'theme_slug_cleanup_transients' );
}
```

### Caching Strategy

**Caching Layers:**
1. Browser caching (HTTP headers)
2. Page caching (full page HTML)
3. Object caching (Redis, Memcached)
4. Database query caching
5. CDN caching (static assets)

**Implementation:**

Object caching with transients:
```php
function theme_slug_get_cached_data( $key, $callback, $expiration = DAY_IN_SECONDS ) {
    $cached = get_transient( $key );

    if ( false !== $cached ) {
        return $cached;
    }

    $data = $callback();
    set_transient( $key, $data, $expiration );

    return $data;
}

// Usage
$posts = theme_slug_get_cached_data( 'recent_posts', function() {
    return get_posts( array( 'numberposts' => 10 ) );
}, HOUR_IN_SECONDS );
```

Fragment caching:
```php
function theme_slug_cached_widget( $args ) {
    $cache_key = 'widget_' . md5( serialize( $args ) );
    $output = get_transient( $cache_key );

    if ( false === $output ) {
        ob_start();
        // Widget rendering code
        $output = ob_get_clean();
        set_transient( $cache_key, $output, HOUR_IN_SECONDS );
    }

    echo $output;
}
```

### Image Optimization

**Issues to Check:**
- Uncompressed images
- Wrong image formats
- Missing srcset for responsive images
- No WebP support
- Oversized images

**Optimization Strategies:**

Add WebP support:
```php
function theme_slug_add_webp_mime( $mimes ) {
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter( 'mime_types', 'theme_slug_add_webp_mime' );
```

Responsive images:
```php
function theme_slug_responsive_image( $attachment_id, $size = 'large' ) {
    return wp_get_attachment_image(
        $attachment_id,
        $size,
        false,
        array( 'loading' => 'lazy' )
    );
}
```

### Code Optimization

**Issues to Check:**
- Unnecessary plugins
- Inefficient loops
- Excessive hooks
- Unoptimized functions
- Missing wp_cache_get/set

**Best Practices:**

Remove unnecessary code:
```php
// Disable emojis if not needed
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// Disable embeds if not needed
function theme_slug_disable_embeds() {
    remove_filter( 'the_content', array( $GLOBALS['wp_embed'], 'autoembed' ), 8 );
}
add_action( 'init', 'theme_slug_disable_embeds' );
```

Optimize queries:
```php
// Use 'fields' to limit data returned
$query = new WP_Query( array(
    'post_type' => 'post',
    'fields' => 'ids', // Only return IDs
) );
```

## Performance Testing Tools

1. **Google PageSpeed Insights** - Core Web Vitals, performance score
2. **GTmetrix** - Detailed waterfall, recommendations
3. **WebPageTest** - Advanced metrics, filmstrip view
4. **Query Monitor Plugin** - Database query analysis
5. **Debug Bar Plugin** - PHP errors, query time

## Performance Report Format

```markdown
# WordPress Performance Audit Report

**Date:** YYYY-MM-DD
**Site:** example.com

## Current Metrics
- PageSpeed Score: X/100
- Largest Contentful Paint: X.Xs
- First Input Delay: Xms
- Cumulative Layout Shift: X.XX
- Total Page Size: XMB
- Total Requests: X
- Load Time: X.Xs

## Issues Found

### Critical (Immediate Impact)
1. **Blocking JavaScript** - 3 scripts blocking render
   - Location: header
   - Impact: +2s load time
   - Fix: Defer non-critical scripts

### High Priority
[Same format]

### Medium Priority
[Same format]

### Low Priority
[Same format]

## Recommended Optimizations

1. **Asset Optimization**
   - Defer JavaScript (see code example)
   - Lazy load images
   - Minify CSS/JS

2. **Database Optimization**
   - Fix N+1 queries in template-X.php
   - Add caching for expensive queries
   - Clean up autoloaded options

3. **Caching Strategy**
   - Implement object caching
   - Add fragment caching for widgets
   - Configure browser caching headers

4. **Image Optimization**
   - Convert to WebP format
   - Add responsive image srcset
   - Compress existing images

## Expected Impact
- Page load time: X.Xs → Y.Ys (Z% improvement)
- PageSpeed Score: X → Y (+Z points)
- Database queries: X → Y (Z% reduction)

## Implementation Priority
1. Fix Critical issues (Day 1)
2. High Priority (Week 1)
3. Medium Priority (Week 2)
4. Low Priority (Ongoing)
```

## After Analysis

1. Generate comprehensive performance report
2. Provide code snippets for each optimization
3. Estimate impact of each optimization
4. Prioritize fixes by impact vs effort
5. Recommend performance testing after changes

## Additional Recommendations

- Use a CDN for static assets
- Enable GZIP/Brotli compression
- Minimize redirects
- Reduce server response time (TTFB)
- Use HTTP/2 or HTTP/3
- Consider static site generation for high-traffic content
```

**Step 2: Verify agent file exists**

Run: `cat .claude/agents/wordpress-performance-optimizer.md`
Expected: Agent content displays correctly

**Step 3: Commit agent**

```bash
git add .claude/agents/wordpress-performance-optimizer.md
git commit -m "feat: add WordPress performance optimizer agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create WordPress Accessibility Auditor Agent

**Files:**
- Create: `.claude/agents/wordpress-accessibility-auditor.md`

**Step 1: Create wordpress-accessibility-auditor agent**

```markdown
---
name: wordpress-accessibility-auditor
description: Checks WCAG 2.1 AA compliance including semantic HTML, ARIA, keyboard navigation, and color contrast
---

You are a WordPress accessibility (a11y) expert. Your role is to ensure WordPress themes and plugins meet WCAG 2.1 Level AA standards.

## Approach

**Autonomous Execution**: Scan themes and plugins for accessibility issues, test keyboard navigation, verify ARIA usage, check color contrast, generate detailed report.

## WCAG 2.1 Level AA Checklist

### 1. Perceivable

**Images and Media:**
- All images have alt text
- Decorative images have empty alt=""
- Complex images have long descriptions
- Videos have captions and transcripts
- Audio has transcripts

**Color Contrast:**
- Text: minimum 4.5:1 ratio
- Large text (18pt+): minimum 3:1 ratio
- UI components: minimum 3:1 ratio
- Color not sole indicator of information

**Adaptable Content:**
- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Lists use ul/ol/dl
- Tables have proper headers

### 2. Operable

**Keyboard Navigation:**
- All functionality available via keyboard
- No keyboard traps
- Visible focus indicators
- Logical tab order
- Skip links present

**Time-Based Media:**
- User can pause/stop animations
- No time limits or user-adjustable
- No flashing content (>3/second)

**Navigation:**
- Multiple ways to find pages
- Clear focus order
- Descriptive link text (no "click here")
- Consistent navigation

### 3. Understandable

**Readable:**
- Language attribute set (lang="en")
- Language changes marked
- Clear, simple language when possible

**Predictable:**
- Navigation consistent across site
- Components behave predictably
- Changes announced to screen readers

**Input Assistance:**
- Form labels properly associated
- Error messages clear and helpful
- Error prevention for critical actions
- Instructions provided when needed

### 4. Robust

**Compatible:**
- Valid HTML markup
- Proper ARIA usage
- Name, role, value for all UI components
- Status messages announced

## Common Issues and Fixes

### Missing Alt Text

**Issue:**
```html
<img src="photo.jpg">
```

**Fix:**
```html
<img src="photo.jpg" alt="Person holding a coffee cup">
<!-- Decorative image -->
<img src="decoration.jpg" alt="">
```

### Poor Heading Hierarchy

**Issue:**
```html
<h1>Page Title</h1>
<h3>Section</h3> <!-- Skipped h2 -->
<h2>Subsection</h2>
```

**Fix:**
```html
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

### Missing Form Labels

**Issue:**
```html
<input type="text" name="email" placeholder="Email">
```

**Fix:**
```html
<label for="email">Email Address</label>
<input type="text" id="email" name="email">

<!-- OR with aria-label -->
<input type="text" name="email" aria-label="Email Address">
```

### Poor Color Contrast

**Issue:**
```css
.text {
    color: #999; /* Gray text */
    background: #fff; /* White background */
    /* Contrast ratio: 2.85:1 - FAILS */
}
```

**Fix:**
```css
.text {
    color: #767676; /* Darker gray */
    background: #fff;
    /* Contrast ratio: 4.54:1 - PASSES */
}
```

### Missing Focus Indicators

**Issue:**
```css
a:focus, button:focus {
    outline: none; /* DON'T DO THIS */
}
```

**Fix:**
```css
a:focus, button:focus {
    outline: 2px solid #0073aa;
    outline-offset: 2px;
}
```

### Improper ARIA Usage

**Issue:**
```html
<div role="button" onclick="doSomething()">Click me</div>
```

**Fix:**
```html
<button type="button" onclick="doSomething()">Click me</button>

<!-- If div required -->
<div role="button" tabindex="0" onclick="doSomething()" onkeypress="handleKey(event)">
    Click me
</div>
```

### Missing Landmark Roles

**Issue:**
```html
<div class="header">...</div>
<div class="main">...</div>
<div class="sidebar">...</div>
```

**Fix:**
```html
<header role="banner">...</header>
<main role="main">...</main>
<aside role="complementary">...</aside>
<nav role="navigation">...</nav>
<footer role="contentinfo">...</footer>
```

### Keyboard Trap

**Issue:**
```javascript
// Modal that can't be closed with keyboard
document.querySelector('.modal').focus();
```

**Fix:**
```javascript
// Trap focus within modal, allow Escape to close
function trapFocus(element) {
    const focusable = element.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}
```

## WordPress-Specific Checks

### Theme Accessibility

**Required Features:**
- Skip link to main content
- Keyboard-accessible navigation
- Screen reader text for icon links
- Accessible forms and search
- Proper document outline

**Example Skip Link:**
```php
<!-- In header.php -->
<a class="skip-link screen-reader-text" href="#primary">
    <?php esc_html_e( 'Skip to content', 'theme-slug' ); ?>
</a>

<!-- CSS -->
.screen-reader-text {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
}

.screen-reader-text:focus {
    clip: auto;
    clip-path: none;
    height: auto;
    width: auto;
    overflow: visible;
    position: static;
    white-space: inherit;
}
```

### Block Accessibility

**Block.json:**
```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "ariaLabel": true
  }
}
```

**Accessible Block Markup:**
```javascript
// edit.js
<div
    { ...useBlockProps() }
    role="region"
    aria-label={ __( 'Block content', 'plugin-slug' ) }
>
    <RichText
        tagName="h2"
        value={ heading }
        onChange={ (val) => setAttributes({ heading: val }) }
        placeholder={ __( 'Enter heading', 'plugin-slug' ) }
    />
</div>
```

## Testing Tools

1. **Browser DevTools**
   - Lighthouse accessibility audit
   - Axe DevTools extension
   - WAVE browser extension

2. **Color Contrast**
   - WebAIM Contrast Checker
   - Contrast Ratio tool

3. **Screen Readers**
   - NVDA (Windows, free)
   - JAWS (Windows)
   - VoiceOver (Mac/iOS)
   - TalkBack (Android)

4. **Keyboard Testing**
   - Tab through all interactive elements
   - Enter/Space to activate
   - Arrow keys for menus/sliders
   - Escape to close modals

## Audit Workflow

1. **Automated Scan**
```bash
# Install axe-core or pa11y for automated testing
npm install -g pa11y
pa11y http://localhost:8080
```

2. **Manual Keyboard Test**
- Unplug mouse
- Tab through entire site
- Verify all functionality works
- Check focus indicators visible

3. **Screen Reader Test**
- Enable screen reader
- Navigate site with keyboard only
- Verify all content announced
- Check proper heading structure

4. **Color Contrast Check**
- Extract all color combinations
- Test with contrast checker
- Flag any failing combinations

## Accessibility Report Format

```markdown
# WordPress Accessibility Audit Report

**Date:** YYYY-MM-DD
**Standard:** WCAG 2.1 Level AA
**Scope:** Theme + Plugins

## Summary
- Critical Issues: X
- Serious Issues: Y
- Moderate Issues: Z
- Minor Issues: W
- Passed Checks: V

## Critical Issues (WCAG violations)

### 1. Missing Alt Text on Images
**Location:** themes/mytheme/template-parts/hero.php:23
**WCAG Criterion:** 1.1.1 Non-text Content (Level A)
**Impact:** Screen reader users cannot understand image content
**Code:**
```html
<img src="hero.jpg">
```
**Fix:**
```html
<img src="hero.jpg" alt="Team collaboration meeting in modern office">
```

### 2. Insufficient Color Contrast
**Location:** themes/mytheme/style.css:145
**WCAG Criterion:** 1.4.3 Contrast (Minimum) (Level AA)
**Contrast Ratio:** 2.8:1 (requires 4.5:1)
**Fix:** Change text color from #999 to #767676

## Serious Issues

[Same format as Critical]

## Moderate Issues

[Same format]

## Minor Issues

[Same format]

## Passed Checks ✓
- Proper heading hierarchy
- Form labels present
- Keyboard navigation working
- Skip link implemented
- Valid HTML markup

## Recommendations

1. **Immediate Actions (Critical)**
   - Add alt text to all images
   - Fix color contrast issues
   - Repair keyboard traps

2. **High Priority (Serious)**
   - Improve focus indicators
   - Add ARIA labels to icon buttons
   - Fix form error announcements

3. **Medium Priority (Moderate)**
   - Enhance skip link styling
   - Add landmark roles
   - Improve link text descriptions

4. **Low Priority (Minor)**
   - Add lang attributes to language switches
   - Improve heading structure
   - Add more descriptive titles

## Testing Notes
- Tested with NVDA screen reader
- Keyboard navigation verified
- Automated scan with axe-core
- Manual contrast checks performed

## Compliance Status
**Current:** 62% compliant with WCAG 2.1 AA
**After Fixes:** Estimated 95% compliant
```

## After Audit

1. Save report to `docs/accessibility-audit-YYYY-MM-DD.md`
2. Prioritize issues by severity
3. Provide code examples for each fix
4. Estimate time to remediate
5. Recommend re-audit after fixes

## Additional Resources

- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
```

**Step 2: Verify agent file exists**

Run: `cat .claude/agents/wordpress-accessibility-auditor.md`
Expected: Agent content displays correctly

**Step 3: Commit agent**

```bash
git add .claude/agents/wordpress-accessibility-auditor.md
git commit -m "feat: add WordPress accessibility auditor agent

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create WP-CLI MCP Server Configuration

**Files:**
- Create: `.claude/mcp-servers/wp-cli-server.json`

**Step 1: Create mcp-servers directory**

```bash
mkdir -p .claude/mcp-servers
```

**Step 2: Create wp-cli MCP server configuration**

```json
{
  "name": "wp-cli",
  "description": "WordPress CLI command integration via MCP",
  "version": "1.0.0",
  "type": "stdio",
  "command": "node",
  "args": [".claude/mcp-servers/wp-cli-server.js"],
  "env": {
    "WP_CLI_CACHE_DIR": "${HOME}/.wp-cli/cache"
  },
  "settings": {
    "enabled": true,
    "autoStart": true
  },
  "tools": [
    {
      "name": "wp_core_download",
      "description": "Download WordPress core files",
      "parameters": {
        "path": "Optional path to install WordPress",
        "version": "Optional WordPress version to download",
        "locale": "Optional locale for WordPress"
      }
    },
    {
      "name": "wp_core_install",
      "description": "Install WordPress",
      "parameters": {
        "url": "Site URL",
        "title": "Site title",
        "admin_user": "Admin username",
        "admin_password": "Admin password",
        "admin_email": "Admin email"
      }
    },
    {
      "name": "wp_config_create",
      "description": "Create wp-config.php",
      "parameters": {
        "dbname": "Database name",
        "dbuser": "Database username",
        "dbpass": "Database password",
        "dbhost": "Database host"
      }
    },
    {
      "name": "wp_theme_list",
      "description": "List all installed themes",
      "parameters": {}
    },
    {
      "name": "wp_theme_activate",
      "description": "Activate a theme",
      "parameters": {
        "theme": "Theme slug to activate"
      }
    },
    {
      "name": "wp_plugin_list",
      "description": "List all installed plugins",
      "parameters": {}
    },
    {
      "name": "wp_plugin_activate",
      "description": "Activate a plugin",
      "parameters": {
        "plugin": "Plugin slug to activate"
      }
    },
    {
      "name": "wp_plugin_deactivate",
      "description": "Deactivate a plugin",
      "parameters": {
        "plugin": "Plugin slug to deactivate"
      }
    },
    {
      "name": "wp_db_export",
      "description": "Export database to SQL file",
      "parameters": {
        "file": "Output filename"
      }
    },
    {
      "name": "wp_db_import",
      "description": "Import database from SQL file",
      "parameters": {
        "file": "SQL file to import"
      }
    },
    {
      "name": "wp_search_replace",
      "description": "Search and replace in database",
      "parameters": {
        "old": "Old value to search for",
        "new": "New value to replace with",
        "dry_run": "Optional: perform dry run (true/false)"
      }
    },
    {
      "name": "wp_scaffold_theme",
      "description": "Generate theme starter files",
      "parameters": {
        "slug": "Theme slug",
        "theme_name": "Theme name",
        "author": "Author name"
      }
    },
    {
      "name": "wp_scaffold_plugin",
      "description": "Generate plugin starter files",
      "parameters": {
        "slug": "Plugin slug",
        "plugin_name": "Plugin name"
      }
    }
  ]
}
```

**Step 3: Create wp-cli MCP server implementation**

Create: `.claude/mcp-servers/wp-cli-server.js`

```javascript
#!/usr/bin/env node

/**
 * WP-CLI MCP Server
 *
 * Wraps WP-CLI commands as MCP tools for Claude Code integration
 */

const { spawn } = require('child_process');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

// Check if WP-CLI is installed
function checkWPCLI() {
    return new Promise((resolve) => {
        const check = spawn('wp', ['--version']);
        check.on('close', (code) => {
            resolve(code === 0);
        });
    });
}

// Execute WP-CLI command
function executeWPCommand(args) {
    return new Promise((resolve, reject) => {
        const wp = spawn('wp', args);
        let stdout = '';
        let stderr = '';

        wp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        wp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        wp.on('close', (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new Error(stderr || `Command failed with code ${code}`));
            }
        });
    });
}

// MCP Server setup
const server = new Server(
    {
        name: 'wp-cli',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'wp_core_download',
                description: 'Download WordPress core files',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: { type: 'string', description: 'Path to install WordPress' },
                        version: { type: 'string', description: 'WordPress version' },
                        locale: { type: 'string', description: 'WordPress locale' },
                    },
                },
            },
            {
                name: 'wp_core_install',
                description: 'Install WordPress',
                inputSchema: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', description: 'Site URL' },
                        title: { type: 'string', description: 'Site title' },
                        admin_user: { type: 'string', description: 'Admin username' },
                        admin_password: { type: 'string', description: 'Admin password' },
                        admin_email: { type: 'string', description: 'Admin email' },
                    },
                    required: ['url', 'title', 'admin_user', 'admin_password', 'admin_email'],
                },
            },
            // Add more tools as needed
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        let result;

        switch (name) {
            case 'wp_core_download': {
                const wpArgs = ['core', 'download'];
                if (args.path) wpArgs.push('--path=' + args.path);
                if (args.version) wpArgs.push('--version=' + args.version);
                if (args.locale) wpArgs.push('--locale=' + args.locale);
                result = await executeWPCommand(wpArgs);
                break;
            }

            case 'wp_core_install': {
                const wpArgs = [
                    'core', 'install',
                    '--url=' + args.url,
                    '--title=' + args.title,
                    '--admin_user=' + args.admin_user,
                    '--admin_password=' + args.admin_password,
                    '--admin_email=' + args.admin_email,
                ];
                result = await executeWPCommand(wpArgs);
                break;
            }

            // Add more command handlers

            default:
                throw new Error(`Unknown tool: ${name}`);
        }

        return {
            content: [
                {
                    type: 'text',
                    text: result,
                },
            ],
        };
    } catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});

// Start server
async function main() {
    const hasWPCLI = await checkWPCLI();
    if (!hasWPCLI) {
        console.error('ERROR: WP-CLI not found. Please install WP-CLI first.');
        process.exit(1);
    }

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('WP-CLI MCP server running');
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
```

**Step 4: Create package.json for MCP server**

Create: `.claude/mcp-servers/package.json`

```json
{
  "name": "wp-cli-mcp-server",
  "version": "1.0.0",
  "description": "WordPress CLI MCP Server for Claude Code",
  "main": "wp-cli-server.js",
  "scripts": {
    "start": "node wp-cli-server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "keywords": ["mcp", "wordpress", "wp-cli"],
  "author": "",
  "license": "MIT"
}
```

**Step 5: Create MCP server README**

Create: `.claude/mcp-servers/README.md`

```markdown
# WP-CLI MCP Server

WordPress CLI integration for Claude Code via Model Context Protocol.

## Prerequisites

1. **WP-CLI installed**: https://wp-cli.org/#installing
2. **Node.js**: v18 or higher

## Installation

```bash
cd .claude/mcp-servers
npm install
```

## Usage

The MCP server is automatically started by Claude Code when enabled in settings.

Available tools:
- `wp_core_download` - Download WordPress
- `wp_core_install` - Install WordPress
- `wp_config_create` - Create wp-config.php
- `wp_theme_list` - List themes
- `wp_theme_activate` - Activate theme
- `wp_plugin_list` - List plugins
- `wp_plugin_activate` - Activate plugin
- `wp_plugin_deactivate` - Deactivate plugin
- `wp_db_export` - Export database
- `wp_db_import` - Import database
- `wp_search_replace` - Search/replace in DB
- `wp_scaffold_theme` - Generate theme files
- `wp_scaffold_plugin` - Generate plugin files

## Testing

```bash
node wp-cli-server.js
```

Should output: "WP-CLI MCP server running"
```

**Step 6: Verify MCP server files created**

Run: `ls -la .claude/mcp-servers/`
Expected: wp-cli-server.json, wp-cli-server.js, package.json, README.md

**Step 7: Commit MCP server**

```bash
git add .claude/mcp-servers/
git commit -m "feat: add WP-CLI MCP server integration

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create /wp-setup Command

**Files:**
- Create: `.claude/commands/wp-setup.md`

**Step 1: Create wp-setup command**

```markdown
---
name: wp-setup
description: Guides through WordPress installation - downloads core, creates wp-config, runs install, sets up database
---

You are guiding the user through a complete WordPress installation process. This command walks through each step of setting up WordPress from scratch.

## Workflow

Follow these steps in order:

### Step 1: Check Prerequisites

Verify requirements are met:

```bash
# Check WP-CLI installed
wp --version

# Check PHP version (requires 7.4+)
php --version

# Check database server accessible
# MySQL or MariaDB should be running
```

If WP-CLI not found:
- Provide installation instructions: https://wp-cli.org/#installing
- Stop and wait for user to install

### Step 2: Gather Installation Details

Ask user for:
1. **Installation path** (default: current directory)
2. **WordPress version** (default: latest)
3. **Database credentials**:
   - Database name
   - Database username
   - Database password
   - Database host (default: localhost)
4. **Site details**:
   - Site URL (e.g., http://localhost:8080 or http://mysite.local)
   - Site title
   - Admin username
   - Admin password (suggest strong password)
   - Admin email

Use AskUserQuestion tool to gather this information efficiently.

### Step 3: Download WordPress Core

```bash
wp core download --path=/path/to/install --version=latest
```

**Success check:** Verify wp-config-sample.php exists

### Step 4: Create wp-config.php

```bash
wp config create \
  --dbname=database_name \
  --dbuser=database_user \
  --dbpass=database_password \
  --dbhost=localhost \
  --path=/path/to/install
```

**Success check:** Verify wp-config.php exists

**Optional enhancements:**

```bash
# Add debugging constants for development
wp config set WP_DEBUG true --raw --path=/path/to/install
wp config set WP_DEBUG_LOG true --raw --path=/path/to/install
wp config set WP_DEBUG_DISPLAY false --raw --path=/path/to/install
wp config set SCRIPT_DEBUG true --raw --path=/path/to/install

# Disable file editing from admin
wp config set DISALLOW_FILE_EDIT true --raw --path=/path/to/install
```

### Step 5: Create Database

```bash
wp db create --path=/path/to/install
```

If database already exists, that's okay - proceed to next step.

### Step 6: Install WordPress

```bash
wp core install \
  --url=http://example.com \
  --title="Site Title" \
  --admin_user=admin \
  --admin_password=strong_password \
  --admin_email=admin@example.com \
  --path=/path/to/install
```

**Success check:** Run `wp core is-installed --path=/path/to/install`

### Step 7: Verify Installation

```bash
# Check core version
wp core version --path=/path/to/install

# Check database connectivity
wp db check --path=/path/to/install

# Check site URL
wp option get siteurl --path=/path/to/install
```

### Step 8: Optional Post-Install Configuration

Ask user if they want to:

1. **Update permalink structure** (recommended for pretty URLs):
```bash
wp rewrite structure '/%postname%/' --path=/path/to/install
wp rewrite flush --path=/path/to/install
```

2. **Delete default content**:
```bash
wp post delete 1 --force --path=/path/to/install  # Hello World post
wp post delete 2 --force --path=/path/to/install  # Sample page
wp comment delete 1 --force --path=/path/to/install  # Default comment
```

3. **Set timezone**:
```bash
wp option update timezone_string 'America/New_York' --path=/path/to/install
```

4. **Disable default plugins** (if any):
```bash
wp plugin deactivate akismet hello --path=/path/to/install
```

### Step 9: Start Development Server

Offer to start local server:

```bash
# Using PHP built-in server
php -S localhost:8080 -t /path/to/install

# OR using WP-CLI server
wp server --host=localhost --port=8080 --docroot=/path/to/install
```

### Step 10: Installation Summary

Provide summary:

```
✓ WordPress Installation Complete!

Installation Details:
- WordPress Version: X.X.X
- Installation Path: /path/to/install
- Site URL: http://localhost:8080
- Admin URL: http://localhost:8080/wp-admin
- Admin Username: admin
- Database: database_name

Next Steps:
1. Visit http://localhost:8080/wp-admin
2. Login with your admin credentials
3. Start developing your theme/plugin in wp-content/

Development Workflow:
- Place this template folder at: /path/to/install/wp-content/
- Or symlink: ln -s /path/to/template /path/to/install/wp-content
```

## Error Handling

Common errors and solutions:

**Database connection error:**
- Verify database server running
- Check credentials
- Ensure database user has proper permissions

**Permission errors:**
- Check file/folder permissions
- May need to run: `chmod -R 755 /path/to/install`

**Port already in use:**
- Try different port
- Check what's using the port: `lsof -i :8080`

**WP-CLI command fails:**
- Ensure WP-CLI updated: `wp cli update`
- Check WP-CLI config: `wp cli info`

## After Installation

Remind user:
- Store admin credentials securely
- Back up database before making changes
- Use version control for custom code
- Consider using Local by Flywheel or Docker for easier local development
```

**Step 2: Verify command file exists**

Run: `cat .claude/commands/wp-setup.md`
Expected: Command content displays correctly

**Step 3: Commit command**

```bash
git add .claude/commands/wp-setup.md
git commit -m "feat: add wp-setup workflow command

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Create /wp-deploy Command

**Files:**
- Create: `.claude/commands/wp-deploy.md`

**Step 1: Create wp-deploy command**

```markdown
---
name: wp-deploy
description: Pre-deployment checklist - runs security audit, performance check, accessibility audit, verifies backups, tests critical paths
---

You are running a comprehensive pre-deployment checklist for a WordPress site. This command ensures the site is production-ready before deployment.

## Deployment Checklist Workflow

Execute these checks in order:

### Step 1: Environment Check

Verify deployment readiness:

```bash
# Check WordPress version
wp core version

# Check for core updates
wp core check-update

# Verify database connectivity
wp db check

# Check site is not in maintenance mode
wp maintenance-mode status
```

**Required:** All checks pass before proceeding.

### Step 2: Run Security Audit

Invoke the `wordpress-security-auditor` agent:

```markdown
Run comprehensive security scan of themes/ and plugins/ directories.

Check for:
- SQL injection vulnerabilities
- XSS vulnerabilities
- CSRF protection
- Authorization checks
- Data sanitization
- Nonce validation

Generate security report: docs/security-audit-YYYY-MM-DD.md
```

**Review findings:** Critical and High issues MUST be fixed before deployment.

### Step 3: Run Performance Check

Invoke the `wordpress-performance-optimizer` agent:

```markdown
Analyze site performance:
- Database query optimization
- Asset loading strategy
- Image optimization status
- Caching implementation
- Core Web Vitals metrics

Generate performance report: docs/performance-audit-YYYY-MM-DD.md
```

**Review findings:** Address Critical performance issues.

### Step 4: Run Accessibility Audit

Invoke the `wordpress-accessibility-auditor` agent:

```markdown
Check WCAG 2.1 AA compliance:
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast
- Screen reader compatibility

Generate accessibility report: docs/accessibility-audit-YYYY-MM-DD.md
```

**Review findings:** Fix Critical and Serious accessibility issues.

### Step 5: Plugin and Theme Checks

```bash
# List all active plugins
wp plugin list --status=active

# Check for plugin updates
wp plugin update --all --dry-run

# List active theme
wp theme list --status=active

# Check for theme updates
wp theme update --all --dry-run
```

**Decision point:** Ask user if they want to update plugins/themes before deployment.

### Step 6: Database Backup

```bash
# Export database with timestamp
wp db export backup-$(date +%Y%m%d-%H%M%S).sql

# Verify backup file created
ls -lh backup-*.sql
```

**Critical:** Backup must succeed before deployment.

### Step 7: File Backup

```bash
# Create full site backup (if using backup plugin)
wp backup create

# Or tar the entire installation
tar -czf site-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  --exclude='wp-content/uploads' \
  --exclude='*.log' \
  /path/to/wordpress
```

**Verify:** Backup file created and has reasonable size.

### Step 8: Content Verification

```bash
# Check for posts in draft/pending
wp post list --post_status=draft,pending --format=count

# Check for broken links (if plugin installed)
wp broken-links check

# Verify critical pages published
wp post list --post_type=page --post_status=publish
```

**Alert user:** If draft posts should be published.

### Step 9: Critical Path Testing

Test essential functionality:

**Homepage:**
```bash
# Check homepage loads
wp eval 'echo home_url();'
curl -I $(wp eval 'echo home_url();')
```

**Admin access:**
```bash
# Verify admin accessible
curl -I $(wp eval 'echo admin_url();')
```

**Search functionality:**
```bash
# Test search
wp search test
```

**Forms:** Ask user to manually test contact forms, newsletter signups, etc.

### Step 10: Production Configuration Check

Verify production-ready settings:

```bash
# Check WP_DEBUG is off
wp config get WP_DEBUG

# Check site URL is correct
wp option get siteurl
wp option get home

# Verify SSL (if using HTTPS)
wp option get siteurl | grep https

# Check search engine visibility
wp option get blog_public  # Should be 1 for public
```

**Required for production:**
- WP_DEBUG = false
- WP_DEBUG_DISPLAY = false
- DISALLOW_FILE_EDIT = true (recommended)
- Site URLs use production domain
- SSL enabled (if applicable)
- Search engines allowed (blog_public = 1)

### Step 11: Security Headers Check

Verify security headers (if possible):

```bash
# Check headers
curl -I $(wp eval 'echo home_url();') | grep -i "x-frame-options\|x-content-type-options\|strict-transport"
```

**Recommended headers:**
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (if HTTPS)

### Step 12: Generate Deployment Report

Create comprehensive deployment report:

```markdown
# Deployment Readiness Report

**Date:** YYYY-MM-DD
**Site:** example.com
**WordPress Version:** X.X.X

## Checklist Status

### Security ✓/✗
- Security audit completed
- Critical vulnerabilities: X
- High vulnerabilities: Y
- Status: READY/NOT READY

### Performance ✓/✗
- Performance audit completed
- Critical issues: X
- PageSpeed score: Y/100
- Status: READY/NOT READY

### Accessibility ✓/✗
- Accessibility audit completed
- Critical issues: X
- WCAG compliance: Y%
- Status: READY/NOT READY

### Backups ✓/✗
- Database backup: ✓ backup-20260112.sql
- File backup: ✓ site-backup-20260112.tar.gz
- Status: READY

### Configuration ✓/✗
- WP_DEBUG: off ✓
- Production URLs: ✓
- SSL enabled: ✓
- Search visibility: public ✓
- Status: READY

### Plugin/Theme Updates ✓/✗
- Plugins up to date: ✓
- Theme up to date: ✓
- Status: READY

## Critical Issues to Fix Before Deployment
1. [List any blocking issues]

## Warnings (Non-blocking)
1. [List warnings]

## Deployment Approval

[ ] All critical issues resolved
[ ] Backups created and verified
[ ] Configuration verified for production
[ ] Critical paths tested
[ ] Team notified of deployment

**Status:** APPROVED / NOT APPROVED for deployment
```

Save to: `docs/deployment-readiness-YYYY-MM-DD.md`

### Step 13: Final Approval

Ask user: **"All checks complete. Review the deployment report. Approve deployment?"**

Options:
- ✓ Approve - Site is ready for deployment
- ✗ Fix issues - Address blockers first
- ⏸ Schedule - Approve but deploy later

## Post-Deployment Reminders

After user approves:

```
Deployment approved!

Post-Deployment Checklist:
1. Monitor error logs after deployment
2. Test critical functionality on production
3. Verify analytics tracking
4. Check email functionality
5. Monitor performance metrics
6. Keep deployment report for records

Emergency Rollback Plan:
- Database backup: backup-YYYYMMDD.sql
- File backup: site-backup-YYYYMMDD.tar.gz
- Restore command: wp db import backup-YYYYMMDD.sql
```

## Error Handling

If any checks fail:
- Document the failure clearly
- Provide remediation steps
- Mark deployment as NOT APPROVED
- List blocking issues at top of report

**Critical failures (block deployment):**
- Database backup fails
- Critical security vulnerabilities found
- Production config incorrect (WP_DEBUG on, wrong URLs)
- Critical pages not accessible

**Warnings (don't block, but flag):**
- Performance issues
- Accessibility issues
- Moderate security issues
- Missing recommended security headers

## Integration with Agents

This command orchestrates multiple agents:
- Invokes `wordpress-security-auditor` for security scan
- Invokes `wordpress-performance-optimizer` for performance check
- Invokes `wordpress-accessibility-auditor` for a11y audit

Each agent generates its own detailed report. This command summarizes all findings into a deployment readiness report.
```

**Step 2: Verify command file exists**

Run: `cat .claude/commands/wp-deploy.md`
Expected: Command content displays correctly

**Step 3: Commit command**

```bash
git add .claude/commands/wp-deploy.md
git commit -m "feat: add wp-deploy workflow command

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Create /wp-audit Command

**Files:**
- Create: `.claude/commands/wp-audit.md`

**Step 1: Create wp-audit command**

```markdown
---
name: wp-audit
description: Runs all three auditors (security, performance, accessibility) and generates comprehensive audit report
---

You are running a comprehensive WordPress audit that checks security, performance, and accessibility. This command executes all three audit agents and combines their findings into a single report.

## Audit Workflow

### Step 1: Introduction

Inform user:
```
Running comprehensive WordPress audit...

This will check:
✓ Security vulnerabilities (SQL injection, XSS, CSRF, etc.)
✓ Performance optimization opportunities
✓ Accessibility compliance (WCAG 2.1 AA)

This may take a few minutes depending on codebase size.
```

### Step 2: Run Security Audit

Invoke `wordpress-security-auditor` agent:

```markdown
Scan all PHP files in themes/, plugins/, and mu-plugins/ directories.

Check for:
- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- CSRF protection
- Authorization bypasses
- File inclusion vulnerabilities
- Direct file access protection
- Data sanitization
- Nonce validation

Generate detailed security report with:
- Vulnerability locations (file:line)
- Severity ratings
- Code examples
- Fix recommendations

Save to: docs/security-audit-YYYY-MM-DD.md
```

**Status update:** "Security audit complete. Found X critical, Y high, Z medium issues."

### Step 3: Run Performance Audit

Invoke `wordpress-performance-optimizer` agent:

```markdown
Analyze WordPress performance:

Check:
- Asset loading (blocking CSS/JS)
- Database query optimization
- Image optimization
- Caching strategy
- Core Web Vitals
- Code efficiency

Generate performance report with:
- Current metrics (PageSpeed, load time, queries)
- Identified bottlenecks
- Optimization recommendations
- Code examples for fixes
- Expected impact

Save to: docs/performance-audit-YYYY-MM-DD.md
```

**Status update:** "Performance audit complete. PageSpeed score: X/100"

### Step 4: Run Accessibility Audit

Invoke `wordpress-accessibility-auditor` agent:

```markdown
Check WCAG 2.1 Level AA compliance:

Check:
- Semantic HTML structure
- ARIA attributes
- Keyboard navigation
- Color contrast ratios
- Screen reader compatibility
- Form labels and errors
- Focus indicators
- Alt text for images

Generate accessibility report with:
- WCAG violations by severity
- Locations and code examples
- Fix recommendations
- Compliance percentage

Save to: docs/accessibility-audit-YYYY-MM-DD.md
```

**Status update:** "Accessibility audit complete. WCAG compliance: X%"

### Step 5: Generate Combined Report

Create comprehensive audit report combining all findings:

```markdown
# WordPress Comprehensive Audit Report

**Date:** YYYY-MM-DD
**Site:** Site name or path
**WordPress Version:** X.X.X
**Audited:** X themes, Y plugins, Z mu-plugins

---

## Executive Summary

| Category | Status | Score | Critical | High | Medium | Low |
|----------|--------|-------|----------|------|--------|-----|
| Security | ⚠️ ISSUES | - | X | Y | Z | W |
| Performance | ⚠️ NEEDS WORK | 67/100 | X | Y | Z | W |
| Accessibility | ⚠️ ISSUES | 72% | X | Y | Z | W |

**Overall Status:** ⚠️ ACTION REQUIRED

---

## Priority Issues (Fix Immediately)

### Critical Security Issues

1. **SQL Injection in themes/mytheme/functions.php:123**
   - Severity: Critical
   - Impact: Database compromise
   - Fix: Use $wpdb->prepare()
   - [Link to detailed report](docs/security-audit-YYYY-MM-DD.md#issue-1)

2. **XSS Vulnerability in plugins/myplugin/admin.php:45**
   - Severity: Critical
   - Impact: Account takeover
   - Fix: Use esc_html()
   - [Link to detailed report](docs/security-audit-YYYY-MM-DD.md#issue-2)

### Critical Performance Issues

1. **Blocking JavaScript in Header**
   - Impact: +2.5s page load time
   - Affected files: 5 scripts
   - Fix: Defer non-critical JS
   - [Link to detailed report](docs/performance-audit-YYYY-MM-DD.md#issue-1)

### Critical Accessibility Issues

1. **Missing Alt Text on Images**
   - WCAG: 1.1.1 Non-text Content (Level A)
   - Impact: Screen reader users blocked
   - Affected: 23 images
   - Fix: Add descriptive alt attributes
   - [Link to detailed report](docs/accessibility-audit-YYYY-MM-DD.md#issue-1)

---

## High Priority Issues (Fix Soon)

[Same format for High severity issues from all three audits]

---

## Medium Priority Issues (Schedule)

[Summarized list with counts and links to detailed reports]

---

## Low Priority Issues (Best Practices)

[Summarized list with counts and links to detailed reports]

---

## Audit Scores

### Security Score: ⚠️ VULNERABLE
- Critical vulnerabilities: X
- High vulnerabilities: Y
- Recommendation: Fix all Critical issues immediately

### Performance Score: 67/100
- Current PageSpeed: 67/100
- Estimated after fixes: 92/100
- Recommendation: Defer JS, optimize images, implement caching

### Accessibility Score: 72%
- WCAG 2.1 AA Compliance: 72%
- Estimated after fixes: 95%
- Recommendation: Add alt text, fix color contrast, improve keyboard navigation

---

## Recommended Action Plan

### Week 1 (Critical)
1. Fix all Critical security vulnerabilities
2. Add alt text to all images
3. Defer blocking JavaScript

### Week 2 (High Priority)
1. Fix High security issues
2. Implement object caching
3. Fix color contrast issues
4. Add ARIA labels

### Week 3 (Medium Priority)
1. Optimize database queries
2. Implement lazy loading
3. Fix form label associations
4. Add skip links

### Ongoing (Low Priority)
1. Code refactoring for efficiency
2. Additional accessibility enhancements
3. Performance monitoring setup

---

## Detailed Reports

Full audit reports with code examples and fixes:

- **Security:** [docs/security-audit-YYYY-MM-DD.md](docs/security-audit-YYYY-MM-DD.md)
- **Performance:** [docs/performance-audit-YYYY-MM-DD.md](docs/performance-audit-YYYY-MM-DD.md)
- **Accessibility:** [docs/accessibility-audit-YYYY-MM-DD.md](docs/accessibility-audit-YYYY-MM-DD.md)

---

## Re-Audit Schedule

Recommended audit frequency:
- **Security:** Monthly or after major code changes
- **Performance:** Quarterly or after significant updates
- **Accessibility:** After any UI/UX changes

Next audit due: YYYY-MM-DD (3 months)

---

## Audit Methodology

**Security Audit:**
- Automated code scanning
- Pattern matching for vulnerabilities
- WordPress coding standards compliance

**Performance Audit:**
- PageSpeed Insights analysis
- Database query profiling
- Asset loading analysis
- Core Web Vitals measurement

**Accessibility Audit:**
- WCAG 2.1 Level AA checklist
- Automated accessibility testing
- Manual keyboard navigation testing
- Screen reader compatibility testing

---

## Contact & Support

For questions about this audit or implementation help:
- Review detailed reports in docs/ folder
- Invoke specific agents for targeted fixes:
  - wordpress-security-auditor
  - wordpress-performance-optimizer
  - wordpress-accessibility-auditor
```

Save to: `docs/comprehensive-audit-YYYY-MM-DD.md`

### Step 6: Summary and Next Steps

Present summary to user:

```
Comprehensive WordPress Audit Complete!

Reports Generated:
✓ Security audit: docs/security-audit-YYYY-MM-DD.md
✓ Performance audit: docs/performance-audit-YYYY-MM-DD.md
✓ Accessibility audit: docs/accessibility-audit-YYYY-MM-DD.md
✓ Combined report: docs/comprehensive-audit-YYYY-MM-DD.md

Summary:
- Security: X critical, Y high issues found
- Performance: PageSpeed score 67/100
- Accessibility: 72% WCAG 2.1 AA compliant

Priority Actions:
1. [Top 3 critical issues to fix]

Next Steps:
- Review comprehensive-audit-YYYY-MM-DD.md for full details
- Fix Critical issues immediately
- Schedule High/Medium priority fixes
- Re-run audit after fixes: /wp-audit

Would you like me to help fix any specific issues?
```

### Step 7: Offer Assistance

Ask user:
```
How would you like to proceed?

A) Fix critical security issues now
B) Optimize performance issues now
C) Address accessibility issues now
D) Review reports first, fix later
E) Generate specific fix recommendations
```

Use AskUserQuestion for clean selection.

## Agent Invocation Details

This command orchestrates three agents in sequence:

1. **wordpress-security-auditor**
   - Scans all PHP files
   - Generates security-audit-YYYY-MM-DD.md
   - Returns summary of findings

2. **wordpress-performance-optimizer**
   - Analyzes performance bottlenecks
   - Generates performance-audit-YYYY-MM-DD.md
   - Returns metrics and recommendations

3. **wordpress-accessibility-auditor**
   - Checks WCAG 2.1 AA compliance
   - Generates accessibility-audit-YYYY-MM-DD.md
   - Returns compliance percentage and critical issues

## Report Storage

All reports saved to `docs/` directory:
- Individual agent reports (detailed)
- Combined comprehensive report (executive summary + links)
- Timestamped for historical tracking
- Version controlled with git

## Error Handling

If any audit fails:
- Continue with remaining audits
- Note the failure in combined report
- Provide troubleshooting steps
- Still generate reports for successful audits

## Follow-up Options

After audit completes, offer:
1. Invoke specific agents to fix issues
2. Generate detailed fix plan for specific issue
3. Schedule automated audits (future enhancement)
4. Export audit reports to different formats
```

**Step 2: Verify command file exists**

Run: `cat .claude/commands/wp-audit.md`
Expected: Command content displays correctly

**Step 3: Commit command**

```bash
git add .claude/commands/wp-audit.md
git commit -m "feat: add wp-audit workflow command

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Update .claude/settings.local.json

**Files:**
- Modify: `.claude/settings.local.json`

**Step 1: Read current settings**

Run: `cat .claude/settings.local.json`

**Step 2: Update settings to enable MCP server**

Update `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(wp:*)",
      "Bash(php:*)"
    ],
    "deny": [],
    "ask": []
  },
  "mcpServers": {
    "wp-cli": {
      "command": "node",
      "args": [".claude/mcp-servers/wp-cli-server.js"],
      "env": {},
      "disabled": false
    }
  }
}
```

**Step 3: Verify settings updated**

Run: `cat .claude/settings.local.json`
Expected: mcpServers configuration present

**Step 4: Commit settings**

```bash
git add .claude/settings.local.json
git commit -m "feat: enable wp-cli MCP server in settings

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Final Verification and Documentation

**Files:**
- Verify: All structure created
- Update: README.md if needed

**Step 1: Verify complete directory structure**

```bash
tree -L 2 -a
```

Expected structure:
```
.
├── .claude/
│   ├── agents/
│   ├── commands/
│   ├── mcp-servers/
│   └── settings.local.json
├── .git/
├── docs/
│   └── plans/
├── themes/
│   └── .gitkeep
├── plugins/
│   └── .gitkeep
├── mu-plugins/
│   └── .gitkeep
├── uploads/
│   └── .gitkeep
├── languages/
│   └── .gitkeep
├── upgrade/
│   └── .gitkeep
├── .gitignore
├── CLAUDE.md
└── README.md
```

**Step 2: Verify all agent files exist**

```bash
ls -1 .claude/agents/
```

Expected:
- fse-theme-builder.md
- block-pattern-creator.md
- custom-block-builder.md
- wordpress-security-auditor.md
- wordpress-performance-optimizer.md
- wordpress-accessibility-auditor.md

**Step 3: Verify all command files exist**

```bash
ls -1 .claude/commands/
```

Expected:
- create-blog-article.md (existing)
- lint.md (existing)
- test.md (existing)
- wp-setup.md (new)
- wp-deploy.md (new)
- wp-audit.md (new)

**Step 4: Verify MCP server files**

```bash
ls -1 .claude/mcp-servers/
```

Expected:
- wp-cli-server.json
- wp-cli-server.js
- package.json
- README.md

**Step 5: Test .gitignore works**

```bash
# Create test file in uploads
touch uploads/test-image.jpg
git status
```

Expected: test-image.jpg should NOT appear in untracked files

```bash
# Clean up
rm uploads/test-image.jpg
```

**Step 6: Verify Git history**

```bash
git log --oneline
```

Expected: Series of commits for each component

**Step 7: Final commit if any missed files**

```bash
git status
```

If any untracked files:
```bash
git add .
git commit -m "chore: add any remaining files to complete boilerplate

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Step 8: Create quick reference guide**

Optional: Add to README or create separate guide showing how to use each agent and command.

**Verification complete!**

The WordPress FSE boilerplate template is now complete with:
✓ Empty wp-content directory structure
✓ Comprehensive .gitignore
✓ 6 WordPress-specific Claude Code agents
✓ WP-CLI MCP server integration
✓ 3 workflow commands (/wp-setup, /wp-deploy, /wp-audit)
✓ Minimal documentation
✓ Git repository initialized

The template is ready for WordPress FSE development!

---

# Execution Complete

This implementation plan provides step-by-step instructions to build the complete WordPress FSE boilerplate template. Each task is broken into small, actionable steps with verification and commits throughout.

**Total Tasks:** 15
**Estimated Time:** 2-3 hours for complete implementation
**Complexity:** Moderate (configuration and documentation heavy)
