#!/bin/bash
# MCP Config Tester
# Tests MCP configuration validity
# Exit 0 (warn) - displays test results but doesn't block

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check MCP configuration files
if [[ ! "$FILE_PATH" =~ (mcp|claude_desktop_config)\.(json|jsonc)$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

echo "🧪 Testing MCP configuration: $FILE_PATH" >&2

# Strip comments if .jsonc
if [[ "$FILE_PATH" =~ \.jsonc$ ]]; then
    CONTENT=$(grep -v '^\s*//' "$FILE_PATH")
else
    CONTENT=$(cat "$FILE_PATH")
fi

# Parse configuration
if ! echo "$CONTENT" | jq '.' > /dev/null 2>&1; then
    echo "  ❌ Cannot test - invalid JSON" >&2
    exit 0
fi

# Test each server configuration
if echo "$CONTENT" | jq -e '.mcpServers' > /dev/null 2>&1; then
    SERVERS=$(echo "$CONTENT" | jq -r '.mcpServers | keys[]')

    for server in $SERVERS; do
        echo "" >&2
        echo "Testing server: $server" >&2

        # Get command and args
        COMMAND=$(echo "$CONTENT" | jq -r ".mcpServers.\"$server\".command")
        ARGS=$(echo "$CONTENT" | jq -r ".mcpServers.\"$server\".args // [] | join(\" \")")

        # Check command exists
        if command -v "$COMMAND" &> /dev/null; then
            echo "  ✓ Command found: $COMMAND" >&2

            # Try to get version if possible
            if echo "$COMMAND" | grep -q "node"; then
                VERSION=$($COMMAND --version 2>&1 | head -n 1 || echo "unknown")
                echo "  ℹ️  Version: $VERSION" >&2
            fi
        else
            echo "  ❌ Command not found: $COMMAND" >&2
            echo "  Install with: npm install -g $COMMAND" >&2
        fi

        # Check environment variables
        if echo "$CONTENT" | jq -e ".mcpServers.\"$server\".env" > /dev/null 2>&1; then
            ENV_VARS=$(echo "$CONTENT" | jq -r ".mcpServers.\"$server\".env | keys[]")
            echo "  Environment variables:" >&2
            for var in $ENV_VARS; do
                VALUE=$(echo "$CONTENT" | jq -r ".mcpServers.\"$server\".env.\"$var\"")
                if [ -z "$VALUE" ] || [ "$VALUE" = "null" ]; then
                    echo "    ⚠️  $var is not set" >&2
                else
                    echo "    ✓ $var is set" >&2
                fi
            done
        fi
    done
else
    echo "  ℹ️  No MCP servers configured" >&2
fi

exit 0
