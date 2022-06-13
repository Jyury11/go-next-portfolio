package adapterbun

import (
	"context"
	"database/sql"
	"errors"

	"github.com/Jyury11/go-next-portfolio/internal/entity/model"
	"github.com/Jyury11/go-next-portfolio/internal/entity/repository"

	"github.com/uptrace/bun"
)

// Repository RepositoryBun
type Repository struct {
	db *bun.DB
}

// New RepositoryBunコンストラクタ
func New(db *bun.DB) repository.Repository {
	return &Repository{db}
}

// ReadPortfolio ポートフォリオ検索
func (r *Repository) ReadPortfolios(ctx context.Context) ([]*model.Portfolio, error) {
	us := []*model.Portfolio{}
	if err := r.db.NewSelect().Model(&us).Scan(ctx); err != nil {
		return nil, err
	}
	return us, nil
}

// ReadPortfolioById ポートフォリオ検索(ID検索)
func (r *Repository) ReadPortfolioById(ctx context.Context, id int64) (*model.Portfolio, error) {
	var u model.Portfolio
	if err := r.db.NewSelect().Model(&u).Where("id = ?", id).Scan(ctx); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, repository.ErrorNotFound
		}
		return nil, err
	}
	return &u, nil
}

// DeletePortfolioById ポートフォリオ削除(ID指定)
func (r *Repository) DeletePortfolioById(ctx context.Context, id int64) (bool, error) {
	ok := false
	err := r.db.RunInTx(ctx, nil, func(ctx context.Context, tx bun.Tx) error {
		var u *model.Portfolio
		res, err := tx.NewDelete().Model(u).Where("id = ?", id).Exec(ctx)
		if err != nil {
			return err
		}
		affectRows, err := res.RowsAffected()
		if 0 < affectRows {
			ok = true
		}
		return err
	})
	return ok, err
}

// CreatePortfolio ポートフォリオ作成
func (r *Repository) CreatePortfolio(ctx context.Context, u *model.Portfolio) (*model.Portfolio, error) {
	var ret model.Portfolio
	err := r.db.RunInTx(ctx, nil, func(ctx context.Context, tx bun.Tx) error {
		res, err := tx.NewInsert().Model(u).Exec(ctx)
		if err != nil {
			return err
		}
		id, err := res.LastInsertId()
		if err != nil {
			return err
		}
		return tx.NewSelect().Model(&ret).Where("id = ?", id).Scan(ctx)
	})
	if err != nil {
		return nil, err
	}
	return &ret, err
}

// UpdatePortfolio ポートフォリオ更新
func (r *Repository) UpdatePortfolio(ctx context.Context, u *model.Portfolio) (*model.Portfolio, error) {
	var ret model.Portfolio
	err := r.db.RunInTx(ctx, nil, func(ctx context.Context, tx bun.Tx) error {
		_, err := tx.NewUpdate().Model(u).Column("title", "image", "category", "description", "skill_level").Where("id = ?", u.Id).Exec(ctx)
		if err != nil {
			return err
		}
		return tx.NewSelect().Model(&ret).Where("id = ?", u.Id).Scan(ctx)
	})
	if err != nil {
		return nil, err
	}
	return &ret, nil
}
