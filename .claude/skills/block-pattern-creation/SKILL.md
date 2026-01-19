---
name: block-pattern-creation
description: Use when creating WordPress block patterns, registering patterns, organizing pattern categories, or building reusable UI components with blocks. Keywords: block patterns, register_block_pattern, pattern category, InnerBlocks, WordPress patterns, reusable blocks
---

# Block Pattern Creation

## Overview

Block patterns are pre-configured arrangements of blocks that users can insert as a starting point. Patterns enable rapid page building while maintaining design consistency and best practices.

**Core Principle:** Patterns are registered code (PHP or block.json), composed of block markup, with metadata for discovery. They must be accessible, flexible through InnerBlocks, and use theme.json tokens.

## When to Use

Use this skill when:
- Creating reusable UI components (hero sections, CTAs, testimonials)
- Registering block patterns in a theme or plugin
- Organizing patterns into categories
- Building flexible patterns with InnerBlocks
- Creating pattern transformations
- Making patterns discoverable with keywords

**Symptoms that trigger this skill:**
- "create pattern"
- "register pattern"
- "block pattern"
- "pattern category"
- "reusable section"
- "hero pattern"
- "CTA pattern"

When NOT to use:
- Creating individual blocks (use block development instead)
- Simple template modifications (use fse-block-theme-development)
- Reusable blocks (user-created, not registered patterns)

## Pattern Registration Methods

### Method 1: PHP Registration (Recommended for Themes)

**File:** `patterns/hero.php`

```php
<?php
/**
 * Title: Hero Section
 * Slug: mytheme/hero
 * Categories: featured
 * Keywords: hero, banner, header, call to action
 * Description: A prominent hero section with heading, description, and call-to-action button.
 * Viewport Width: 1200
 */
?>

<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero-bg.jpg","dimRatio":50,"overlayColor":"primary","align":"full"} -->
<div class="wp-block-cover alignfull">
    <span aria-hidden="true" class="wp-block-cover__background has-primary-background-color has-background-dim"></span>
    <img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero-bg.jpg" data-object-fit="cover"/>

    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
        <div class="wp-block-group">
            <!-- wp:heading {"textAlign":"center","level":1,"fontSize":"x-large"} -->
            <h1 class="has-text-align-center has-x-large-font-size">Welcome to Our Site</h1>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"align":"center"} -->
            <p class="has-text-align-center">Discover amazing content and transform your digital presence with our innovative solutions.</p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
            <div class="wp-block-buttons">
                <!-- wp:button {"backgroundColor":"secondary"} -->
                <div class="wp-block-button">
                    <a class="wp-block-button__link has-secondary-background-color has-background wp-element-button">Get Started</a>
                </div>
                <!-- /wp:button -->
            </div>
            <!-- /wp:buttons -->
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->
```

**File:** `functions.php`

```php
<?php
/**
 * Register block patterns
 */
function mytheme_register_patterns() {
    // Auto-register patterns from patterns/ directory
    // WordPress 6.0+ automatically loads PHP files from patterns/ directory
    // No additional code needed for basic registration

    // Optional: Register pattern categories
    register_block_pattern_category(
        'mytheme-featured',
        array(
            'label' => __( 'Featured', 'mytheme' ),
            'description' => __( 'Featured content patterns', 'mytheme' ),
        )
    );
}
add_action( 'init', 'mytheme_register_patterns' );
```

### Method 2: Manual PHP Registration

**For more control over registration:**

```php
<?php
function mytheme_register_hero_pattern() {
    register_block_pattern(
        'mytheme/hero',
        array(
            'title'       => __( 'Hero Section', 'mytheme' ),
            'description' => __( 'A prominent hero section with heading and CTA.', 'mytheme' ),
            'categories'  => array( 'featured', 'call-to-action' ),
            'keywords'    => array( 'hero', 'banner', 'header', 'cta' ),
            'viewportWidth' => 1200,
            'content'     => '<!-- Pattern markup here -->',
        )
    );
}
add_action( 'init', 'mytheme_register_hero_pattern' );
?>
```

### Method 3: block.json Registration (Plugins)

**File:** `patterns/hero/block.json`

