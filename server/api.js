const mysql = require('mysql')
const dbConfig = require('./db')
const sqlMap = require('./sqlMap')
// 引入jsonwebtoken模块
const jwt = require('jsonwebtoken')

const poolCluster = mysql.createPoolCluster({
  multipleStatements: true, // 多语句查询
  canRetry: true, // 值为true时，允许连接失败时重试(Default: true)
  removeNodeErrorCount: 1, // 当连接失败时 errorCount 值会增加. 当errorCount 值大于 removeNodeErrorCount 将会从PoolCluster中删除一个节点. (Default: 5)
  defaultSelector: 'RR' // RR,RANDOM,ORDER); 	默认选择器 RR:循环 RANDOM:通过随机函数选择节点. ORDER:无条件地选择第一个可用节点.
})
// const pool = mysql.createPool({
//   host: dbConfig.mysql.host,
//   user: dbConfig.mysql.user,
//   password: dbConfig.mysql.password,
//   database: dbConfig.mysql.database,
//   port: dbConfig.mysql.port,
//   multipleStatements: true // 多语句查询
// });
poolCluster.add('mysql', dbConfig.mysql)
poolCluster.add('mysql1', dbConfig.mysql1)

Date.prototype.format = function (format) {
  var args = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length)) }
  }
  return format
}

module.exports = {
  login (req, res, next) {
    const userName = req.body.userName
    const password = req.body.passWord
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err)
      const sql = sqlMap.selectUser
      connection.query(sql, [userName, password], (err, result) => {
        // res.json(result);    // 向前端返回json格式的数据
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        const token = jwt.sign({
          username: req.body.userName
        }, 'azrael', {
          expiresIn: 60 * 60 * 24 // 过期时间，按照秒算
        })

        connection.release()
        if (result.length != 0) {
          res.send({
            msg: '登录成功',
            success: true,
            token: token
          })
        } else {
          res.send({
            msg: '登录失败,不存在用户名或密码',
            success: false,
            token: null,
            errorType: '1'
          })
        }
      })
    })
  },
  outlogin (req, res, next) {
    let url = req.url
    if (url.indexOf('?') !== -1) {
      url = url.substr(0, url.indexOf('?'))
    }
    const token = req.query.sysHttpTokenId || req.body.sysHttpTokenId || req.headers.sysHttpTokenId
    jwt.verify(token, 'azrael', (err, decode) => {
      decode.username = undefined
    })
    res.send({
      success: true,
      msg: '退出登录成功'
    })
  },
  // 注册
  adduser (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err)
      const sql = sqlMap.adduser
      connection.query(sql, req.body, (err, result) => {
        // res.json(result);    // 向前端返回json格式的数据
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '注册成功',
          success: true
        })
      })
    })
  },
  // 查询所有的用户
  userlist (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err)
      let sql = sqlMap.userlist
      if (req.body.userName) {
        sql += ' WHERE username =?'
      }
      connection.query(sql, req.body.userName, (err, result) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })
    })
  },
  // 删除用户
  delectUser (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err)
      const sql = sqlMap.delectUser
      console.log(req.query.id)
      connection.query(sql, req.query.id, (err, result) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '删除成功',
          success: true
        })
      })
    })
  },
  // 同一数据库下 多条sql语句查询
  someDBSelect (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败')
      const sql = 'SELECT * FROM admin_user,user'
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })
    })
  },

  // 不同数据库下 查询
  noSomeDBSelect (req, res, next) {
    poolCluster.getConnection((err, connection) => {
      if (err) console.log('数据库链接失败')
      let sql = 'SELECT * FROM user.article,test.post'
      connection.query(sql, (err, allresult) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        const pageNo = req.body.pageNo
        const pageSize = req.body.pageSize
        if (pageNo && pageSize) {
          sql += ' LIMIT ?,?'
        }
        const page = (pageNo - 1) * pageSize
        connection.query(sql, [parseInt(page), parseInt(pageSize)], (err, result) => {
          if (err) {
            res.status(500)
            res.send({
              msg: err.sqlMessage,
              success: false
            })
          }
          connection.release()
          res.send({
            msg: '查询成功',
            success: true,
            result: result,
            totalCount: allresult.length
          })
        })
      })
    })
  },

  // 查询角色
  rolelist (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败')
      let sql = sqlMap.rolelist
      if (req.body.roleName) {
        sql += ' WHERE roleName =?'
      }
      connection.query(sql, req.body.roleName, (err, result) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })
    })
  },
  // 新增角色
  addrole (req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败')
      const sql = sqlMap.addrole
      console.log(req.body)
      const time = new Date().format('yyyy-MM-dd hh:mm:ss')
      const obj = {
        createTime: time
      }
      const params = Object.assign(req.body, obj)
      connection.query(sql, params, (err, result) => {
        if (err) {
          res.status(500)
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release()
        res.send({
          msg: '新增成功',
          success: true,
          result: result
        })
      })
    })
  }
}
