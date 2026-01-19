#!/bin/bash
# WordPress Coding Standards Checker
# Runs PHPCS on PHP files and warns about coding standard violations
# Exit 0 (warn) - displays issues but doesn't block

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check PHP files
if [[ ! "$FILE_PATH" =~ \.php$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

# Check if PHPCS is installed
if [ ! -f "vendor/bin/phpcs" ]; then
    echo "⚠️  PHPCS not installed. Run: ./scripts/wordpress/setup-phpcs.sh" >&2
    exit 0
fi

# Run PHPCS on the file
echo "🔍 Checking WordPress coding standards for: $FILE_PATH" >&2

# Run phpcs with WordPress standard
OUTPUT=$(./vendor/bin/phpcs --standard=WordPress "$FILE_PATH" 2>&1 || true)

# Check if there are any violations
if echo "$OUTPUT" | grep -q "FOUND"; then
    echo "" >&2
    echo "⚠️  WordPress Coding Standards Violations:" >&2
    echo "$OUTPUT" >&2
    echo "" >&2
    echo "These are warnings and won't block the operation." >&2
    echo "Consider fixing these issues to maintain code quality." >&2
else
    echo "✅ No coding standard violations found" >&2
fi

# Always exit 0 (warn, don't block)
exit 0
