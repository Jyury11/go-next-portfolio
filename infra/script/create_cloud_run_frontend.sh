#!/bin/bash

DIR="$(cd "$(dirname "$0")" && pwd -P)"
gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable run.googleapis.com
image="asia-northeast1-docker.pkg.dev/aono-portfolio/frontend/frontend:latest"

cd "$DIR/../../typescript" && docker build -t $image "$DIR/../../typescript/"
docker push $image
gcloud beta run deploy --port 3000 --image "$image" --platform managed --allow-unauthenticated
