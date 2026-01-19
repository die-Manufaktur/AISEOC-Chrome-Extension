---
name: wordpress-security-hardening
description: Use when implementing WordPress security best practices, sanitizing user input, escaping output, verifying nonces, or reviewing code for security vulnerabilities. Keywords: security, sanitize, escape, nonce, XSS, SQL injection, CSRF, WordPress security, input validation, output escaping
---

# WordPress Security Hardening

## Overview

WordPress security requires defense-in-depth: sanitize ALL input, escape ALL output, verify nonces for state changes, check capabilities for privileged operations, and use prepared statements for database queries.

**Core Principle:** NEVER trust user input. ALWAYS sanitize input, escape output, verify nonces, check capabilities, and prepare SQL queries.

## When to Use

Use this skill when:
- Processing user input from forms, AJAX, REST API
- Displaying dynamic content to users
- Performing state-changing operations (create, update, delete)
- Executing privileged operations
- Writing custom database queries
- Handling file uploads
- Implementing authentication/authorization

**Symptoms that trigger this skill:**
- "security review"
- "sanitize input"
- "escape output"
- "nonce verification"
- "prevent XSS"
- "SQL injection"
- "user capabilities"
- "CSRF protection"

When NOT to use:
- Reading static configuration (no user input)
- Outputting hardcoded strings (no dynamic content)
- WordPress core functions handle security automatically

## Security Decision Flowchart

```
┌─────────────────────┐
│ Receiving user      │
│ input?              │
└──────┬──────────────┘
       │ YES
       ▼
┌─────────────────────┐
│ Sanitize            │
│ immediately         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Outputting data?    │
└──────┬──────────────┘
       │ YES
       ▼
┌─────────────────────┐
│ Escape for context  │
│ (HTML/URL/attr/JS)  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ State-changing      │
│ operation?          │
└──────┬──────────────┘
       │ YES
       ▼
┌─────────────────────┐
│ Verify nonce        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Privileged          │
│ operation?          │
└──────┬──────────────┘
       │ YES
       ▼
┌─────────────────────┐
│ Check capabilities  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Custom SQL query?   │
└──────┬──────────────┘
       │ YES
       ▼
┌─────────────────────┐
│ Use $wpdb->prepare()│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Safe to proceed     │
└─────────────────────┘
```

## Quick Reference

### Input Sanitization

| Input Type | Function | Example |
|------------|----------|---------|
| Text field | `sanitize_text_field()` | Form inputs, meta fields |
| Textarea | `sanitize_textarea_field()` | Multi-line text |
| Email | `sanitize_email()` | Email addresses |
| URL | `esc_url_raw()` | URLs for database storage |
| Filename | `sanitize_file_name()` | File uploads |
| HTML | `wp_kses_post()` | Rich text content |
| HTML (limited) | `wp_kses()` | Custom allowed tags |
| Key/slug | `sanitize_key()` | Option names, meta keys |
| Title | `sanitize_title()` | Post titles, slugs |
| SQL LIKE | `$wpdb->esc_like()` | LIKE query parameters |

### Output Escaping

| Context | Function | Example |
|---------|----------|---------|
| HTML content | `esc_html()` | Display text |
| HTML attribute | `esc_attr()` | Input values, data attributes |
| URL | `esc_url()` | Link href, src attributes |
| JavaScript | `esc_js()` | Inline JavaScript strings |
| Textarea | `esc_textarea()` | Textarea value attribute |
| Translation | `esc_html__()` | Translated strings for display |
| Translation + printf | `esc_html_e()` | Echo translated string |

### Nonce Functions

| Function | Purpose | When to Use |
|----------|---------|-------------|
| `wp_nonce_field()` | Add nonce to form | Form submissions |
| `wp_create_nonce()` | Generate nonce | AJAX, custom implementations |
| `wp_verify_nonce()` | Verify nonce | Process form data, AJAX |
| `check_admin_referer()` | Verify nonce + die | Admin form processing |
| `check_ajax_referer()` | Verify AJAX nonce + die | AJAX handlers |
| `wp_nonce_url()` | Add nonce to URL | Action links (delete, activate) |

### Capability Checks

| Capability | Purpose | When to Check |
|------------|---------|---------------|
| `manage_options` | Admin settings | Saving plugin/theme options |
| `edit_posts` | Edit posts | Post creation/editing |
| `publish_posts` | Publish posts | Publishing content |
| `edit_others_posts` | Edit other users' posts | Multi-author workflows |
| `delete_posts` | Delete posts | Post deletion |
| `upload_files` | Upload files | Media uploads |
| `edit_theme_options` | Theme customization | Theme settings |
| `install_plugins` | Install plugins | Plugin installation |

