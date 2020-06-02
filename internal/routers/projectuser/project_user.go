package projectuser

import (
	"strconv"
	"strings"

	"github.com/go-macaron/binding"
	"github.com/sunny5156/gocronx/internal/models"
	"github.com/sunny5156/gocronx/internal/modules/logger"
	"github.com/sunny5156/gocronx/internal/modules/utils"
	"github.com/sunny5156/gocronx/internal/routers/base"
	"gopkg.in/macaron.v1"
)

type ProjectUserForm struct {
	Id        int
	UserId    int
	ProjectId int
	IsManager int
}

type ProjectUsersForm struct {
	ProjectId     int
	SelectUserIds []int
}

// Error 表单验证错误处理
func (f ProjectUserForm) Error(ctx *macaron.Context, errs binding.Errors) {
	if len(errs) == 0 {
		return
	}
	json := utils.JsonResponse{}
	content := json.CommonFailure("表单验证失败, 请检测输入")
	ctx.Write([]byte(content))
}

//项目用户
func Index(ctx *macaron.Context) string {

	jsonResp := utils.JsonResponse{}
	projectId := ctx.ParamsInt(":id")

	if projectId == 0 {
		return jsonResp.CommonFailure("项目ID不能为空")
	}

	projectUserModel := new(models.ProjectUser)
	queryParams := parseQueryParams(ctx)
	total, err := projectUserModel.Total(queryParams)
	projectUsers, err := projectUserModel.List(queryParams)

	// fmt.Println("-----------------ceshi---------------")
	// fmt.Print(projectId)
	// fmt.Printf("%T", projectUsers)
	// fmt.Println("-----------------ceshi---------------")

	if err != nil {
		logger.Error(err)
	}

	return jsonResp.Success(utils.SuccessContent, map[string]interface{}{
		"total": total,
		"data":  projectUsers,
	})

}

//添加项目用户
func Store(ctx *macaron.Context) string {

	json := utils.JsonResponse{}

	projectId := ctx.QueryInt("projectId")
	userIds := strings.Split(ctx.QueryTrim("userIds"), ",")

	for _, userId := range userIds {

		tmpUserId, _ := strconv.Atoi(userId)

		oldProjectUserModel := new(models.ProjectUser)
		num, _ := oldProjectUserModel.UserExists(tmpUserId, projectId)
		if !num {
			projectUserModel := new(models.ProjectUser)
			projectUserModel.ProjectId = projectId
			projectUserModel.UserId = tmpUserId
			projectUserModel.IsManager = 0
			projectUserModel.Create()
		}

	}

	return json.Success("保存成功", 0)

}

// Remove 删除项目用户
func Remove(ctx *macaron.Context) string {
	id, err := strconv.Atoi(ctx.Params(":id"))
	json := utils.JsonResponse{}
	if err != nil {
		return json.CommonFailure("参数错误", err)
	}

	projectUserModel := new(models.ProjectUser)
	isExists, _ := projectUserModel.Find(int(id))
	if !isExists {
		return json.CommonFailure("项目用户不存在")
	}

	_, err = projectUserModel.Delete(id)
	if err != nil {
		return json.CommonFailure("操作失败", err)
	}

	return json.Success("操作成功", nil)
}

// 解析查询参数
func parseQueryParams(ctx *macaron.Context) models.CommonMap {
	var params = models.CommonMap{}
	params["UserId"] = ctx.QueryInt("user_id")
	params["UserName"] = ctx.QueryTrim("name")
	params["ProjectId"] = ctx.QueryInt("project_id")
	base.ParsePageAndPageSize(ctx, params)

	return params
}

// Uid 获取session中的Uid
func Uid(ctx *macaron.Context) int {
	uidInterface, ok := ctx.Data["uid"]
	if !ok {
		return 0
	}
	if uid, ok := uidInterface.(int); ok {
		return uid
	} else {
		return 0
	}
}
