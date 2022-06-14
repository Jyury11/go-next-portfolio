#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd -P)"

export KO_DOCKER_REPO="asia-northeast1-docker.pkg.dev/$GOOGLE_PROJECT_ID/backend"

ko resolve -f "$DIR/../config/backend_service.yaml" | gcloud beta run services replace -
