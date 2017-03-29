var express = require('express');
var router = express.Router();
var CacheUtil = require('../util/cashUtil');
var jsonUtil =  require('../util/jsonUtil');

var userDao = require('../dao/user/userDao');

router.post('/register', function(req, res, next) {
  // 获取前台页面传过来的参数
  var param = req.body;
  var result = userDao.add(param);
  jsonUtil.write(res,result);

});

router.post('/login', function(req, res, next) {
  // 获取前台页面传过来的参数
  var param = req.body;
  var result = userDao.queryByUsername(param);
  jsonUtil.write(res,result);

});

router.post('/logout', function(req, res, next) {
  userDao.queryByUsername(req, res, next);
});



module.exports = router;
