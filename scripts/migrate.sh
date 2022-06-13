#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd -P)"

CLEARDB_DATABASE_URL=$(heroku config:get CLEARDB_DATABASE_URL -a $HEROKU_PROJECT_NAME)
ARR=(${CLEARDB_DATABASE_URL//\// })
hosts=(${ARR[1]//@/ })
database=(${ARR[2]//\?/ })
userpass=(${hosts[0]//:/ })

mysql -u ${userpass[0]} -h ${hosts[1]} -p${userpass[1]} -D ${database[0]} < "$DIR/../go/build/db/sql/01_create_portfolio.sql"
mysql -u ${userpass[0]} -h ${hosts[1]} -p${userpass[1]} -D ${database[0]} < "$DIR/../go/build/db/sql/02_insert_portfolio.sql"
