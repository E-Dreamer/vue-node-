const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const poolCluster = mysql.createPoolCluster({
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

function randomString(randomLen, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
  // 随机产生
  if (randomLen) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};
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
        if (err) res.send({
          msg: err.sqlMessage,
          success: false
        })
        connection.release();
        if (result.length != 0) {
          let token = randomString(false, 32)
          req.session[token] = result[0];
          res.send({
            msg: '登录成功',
            success: true,
            token: token
          })
        } else {
          res.send({
            msg: '登录失败',
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
        if (err) res.send({
          msg: err.sqlMessage,
          success: false
        })
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
      connection.query(sql, (err, result) => {
        if (err) res.send({
          msg: err.sqlMessage,
          success: false
        })
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
