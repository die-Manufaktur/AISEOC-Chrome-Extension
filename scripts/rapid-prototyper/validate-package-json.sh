#!/bin/bash
# Package.json Validator
# Validates package.json syntax and structure
# Exit 0 (warn) or Exit 2 (block on invalid JSON)

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check package.json files
if [[ ! "$FILE_PATH" =~ package\.json$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

echo "🔍 Validating package.json: $FILE_PATH" >&2

# Validate JSON syntax
if ! jq '.' "$FILE_PATH" > /dev/null 2>&1; then
    echo "❌ Invalid JSON in $FILE_PATH" >&2
    exit 2
fi

echo "  ✓ Valid JSON syntax" >&2

# Check for required fields
WARNINGS=()

if ! jq -e '.name' "$FILE_PATH" > /dev/null 2>&1; then
    WARNINGS+=("Missing 'name' field")
fi

if ! jq -e '.version' "$FILE_PATH" > /dev/null 2>&1; then
    WARNINGS+=("Missing 'version' field")
fi

# Check for common issues
if jq -e '.dependencies or .devDependencies' "$FILE_PATH" > /dev/null 2>&1; then
    # Check for duplicate dependencies
    DEPS=$(jq -r '.dependencies // {} | keys[]' "$FILE_PATH" 2>/dev/null)
    DEV_DEPS=$(jq -r '.devDependencies // {} | keys[]' "$FILE_PATH" 2>/dev/null)

    for dep in $DEPS; do
        if echo "$DEV_DEPS" | grep -q "^$dep$"; then
            WARNINGS+=("Duplicate dependency: $dep (in both dependencies and devDependencies)")
        fi
    done
fi

# Display warnings
if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo "" >&2
    echo "⚠️  Package.json warnings:" >&2
    for warning in "${WARNINGS[@]}"; do
        echo "  ⚠️  $warning" >&2
    done
    echo "" >&2
fi

exit 0
