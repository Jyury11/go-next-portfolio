#!/bin/bash
set -e
if [ -z "$(which gcloud)" ]; then
  echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
  sudo apt-get update && sudo apt-get install google-cloud-sdk

  gcloud auth login --no-launch-browser
  gcloud config unset compute/zone
  gcloud config set project "$GOOGLE_PROJECT_ID"
  gcloud config set account "$GOOGLE_ACCOUNT_ID"
  gcloud config set compute/region asia-northeast1
fi

if [ -z "$(which ko)" ]; then
  go install github.com/google/ko@latest
fi
