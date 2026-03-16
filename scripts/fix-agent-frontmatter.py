#!/usr/bin/env python3
"""Fix agent frontmatter by simplifying descriptions and converting markdown format."""

import os
import re
from pathlib import Path

AGENTS_DIR = Path(__file__).parent.parent / ".claude" / "agents"

# Known frontmatter keys that should start a new line
FRONTMATTER_KEYS = {"name:", "description:", "color:", "tools:", "model:", "permissionMode:"}

def extract_name_from_markdown(content: str) -> str:
    """Extract agent name from markdown header."""
    match = re.match(r"#\s+(.+)", content.strip())
    if match:
        # Convert "Content Creator" to "content-creator"
        name = match.group(1).strip()
        return name.lower().replace(" ", "-")
    return None

def extract_description_from_markdown(content: str) -> str:
    """Extract description from markdown format."""
    # Look for ## Description section
    match = re.search(r"## Description\s*\n+(.+?)(?=\n##|\n### Example|\Z)", content, re.DOTALL)
    if match:
        desc = match.group(1).strip()
        # Get first paragraph only
        first_para = desc.split("\n\n")[0]
        return first_para.replace("\n", " ").strip()
    return None

def extract_system_prompt(content: str) -> str:
    """Extract system prompt content from markdown format."""
    match = re.search(r"## System Prompt\s*\n+(.+)", content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return None

def convert_markdown_to_frontmatter(filepath: Path) -> bool:
    """Convert markdown format to frontmatter format."""
    content = filepath.read_text(encoding="utf-8")

    name = extract_name_from_markdown(content)
    if not name:
        print(f"  Could not extract name from {filepath.name}")
        return False

    description = extract_description_from_markdown(content)
    if not description:
        description = f"Use this agent for {name.replace('-', ' ')} tasks."

    system_prompt = extract_system_prompt(content)
    if not system_prompt:
        # Use everything after the description section
        system_prompt = f"You are a {name.replace('-', ' ')} specialist."

    # Build new content
    new_content = f"""---
name: {name}
description: {description}
tools: Read, Write, Bash, Grep, Glob
---

{system_prompt}
"""

    filepath.write_text(new_content, encoding="utf-8")
    return True

def simplify_description(description: str) -> str:
    """Remove Examples:\n... portion from description."""
    # Find where Examples: starts and truncate
    if "Examples:" in description:
        idx = description.find("Examples:")
        description = description[:idx].strip()

    # Also remove any remaining \n sequences at the end
    description = description.rstrip("\\n").strip()

    # Remove trailing period if double
    if description.endswith(".."):
        description = description[:-1]

    return description

def fix_frontmatter_file(filepath: Path) -> bool:
    """Fix a file with existing frontmatter."""
    content = filepath.read_text(encoding="utf-8")
    lines = content.split("\n")

    if not lines or lines[0].strip() != "---":
        return False

    # Find the end of frontmatter
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break

    if end_idx is None:
        return False

    # Process frontmatter lines - join multi-line values first
    frontmatter_lines = lines[1:end_idx]
    fixed_frontmatter = []
    current_key = None
    current_value_parts = []

    for line in frontmatter_lines:
        stripped = line.strip()

        # Check if this line starts with a known frontmatter key
        is_new_key = any(stripped.startswith(key) for key in FRONTMATTER_KEYS)

        if is_new_key:
            # Save previous key-value if exists
            if current_key:
                value = " ".join(current_value_parts)
                # Simplify description if it's the description key
                if current_key == "description:":
                    value = simplify_description(value)
                fixed_frontmatter.append(f"{current_key} {value}")

            # Parse new key
            colon_idx = stripped.find(":")
            current_key = stripped[:colon_idx + 1]
            current_value_parts = [stripped[colon_idx + 1:].strip()]
        else:
            # Continue previous value
            if current_key and stripped:
                current_value_parts.append(stripped)

    # Don't forget the last key
    if current_key:
        value = " ".join(current_value_parts)
        if current_key == "description:":
            value = simplify_description(value)
        fixed_frontmatter.append(f"{current_key} {value}")

    # Rebuild the file
    new_content_lines = ["---"] + fixed_frontmatter + ["---"] + lines[end_idx + 1:]
    new_content = "\n".join(new_content_lines)

    if new_content != content:
        filepath.write_text(new_content, encoding="utf-8")
        return True
    return False


def fix_agent_file(filepath: Path) -> bool:
    """Fix a single agent file. Returns True if changes were made."""
    content = filepath.read_text(encoding="utf-8")

    # Check if it's markdown format (starts with # Header)
    if content.strip().startswith("#") and not content.strip().startswith("---"):
        print(f"  Converting markdown format: {filepath.name}")
        return convert_markdown_to_frontmatter(filepath)

    # Otherwise fix frontmatter format
    return fix_frontmatter_file(filepath)


def main():
    if not AGENTS_DIR.exists():
        print(f"Agents directory not found: {AGENTS_DIR}")
        return

    agent_files = list(AGENTS_DIR.glob("*.md"))
    print(f"Found {len(agent_files)} agent files")

    fixed_count = 0
    for filepath in sorted(agent_files):
        was_fixed = fix_agent_file(filepath)
        if was_fixed:
            print(f"  Fixed: {filepath.name}")
            fixed_count += 1

    print(f"\nFixed {fixed_count} files")


if __name__ == "__main__":
    main()
