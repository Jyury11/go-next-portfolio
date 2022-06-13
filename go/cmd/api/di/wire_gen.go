// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package di

import (
	"github.com/Jyury11/go-next-portfolio/internal/adapters/adapterbun"
	"github.com/Jyury11/go-next-portfolio/internal/handler/gin"
	"github.com/Jyury11/go-next-portfolio/internal/service"
	"github.com/Jyury11/go-next-portfolio/pkg/db/bun"
)

// Injectors from wire.go:

// InitializePostgresAPI DIコンテナ作成
func InitializePostgresAPI() (*gin.Handler, func(), error) {
	string2 := bun.NewPostgresDsn()
	db, cleanup, err := bun.NewPostgres(string2)
	if err != nil {
		return nil, nil, err
	}
	repository := adapterbun.New(db)
	portfolioService := service.NewPortfolioService(repository)
	handler := gin.New(portfolioService)
	return handler, func() {
		cleanup()
	}, nil
}

// InitializeMysqlAPI DIコンテナ作成
func InitializeMysqlAPI() (*gin.Handler, func(), error) {
	string2 := bun.NewMysqlDsn()
	db, cleanup, err := bun.NewMysql(string2)
	if err != nil {
		return nil, nil, err
	}
	repository := adapterbun.New(db)
	portfolioService := service.NewPortfolioService(repository)
	handler := gin.New(portfolioService)
	return handler, func() {
		cleanup()
	}, nil
}