#!/bin/bash
set -e

gcloud artifacts repositories create frontend --repository-format=docker \
--location=asia-northeast1 --description="frontend image"
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
