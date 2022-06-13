//go:build wireinject
// +build wireinject

package di

import (
	"github.com/Jyury11/go-next-portfolio/internal/adapters/adapterbun"
	"github.com/Jyury11/go-next-portfolio/internal/handler/gin"
	"github.com/Jyury11/go-next-portfolio/internal/service"
	"github.com/Jyury11/go-next-portfolio/pkg/db/bun"
	"github.com/google/wire"
)

// InitializePostgresAPI DIコンテナ作成
func InitializePostgresAPI() (*gin.Handler, func(), error) {
	wire.Build(
		bun.NewPostgresDsn,
		bun.NewPostgres,
		adapterbun.New,
		service.NewPortfolioService,
		gin.New,
	)
	return nil, nil, nil
}

// InitializeMysqlAPI DIコンテナ作成
func InitializeMysqlAPI() (*gin.Handler, func(), error) {
	wire.Build(
		bun.NewMysqlDsn,
		bun.NewMysql,
		adapterbun.New,
		service.NewPortfolioService,
		gin.New,
	)
	return nil, nil, nil
}
