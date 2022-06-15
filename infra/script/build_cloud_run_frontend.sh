#!/bin/bash

DIR="$(cd "$(dirname "$0")" && pwd -P)"
image="asia-northeast1-docker.pkg.dev/aono-portfolio/frontend/frontend:latest"

cd "$DIR/../../typescript" && docker build -t $image "$DIR/../../typescript/"
docker push $image
gcloud beta run deploy frontend --port 3000 --region asia-northeast1 --image "$image" --platform managed --allow-unauthenticated
