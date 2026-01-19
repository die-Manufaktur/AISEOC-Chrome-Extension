#!/bin/bash
# Frontend Linter and Formatter
# Automatically runs linting and formatting on saved files
# Exit 0 (warn) - displays issues but doesn't block

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

# Determine file type and run appropriate linter
FILE_EXT="${FILE_PATH##*.}"

case "$FILE_EXT" in
    js|jsx|ts|tsx|mjs|cjs)
        echo "🔍 Checking JavaScript/TypeScript file: $FILE_PATH" >&2

        # Check for ESLint
        if [ -f "node_modules/.bin/eslint" ] || command -v eslint &> /dev/null; then
            ESLINT_CMD="npx eslint"

            # Check if there's an ESLint config
            if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f ".eslintrc.yml" ] || [ -f "eslint.config.js" ]; then
                echo "  Running ESLint..." >&2
                OUTPUT=$($ESLINT_CMD "$FILE_PATH" 2>&1 || true)

                if echo "$OUTPUT" | grep -q "error\|warning"; then
                    echo "" >&2
                    echo "$OUTPUT" >&2
                    echo "" >&2
                fi

                # Try to fix issues
                $ESLINT_CMD --fix "$FILE_PATH" 2>&1 >/dev/null || true
                echo "  ✓ Auto-fix attempted" >&2
            fi
        fi

        # Check for Prettier
        if [ -f "node_modules/.bin/prettier" ] || command -v prettier &> /dev/null; then
            echo "  Running Prettier..." >&2
            npx prettier --write "$FILE_PATH" 2>&1 >/dev/null || true
            echo "  ✓ Formatted with Prettier" >&2
        fi
        ;;

    css|scss|sass|less)
        echo "🔍 Checking CSS file: $FILE_PATH" >&2

        # Check for Stylelint
        if [ -f "node_modules/.bin/stylelint" ] || command -v stylelint &> /dev/null; then
            if [ -f ".stylelintrc.js" ] || [ -f ".stylelintrc.json" ] || [ -f "stylelint.config.js" ]; then
                echo "  Running Stylelint..." >&2
                OUTPUT=$(npx stylelint "$FILE_PATH" 2>&1 || true)

                if echo "$OUTPUT" | grep -q "error\|warning"; then
                    echo "" >&2
                    echo "$OUTPUT" >&2
                    echo "" >&2
                fi

                # Try to fix issues
                npx stylelint --fix "$FILE_PATH" 2>&1 >/dev/null || true
                echo "  ✓ Auto-fix attempted" >&2
            fi
        fi

        # Check for Prettier
        if [ -f "node_modules/.bin/prettier" ] || command -v prettier &> /dev/null; then
            echo "  Running Prettier..." >&2
            npx prettier --write "$FILE_PATH" 2>&1 >/dev/null || true
            echo "  ✓ Formatted with Prettier" >&2
        fi
        ;;

    json|md|yml|yaml)
        # Just format with Prettier if available
        if [ -f "node_modules/.bin/prettier" ] || command -v prettier &> /dev/null; then
            echo "🔍 Formatting $FILE_EXT file: $FILE_PATH" >&2
            npx prettier --write "$FILE_PATH" 2>&1 >/dev/null || true
            echo "  ✓ Formatted with Prettier" >&2
        fi
        ;;

    *)
        # Unknown file type, skip
        exit 0
        ;;
esac

# Always exit 0 (warn, don't block)
exit 0
