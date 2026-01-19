# WordPress Development Template

A clean `wp-content` directory structure for modern WordPress development, enhanced with Claude Code integration and WordPress-specific development tools.

## What This Template Provides

- **Clean Directory Structure**: Empty `wp-content` structure ready for theme and plugin development
- **WordPress Development Scripts**: Security scanning, performance checking, coding standards validation
- **Git Configuration**: Comprehensive `.gitignore` for WordPress development
- **Claude Code Integration**: WordPress-specific guidance in `CLAUDE.md` for AI-assisted development

## Quick Start

### Option 1: Use as wp-content Directory
```bash
# Clone or copy this template
git clone <repository-url> wp-content
cd wp-content

# Download WordPress core (one level up)
cd ..
wp core download --skip-content

# Create config and install
wp config create --dbname=your_db --dbuser=root --dbpass=password
wp core install --url=example.test --title="Your Site" --admin_user=admin --admin_password=password --admin_email=you@example.com
```

### Option 2: Develop Separately and Sync
Develop themes/plugins here and sync to your WordPress installation's `wp-content` directory.

## Directory Structure

```
wp-content/
├── themes/              # WordPress themes
├── plugins/             # Custom plugins
├── mu-plugins/          # Must-use plugins
├── uploads/             # Media files (gitignored)
├── languages/           # Translation files
├── upgrade/             # WordPress upgrade files (gitignored)
├── scripts/             # Development automation scripts
│   └── wordpress/       # WordPress-specific tools
└── docs/                # Documentation and planning
```

## WordPress Development Tools

### Security & Quality Scripts

```bash
# Set up PHP CodeSniffer with WordPress standards
./scripts/wordpress/setup-phpcs.sh

# Check WordPress coding standards
./scripts/wordpress/check-coding-standards.sh [path]

# Run security scan
./scripts/wordpress/security-scan.sh [path]

# Check performance
./scripts/wordpress/check-performance.sh [path]
```

### WP-CLI Commands

See `CLAUDE.md` for comprehensive WP-CLI command reference for:
- WordPress core management
- Theme development
- Plugin development
- Database operations
- Development server setup

## Claude Code Integration

This template includes WordPress-specific guidance in `CLAUDE.md` to help Claude Code:
- Follow WordPress coding standards
- Use WordPress APIs and functions correctly
- Implement proper security practices (escaping, sanitization, nonces)
- Work with WordPress hooks and filters
- Structure themes and plugins correctly

## Development Best Practices

- **Follow WordPress Coding Standards**: Use PHPCS with WordPress standards
- **Security First**: Sanitize input, escape output, use nonces, check capabilities
- **Use WordPress APIs**: Leverage built-in WordPress functions instead of reinventing
- **Test Locally**: Use Local by Flywheel, XAMPP, MAMP, or Docker for development
- **Version Control**: This template includes comprehensive `.gitignore` for WordPress

## Resources

- [WordPress Developer Handbook](https://developer.wordpress.org/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)
- [WP-CLI Documentation](https://wp-cli.org/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)

## License

This template structure is provided as-is for WordPress development. WordPress itself is licensed under GPL v2 or later.
