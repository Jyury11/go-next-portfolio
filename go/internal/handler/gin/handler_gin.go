package gin

import (
	"errors"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/Jyury11/go-next-portfolio/internal/entity/model"
	"github.com/Jyury11/go-next-portfolio/internal/entity/repository"
	"github.com/Jyury11/go-next-portfolio/internal/service"
	pkgHttp "github.com/Jyury11/go-next-portfolio/pkg/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Handler
type Handler struct {
	portfoliosSrv *service.PortfolioService
}

// New Handlerコンストラクタ
func New(r *service.PortfolioService) *Handler {
	return &Handler{r}
}

// Run 実行
func (h *Handler) Run() error {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"http://host.docker.internal:3000",
			"https://storage.googleapis.com",
			"https://storage.cloud.google.com",
			"https://aono-portfolio-portfolio-gateway-1jhwe4ou.an.gateway.dev",
			"https://frontend-cc4oe6q3aa-an.a.run.app",
		},
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PUT",
			"PATCH",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Methods",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
			"authorization",
			"Accept",
			"X-Requested-With",
			"Origin",
			"X-Csrftoken",
			"x-api-key",
		},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	api := r.Group("/api")
	{
		v1 := api.Group("/v1")
		{
			h.AddPortfolioRoute(v1)
		}
	}
	return r.Run(":" + os.Getenv("PORT"))
}

// AddPortfolioRoute ポートフォリオルーティング追加
func (h *Handler) AddPortfolioRoute(r *gin.RouterGroup) {
	p := r.Group("/portfolios")
	{
		p.GET("/", h.findPortfolios)
		p.GET("/:id", h.findPortfolioById)
		p.DELETE("/:id", h.deletePortfolioById)
		p.PUT("/:id", h.updatePortfolio)
		p.POST("/", h.createPortfolio)
	}
}

// findPortfolios ポートフォリオ検索
func (h *Handler) findPortfolios(c *gin.Context) {
	Portfolio, err := h.portfoliosSrv.FindAll(c)
	if err != nil {
		log.Println(err)
		h.responseInternalServerError(c)
		return
	}
	c.JSON(http.StatusOK, model.PortfolioResponse{
		Portfolios: Portfolio,
	})
}

// findPortfolioById ポートフォリオ検索(ID指定)
func (h *Handler) findPortfolioById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println(err)
		h.responseBadRequest(c)
		return
	}

	Portfolio, err := h.portfoliosSrv.FindById(c, id)
	if err != nil {
		if errors.Is(err, repository.ErrorNotFound) {
			h.responseNotFound(c)
			return
		}
		log.Println(err)
		h.responseInternalServerError(c)
		return
	}
	c.JSON(http.StatusOK, model.PortfolioResponse{
		Message:   "Portfolio details by id",
		Portfolio: []*model.Portfolio{Portfolio},
	})
}

// deletePortfolioById ポートフォリオ削除(ID指定)
func (h *Handler) deletePortfolioById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println(err)
		h.responseBadRequest(c)
		return
	}

	ok, err := h.portfoliosSrv.DeleteById(c, id)
	if err != nil {
		log.Println(err)
		h.responseInternalServerError(c)
		return
	}
	if !ok {
		h.responseNotFound(c)
		return
	}
	h.responseOkFromDelete(c)
}

// updatePortfolio ポートフォリオ更新(ID指定)
func (h *Handler) updatePortfolio(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println(err)
		h.responseBadRequest(c)
		return
	}

	var u model.Portfolio
	if err := c.ShouldBindJSON(&u); err != nil {
		log.Println(err)
		h.responseBadRequestFromPatch(c)
		return
	}

	u.Id = int64(id)
	if !u.IsRequired() {
		h.responseBadRequestFromPatch(c)
		return
	}

	Portfolio, err := h.portfoliosSrv.Update(c, &u)
	if err != nil {
		if errors.Is(err, repository.ErrorNotFound) {
			h.responseNotFound(c)
			return
		}
		log.Println(err)
		h.responseInternalServerError(c)
		return
	}
	c.JSON(http.StatusOK, model.PortfolioResponse{
		Message:   "Portfolio successfully updated!",
		Portfolio: []*model.Portfolio{Portfolio},
	})
}

// createPortfolio ポートフォリオ作成(ID指定)
func (h *Handler) createPortfolio(c *gin.Context) {
	var u model.Portfolio
	if err := c.ShouldBindJSON(&u); err != nil {
		log.Println(err)
		h.responseBadRequestFromPost(c)
		return
	}

	if !u.IsRequired() {
		h.responseBadRequestFromPost(c)
		return
	}

	Portfolio, err := h.portfoliosSrv.Create(c, &u)
	if err != nil {
		log.Println(err)
		h.responseInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, model.PortfolioResponse{
		Message:   "Portfolio successfully created!",
		Portfolio: []*model.Portfolio{Portfolio},
	})
}

// responseOkFromDelete Delete成功レスポンス
func (h *Handler) responseOkFromDelete(c *gin.Context) {
	c.JSON(http.StatusOK, pkgHttp.Response{
		Message: "Portfolio successfully removed!",
	})
}

// responseBadRequest バッドリクエスト
func (h *Handler) responseBadRequest(c *gin.Context) {
	c.JSON(http.StatusBadRequest, pkgHttp.Response{
		Message: "400 bad request",
	})
}

// responseBadRequestFromPost バッドリクエスト(作成)
func (h *Handler) responseBadRequestFromPost(c *gin.Context) {
	c.JSON(http.StatusOK, pkgHttp.Response{
		Required: "title, category, describe, skill_level",
		Message:  "Portfolio creation failed!",
	})
}

// responseBadRequestFromPatch バッドリクエスト(更新)
func (h *Handler) responseBadRequestFromPatch(c *gin.Context) {
	c.JSON(http.StatusOK, pkgHttp.Response{
		Required: "title, category, describe, skill_level",
		Message:  "Portfolio update failed!",
	})
}

// responseNotFound リソースなし
func (h *Handler) responseNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, pkgHttp.Response{
		Message: "No Portfolio found",
	})
}

// responseInternalServerError サーバーエラー
func (h *Handler) responseInternalServerError(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, pkgHttp.Response{
		Message: "500 internal server error",
	})
}
