var express = require('express');
var router = express.Router();
var cacheUtil = require('../util/cacheUtil');
var jsonUtil =  require('../util/jsonUtil');
var util = require('../util/util');

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
  if(result.length > 0 && result[0].password == param.password){
    var sessionid = util.md5(util.md5(util.randomnumber(8)));
    var token = util.md5(util.md5(util.randomnumber(8)));
    cacheUtil.set(param.username + '_sessonid', sessionid);
    cacheUtil.set(param.username + '_token', token);
    if(param.rememberme) {
      cacheUtil.expire(param.username + '_sessonid', 3600 * 24 * 7);
    }else{
      cacheUtil.expire(param.username + '_sessonid', 300);
    }
    result = {
      success: true,
      token: token,
      sessonid: sessionid
    }
  }else{
    cacheUtil.del(param.username + '_sessonid');
    cacheUtil.del(param.username + '_token');
    result = {
      success: false
    }
  }
  jsonUtil.write(res,result);
});

router.post('/checkLogin', function(req, res, next) {
  var param = req.body;
  var result;
  if (param.sessionid == cacheUtil.get(param.username + '_sessonid') && param.token == cacheUtil.get(param.username + '_token')){
    var token = util.md5(util.md5(util.randomnumber(8)));
    cacheUtil.set(param.username + '_token', token);
    result = {
      success: true,
      token: token
    }
  }else{
    result = {
      success: false
    }
  }
  jsonUtil.write(res,result);
});

router.post('/logout', function(req, res, next) {
  var param = req.body;
  cacheUtil.del(param.username + '_sessonid');
  cacheUtil.del(param.username + '_token');
  return {
    success: true
  };
  jsonUtil.write(res,result);
});



module.exports = router;
