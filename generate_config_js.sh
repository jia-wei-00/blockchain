#!/bin/sh -eu
if [ -z "${API_URL:-}" ]; then
    API_URL='http://localhost:8002/api'
else
    API_URL="${API_URL}"
fi
if [ -z "${WEBSITE_URL:-}" ]; then
    WEBSITE_URL="http://localhost:3003"
else
    WEBSITE_URL="${WEBSITE_URL}"
fi

cat <<EOF
window.ENV = {
  API_URL: "$API_URL",
  WEBSITE_URL: "$WEBSITE_URL"
}
EOF