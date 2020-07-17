const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据需要
const express = require('express');
const app = express();
//cookie-session是express的一个中间件,需要导入使用
let cookieSession = require("cookie-session");
let jwt = require("jsonwebtoken")

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

//统一判断 接口 如果没有token 返回500
app.use(function (req, res, next) {
  let url = req.url;
  if(url.indexOf('?') !== -1){
    url = url.substr(0, url.indexOf('?'))
  }
  let token = req.query.sysHttpTokenId || req.body.sysHttpTokenId || req.headers.sysHttpTokenId;
  if (url !== '/login') {
    jwt.verify(token, "azrael", (err, decode) => {
      if (err) {
        res.status(500);
        res.send({
          msg: '未登录或登录已失效',
          success: false
        })
      }
    })
  }
  next();
})
//使用中间件cookieSession
app.use(cookieSession({
  name: "mycookie", //后端给前端种cookie的名字叫做mycookie
  keys: ["aa", "bb", "cc"], //加密层级
  maxAge: 1000 * 60 * 60 * 24 //cookie的失效时间(默认为毫秒)
}))

//这里如果你添加了/api 接口地址也要添加 ip+端口+/api+定义的接口名
// app.use('/api', routerApi);
// 后端api路由
app.use('', routerApi);

// 监听端口
app.listen(5000, () => {
  console.log('running...')
});