## Implementation Patterns

### Pattern 1: Form Processing with Security

```php
<?php
/**
 * Process contact form submission
 */
function mytheme_process_contact_form() {
    // 1. Verify nonce (CSRF protection)
    if ( ! isset( $_POST['contact_nonce'] ) || ! wp_verify_nonce( $_POST['contact_nonce'], 'contact_form_action' ) ) {
        wp_die( __( 'Security check failed', 'mytheme' ) );
    }

    // 2. Check user capability (if required)
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_die( __( 'Insufficient permissions', 'mytheme' ) );
    }

    // 3. Sanitize input
    $name    = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
    $email   = isset( $_POST['email'] ) ? sanitize_email( $_POST['email'] ) : '';
    $message = isset( $_POST['message'] ) ? sanitize_textarea_field( $_POST['message'] ) : '';

    // 4. Validate
    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        wp_die( __( 'All fields are required', 'mytheme' ) );
    }

    if ( ! is_email( $email ) ) {
        wp_die( __( 'Invalid email address', 'mytheme' ) );
    }

    // 5. Process (send email, save to database, etc.)
    $sent = wp_mail( 'admin@example.com', 'Contact Form', $message, array(
        'From: ' . $name . ' <' . $email . '>'
    ) );

    // 6. Redirect with success message
    if ( $sent ) {
        wp_redirect( add_query_arg( 'contact', 'success', home_url( '/contact' ) ) );
        exit;
    } else {
        wp_die( __( 'Failed to send message', 'mytheme' ) );
    }
}
add_action( 'admin_post_contact_form', 'mytheme_process_contact_form' );
add_action( 'admin_post_nopriv_contact_form', 'mytheme_process_contact_form' );
?>
```

**Form HTML:**

```php
<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
    <?php wp_nonce_field( 'contact_form_action', 'contact_nonce' ); ?>
    <input type="hidden" name="action" value="contact_form">

    <label for="name"><?php esc_html_e( 'Name', 'mytheme' ); ?></label>
    <input type="text" id="name" name="name" value="<?php echo isset( $_POST['name'] ) ? esc_attr( $_POST['name'] ) : ''; ?>" required>

    <label for="email"><?php esc_html_e( 'Email', 'mytheme' ); ?></label>
    <input type="email" id="email" name="email" value="<?php echo isset( $_POST['email'] ) ? esc_attr( $_POST['email'] ) : ''; ?>" required>

    <label for="message"><?php esc_html_e( 'Message', 'mytheme' ); ?></label>
    <textarea id="message" name="message" required><?php echo isset( $_POST['message'] ) ? esc_textarea( $_POST['message'] ) : ''; ?></textarea>

    <button type="submit"><?php esc_html_e( 'Send', 'mytheme' ); ?></button>
</form>
```

### Pattern 2: AJAX Request with Security

```php
<?php
/**
 * AJAX handler to save user preferences
 */
function mytheme_save_preferences() {
    // 1. Verify nonce
    check_ajax_referer( 'save_preferences_nonce', 'security' );

    // 2. Check capability
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( array( 'message' => __( 'Insufficient permissions', 'mytheme' ) ) );
    }

    // 3. Sanitize input
    $preference = isset( $_POST['preference'] ) ? sanitize_text_field( $_POST['preference'] ) : '';
    $value      = isset( $_POST['value'] ) ? sanitize_text_field( $_POST['value'] ) : '';

    // 4. Validate
    if ( empty( $preference ) ) {
        wp_send_json_error( array( 'message' => __( 'Invalid preference', 'mytheme' ) ) );
    }

    // 5. Save to user meta
    $updated = update_user_meta( get_current_user_id(), 'mytheme_' . $preference, $value );

    // 6. Return response
    if ( $updated !== false ) {
        wp_send_json_success( array( 'message' => __( 'Preferences saved', 'mytheme' ) ) );
    } else {
        wp_send_json_error( array( 'message' => __( 'Failed to save preferences', 'mytheme' ) ) );
    }
}
add_action( 'wp_ajax_save_preferences', 'mytheme_save_preferences' );
?>
```

**JavaScript (AJAX call):**

