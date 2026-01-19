#!/bin/bash
# Experiment State Saver
# Persists experiment state when agent completes
# Exit 0 (always - informational)

# Create experiments directory
EXPERIMENTS_DIR=".claude/experiments"
mkdir -p "$EXPERIMENTS_DIR"

# Check for experiment files
EXPERIMENT_FILES=()

# Look for experiment configurations
while IFS= read -r file; do
    EXPERIMENT_FILES+=("$file")
done < <(find . -maxdepth 3 -type f \( -name "*experiment*.json" -o -name "*experiments*.json" \) 2>/dev/null)

if [ ${#EXPERIMENT_FILES[@]} -eq 0 ]; then
    echo "ℹ️  No experiment files found" >&2
    exit 0
fi

# Create state snapshot
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
STATE_FILE="$EXPERIMENTS_DIR/state_$TIMESTAMP.json"

# Build state snapshot
cat > "$STATE_FILE" <<EOF
{
  "timestamp": "$(date -Iseconds 2>/dev/null || date)",
  "experiment_files": [
EOF

FIRST=true
for file in "${EXPERIMENT_FILES[@]}"; do
    if [ "$FIRST" = false ]; then
        echo "," >> "$STATE_FILE"
    fi
    FIRST=false

    # Get file info
    FILE_SIZE=$(wc -c < "$file" 2>/dev/null || echo "0")

    echo -n "    {" >> "$STATE_FILE"
    echo -n "\"path\": \"$file\", " >> "$STATE_FILE"
    echo -n "\"size\": $FILE_SIZE" >> "$STATE_FILE"

    # Try to extract experiment count
    if [[ "$file" =~ \.json$ ]]; then
        if jq -e 'if type == "array" then true else false end' "$file" > /dev/null 2>&1; then
            EXP_COUNT=$(jq 'length' "$file" 2>/dev/null || echo "0")
            echo -n ", \"experiment_count\": $EXP_COUNT" >> "$STATE_FILE"
        fi
    fi

    echo -n "}" >> "$STATE_FILE"
done

echo "" >> "$STATE_FILE"
echo "  ]" >> "$STATE_FILE"
echo "}" >> "$STATE_FILE"

echo "✅ Experiment state saved to: $STATE_FILE" >&2
echo "   Experiment files tracked: ${#EXPERIMENT_FILES[@]}" >&2

# Create state index
INDEX_FILE="$EXPERIMENTS_DIR/index.md"
if [ ! -f "$INDEX_FILE" ]; then
    cat > "$INDEX_FILE" <<EOF
# Experiment State History

## States

EOF
fi

# Add this state to index
echo "- [$TIMESTAMP](./state_$TIMESTAMP.json)" >> "$INDEX_FILE"

exit 0
