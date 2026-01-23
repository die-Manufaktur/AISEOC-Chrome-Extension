#!/bin/bash
#
# Verify Pattern Conversion - Test Script
# Tests that theme patterns are properly structured for WordPress FSE
#

set -e

THEME_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PATTERNS_DIR="$THEME_DIR/patterns"
TEMPLATES_DIR="$THEME_DIR/templates"
IMAGES_DIR="$THEME_DIR/assets/images"

echo "=== RCVMD Theme Pattern Verification ==="
echo ""

# Test 1: Patterns directory exists
echo "Test 1: Patterns directory exists..."
if [ ! -d "$PATTERNS_DIR" ]; then
    echo "❌ FAIL: Patterns directory does not exist at $PATTERNS_DIR"
    exit 1
fi
echo "✓ PASS"

# Test 2: Pattern files are PHP, not HTML
echo "Test 2: Pattern files are PHP (not HTML)..."
html_patterns=$(find "$PATTERNS_DIR" -name "*.html" 2>/dev/null | wc -l)
if [ "$html_patterns" -gt 0 ]; then
    echo "❌ FAIL: Found HTML files in patterns directory (should be PHP)"
    find "$PATTERNS_DIR" -name "*.html"
    exit 1
fi
echo "✓ PASS"

# Test 3: Pattern files exist
echo "Test 3: At least one pattern file exists..."
php_patterns=$(find "$PATTERNS_DIR" -name "*.php" 2>/dev/null | wc -l)
if [ "$php_patterns" -eq 0 ]; then
    echo "❌ FAIL: No PHP pattern files found"
    exit 1
fi
echo "✓ PASS (found $php_patterns pattern files)"

# Test 4: Templates reference patterns
echo "Test 4: Templates reference patterns..."
if ! grep -q "wp:pattern" "$TEMPLATES_DIR/front-page.html" 2>/dev/null; then
    echo "❌ FAIL: front-page.html does not reference patterns"
    exit 1
fi
echo "✓ PASS"

# Test 5: Templates don't have inline empty images
echo "Test 5: Templates don't contain inline empty images..."
if grep -q '<img alt="" style=' "$TEMPLATES_DIR/front-page.html" 2>/dev/null; then
    echo "❌ FAIL: front-page.html contains inline images with empty src"
    exit 1
fi
echo "✓ PASS"

# Test 6: HTML templates don't contain PHP code
echo "Test 6: HTML templates don't contain PHP code..."
if grep -q '<?php' "$TEMPLATES_DIR"/*.html 2>/dev/null; then
    echo "❌ FAIL: HTML templates contain PHP code"
    grep -l '<?php' "$TEMPLATES_DIR"/*.html
    exit 1
fi
echo "✓ PASS"

# Test 7: Pattern files contain proper PHP
echo "Test 7: Pattern files contain PHP template directory references..."
pattern_with_uri=0
for pattern in "$PATTERNS_DIR"/*.php; do
    if [ -f "$pattern" ] && grep -q "get_template_directory_uri()" "$pattern"; then
        pattern_with_uri=$((pattern_with_uri + 1))
    fi
done
if [ "$pattern_with_uri" -eq 0 ]; then
    echo "❌ FAIL: No patterns contain get_template_directory_uri()"
    exit 1
fi
echo "✓ PASS (found $pattern_with_uri patterns with proper URI references)"

# Test 8: Image assets exist
echo "Test 8: Image assets directory exists..."
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ FAIL: Images directory does not exist"
    exit 1
fi
image_count=$(find "$IMAGES_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" \) 2>/dev/null | wc -l)
if [ "$image_count" -eq 0 ]; then
    echo "❌ FAIL: No image files found in assets/images"
    exit 1
fi
echo "✓ PASS (found $image_count images)"

echo ""
echo "=== All Tests Passed ✓ ==="
echo ""
echo "Summary:"
echo "  - Patterns directory: $PATTERNS_DIR"
echo "  - Pattern files: $php_patterns PHP files"
echo "  - Image assets: $image_count files"
echo ""