```javascript
jQuery(document).ready(function($) {
    $('#save-preferences').on('click', function(e) {
        e.preventDefault();

        $.ajax({
            url: ajaxurl, // WordPress AJAX URL
            type: 'POST',
            data: {
                action: 'save_preferences',
                security: '<?php echo wp_create_nonce( "save_preferences_nonce" ); ?>',
                preference: $('#preference').val(),
                value: $('#value').val()
            },
            success: function(response) {
                if (response.success) {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            }
        });
    });
});
```

### Pattern 3: Custom Database Query (Secure)

```php
<?php
/**
 * Get posts by custom meta value (secure)
 */
function mytheme_get_posts_by_meta( $meta_key, $meta_value ) {
    global $wpdb;

    // 1. Sanitize inputs
    $meta_key   = sanitize_key( $meta_key );
    $meta_value = sanitize_text_field( $meta_value );

    // 2. Prepare query (prevents SQL injection)
    $query = $wpdb->prepare(
        "SELECT p.* FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
        WHERE pm.meta_key = %s
        AND pm.meta_value = %s
        AND p.post_status = 'publish'
        AND p.post_type = 'post'
        ORDER BY p.post_date DESC
        LIMIT 10",
        $meta_key,
        $meta_value
    );

    // 3. Execute query
    $results = $wpdb->get_results( $query );

    return $results;
}
?>
```

**WRONG (SQL injection vulnerability):**

```php
<?php
// NEVER DO THIS - SQL INJECTION VULNERABILITY
function mytheme_get_posts_by_meta_WRONG( $meta_key, $meta_value ) {
    global $wpdb;

    // NO SANITIZATION OR PREPARATION
    $query = "SELECT * FROM {$wpdb->posts} p
              INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
              WHERE pm.meta_key = '$meta_key'
              AND pm.meta_value = '$meta_value'";

    $results = $wpdb->get_results( $query );

    return $results;
}
?>
```

### Pattern 4: File Upload Security

```php
<?php
/**
 * Handle file upload securely
 */
function mytheme_handle_file_upload() {
    // 1. Verify nonce
    check_admin_referer( 'file_upload_nonce', 'security' );

    // 2. Check capability
    if ( ! current_user_can( 'upload_files' ) ) {
        wp_die( __( 'Insufficient permissions to upload files', 'mytheme' ) );
    }

    // 3. Check if file was uploaded
    if ( ! isset( $_FILES['file'] ) ) {
        wp_die( __( 'No file uploaded', 'mytheme' ) );
    }

    // 4. Validate file type
    $allowed_types = array( 'image/jpeg', 'image/png', 'image/gif' );
    $file_type     = $_FILES['file']['type'];

    if ( ! in_array( $file_type, $allowed_types, true ) ) {
        wp_die( __( 'Invalid file type. Only JPG, PNG, and GIF allowed.', 'mytheme' ) );
    }

    // 5. Validate file size (max 2MB)
    $max_size = 2 * 1024 * 1024; // 2MB in bytes
    if ( $_FILES['file']['size'] > $max_size ) {
        wp_die( __( 'File too large. Maximum size: 2MB', 'mytheme' ) );
    }

    // 6. Use WordPress upload handler (handles security)
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    require_once( ABSPATH . 'wp-admin/includes/media.php' );
    require_once( ABSPATH . 'wp-admin/includes/image.php' );

    $attachment_id = media_handle_upload( 'file', 0 );

    if ( is_wp_error( $attachment_id ) ) {
        wp_die( $attachment_id->get_error_message() );
    }

    // 7. Success - redirect or display message
    wp_redirect( add_query_arg( 'upload', 'success', admin_url( 'admin.php?page=mytheme' ) ) );
    exit;
}
add_action( 'admin_post_mytheme_upload', 'mytheme_handle_file_upload' );
?>
```

### Pattern 5: REST API Endpoint with Security

