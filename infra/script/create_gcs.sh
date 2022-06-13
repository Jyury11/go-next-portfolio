#!/bin/bash
set -e

gsutil mb -p $GOOGLE_PROJECT_ID -l asia-northeast1 "gs://$GOOGLE_PROJECT_ID-frontend"
