#!/bin/bash
set -e

heroku config:get DATABASE_URL -a "$HEROKU_PROJECT_NAME" > secret.txt
gcloud secrets versions add DATABASE_URL --data-file ./secret.txt
rm -rf ./secret.txt
