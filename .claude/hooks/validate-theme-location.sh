#!/bin/bash
# Project-Level Hook: Validate Theme File Location
# Blocks ANY Write/Edit operation targeting wp-content/themes/
# This runs for ALL agents, not just figma-fse-converter
#
# Exit 0: Path is valid
# Exit 2: Path is invalid (blocks operation)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# No file path = not a file operation, allow
if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# Check if path targets wp-content
if echo "$FILE_PATH" | grep -qE 'wp-content/(themes|plugins|mu-plugins)/'; then
    echo "" >&2
    echo "❌ BLOCKED: File targets wp-content/ directory" >&2
    echo "   Path: $FILE_PATH" >&2
    echo "" >&2
    echo "   This project uses root-level folders:" >&2
    echo "   ✅ themes/[name]/...     (not wp-content/themes/)" >&2
    echo "   ✅ plugins/[name]/...    (not wp-content/plugins/)" >&2
    echo "" >&2

    # Suggest the corrected path
    CORRECTED=$(echo "$FILE_PATH" | sed 's|wp-content/themes/|themes/|; s|wp-content/plugins/|plugins/|; s|wp-content/mu-plugins/|mu-plugins/|')
    echo "   Suggested: $CORRECTED" >&2
    echo "" >&2
    exit 2
fi

exit 0
