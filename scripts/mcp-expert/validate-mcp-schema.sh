#!/bin/bash
# MCP Schema Validator
# Validates MCP JSON schema before writing
# Exit 0 (warn) or Exit 2 (block on invalid schema)

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

echo "🔍 Validating MCP configuration: $FILE_PATH" >&2

# Validate JSON syntax (strip comments for .jsonc files)
if [[ "$FILE_PATH" =~ \.jsonc$ ]]; then
    # Strip single-line comments for validation
    CONTENT=$(grep -v '^\s*//' "$FILE_PATH")
else
    CONTENT=$(cat "$FILE_PATH")
fi

if ! echo "$CONTENT" | jq '.' > /dev/null 2>&1; then
    echo "❌ Invalid JSON in $FILE_PATH" >&2
    exit 2
fi

echo "  ✓ Valid JSON syntax" >&2

# Check for MCP-specific structure
if ! echo "$CONTENT" | jq -e '.mcpServers' > /dev/null 2>&1; then
    echo "  ⚠️  Missing 'mcpServers' field - may not be a valid MCP config" >&2
fi

# Validate each server configuration
if echo "$CONTENT" | jq -e '.mcpServers' > /dev/null 2>&1; then
    SERVER_COUNT=$(echo "$CONTENT" | jq '.mcpServers | length')
    echo "  Found $SERVER_COUNT MCP server(s)" >&2

    SERVERS=$(echo "$CONTENT" | jq -r '.mcpServers | keys[]')

    for server in $SERVERS; do
        # Check for required fields
        if ! echo "$CONTENT" | jq -e ".mcpServers.\"$server\".command" > /dev/null 2>&1; then
            echo "  ⚠️  Server '$server' missing 'command' field" >&2
        fi

        # Check if command is executable
        COMMAND=$(echo "$CONTENT" | jq -r ".mcpServers.\"$server\".command")
        if [ -n "$COMMAND" ] && [ "$COMMAND" != "null" ]; then
            if ! command -v "$COMMAND" &> /dev/null; then
                echo "  ⚠️  Server '$server' command not found: $COMMAND" >&2
            else
                echo "  ✓ Server '$server' command found: $COMMAND" >&2
            fi
        fi
    done
fi

exit 0
