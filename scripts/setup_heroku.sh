#!/bin/bash
set -e

# heroku login
# heroku apps:create "$HEROKU_PROJECT_NAME"
# heroku addons:create cleardb:ignite -a $HEROKU_PROJECT_NAME

CLEARDB_DATABASE_URL=$(heroku config:get CLEARDB_DATABASE_URL -a $HEROKU_PROJECT_NAME)
ARR=(${CLEARDB_DATABASE_URL//\// })
hosts=(${ARR[1]//@/ })
database=(${ARR[2]//\?/ })
DATABASE_URL="${hosts[0]}@tcp(${hosts[1]}:3306)/${database[0]}?parseTime=1"
heroku config:set DATABASE_URL=${DATABASE_URL} -a $HEROKU_PROJECT_NAME
