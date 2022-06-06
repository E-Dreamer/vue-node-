const express = require('express')
const router = express.Router()
const api = require('./api')
/**
 *登录接口
 * @route POST /login
 * @group user
 * @param {String} username.query.required - 请输入用户名
 * @param {String} password.query.required - 请输入密码
 * @returns {object} 200 - 登录成功
 * @returns {Error} 500 - 登录失败
 *
*/
router.post('/login', (req, res, next) => {
  api.login(req, res, next)
})

router.post('/adduser', (req, res, next) => {
  api.adduser(req, res, next)
})

router.post('/userlist', (req, res, next) => {
  api.userlist(req, res, next)
})

router.get('/someDBselect', (req, res, next) => {
  api.someDBSelect(req, res, next)
})

router.post('/noSomeDBSelect', (req, res, next) => {
  api.noSomeDBSelect(req, res, next)
})

router.delete('/delectUser', (req, res, next) => {
  api.delectUser(req, res, next)
})

router.post('/outlogin', (req, res, next) => {
  api.outlogin(req, res, next)
})

router.post('/addrole', (req, res, next) => {
  api.addrole(req, res, next)
})

router.post('/rolelist', (req, res, next) => {
  api.rolelist(req, res, next)
})

module.exports = router