```json
{
    "name": "myplugin/hero",
    "title": "Hero Section",
    "description": "A prominent hero section with heading and CTA.",
    "categories": ["featured"],
    "keywords": ["hero", "banner", "header"],
    "viewportWidth": 1200,
    "content": "<!-- Pattern markup in separate file -->"
}
```

## Quick Reference

### Pattern Header Fields (PHP Method)

| Field | Required | Purpose | Example |
|-------|----------|---------|---------|
| Title | Yes | Display name in inserter | `Hero Section` |
| Slug | Yes | Unique identifier | `mytheme/hero` |
| Categories | No | Organize in inserter | `featured, call-to-action` |
| Keywords | No | Search terms | `hero, banner, cta` |
| Description | No | Explains purpose | `A prominent hero section...` |
| Viewport Width | No | Preview width | `1200` |
| Block Types | No | Suggest for specific blocks | `core/post-content` |
| Inserter | No | Show/hide in inserter | `true` (default) |
| Post Types | No | Limit to post types | `page, post` |

### Common Pattern Categories

| Category | Use For |
|----------|---------|
| `featured` | Hero sections, prominent content |
| `call-to-action` | CTA buttons, conversion-focused sections |
| `text` | Text-heavy layouts, article sections |
| `columns` | Multi-column layouts |
| `gallery` | Image galleries, portfolios |
| `header` | Header sections |
| `footer` | Footer sections |
| `query` | Post query loops |
| `testimonials` | Customer testimonials, reviews |

## Implementation Patterns

### Pattern 1: Flexible Hero with InnerBlocks

**Allows users to customize content:**

```php
<?php
/**
 * Title: Flexible Hero Section
 * Slug: mytheme/hero-flexible
 * Categories: featured
 * Keywords: hero, customizable, flexible
 */
?>

<!-- wp:cover {"dimRatio":50,"overlayColor":"primary","align":"full","className":"hero-pattern"} -->
<div class="wp-block-cover alignfull hero-pattern">
    <span aria-hidden="true" class="wp-block-cover__background has-primary-background-color has-background-dim"></span>

    <div class="wp-block-cover__inner-container">
        <!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
        <div class="wp-block-group">
            <!-- wp:heading {"textAlign":"center","level":1,"placeholder":"Add your heading..."} -->
            <h1 class="has-text-align-center">Your Heading Here</h1>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"align":"center","placeholder":"Add your description..."} -->
            <p class="has-text-align-center">Add your description here.</p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
            <div class="wp-block-buttons">
                <!-- wp:button -->
                <div class="wp-block-button">
                    <a class="wp-block-button__link wp-element-button">Button Text</a>
                </div>
                <!-- /wp:button -->
            </div>
            <!-- /wp:buttons -->
        </div>
        <!-- /wp:group -->
    </div>
</div>
<!-- /wp:cover -->
```

### Pattern 2: Two Column Feature Section

```php
<?php
/**
 * Title: Two Column Features
 * Slug: mytheme/features-two-column
 * Categories: columns, featured
 * Keywords: features, columns, benefits
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--large)","bottom":"var(--wp--preset--spacing--large)"}}},"backgroundColor":"background"} -->
<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:var(--wp--preset--spacing--large);padding-bottom:var(--wp--preset--spacing--large)">

    <!-- wp:heading {"textAlign":"center","level":2} -->
    <h2 class="has-text-align-center">Our Features</h2>
    <!-- /wp:heading -->

    <!-- wp:columns {"align":"wide"} -->
    <div class="wp-block-columns alignwide">
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
            <figure class="wp-block-image size-large">
                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/feature-1.jpg" alt=""/>
            </figure>
            <!-- /wp:image -->

            <!-- wp:heading {"level":3} -->
            <h3>Feature One</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p>Description of your first amazing feature goes here.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
            <figure class="wp-block-image size-large">
                <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/feature-2.jpg" alt=""/>
            </figure>
            <!-- /wp:image -->

            <!-- wp:heading {"level":3} -->
            <h3>Feature Two</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p>Description of your second amazing feature goes here.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
```

### Pattern 3: Testimonial with Quote

