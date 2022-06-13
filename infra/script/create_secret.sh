#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd -P)"

gcloud secrets create DATABASE_URL
bash "$DIR/update_secret.sh"
