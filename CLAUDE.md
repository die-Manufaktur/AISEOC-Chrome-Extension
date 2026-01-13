# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WordPress development template directory. The project can be used to develop:
- WordPress themes
- WordPress plugins
- Full WordPress installations
- WordPress multisite networks

## Development Commands

### WordPress Setup
```bash
# Download WordPress core files
wp core download

# Create wp-config.php
wp config create --dbname=dbname --dbuser=root --dbpass=password --dbhost=localhost

# Install WordPress
wp core install --url=example.com --title="Site Title" --admin_user=admin --admin_password=password --admin_email=admin@example.com

# Update WordPress core
wp core update

# Update all plugins
wp plugin update --all

# Update all themes
wp theme update --all
```

### Theme Development
```bash
# Activate a theme
wp theme activate theme-name

# Generate theme starter files
wp scaffold _s theme-name --theme_name="Theme Name" --author="Author Name"

# Check theme for errors
wp theme verify theme-name
```

### Plugin Development
```bash
# Activate a plugin
wp plugin activate plugin-name

# Deactivate a plugin
wp plugin deactivate plugin-name

# Generate plugin starter files
wp scaffold plugin plugin-name --plugin_name="Plugin Name"

# Run plugin tests (if PHPUnit is configured)
phpunit
```

### Database Operations
```bash
# Export database
wp db export backup.sql

# Import database
wp db import backup.sql

# Search and replace in database
wp search-replace 'old-domain.com' 'new-domain.com'

# Reset database
wp db reset
```

### Development Server
```bash
# Using PHP built-in server
php -S localhost:8000

# Using wp-cli server
wp server --host=localhost --port=8080

# Using Local by Flywheel, XAMPP, MAMP, or Docker
# Configure according to your local environment
```

## WordPress File Structure

When developing, follow these conventions:

### Theme Structure
```
wp-content/themes/theme-name/
├── style.css           # Theme information and main styles
├── functions.php       # Theme functions and hooks
├── index.php          # Main template file
├── header.php         # Header template
├── footer.php         # Footer template
├── sidebar.php        # Sidebar template
├── single.php         # Single post template
├── page.php           # Page template
├── archive.php        # Archive template
├── 404.php            # 404 error template
├── assets/
│   ├── css/          # Additional stylesheets
│   ├── js/           # JavaScript files
│   └── images/       # Theme images
└── template-parts/    # Reusable template parts
```

### Plugin Structure
```
wp-content/plugins/plugin-name/
├── plugin-name.php    # Main plugin file with header
├── includes/          # PHP includes
├── admin/            # Admin-specific functionality
├── public/           # Public-facing functionality
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── languages/        # Translation files
```

## WordPress Development Standards

### PHP Coding Standards
- Follow WordPress PHP Coding Standards
- Use WordPress functions and APIs where available
- Properly escape output: `esc_html()`, `esc_url()`, `esc_attr()`
- Sanitize input: `sanitize_text_field()`, `sanitize_email()`, etc.
- Use nonces for form submissions and AJAX requests

### Database Interactions
- Use `$wpdb` global for custom queries
- Prepare SQL queries to prevent injection: `$wpdb->prepare()`
- Use WordPress functions for common operations (get_posts, WP_Query, etc.)

### Hooks and Filters
- Use action hooks: `add_action()`, `do_action()`
- Use filter hooks: `add_filter()`, `apply_filters()`
- Follow WordPress hook naming conventions
- Document custom hooks

### JavaScript and CSS
- Enqueue scripts and styles properly using `wp_enqueue_script()` and `wp_enqueue_style()`
- Localize scripts for AJAX: `wp_localize_script()`
- Use `wp_register_script()` for conditional loading

### Security Best Practices
- Validate and sanitize all user input
- Escape all output
- Use nonces for state-changing operations
- Check user capabilities: `current_user_can()`
- Keep WordPress, themes, and plugins updated

## Testing

### PHPUnit Testing
```bash
# Install PHPUnit
composer require --dev phpunit/phpunit

# Run tests
vendor/bin/phpunit

# Run specific test file
vendor/bin/phpunit tests/test-sample.php
```

### WordPress Debugging
Add to wp-config.php:
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

## Common WordPress Functions

### Content Retrieval
- `get_posts()` - Retrieve posts
- `WP_Query` - Advanced post queries
- `get_pages()` - Retrieve pages
- `get_categories()` - Get categories
- `get_tags()` - Get tags

### Theme Functions
- `get_header()`, `get_footer()`, `get_sidebar()`
- `get_template_part()`
- `wp_head()`, `wp_footer()`
- `the_loop()`, `have_posts()`, `the_post()`

### User and Permissions
- `is_user_logged_in()`
- `current_user_can()`
- `wp_get_current_user()`
- `get_current_user_id()`

### Options and Settings
- `get_option()`, `update_option()`, `add_option()`
- `get_theme_mod()`, `set_theme_mod()`
- `get_site_option()` (for multisite)