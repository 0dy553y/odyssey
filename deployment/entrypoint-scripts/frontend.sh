#!/bin/bash
set -e

# Replace placeholders in env.js with values from the environment
envsubst < /frontend/env.template.js > /frontend/env.js

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"
