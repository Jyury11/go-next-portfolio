FROM --platform=linux/amd64 library/mysql:8.0.25

ENV MYSQL_DATABASE portfolio

COPY /build/db/custom.cnf /etc/mysql/conf.d/

COPY /build/db/sql /docker-entrypoint-initdb.d
