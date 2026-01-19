#!/bin/bash
# Experiment Registry Updater
# Updates experiment registry when configs are modified
# Exit 0 (always - informational)

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only process experiment files
if [[ ! "$FILE_PATH" =~ (experiment|experiments)\.(json|yml|yaml)$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

# Create experiments directory
EXPERIMENTS_DIR=".claude/experiments"
mkdir -p "$EXPERIMENTS_DIR"

# Create/update registry
REGISTRY_FILE="$EXPERIMENTS_DIR/registry.json"

# Initialize registry if it doesn't exist
if [ ! -f "$REGISTRY_FILE" ]; then
    echo '{"experiments": [], "last_updated": ""}' > "$REGISTRY_FILE"
fi

TIMESTAMP=$(date -Iseconds 2>/dev/null || date)

# Extract experiment info from the file
if [[ "$FILE_PATH" =~ \.json$ ]]; then
    # Parse JSON experiments
    if jq -e 'if type == "array" then true else false end' "$FILE_PATH" > /dev/null 2>&1; then
        # Array of experiments
        EXPERIMENT_COUNT=$(jq 'length' "$FILE_PATH")

        echo "📝 Updating experiment registry..." >&2
        echo "   File: $FILE_PATH" >&2
        echo "   Experiments: $EXPERIMENT_COUNT" >&2

        # Update registry (simplified - just track the file)
        EXISTING_REGISTRY=$(cat "$REGISTRY_FILE")
        UPDATED_REGISTRY=$(echo "$EXISTING_REGISTRY" | jq \
            --arg file "$FILE_PATH" \
            --arg timestamp "$TIMESTAMP" \
            --argjson count "$EXPERIMENT_COUNT" \
            '.experiments = (.experiments | map(select(.file != $file))) + [{file: $file, count: $count, last_modified: $timestamp}] | .last_updated = $timestamp')

        echo "$UPDATED_REGISTRY" > "$REGISTRY_FILE"

        echo "  ✓ Registry updated" >&2
    fi
fi

exit 0
