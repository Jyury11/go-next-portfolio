#!/bin/bash
set -e

gcloud artifacts repositories create backend --repository-format=docker \
--location=asia-northeast1 --description="backend image"
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