```php
<?php
/**
 * Title: Testimonial Quote
 * Slug: mytheme/testimonial
 * Categories: testimonials, text
 * Keywords: testimonial, quote, review
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--medium)","bottom":"var(--wp--preset--spacing--medium)","left":"var(--wp--preset--spacing--medium)","right":"var(--wp--preset--spacing--medium)"}},"border":{"left":{"color":"var(--wp--preset--color--primary)","width":"4px"}}},"backgroundColor":"background"} -->
<div class="wp-block-group has-background-background-color has-background" style="border-left-color:var(--wp--preset--color--primary);border-left-width:4px;padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--medium)">

    <!-- wp:quote {"className":"is-style-plain"} -->
    <blockquote class="wp-block-quote is-style-plain">
        <!-- wp:paragraph {"fontSize":"large"} -->
        <p class="has-large-font-size">"This product completely transformed how we work. Highly recommended!"</p>
        <!-- /wp:paragraph -->
        <cite>Jane Doe, CEO of Example Corp</cite>
    </blockquote>
    <!-- /wp:quote -->
</div>
<!-- /wp:group -->
```

### Pattern 4: Call to Action Section

```php
<?php
/**
 * Title: Call to Action
 * Slug: mytheme/cta
 * Categories: call-to-action
 * Keywords: cta, call to action, conversion, button
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--large)","bottom":"var(--wp--preset--spacing--large)"}}},"backgroundColor":"primary","textColor":"background"} -->
<div class="wp-block-group alignfull has-background-color has-primary-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--large);padding-bottom:var(--wp--preset--spacing--large)">

    <!-- wp:group {"layout":{"type":"constrained","contentSize":"600px"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"textAlign":"center","level":2,"textColor":"background"} -->
        <h2 class="has-text-align-center has-background-color has-text-color">Ready to Get Started?</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","textColor":"background"} -->
        <p class="has-text-align-center has-background-color has-text-color">Join thousands of satisfied customers today.</p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
        <div class="wp-block-buttons">
            <!-- wp:button {"backgroundColor":"background","textColor":"primary","className":"is-style-fill"} -->
            <div class="wp-block-button is-style-fill">
                <a class="wp-block-button__link has-primary-color has-background-background-color has-text-color has-background wp-element-button">Start Free Trial</a>
            </div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

## Common Mistakes

### 1. Hardcoding Colors and Spacing

**WRONG:**
```html
<!-- wp:group {"style":{"spacing":{"padding":"4rem"},"color":{"background":"#0073aa"}}} -->
```

**WHY THIS FAILS:**
- Ignores theme.json design system
- Cannot be customized by users
- Breaks when theme colors change
- Not responsive to theme variations

**CORRECT:**
```html
<!-- wp:group {"style":{"spacing":{"padding":"var(--wp--preset--spacing--large)"}},"backgroundColor":"primary"} -->
```

### 2. Missing Accessibility Features

**WRONG:**
```html
<!-- wp:image -->
<figure class="wp-block-image">
    <img src="image.jpg"/>
</figure>
<!-- /wp:image -->
```

**WHY THIS FAILS:**
- Missing alt text for screen readers
- No semantic context
- WCAG compliance failure

**CORRECT:**
```html
<!-- wp:image {"alt":"Person using laptop at modern workspace"} -->
<figure class="wp-block-image">
    <img src="image.jpg" alt="Person using laptop at modern workspace"/>
</figure>
<!-- /wp:image -->
```

### 3. Not Using Placeholder Text

**WRONG:**
```html
<!-- wp:heading -->
<h1></h1>
<!-- /wp:heading -->
```

**WHY THIS FAILS:**
- Users don't know what to add
- Empty patterns look broken
- Poor user experience

**CORRECT:**
```html
<!-- wp:heading {"placeholder":"Add your heading..."} -->
<h1>Your Heading Here</h1>
<!-- /wp:heading -->
```

### 4. Inflexible Patterns (No User Customization)

**WRONG:**
Creating patterns with all content hardcoded and no way to customize.

**WHY THIS FAILS:**
- Users cannot adapt to their needs
- Defeats purpose of patterns (rapid customization)
- Forces users to edit markup manually

**CORRECT:**
Use placeholder text, allow block customization, provide clear structure that's easy to modify.

### 5. Wrong Pattern Category

**WRONG:**
Categorizing a hero section as "text" category.

**WHY THIS FAILS:**
- Users cannot find pattern
- Poor discoverability
- Inconsistent with WordPress conventions

**CORRECT:**
Use appropriate categories:
- Hero → `featured` or `header`
- CTA → `call-to-action`
- Testimonials → `testimonials`

### 6. Missing Keywords

**WRONG:**
```php
/**
 * Title: Hero Section
 * Slug: mytheme/hero
 */
