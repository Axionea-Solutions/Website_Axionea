#!/usr/bin/env bash
# Axionea Claude Code Status Line
# Displays: context usage, token breakdown (cached/new/output), model, cwd

input=$(cat)

# --- Context window data ---
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
ctx_size=$(echo "$input" | jq -r '.context_window.context_window_size // empty')
current=$(echo "$input" | jq -r '.context_window.current_usage // empty')

if [ -n "$current" ] && [ "$current" != "null" ]; then
  cache_read=$(echo "$input" | jq -r '.context_window.current_usage.cache_read_input_tokens // 0')
  cache_write=$(echo "$input" | jq -r '.context_window.current_usage.cache_creation_input_tokens // 0')
  input_tokens=$(echo "$input" | jq -r '.context_window.current_usage.input_tokens // 0')
  output_tokens=$(echo "$input" | jq -r '.context_window.current_usage.output_tokens // 0')
else
  cache_read=0
  cache_write=0
  input_tokens=0
  output_tokens=0
fi

# --- Model ---
model=$(echo "$input" | jq -r '.model.display_name // "Claude"')

# --- CWD (basename only) ---
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // ""')
cwd_short=$(basename "$cwd")

# --- Rate limits (Claude.ai subscription) ---
five_pct=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')

# --- Thinking ---
thinking=$(echo "$input" | jq -r '.thinking.enabled // false')

# --- Build output ---
parts=""

# Context usage bar
if [ -n "$used_pct" ]; then
  used_int=$(printf "%.0f" "$used_pct")
  # Color: green < 50, yellow 50-80, red > 80
  if [ "$used_int" -lt 50 ]; then
    ctx_color="\033[32m"   # green
  elif [ "$used_int" -lt 80 ]; then
    ctx_color="\033[33m"   # yellow
  else
    ctx_color="\033[31m"   # red
  fi
  parts="${parts}$(printf "${ctx_color}ctx: ${used_int}%%\033[0m")"
fi

# Token breakdown: cached | new | out
if [ "$cache_read" -gt 0 ] || [ "$input_tokens" -gt 0 ] || [ "$output_tokens" -gt 0 ]; then
  cache_k=$(awk "BEGIN { printf \"%.1f\", $cache_read / 1000 }")
  new_k=$(awk "BEGIN { printf \"%.1f\", $input_tokens / 1000 }")
  out_k=$(awk "BEGIN { printf \"%.1f\", $output_tokens / 1000 }")
  tok_str="\033[2mcached:${cache_k}k new:${new_k}k out:${out_k}k\033[0m"
  [ -n "$parts" ] && parts="${parts}  "
  parts="${parts}$(printf "$tok_str")"
fi

# Model name
if [ -n "$model" ]; then
  [ -n "$parts" ] && parts="${parts}  "
  parts="${parts}$(printf "\033[2m${model}\033[0m")"
fi

# Thinking indicator
if [ "$thinking" = "true" ]; then
  [ -n "$parts" ] && parts="${parts}  "
  parts="${parts}$(printf "\033[35mthinking\033[0m")"
fi

# 5-hour rate limit (only if present)
if [ -n "$five_pct" ]; then
  five_int=$(printf "%.0f" "$five_pct")
  [ -n "$parts" ] && parts="${parts}  "
  parts="${parts}$(printf "\033[2m5h: ${five_int}%%\033[0m")"
fi

# Current directory
if [ -n "$cwd_short" ]; then
  [ -n "$parts" ] && parts="${parts}  "
  parts="${parts}$(printf "\033[36m${cwd_short}\033[0m")"
fi

printf "$parts\n"
