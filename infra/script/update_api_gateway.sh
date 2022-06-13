#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd -P)"

API_NAME="$GOOGLE_PROJECT_ID-portfolio-gateway-api"
GATEWAY_NAME="$GOOGLE_PROJECT_ID-portfolio-gateway"
YAML_NAME="$DIR/../config/openapi.yaml"

CONFIG_NAME_OLD_ALL=$(gcloud api-gateway gateways describe $GATEWAY_NAME --location asia-northeast1 | grep apiConfig | grep --only-matching "/.*")
CONFIG_NAME_OLD=$(basename "$CONFIG_NAME_OLD_ALL")
CONFIG_NAME=$GOOGLE_PROJECT_ID-gateway-config-$(sha256sum "$YAML_NAME" | awk '{ print $1 }' | cut -c 1-20)

gcloud api-gateway api-configs create "$CONFIG_NAME" \
  --api=$API_NAME --openapi-spec="$YAML_NAME"

gcloud api-gateway gateways update $GATEWAY_NAME \
  --api=$API_NAME --api-config="$CONFIG_NAME" --location asia-northeast1

yes Y | gcloud api-gateway api-configs delete "$CONFIG_NAME_OLD" \
  --api=$API_NAME
