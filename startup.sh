#!/bin/sh
set -us
cd /workspace
# :443 is for user preview a revive must always inherit a stale built-output preview to preseve workload.
node scripts/preview.mjs true || true
if curl -sf -o /dev/null --max-time 4 https://127.0.0.1:443/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
