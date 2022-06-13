package service

import (
	"context"

	"github.com/Jyury11/go-next-portfolio/internal/entity/model"
	"github.com/Jyury11/go-next-portfolio/internal/entity/repository"
)

// PortfolioService ポートフォリオサービス
type PortfolioService struct {
	repo repository.Repository
}

// NewPortfolioService ポートフォリオサービスコンストラクタ
func NewPortfolioService(repo repository.Repository) *PortfolioService {
	return &PortfolioService{repo}
}

// FindAll ポートフォリオ検索
func (s *PortfolioService) FindAll(ctx context.Context) ([]*model.Portfolio, error) {
	return s.repo.ReadPortfolios(ctx)
}

// FindById ポートフォリオ検索(ID指定)
func (s *PortfolioService) FindById(ctx context.Context, id int) (*model.Portfolio, error) {
	return s.repo.ReadPortfolioById(ctx, int64(id))
}

// Update ポートフォリオ更新
func (s *PortfolioService) Update(ctx context.Context, t *model.Portfolio) (*model.Portfolio, error) {
	return s.repo.UpdatePortfolio(ctx, t)
}

// DeleteById ポートフォリオ削除(ID指定)
func (s *PortfolioService) DeleteById(ctx context.Context, id int) (bool, error) {
	return s.repo.DeletePortfolioById(ctx, int64(id))
}

// Create ポートフォリオ作成
func (s *PortfolioService) Create(ctx context.Context, t *model.Portfolio) (*model.Portfolio, error) {
	return s.repo.CreatePortfolio(ctx, t)
}
