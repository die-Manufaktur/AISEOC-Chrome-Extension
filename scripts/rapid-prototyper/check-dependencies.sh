#!/bin/bash
# Dependency Checker for Rapid Prototyping
# Checks package.json and installs dependencies if needed
# Exit 0 (warn) - warns about missing dependencies but doesn't block

echo "🔍 Checking project dependencies..." >&2

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "ℹ️  No package.json found - not a Node.js project" >&2
    exit 0
fi

# Determine package manager
if [ -f "pnpm-lock.yaml" ]; then
    PKG_MANAGER="pnpm"
    LOCK_FILE="pnpm-lock.yaml"
elif [ -f "yarn.lock" ]; then
    PKG_MANAGER="yarn"
    LOCK_FILE="yarn.lock"
else
    PKG_MANAGER="npm"
    LOCK_FILE="package-lock.json"
fi

echo "  Package manager: $PKG_MANAGER" >&2

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules directory missing" >&2
    echo "  Installing dependencies with $PKG_MANAGER..." >&2

    $PKG_MANAGER install 2>&1 | head -n 10 >&2

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo "  ✅ Dependencies installed successfully" >&2
    else
        echo "  ❌ Dependency installation failed" >&2
    fi
else
    echo "  ✓ node_modules exists" >&2

    # Check if lock file is newer than node_modules
    if [ -f "$LOCK_FILE" ]; then
        if [ "$LOCK_FILE" -nt "node_modules" ]; then
            echo "  ⚠️  Lock file is newer than node_modules" >&2
            echo "  Consider running: $PKG_MANAGER install" >&2
        fi
    fi
fi

# Check for common dev dependencies
DEV_DEPS=()
if grep -q "\"typescript\":" package.json; then
    if [ ! -d "node_modules/typescript" ]; then
        DEV_DEPS+=("typescript")
    fi
fi

if grep -q "\"@types/" package.json; then
    echo "  ℹ️  TypeScript types configured" >&2
fi

if [ ${#DEV_DEPS[@]} -gt 0 ]; then
    echo "  ⚠️  Some dependencies may be missing: ${DEV_DEPS[@]}" >&2
fi

exit 0
