package loginlog

import (
	"github.com/sunny5156/gocronx/internal/models"
	"github.com/sunny5156/gocronx/internal/modules/logger"
	"github.com/sunny5156/gocronx/internal/modules/utils"
	"github.com/sunny5156/gocronx/internal/routers/base"
	"gopkg.in/macaron.v1"
)

func Index(ctx *macaron.Context) string {
	loginLogModel := new(models.LoginLog)
	params := models.CommonMap{}
	base.ParsePageAndPageSize(ctx, params)
	total, err := loginLogModel.Total()
	loginLogs, err := loginLogModel.List(params)
	if err != nil {
		logger.Error(err)
	}

	jsonResp := utils.JsonResponse{}

	return jsonResp.Success(utils.SuccessContent, map[string]interface{}{
		"total": total,
		"data":  loginLogs,
	})
}
