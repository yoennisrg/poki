#!/bin/bash
set -e

echo "🐜 Ant $ANT is awakening..."
echo "🌿 Target: $REPOSITORY ($BRANCH)"

# Get identity
git config --global user.name "🐜 $ANT"
git config --global user.email "$EMAIL"
echo "👤 Identity configured: 🐜 $ANT"

# Gather territory
echo "📥 Gathering territory..."
gh repo clone "$REPOSITORY" -- --branch "$BRANCH" --single-branch --depth=1
gh auth setup-git
cd "$(basename "$REPOSITORY" .git)"
echo "✅ Territory secured"

# Load brain
echo "🧠 Loading brain..."
BRAIN_SIZE=$(wc -c < ".ants/gallery/$ANT.md" | tr -d ' ')
echo "   📖 Gallery: $BRAIN_SIZE bytes"
INSTINCT_SIZE=$(wc -c < ".ants/pheromones/instinct.md" | tr -d ' ')
echo "   🧬 Instinct: $INSTINCT_SIZE bytes"

PROMPT=$(cat ".ants/gallery/$ANT.md")$'\n\n'$(cat ".ants/pheromones/instinct.md")

if [ -n "$REALIGN_PROMPT" ]; then
  PROMPT="$PROMPT"$'\n\n'"---"$'\n'"Director Realignment:"$'\n'"$REALIGN_PROMPT"
  echo "   🧭 Realignment directive injected"
fi

echo "   🧠 Total brain: ${#PROMPT} bytes"

# Auth
if [ -n "$OPENCODE_API_KEY" ]; then
  mkdir -p ~/.local/share/opencode
  echo "{\"opencode\":{\"token\":\"$OPENCODE_API_KEY\"}}" > ~/.local/share/opencode/auth.json
fi

# Starting work
echo "🔨 Beginning work..."
opencode --model "$ANTS_MODEL" run "$PROMPT" --dangerously-skip-permissions || echo "❌ Work failed, keeping ant alive for debugging"

# Auto-merge open PR if exists
echo "🔀 Looking for open PR to merge..."
OPEN_PR=$(gh pr list --repo "$REPOSITORY" --state open --label "ant-$ANT" --json number --jq 'first | .number')
if [[ -n "$OPEN_PR" && "$OPEN_PR" != "null" ]]; then
  echo "🔀 Auto-merging PR #$OPEN_PR"
  gh pr merge "$OPEN_PR" --repo "$REPOSITORY" --squash || echo "⚠️ Merge failed — may need manual merge"
else
  echo "No open PR found for ant-$ANT"
fi

echo "✅ Ant $ANT completed mission"
