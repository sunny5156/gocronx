package models

import (
	"github.com/go-xorm/xorm"
	"upper.io/db.v3/mongo"
)

// 主机
type Host struct {
	Id        int16  `json:"id" xorm:"smallint pk autoincr"`
	Name      string `json:"name" xorm:"varchar(64) notnull"`                // 主机名称
	Alias     string `json:"alias" xorm:"varchar(32) notnull default '' "`   // 主机别名
	Port      int    `json:"port" xorm:"notnull default 22"`                 // 主机端口
	Remark    string `json:"remark" xorm:"varchar(100) notnull default '' "` // 备注
	BaseModel `json:"-" xorm:"-"`
	Selected  bool `json:"-" xorm:"-"`
}

var mongocon = mongo.ConnectionURL{
		Host:     "190.168.0.17", // PostgreSQL server IP or name.
		Database: "test",         // Database name.
		User:     "admin",        // Optional user name.
		Password: "123456",       // Optional user password.
	}

// 新增
func (host *Host) Create() (insertId int16, err error) {
	_, err = Db.Insert(host)
	if err == nil {
		insertId = host.Id
	}

	return
}

func (host *Host) UpdateBean(id int16) (int64, error) {
	return Db.ID(id).Cols("name,alias,port,remark").Update(host)
}

// 更新
func (host *Host) Update(id int, data CommonMap) (int64, error) {
	//return Db.Table(host).ID(id).Update(data)
	


	// Attemping to establish a connection to the database.
	sess, err := mongo.Open(mongocon)
	//defer sess.Close() // Remember to close the database session.

	// Pointing to the "host" table.
	//hostCollection := sess.Collection("host")

	// Inserting some rows into the "host" table.
	//hostCollection.Insert(host)
}

// 删除
func (host *Host) Delete(id int) (int64, error) {
	return Db.Id(id).Delete(new(Host))
}

func (host *Host) Find(id int) error {
	_, err := Db.Id(id).Get(host)

	return err
}

func (host *Host) NameExists(name string, id int16) (bool, error) {
	if id == 0 {
		count, err := Db.Where("name = ?", name).Count(host)
		return count > 0, err
	}

	count, err := Db.Where("name = ? AND id != ?", name, id).Count(host)
	return count > 0, err
}

func (host *Host) List(params CommonMap) ([]Host, error) {
	host.parsePageAndPageSize(params)
	list := make([]Host, 0)
	session := Db.Desc("id")
	host.parseWhere(session, params)
	err := session.Limit(host.PageSize, host.pageLimitOffset()).Find(&list)

	return list, err
}

func (host *Host) AllList() ([]Host, error) {
	list := make([]Host, 0)
	err := Db.Cols("name,port").Desc("id").Find(&list)

	return list, err
}

func (host *Host) Total(params CommonMap) (int64, error) {
	session := Db.NewSession()
	host.parseWhere(session, params)
	return session.Count(host)
}

// 解析where
func (host *Host) parseWhere(session *xorm.Session, params CommonMap) {
	if len(params) == 0 {
		return
	}
	id, ok := params["Id"]
	if ok && id.(int) > 0 {
		session.And("id = ?", id)
	}
	name, ok := params["Name"]
	if ok && name.(string) != "" {
		session.And("name = ?", name)
	}
}
