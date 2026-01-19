#!/bin/bash
# Build Checker
# Verifies build passes after code changes
# Exit 0 (warn) - displays build errors but doesn't block

# Read JSON input from stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only check build after certain commands
if [[ ! "$COMMAND" =~ (npm|pnpm|yarn|webpack|vite|rollup|esbuild) ]]; then
    exit 0
fi

# Skip if it's already a build command
if echo "$COMMAND" | grep -qE '(build|compile)'; then
    exit 0
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    exit 0
fi

# Check if there's a build script
if ! grep -q '"build":' package.json; then
    exit 0
fi

echo "🔨 Checking if build still passes..." >&2

# Determine package manager
if [ -f "pnpm-lock.yaml" ]; then
    PKG_MANAGER="pnpm"
elif [ -f "yarn.lock" ]; then
    PKG_MANAGER="yarn"
else
    PKG_MANAGER="npm"
fi

# Run build
BUILD_OUTPUT=$($PKG_MANAGER run build 2>&1)
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✅ Build passed successfully" >&2
else
    echo "" >&2
    echo "❌ Build failed:" >&2
    echo "$BUILD_OUTPUT" >&2
    echo "" >&2
    echo "⚠️  Please fix build errors before committing" >&2
fi

# Always exit 0 (warn, don't block)
exit 0
