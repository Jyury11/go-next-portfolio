#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd -P)"

API_NAME="$GOOGLE_PROJECT_ID-portfolio-gateway-api"
GATEWAY_NAME="$GOOGLE_PROJECT_ID-portfolio-gateway"
YAML_NAME="$DIR/../config/openapi.yaml"
CONFIG_NAME=$GOOGLE_PROJECT_ID-gateway-config-$(sha256sum "$YAML_NAME" | awk '{ print $1 }' | cut -c 1-20)

gcloud services enable apigateway.googleapis.com
gcloud services enable servicecontrol.googleapis.com

gcloud api-gateway api-configs create "$CONFIG_NAME" \
  --api=$API_NAME --openapi-spec="$YAML_NAME"

gcloud api-gateway gateways create $GATEWAY_NAME \
  --api=$API_NAME --api-config="$CONFIG_NAME" --location asia-northeast1
