const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据需要
const express = require('express');
const session = require('express-session')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// 设置允许跨域访问该服务
app.all("*", function (req, res, next) {
  //这里需要注意的是：
  //服务器端 Access - Control - Allow - Credentials = true时， 参数Access - Control - Allow - Origin 的值不能为 '*'。
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

//express-session的配置，一定要放到挂载路由到服务实例app.use(router)之前
app.use(session({
    secret:'keyboard',
    resave:false,
    saveUninitialized:true
}))

//这里如果你添加了/api 接口地址也要添加 ip+端口+/api+定义的接口名
// app.use('/api', routerApi);
// 后端api路由
app.use('', routerApi);

// 监听端口
app.listen(5000, () => {
  console.log('running...')
});
