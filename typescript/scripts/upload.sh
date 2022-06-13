#!/bin/bash
set -e

gsutil rsync -d -R ./out/ gs://aono-portfolio-frontend/
gsutil acl ch -u AllUsers:R gs://aono-portfolio-frontend/**
gsutil acl ch -d AllUsers gs://aono-portfolio-frontend/admin.html
gsutil setmeta -h 'Cache-Control:no-cache' gs://aono-portfolio-frontend/**
# gsutil setmeta -h 'Cache-Control:public, max-age=600' gs://aono-portfolio-frontend/**
