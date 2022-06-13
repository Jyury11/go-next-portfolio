package bun

import (
	"database/sql"
	"fmt"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/mysqldialect"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

// New bun.DB作成
func NewPostgres(dsn string) (*bun.DB, func(), error) {
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())
	if os.Getenv("GO_ENV") == "development" {
		db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))
	}
	return db, func() { db.Close() }, nil
}

// New bun.DB作成
func NewMysql(dsn string) (*bun.DB, func(), error) {
	sqldb, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	db := bun.NewDB(sqldb, mysqldialect.New())
	if os.Getenv("GO_ENV") == "development" {
		db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))
	}
	return db, func() { db.Close() }, nil
}

// NewPostgresDsn bun.DB作成
func NewPostgresDsn() string {
	return fmt.Sprintf("postgres://%s:%s@%s:5432/%s?sslmode=disable",
		"portfolio", "portfolio", "127.0.0.1", "todo",
	)
}

// NewMysqlDsn bun.DB作成
func NewMysqlDsn() string {
	if os.Getenv("GO_ENV") == "development" {
		return fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8",
			"portfolio", "portfolio", "api-db:3306", "portfolio",
		)
	}
	dbURL := os.Getenv("DATABASE_URL")
	return strings.TrimSpace(dbURL)
}
