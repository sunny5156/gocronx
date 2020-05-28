package project

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/go-macaron/binding"
	"github.com/sunny5156/gocronx/internal/models"
	"github.com/sunny5156/gocronx/internal/modules/logger"
	"github.com/sunny5156/gocronx/internal/modules/utils"
	"github.com/sunny5156/gocronx/internal/routers/base"
	"gopkg.in/macaron.v1"
)

const testConnectionCommand = "echo hello"
const testConnectionTimeout = 5

// Index 项目列表
func Index(ctx *macaron.Context) string {
	projectModel := new(models.Project)
	queryParams := parseQueryParams(ctx)
	total, err := projectModel.Total(queryParams)
	projects, err := projectModel.List(queryParams)
	if err != nil {
		logger.Error(err)
	}

	jsonResp := utils.JsonResponse{}

	return jsonResp.Success(utils.SuccessContent, map[string]interface{}{
		"total": total,
		"data":  projects,
	})
}

// All 获取所有项目
func All(ctx *macaron.Context) string {
	projectModel := new(models.Project)
	projectModel.PageSize = -1
	projects, err := projectModel.List(models.CommonMap{})
	if err != nil {
		logger.Error(err)
	}

	jsonResp := utils.JsonResponse{}

	fmt.Print(jsonResp)

	return jsonResp.Success(utils.SuccessContent, projects)
}

// Detail 项目详情
func Detail(ctx *macaron.Context) string {
	projectModel := new(models.Project)
	id := ctx.ParamsInt(":id")
	err := projectModel.Find(id)
	jsonResp := utils.JsonResponse{}
	fmt.Print(id)
	if err != nil || projectModel.Id == 0 {
		logger.Errorf("获取项目详情失败#项目id-%d", id)
		return jsonResp.Success(utils.SuccessContent, nil)
	}

	return jsonResp.Success(utils.SuccessContent, projectModel)
}

type ProjectForm struct {
	Id     int16
	Name   string `binding:"Required;MaxSize(64)"`
	Remark string `binding:"Required;MaxSize(500)"`
	Status models.Status
}

// Error 表单验证错误处理
func (f ProjectForm) Error(ctx *macaron.Context, errs binding.Errors) {
	if len(errs) == 0 {
		return
	}
	json := utils.JsonResponse{}
	content := json.CommonFailure("表单验证失败, 请检测输入")
	ctx.Write([]byte(content))
}

// Store 保存、修改项目信息
func Store(ctx *macaron.Context, form ProjectForm) string {

	json := utils.JsonResponse{}
	projectModel := new(models.Project)
	id := form.Id

	nameExist, err := projectModel.NameExists(form.Name, form.Id)
	if err != nil {
		return json.CommonFailure("操作失败", err)
	}
	if nameExist {
		return json.CommonFailure("项目名已存在")
	}

	projectModel.Name = strings.TrimSpace(form.Name)
	projectModel.Remark = strings.TrimSpace(form.Remark)
	projectModel.UserId = Uid(ctx) //增加任务创建者 @sunny5156 2019年10月7日16:19:56
	// isCreate := false
	oldprojectModel := new(models.Project)
	err = oldprojectModel.Find(int(id))
	if err != nil {
		return json.CommonFailure("项目不存在")
	}

	if id > 0 {
		_, err = projectModel.UpdateBean(id)
	} else {
		// isCreate = true
		id, err = projectModel.Create()
	}
	if err != nil {
		return json.CommonFailure("保存失败", err)
	}

	return json.Success("保存成功", id)
}

// Remove 删除项目
func Remove(ctx *macaron.Context) string {
	id, err := strconv.Atoi(ctx.Params(":id"))
	json := utils.JsonResponse{}
	if err != nil {
		return json.CommonFailure("参数错误", err)
	}
	taskprojectModel := new(models.TaskHost)
	exist, err := taskprojectModel.HostIdExist(int16(id))
	if err != nil {
		return json.CommonFailure("操作失败", err)
	}
	if exist {
		return json.CommonFailure("有任务引用此项目，不能删除")
	}

	projectModel := new(models.Project)
	err = projectModel.Find(int(id))
	if err != nil {
		return json.CommonFailure("项目不存在")
	}

	_, err = projectModel.Delete(id)
	if err != nil {
		return json.CommonFailure("操作失败", err)
	}

	return json.Success("操作成功", nil)
}

// 解析查询参数
func parseQueryParams(ctx *macaron.Context) models.CommonMap {
	var params = models.CommonMap{}
	params["Id"] = ctx.QueryInt("id")
	params["Name"] = ctx.QueryTrim("name")
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
