// 数据库连接配置
module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user',
    port: 3306,
    // 解决mysql和node的时区不同
    timezone: '08:00'
  },
  mysql1: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306,
    timezone: '08:00'
  }
}