```

**WHY THIS FAILS:**
- Poor search discoverability
- Users won't find pattern
- Relies only on title match

**CORRECT:**
```php
/**
 * Title: Hero Section
 * Slug: mytheme/hero
 * Keywords: hero, banner, header, call to action, cta, featured
 */
```

### 7. Not Testing Pattern Insertion

**WRONG:**
Creating pattern without testing in block editor.

**WHY THIS FAILS:**
- Markup errors not caught
- Layout breaks in editor
- Pattern won't insert

**CORRECT:**
Test pattern insertion in:
- Block editor (post/page editor)
- Site editor (template editor)
- Different screen sizes
- Different themes (if plugin pattern)

## Red Flags - Rationalization Detection

| Rationalization | Reality | Correct Action |
|----------------|---------|----------------|
| "Users will customize the hex codes" | Most users don't edit markup | Use theme.json color tokens |
| "Alt text is optional" | Screen readers need it, WCAG requires it | Add meaningful alt text |
| "Categories don't matter" | Users rely on categories to find patterns | Use appropriate categories |
| "Keywords are just for search" | Search is how users discover patterns | Add comprehensive keywords |
| "Testing takes too long" | Broken patterns waste user time | Test before registering |
| "Hardcoding is simpler" | Bypasses design system | Use CSS variables |
| "This pattern is obvious" | Users need placeholders | Add placeholder text |

## No Exceptions

**NEVER skip these requirements:**

1. ✅ **Use theme.json tokens** - Colors, spacing, typography from theme.json
2. ✅ **Add alt text to images** - Accessibility requirement, not optional
3. ✅ **Include keywords** - Minimum 3-5 relevant search terms
4. ✅ **Categorize correctly** - Use appropriate WordPress categories
5. ✅ **Test pattern insertion** - Verify it works in block editor
6. ✅ **Add placeholder text** - Guide users on customization
7. ✅ **Use semantic HTML** - Headings, lists, landmarks

## Pattern Organization

### Directory Structure

```
theme-name/
└── patterns/
    ├── hero.php
    ├── hero-video.php
    ├── features-two-column.php
    ├── features-three-column.php
    ├── testimonial.php
    ├── testimonial-grid.php
    ├── cta.php
    ├── cta-boxed.php
    ├── gallery-masonry.php
    └── footer-newsletter.php
```

### Naming Conventions

- **File names:** `component-variation.php` (e.g., `hero-video.php`)
- **Slugs:** `themename/component-variation` (e.g., `mytheme/hero-video`)
- **Titles:** Human-readable with capital case (e.g., "Hero with Video Background")

## Integration with This Template

This skill works with:
- **fse-block-theme-development skill** - Patterns are part of FSE themes
- **ui-designer agent** - Designing pattern layouts
- **frontend-developer agent** - Building advanced patterns with custom CSS/JS
- **wordpress-security-hardening skill** - Sanitizing pattern output

Complements:
- **wp-cli-workflows skill** - Automating pattern generation
- **wordpress-internationalization skill** - Translating pattern text

## Testing Checklist

Before registering a pattern:

- [ ] Pattern inserts without errors in block editor
- [ ] Pattern uses theme.json color tokens (no hardcoded hex)
- [ ] Pattern uses theme.json spacing tokens
- [ ] All images have meaningful alt text
- [ ] Pattern has 3-5 relevant keywords
- [ ] Pattern is in appropriate category
- [ ] Placeholder text guides users on customization
- [ ] Pattern works at mobile, tablet, desktop sizes
- [ ] Semantic HTML used throughout
- [ ] Pattern maintains accessibility (keyboard nav, ARIA when needed)
- [ ] Pattern looks correct in Site Editor
- [ ] Pattern renders correctly on frontend
- [ ] Pattern works with different theme variations (if applicable)

## Resources

- [WordPress Block Pattern Directory](https://wordpress.org/patterns/)
- [Block Pattern Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)
- [register_block_pattern() Function](https://developer.wordpress.org/reference/functions/register_block_pattern/)
- [Pattern Categories](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/#categories)
- [Block Markup Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-markup/)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-18
**Tested Against:** WordPress 6.7+
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