```php
<?php
/**
 * Register secure REST API endpoint
 */
function mytheme_register_rest_routes() {
    register_rest_route( 'mytheme/v1', '/settings', array(
        'methods'             => 'POST',
        'callback'            => 'mytheme_update_settings',
        'permission_callback' => 'mytheme_settings_permission_check',
        'args'                => array(
            'option_name' => array(
                'required'          => true,
                'validate_callback' => function( $param, $request, $key ) {
                    return is_string( $param ) && ! empty( $param );
                },
                'sanitize_callback' => 'sanitize_key',
            ),
            'option_value' => array(
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ),
        ),
    ) );
}
add_action( 'rest_api_init', 'mytheme_register_rest_routes' );

/**
 * Permission callback for settings endpoint
 */
function mytheme_settings_permission_check() {
    return current_user_can( 'manage_options' );
}

/**
 * Update settings via REST API
 */
function mytheme_update_settings( $request ) {
    $option_name  = $request['option_name'];
    $option_value = $request['option_value'];

    // Additional validation
    if ( ! in_array( $option_name, array( 'mytheme_setting_1', 'mytheme_setting_2' ), true ) ) {
        return new WP_Error( 'invalid_option', __( 'Invalid option name', 'mytheme' ), array( 'status' => 400 ) );
    }

    $updated = update_option( $option_name, $option_value );

    if ( $updated ) {
        return new WP_REST_Response( array(
            'success' => true,
            'message' => __( 'Settings updated', 'mytheme' ),
        ), 200 );
    } else {
        return new WP_Error( 'update_failed', __( 'Failed to update settings', 'mytheme' ), array( 'status' => 500 ) );
    }
}
?>
```

## Common Mistakes

### 1. Trusting User Input

**WRONG:**
```php
<?php
$name = $_POST['name']; // No sanitization
echo $name; // No escaping - XSS vulnerability
?>
```

**WHY THIS FAILS:**
- User can inject malicious JavaScript
- XSS (Cross-Site Scripting) vulnerability
- Can steal session cookies, redirect users, deface site

**CORRECT:**
```php
<?php
$name = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
echo esc_html( $name );
?>
```

### 2. Double Escaping or Double Sanitizing

**WRONG:**
```php
<?php
$email = sanitize_email( sanitize_text_field( $_POST['email'] ) ); // Double sanitization
$url = esc_url( esc_url( $link ) ); // Double escaping
?>
```

**WHY THIS FAILS:**
- Corrupts data (especially special characters)
- Unnecessary performance overhead
- Can break functionality

**CORRECT:**
```php
<?php
$email = sanitize_email( $_POST['email'] ); // Single, appropriate sanitization
$url = esc_url( $link ); // Single escaping
?>
```

### 3. Using Wrong Escape Function for Context

**WRONG:**
```php
<a href="<?php echo esc_html( $url ); ?>">Link</a> <!-- Wrong: esc_html for URL -->
<div data-value="<?php echo esc_url( $value ); ?>">Content</div> <!-- Wrong: esc_url for attribute -->
```

**WHY THIS FAILS:**
- Security holes (URL context needs esc_url)
- Data corruption (attribute context needs esc_attr)
- JavaScript breaks (JS context needs esc_js)

**CORRECT:**
```php
<a href="<?php echo esc_url( $url ); ?>">Link</a>
<div data-value="<?php echo esc_attr( $value ); ?>">Content</div>
```

### 4. Missing Nonce Verification

**WRONG:**
```php
<?php
// Process form without nonce check
if ( isset( $_POST['submit'] ) ) {
    update_option( 'mytheme_setting', $_POST['value'] );
}
?>
```

**WHY THIS FAILS:**
- CSRF (Cross-Site Request Forgery) vulnerability
- Attacker can trick users into performing actions
- No verification of form origin

**CORRECT:**
```php
<?php
if ( isset( $_POST['submit'] ) && isset( $_POST['_wpnonce'] ) ) {
    if ( wp_verify_nonce( $_POST['_wpnonce'], 'mytheme_settings' ) ) {
        update_option( 'mytheme_setting', sanitize_text_field( $_POST['value'] ) );
    } else {
        wp_die( __( 'Security check failed', 'mytheme' ) );
    }
}
?>
```

### 5. Not Checking User Capabilities

**WRONG:**
```php
<?php
// Allow any logged-in user to delete posts
if ( is_user_logged_in() ) {
    wp_delete_post( $_POST['post_id'] );
}
?>
```

**WHY THIS FAILS:**
- Privilege escalation vulnerability
- Unauthorized users can perform admin actions
- Data loss, security breach

**CORRECT:**
```php
<?php
if ( current_user_can( 'delete_posts' ) && isset( $_POST['_wpnonce'] ) ) {
    if ( wp_verify_nonce( $_POST['_wpnonce'], 'delete_post_' . $_POST['post_id'] ) ) {
        wp_delete_post( sanitize_text_field( $_POST['post_id'] ) );
    }
}
?>
```

### 6. SQL Injection in Custom Queries

**WRONG:**
```php
<?php
global $wpdb;
$id = $_GET['id'];
$query = "SELECT * FROM {$wpdb->posts} WHERE ID = $id"; // SQL injection
$results = $wpdb->get_results( $query );
?>
```

