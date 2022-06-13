#!/bin/bash

DIR="$(cd "$(dirname "$0")" && pwd -P)"
gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable run.googleapis.com

export KO_DOCKER_REPO="asia-northeast1-docker.pkg.dev/$GOOGLE_PROJECT_ID/backend"
image=$(ko build "$DIR/../../go/cmd/api")
gcloud beta run deploy --image "$image" --platform managed --allow-unauthenticated
