package model

import (
	"time"

	"github.com/uptrace/bun"
)

// Portfolio ポートフォリオ
type Portfolio struct {
	bun.BaseModel `pg:"-" bun:"portfolio"`
	Id            int64     `json:"id,omitempty" bun:"id,notnull,autoincrement,pk"`
	Title         string    `json:"title,omitempty" bun:"title,notnull"`
	Image         string    `json:"image,omitempty" bun:"image,notnull"`
	Category      string    `json:"category,omitempty" bun:"category,notnull"`
	Description   string    `json:"description,omitempty" bun:"description,notnull"`
	SkillLevel    int8      `json:"skillLevel,omitempty" bun:"skill_level,notnull"`
	CreatedAt     time.Time `json:"createdAt,omitempty" bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt     time.Time `json:"updatedAt,omitempty" bun:",nullzero,notnull,default:current_timestamp"`
}

// IsRequired Required判定
func (r *Portfolio) IsRequired() bool {
	if r.Title == "" {
		return false
	}

	if r.Category == "" {
		return false
	}

	if r.Image == "" {
		return false
	}

	if r.Description == "" {
		return false
	}

	if r.SkillLevel == 0 {
		return false
	}
	return true
}

// PortfolioResponse Portfolioレスポンス
type PortfolioResponse struct {
	Message    string       `json:"message,omitempty"`
	Portfolios []*Portfolio `json:"portfolios,omitempty"`
	Portfolio  []*Portfolio `json:"portfolio,omitempty"`
}
