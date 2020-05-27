package models

import (
	"fmt"
	"time"

	"github.com/go-xorm/xorm"
)

// 项目
type Project struct {
	Id        int16     `json:"id" xorm:"int pk autoincr"`
	UserId    int       `json:"user_id" xorm:"int notnull default 0"`           // 创建ID
	Name      string    `json:"name" xorm:"varchar(64) notnull"`                // 项目名称
	Remark    string    `json:"remark" xorm:"varchar(500) notnull default '' "` // 备注
	Status    Status    `json:"status" xorm:"tinyint notnull index default 0"`  // 状态 1:正常 0:停止
	Created   time.Time `json:"created" xorm:"datetime notnull created"`        // 创建时间
	BaseModel `json:"-" xorm:"-"`
	Selected  bool `json:"-" xorm:"-"`
	Userinfo  `xorm:"extends"`
}

//用户信息
type Userinfo struct {
	Account string `json:"account" xorm:"<-"`
	Email   string `json:"email" xorm:"<-"`
}

func projectUserTableName() []string {
	return []string{TablePrefix + "project_user", "pu"}
}

func proUserTableName() []string {
	return []string{TablePrefix + "user", "u"}
}

// 新增
func (project *Project) Create() (insertId int16, err error) {
	_, err = Db.Insert(project)
	if err == nil {
		insertId = project.Id
	}

	return
}

func (project *Project) UpdateBean(id int16) (int64, error) {
	return Db.ID(id).Cols("name,remark,status").Update(project)
}

// 更新
func (project *Project) Update(id int, data CommonMap) (int64, error) {
	return Db.Table(project).ID(id).Update(data)

}

// 删除
func (project *Project) Delete(id int) (int64, error) {
	return Db.Id(id).Delete(new(Project))
}

func (project *Project) Find(id int) error {
	_, err := Db.Alias("p").Join("LEFT", proUserTableName(), "p.user_id = u.id").Cols("p.*,u.account,u.email,u.is_admin").Id(id).Get(project)

	return err
}

func (project *Project) NameExists(name string, id int16) (bool, error) {
	if id == 0 {
		count, err := Db.Where("name = ?", name).Count(project)
		return count > 0, err
	}

	count, err := Db.Where("name = ? AND id != ?", name, id).Count(project)
	return count > 0, err
}

func (project *Project) List(params CommonMap) ([]Project, error) {
	project.parsePageAndPageSize(params)
	list := make([]Project, 0)
	session := Db.Alias("p").Join("LEFT", proUserTableName(), "p.user_id = u.id").Desc("p.id")
	project.parseWhere(session, params)

	err := session.Cols("p.*,u.account,u.email,u.is_admin").Limit(project.PageSize, project.pageLimitOffset()).Find(&list)

	fmt.Println("++++++++++++++++++++++++++++++++")
	fmt.Println(list)
	fmt.Println("++++++++++++++++++++++++++++++++")

	return list, err
}

func (project *Project) AllList() ([]Project, error) {
	list := make([]Project, 0)
	err := Db.Cols("name,remark,status").Desc("id").Find(&list)

	return list, err
}

func (project *Project) Total(params CommonMap) (int64, error) {
	// session := Db.NewSession()
	session := Db.Alias("p").Join("LEFT", proUserTableName(), "p.user_id = u.id").Desc("p.id")
	project.parseWhere(session, params)

	/**
		session := Db.Alias("t").Join("LEFT", taskHostTableName(), "t.id = th.task_id").Join("LEFT", userTableName(), "t.user_id = u.id")
	task.parseWhere(session, params)
	list := make([]Task, 0)

	err := session.GroupBy("t.id").Desc("t.id").Cols("t.*,u.account").Limit(task.PageSize, task.pageLimitOffset()).Find(&list)

	return int64(len(list)), err
	**/

	return session.Count(project)
}

// 解析where
func (project *Project) parseWhere(session *xorm.Session, params CommonMap) {
	if len(params) == 0 {
		return
	}
	id, ok := params["Id"]
	if ok && id.(int) > 0 {
		session.And("p.id = ?", id)
	}
	name, ok := params["Name"]
	if ok && name.(string) != "" {
		session.And("p.name = ?", name)
	}

}