**WHY THIS FAILS:**
- SQL injection vulnerability
- Attacker can read/modify database
- Can dump entire database, escalate privileges

**CORRECT:**
```php
<?php
global $wpdb;
$id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
$query = $wpdb->prepare( "SELECT * FROM {$wpdb->posts} WHERE ID = %d", $id );
$results = $wpdb->get_results( $query );
?>
```

### 7. Using stripslashes() or strip_tags()

**WRONG:**
```php
<?php
$value = stripslashes( $_POST['value'] ); // Wrong approach
$html = strip_tags( $_POST['html'] ); // Too aggressive
?>
```

**WHY THIS FAILS:**
- stripslashes() is outdated (magic quotes removed in PHP 5.4)
- strip_tags() removes ALL HTML (not selective)
- Neither function sanitizes properly

**CORRECT:**
```php
<?php
$value = sanitize_text_field( $_POST['value'] );
$html = wp_kses_post( $_POST['html'] ); // Allows safe HTML
?>
```

## Red Flags - Rationalization Detection

| Rationalization | Reality | Correct Action |
|----------------|---------|----------------|
| "It's an admin page, users are trusted" | Admin users can be compromised | Always sanitize and escape |
| "I'll validate on the frontend" | Frontend can be bypassed | Always validate server-side |
| "This is just for testing" | Test code becomes production code | Build security in from start |
| "stripslashes() is simpler" | It's outdated and insecure | Use sanitize_text_field() |
| "Nonces slow down the site" | Minimal performance impact | Always use nonces |
| "is_user_logged_in() is enough" | Not a capability check | Use current_user_can() |
| "I'll add security later" | Security must be built in | Sanitize/escape from day one |

## No Exceptions

**NEVER skip these security requirements:**

1. ✅ **Sanitize ALL user input** - $_POST, $_GET, $_REQUEST, $_FILES, $_COOKIE
2. ✅ **Escape ALL output** - HTML, attributes, URLs, JavaScript
3. ✅ **Verify nonces for state changes** - Forms, AJAX, action links
4. ✅ **Check capabilities for privileged operations** - Admin functions, data modification
5. ✅ **Use $wpdb->prepare() for custom queries** - ALWAYS prepare SQL
6. ✅ **Validate file uploads** - Type, size, use WordPress upload handlers
7. ✅ **Use WordPress functions** - Don't reinvent security functions

**Time pressure is not a valid reason to skip security.**
**"Only admins use this" is not a valid reason to skip security.**
**"I'll fix it later" is not acceptable for security.**

## Integration with This Template

This skill works with:
- **fse-block-theme-development skill** - Security during theme development
- **block-pattern-creation skill** - Sanitizing pattern output
- **wp-cli-workflows skill** - Secure automation scripts
- **All agents** - Security applies to all WordPress development

Complements:
- **security-scan.sh script** - Automated vulnerability scanning
- **check-coding-standards.sh script** - WPCS security rules
- **test-writer-fixer agent** - Writing security tests

## Security Testing Checklist

Before deploying code:

- [ ] All user input sanitized with appropriate functions
- [ ] All output escaped for correct context (HTML/URL/attr/JS)
- [ ] Nonces verified for all state-changing operations
- [ ] Capabilities checked for privileged operations
- [ ] Custom SQL queries use $wpdb->prepare()
- [ ] File uploads validated (type, size) and use WordPress handlers
- [ ] AJAX handlers verify nonces and capabilities
- [ ] REST API endpoints have permission callbacks
- [ ] No direct use of $_POST, $_GET, $_REQUEST without sanitization
- [ ] No SQL queries without prepare()
- [ ] No HTML output without escaping
- [ ] Security scan passes (./scripts/wordpress/security-scan.sh)
- [ ] WPCS security rules pass (./scripts/wordpress/check-coding-standards.sh)

## Resources

- [WordPress Data Validation](https://developer.wordpress.org/apis/security/data-validation/)
- [WordPress Sanitizing](https://developer.wordpress.org/apis/security/sanitizing/)
- [WordPress Escaping](https://developer.wordpress.org/apis/security/escaping/)
- [WordPress Nonces](https://developer.wordpress.org/apis/security/nonces/)
- [WordPress Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [WordPress Security White Paper](https://wordpress.org/about/security/)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-18
**Tested Against:** WordPress 6.7+, PHP 7.4+
**Testing Methodology:** RED-GREEN-REFACTOR (TDD for documentation)
