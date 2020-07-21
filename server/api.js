const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
//引入jsonwebtoken模块
let jwt = require("jsonwebtoken")

const poolCluster = mysql.createPoolCluster({
  multipleStatements: true, // 多语句查询
  canRetry: true, //值为true时，允许连接失败时重试(Default: true)
  removeNodeErrorCount: 1, // 当连接失败时 errorCount 值会增加. 当errorCount 值大于 removeNodeErrorCount 将会从PoolCluster中删除一个节点. (Default: 5)
  defaultSelector: 'RR' //RR,RANDOM,ORDER); 	默认选择器 RR:循环 RANDOM:通过随机函数选择节点. ORDER:无条件地选择第一个可用节点.
})
// const pool = mysql.createPool({
//   host: dbConfig.mysql.host,
//   user: dbConfig.mysql.user,
//   password: dbConfig.mysql.password,
//   database: dbConfig.mysql.database,
//   port: dbConfig.mysql.port,
//   multipleStatements: true // 多语句查询
// });
poolCluster.add('mysql', dbConfig.mysql);
poolCluster.add('mysql1', dbConfig.mysql1);

module.exports = {
  // 登录
  login(req, res, next) {
    let userName = req.body.userName;
    let password = req.body.passWord;
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err);
      let sql = sqlMap.selectUser;
      connection.query(sql, [userName, password], (err, result) => {
        // res.json(result);    // 向前端返回json格式的数据
        if (err) {
          res.status(500);
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        let token = jwt.sign({
          username: req.body.userName
        }, "azrael", {
          expiresIn: 60 * 60 * 24 //过期时间，按照秒算
        })

        connection.release();
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
            errorType: "1"
          })
        }
      })
    })
  },
  //注册
  adduser(req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err);
      let sql = sqlMap.adduser;
      connection.query(sql, req.body, (err, result) => {
        // res.json(result);    // 向前端返回json格式的数据
        if (err) {
          res.status(500);
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release();
        res.send({
          msg: '注册成功',
          success: true
        })
      })
    })
  },
  //查询所有的用户
  userlist(req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败', err);
      let sql = sqlMap.userlist;
      if (req.body.userName) {
        sql += ' WHERE username =?'
      }
      connection.query(sql,req.body.userName, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release();
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })

    })
  },
  //同一数据库下 多条sql语句查询
  someDBSelect(req, res, next) {
    poolCluster.getConnection('mysql', (err, connection) => {
      if (err) console.log('数据库链接失败');
      let sql = 'SELECT * FROM admin_user,user'
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release();
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })
    })
  },

  //不同数据库下 查询
  noSomeDBSelect(req, res, next) {
    poolCluster.getConnection((err, connection) => {
      if (err) console.log('数据库链接失败');
      let sql = 'SELECT * FROM user.article,test.post'
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            msg: err.sqlMessage,
            success: false
          })
        }
        connection.release();
        res.send({
          msg: '查询成功',
          success: true,
          result: result
        })
      })
    })
  }
}
