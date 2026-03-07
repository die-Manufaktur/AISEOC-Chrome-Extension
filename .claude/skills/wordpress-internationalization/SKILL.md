---
name: wordpress-internationalization
description: Use when implementing WordPress i18n/l10n, adding translation functions, generating POT files, or preparing themes/plugins for translation. Keywords: i18n, l10n, internationalization, localization, translation, POT file, gettext, multilingual, WordPress translate
---

# WordPress Internationalization (i18n/l10n)

## Overview

WordPress internationalization (i18n) prepares code for translation, while localization (l10n) provides actual translations. Proper i18n requires using translation functions, setting up text domains, and generating POT files for translators.

**Core Principle:** Wrap ALL user-facing strings in translation functions, use consistent text domain, generate POT files with WP-CLI, never hardcode English text.

## When to Use

Use this skill when:
- Preparing theme or plugin for translation
- Adding translation functions to code
- Generating POT files for translators
- Setting up language loading
- Handling pluralization
- Supporting RTL languages

**Symptoms that trigger this skill:**
- "translate"
- "i18n"
- "l10n"
- "multilingual"
- "POT file"
- "localization"
- "translation ready"
- "generate pattern" (FSE pattern generation should include i18n)
- "create pattern" (block patterns must wrap visible strings)

## Quick Reference

### Translation Functions

| Function | Use For | Example |
|----------|---------|---------|
| `__()` | Return translated string | `$title = __( 'Title', 'textdomain' );` |
| `_e()` | Echo translated string | `_e( 'Welcome', 'textdomain' );` |
| `_x()` | Translated with context | `_x( 'Post', 'noun', 'textdomain' );` |
| `_n()` | Pluralization | `_n( '1 item', '%d items', $count, 'textdomain' );` |
| `esc_html__()` | Translate + escape HTML | `esc_html__( 'Title', 'textdomain' );` |
| `esc_html_e()` | Echo translated + escaped | `esc_html_e( 'Title', 'textdomain' );` |
| `esc_attr__()` | Translate + escape attribute | `esc_attr__( 'Title', 'textdomain' );` |
| `esc_attr_e()` | Echo translated + escaped attr | `esc_attr_e( 'Title', 'textdomain' );` |

### Context-Aware Translation

```php
// Without context - ambiguous
__( 'Post', 'textdomain' ); // Verb or noun?

// With context - clear meaning
_x( 'Post', 'verb: publish content', 'textdomain' );
_x( 'Post', 'noun: blog post', 'textdomain' );
```

## Implementation Patterns

### Pattern 1: Theme i18n Setup

**File:** `functions.php`

```php
<?php
/**
 * Load theme text domain for translations
 */
function mytheme_load_textdomain() {
    load_theme_textdomain( 'mytheme', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'mytheme_load_textdomain' );
```

**File:** `style.css` (theme header)

```css
/*
Theme Name: My Theme
Text Domain: mytheme
Domain Path: /languages
*/
```

### Pattern 2: Plugin i18n Setup

**File:** `my-plugin.php`

```php
<?php
/**
 * Plugin Name: My Plugin
 * Text Domain: myplugin
 * Domain Path: /languages
 */

function myplugin_load_textdomain() {
    load_plugin_textdomain( 'myplugin', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'myplugin_load_textdomain' );
```

### Pattern 3: Translation in Templates

```php
<!-- WRONG: Hardcoded English -->
<h1>Welcome to Our Site</h1>
<p>We have 5 products available.</p>

<!-- CORRECT: Translatable -->
<h1><?php esc_html_e( 'Welcome to Our Site', 'mytheme' ); ?></h1>
<p><?php
    printf(
        esc_html_n(
            'We have %d product available.',
            'We have %d products available.',
            $product_count,
            'mytheme'
        ),
        number_format_i18n( $product_count )
    );
?></p>
```

### Pattern 4: Generating POT Files

```bash
# Generate POT file for theme
wp i18n make-pot wp-content/themes/mytheme wp-content/themes/mytheme/languages/mytheme.pot

# Generate POT file for plugin
wp i18n make-pot wp-content/plugins/myplugin wp-content/plugins/myplugin/languages/myplugin.pot

# Generate with specific domain
wp i18n make-pot . languages/mytheme.pot --domain=mytheme
```

### Pattern 5: JavaScript i18n

```php
<?php
// Enqueue script with translations
function mytheme_enqueue_scripts() {
    wp_enqueue_script(
        'mytheme-script',
        get_template_directory_uri() . '/assets/js/script.js',
        array(),
        '1.0.0',
        true
    );

    // Set translations for JavaScript
    wp_set_script_translations(
        'mytheme-script',
        'mytheme',
        get_template_directory() . '/languages'
    );
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_scripts' );
?>
```

**JavaScript file:**

```javascript
// Use wp.i18n for translations
import { __ } from '@wordpress/i18n';

const title = __( 'Welcome', 'mytheme' );
const message = sprintf(
    _n( 'You have %d new message', 'You have %d new messages', count, 'mytheme' ),
    count
);
```

### Pattern 6: Pluralization

```php
<?php
// WRONG: Hardcoded plural logic
if ( $count === 1 ) {
    echo $count . ' item';
} else {
    echo $count . ' items';
}

// CORRECT: Using _n() for proper pluralization
printf(
    _n(
        '%d item',
        '%d items',
        $count,
        'mytheme'
    ),
    number_format_i18n( $count )
);
?>
```

### Pattern 7: Date and Number Localization

