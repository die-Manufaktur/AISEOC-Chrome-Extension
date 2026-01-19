#!/bin/bash
# Experiment Config Validator
# Validates experiment JSON schemas
# Exit 0 (warn) or Exit 2 (block on invalid config)

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check experiment configuration files
if [[ ! "$FILE_PATH" =~ (experiment|experiments)\.(json|yml|yaml)$ ]]; then
    exit 0
fi

# Check if file exists
if [[ ! -f "$FILE_PATH" ]]; then
    exit 0
fi

echo "🔍 Validating experiment configuration: $FILE_PATH" >&2

FILE_EXT="${FILE_PATH##*.}"

case "$FILE_EXT" in
    json)
        # Validate JSON structure
        if ! jq '.' "$FILE_PATH" > /dev/null 2>&1; then
            echo "❌ Invalid JSON in $FILE_PATH" >&2
            exit 2
        fi

        # Check for required fields
        CONTENT=$(cat "$FILE_PATH")

        # Check if it's an array of experiments
        if echo "$CONTENT" | jq -e 'if type == "array" then true else false end' > /dev/null 2>&1; then
            # Validate each experiment
            COUNT=$(echo "$CONTENT" | jq 'length')
            echo "  Found $COUNT experiment(s)" >&2

            for i in $(seq 0 $((COUNT - 1))); do
                EXP_NAME=$(echo "$CONTENT" | jq -r ".[$i].name // \"unnamed-$i\"")

                # Check for required fields
                if ! echo "$CONTENT" | jq -e ".[$i].id" > /dev/null 2>&1; then
                    echo "  ⚠️  Experiment '$EXP_NAME' missing 'id' field" >&2
                fi

                if ! echo "$CONTENT" | jq -e ".[$i].variants" > /dev/null 2>&1; then
                    echo "  ⚠️  Experiment '$EXP_NAME' missing 'variants' field" >&2
                fi
            done
        fi

        echo "  ✓ JSON structure valid" >&2
        ;;

    yml|yaml)
        # Basic YAML validation (require yq or python)
        if command -v yq &> /dev/null; then
            if yq eval '.' "$FILE_PATH" > /dev/null 2>&1; then
                echo "  ✓ YAML structure valid" >&2
            else
                echo "❌ Invalid YAML in $FILE_PATH" >&2
                exit 2
            fi
        elif command -v python3 &> /dev/null; then
            if python3 -c "import yaml; yaml.safe_load(open('$FILE_PATH'))" 2>&1; then
                echo "  ✓ YAML structure valid" >&2
            else
                echo "❌ Invalid YAML in $FILE_PATH" >&2
                exit 2
            fi
        else
            echo "  ⚠️  Cannot validate YAML - install yq or python3" >&2
        fi
        ;;
esac

exit 0
