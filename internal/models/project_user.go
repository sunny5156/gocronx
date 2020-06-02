package models

import (
	"fmt"
	"time"

	"github.com/go-xorm/xorm"
)

// 项目
type ProjectUser struct {
	Id        int       `json:"id" xorm:"int pk autoincr"`
	UserId    int       `json:"user_id" xorm:"int notnull default 0"`    // 用户ID
	ProjectId int       `json:"name" xorm:"int notnull default 0"`       // 项目ID
	IsManager int       `json:"is_manager" xorm:"int notnull default 0"` // 是否是管理员
	Created   time.Time `json:"created" xorm:"datetime notnull created"` // 创建时间
	BaseModel `json:"-" xorm:"-"`
	Selected  bool `json:"-" xorm:"-"`
	UserInfo  `xorm:"extends"`
}

// 新增
func (projectUser *ProjectUser) Create() (insertId int, err error) {
	_, err = Db.Insert(projectUser)
	if err == nil {
		insertId = projectUser.Id
	}

	return
}

// 删除
func (projectUser *ProjectUser) Delete(id int) (int64, error) {
	return Db.Id(id).Delete(new(Project))
}

func (projectUser *ProjectUser) Find(id int) error {
	_, err := Db.Alias("pu").Join("LEFT", []string{TablePrefix + "user", "u"}, "pu.user_id = u.id").Cols("pu.*,u.account,u.email,u.is_admin").Id(id).Get(projectUser)

	return err
}

func (projectUser *ProjectUser) UserExists(userId int) (bool, error) {
	count, err := Db.Where("user_id = ?", userId).Count(projectUser)
	return count > 0, err
}

func (projectUser *ProjectUser) List(params CommonMap) ([]ProjectUser, error) {
	projectUser.parsePageAndPageSize(params)
	list := make([]ProjectUser, 0)
	session := Db.Alias("pu").Cols("pu.*,u.account,u.email,u.is_admin").Join("LEFT", []string{TablePrefix + "user", "u"}, "pu.user_id = u.id").Desc("pu.id")
	projectUser.parseWhere(session, params)

	err := session.Limit(projectUser.PageSize, projectUser.pageLimitOffset()).Find(&list)

	fmt.Println("++++++++++++++++++++++++++++++++")
	fmt.Printf("%v", list)
	fmt.Println("++++++++++++++++++++++++++++++++")

	return list, err
}

func (projectUser *ProjectUser) AllList() ([]ProjectUser, error) {
	list := make([]ProjectUser, 0)
	err := Db.Cols("name,remark,status").Desc("id").Find(&list)

	return list, err
}

func (projectUser *ProjectUser) Total(params CommonMap) (int64, error) {
	// session := Db.NewSession()
	session := Db.Alias("p").Join("LEFT", proUserTableName(), "p.user_id = u.id").Desc("p.id")
	projectUser.parseWhere(session, params)

	/**
		session := Db.Alias("t").Join("LEFT", taskHostTableName(), "t.id = th.task_id").Join("LEFT", userTableName(), "t.user_id = u.id")
	task.parseWhere(session, params)
	list := make([]Task, 0)

	err := session.GroupBy("t.id").Desc("t.id").Cols("t.*,u.account").Limit(task.PageSize, task.pageLimitOffset()).Find(&list)

	return int64(len(list)), err
	**/

	return session.Count(projectUser)
}

// 解析where
func (projectUser *ProjectUser) parseWhere(session *xorm.Session, params CommonMap) {
	if len(params) == 0 {
		return
	}
	userId, ok := params["UserId"]
	if ok && userId.(int) > 0 {
		session.And("pu.user_id = ?", userId)
	}
	// name, ok := params["Name"]
	// if ok && name.(string) != "" {
	// 	session.And("p.name = ?", name)
	// }
	projectId, ok := params["ProjectId"]
	if ok && projectId.(int) > 0 {
		session.And("pu.project_id = ?", projectId)
	}

}
