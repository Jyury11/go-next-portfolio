package repository

import (
	"context"
	"errors"

	"github.com/Jyury11/go-next-portfolio/internal/entity/model"
)

// 定数定義
var (
	ErrorNotFound = errors.New("resource is not found")
)

// Repository リポジトリ
type Repository interface {
	ReadPortfolios(context.Context) ([]*model.Portfolio, error)
	ReadPortfolioById(context.Context, int64) (*model.Portfolio, error)
	DeletePortfolioById(context.Context, int64) (bool, error)
	CreatePortfolio(context.Context, *model.Portfolio) (*model.Portfolio, error)
	UpdatePortfolio(context.Context, *model.Portfolio) (*model.Portfolio, error)
}