```php
<?php
// Date localization
$date = date_i18n( get_option( 'date_format' ), $timestamp );

// Time localization
$time = date_i18n( get_option( 'time_format' ), $timestamp );

// Number localization
$formatted_number = number_format_i18n( 1234567.89 );
// Outputs: 1,234,567.89 (en_US) or 1.234.567,89 (de_DE)
?>
```

## i18n in FSE Pattern Generation

When the figma-fse-converter agent generates block patterns, all visible strings MUST be wrapped in translation functions. This is the most common i18n gap in the Figma-to-FSE pipeline.

### Pattern PHP Files — Required Wrapping

Every PHP pattern file registers visible text. Wrap it at generation time, not as an afterthought.

```php
<?php
/**
 * Title: Hero Section
 * Slug: mytheme/hero-section
 * Categories: featured
 */
?>

<!-- WRONG: Raw strings in pattern -->
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Welcome to Our Site</h1>
<!-- /wp:heading -->

<!-- CORRECT: Translated strings in pattern -->
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><?php echo esc_html__( 'Welcome to Our Site', 'mytheme' ); ?></h1>
<!-- /wp:heading -->
```

### Button and Link Text

```php
<!-- WRONG -->
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link">Get Started</a></div>
<!-- /wp:button -->

<!-- CORRECT -->
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link"><?php echo esc_html__( 'Get Started', 'mytheme' ); ?></a></div>
<!-- /wp:button -->
```

### Attribute Values (alt text, aria-labels)

```php
<!-- CORRECT: Escaped for attribute context -->
<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/hero.webp' ) ); ?>"
     alt="<?php echo esc_attr__( 'Hero background image', 'mytheme' ); ?>" />
```

### What NOT to Translate in Patterns

- Block comment markup (`<!-- wp:heading -->`) — never translate
- CSS class names — never translate
- theme.json token slugs (`var(--wp--preset--color--primary)`) — never translate
- HTML tag names and attributes — never translate

### Integration with figma-fse-converter Agent

The figma-fse-converter agent should apply these rules during pattern generation:
1. All visible text in `<h1>`-`<h6>`, `<p>`, `<a>`, `<span>`, `<button>` gets `esc_html__()`
2. All `alt` attributes get `esc_attr__()`
3. Text domain matches the theme slug from `style.css`
4. POT file generation runs after all patterns are created

## Common Mistakes

### 1. Hardcoding English Text

**WRONG:**
```php
echo '<h1>Welcome</h1>';
```

**CORRECT:**
```php
echo '<h1>' . esc_html__( 'Welcome', 'mytheme' ) . '</h1>';
```

### 2. Translating Variables

**WRONG:**
```php
// Dynamic variable - cannot be translated
$text = $some_variable;
echo __( $text, 'mytheme' );
```

**CORRECT:**
```php
// Static string with variable placeholder
echo sprintf(
    __( 'Hello, %s!', 'mytheme' ),
    esc_html( $user_name )
);
```

### 3. Not Escaping Translated Strings

**WRONG:**
```php
echo __( 'Title', 'mytheme' ); // No escaping
```

**CORRECT:**
```php
echo esc_html__( 'Title', 'mytheme' ); // Combined translate + escape
```

### 4. Inconsistent Text Domain

**WRONG:**
```php
__( 'Text 1', 'mytheme' );
__( 'Text 2', 'my-theme' ); // Different text domain
__( 'Text 3', 'mytheme-plugin' ); // Another different domain
```

**CORRECT:**
```php
__( 'Text 1', 'mytheme' );
__( 'Text 2', 'mytheme' );
__( 'Text 3', 'mytheme' );
```

### 5. Not Using number_format_i18n()

**WRONG:**
```php
echo number_format( 1234567, 2 ); // Hardcoded comma separator
```

**CORRECT:**
```php
echo number_format_i18n( 1234567, 2 ); // Locale-specific formatting
```

## No Exceptions

**NEVER skip these i18n practices:**

1. ✅ **Wrap ALL user-facing text** - No hardcoded English
2. ✅ **Use consistent text domain** - One domain per theme/plugin
3. ✅ **Escape translated strings** - Use esc_html__(), esc_attr__()
4. ✅ **Use pluralization functions** - _n() for countable items
5. ✅ **Generate POT files** - For translators to use
6. ✅ **Use date_i18n() for dates** - Locale-specific formatting
7. ✅ **Provide context when ambiguous** - _x() with context

## Translation Workflow

```
1. Developer writes code with translation functions
   ↓
2. Generate POT file with WP-CLI
   ↓
3. Translator creates PO file from POT (e.g., fr_FR.po)
   ↓
4. Compile PO to MO file (binary)
   ↓
5. Place MO file in /languages/ directory
   ↓
6. WordPress loads translations automatically
```

## Integration with This Template

This skill works with:
- **figma-to-fse-autonomous-workflow skill** - i18n during Figma-to-FSE conversion
- **figma-fse-converter agent** - Pattern generation with translation wrappers
- **fse-block-theme-development skill** - i18n in block themes
- **block-pattern-creation skill** - Translatable patterns
- **wp-cli-workflows skill** - Generating POT files with WP-CLI

## Resources

- [WordPress I18n Handbook](https://developer.wordpress.org/apis/internationalization/)
- [WP-CLI I18n Command](https://developer.wordpress.org/cli/commands/i18n/)
- [Translating WordPress](https://translate.wordpress.org/)
- [GlotPress](https://glotpress.blog/) - Translation management

---

**Skill Version:** 1.1.0
**Last Updated:** 2026-03-06
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
