const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/login', (req, res, next) => {
  api.login(req, res, next);
});

router.post('/adduser', (req, res, next) => {
  api.adduser(req, res, next);
})

router.get('/userlist',(req,res,next)=>{
  api.userlist(req,res,next)
})
module.exports = router;
