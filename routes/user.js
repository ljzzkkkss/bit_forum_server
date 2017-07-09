var express = require('express');
var router = express.Router();
var cacheUtil = require('../util/cacheUtil');
var jsonUtil =  require('../util/jsonUtil');
var mailUtil =  require('../util/mailUtil');
var util = require('../util/util');
var config = require('../conf/config');

var userDao = require('../dao/user/userDao');

router.post('/datainfo/user/register', function(req, res, next) {
  // 获取前台页面传过来的参数
  var param = req.body;
  userDao.add(param).then(function(result){
      jsonUtil.write(res,result);
  });
});

router.post('/datainfo/user/login', function(req, res, next) {
  // 获取前台页面传过来的参数
  var param = req.body;
  userDao.queryByUsername(param).then(function(result){
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
          var results = {
              success: true,
              token: token,
              sessonid: sessionid
          }
      }else{
          cacheUtil.del(param.username + '_sessonid');
          cacheUtil.del(param.username + '_token');
          results = {
              success: false
          }
      }
      jsonUtil.write(res,results);
  },function(err){
      jsonUtil.write(res,{
          success:false,
          err: err
      });
  });
});

router.post('/datainfo/user/checkLogin', function(req, res, next) {
  var param = req.body;
  cacheUtil.get(param.username + '_sessonid').then(function(response){
    console.log('checkLogin-sessonid-response',response);
    return response;
  },function(err){
      console.log('checkLogin-sessonid-err',err);
  }).then(function(response){
      var result;
      if(response != null && response == param.sessionid){
          cacheUtil.get(param.username + '_token').then(function (response){
              console.log('checkLogin-token-response',response);

              if(response != null && response == param.token){

                  var token = util.md5(util.md5(util.randomnumber(8)));
                  cacheUtil.set(param.username + '_token', token);
                  if(!param.rememberme) {
                      cacheUtil.expire(param.username + '_sessonid', 300);
                  }

                  result = {
                      success: true,
                      token: token
                  };
                  jsonUtil.write(res,result);
              }else{
                  result={
                      success: false
                  };
                  jsonUtil.write(res,result);
              }
          },function (err){
              console.log('checkLogin-token-err',err);
          });
      }else{
          result={
              success: false
          };
          jsonUtil.write(res,result);
      }
  });
});

router.post('/datainfo/user/logout', function(req, res, next) {
  var param = req.body;
  cacheUtil.del(param.username + '_sessonid');
  cacheUtil.del(param.username + '_token');
  var result = {
    success: true
  };
  jsonUtil.write(res,result);
});

router.post('/datainfo/user/queryByUsername', function(req, res, next) {
  var param = req.body;
  userDao.queryByUsername(param).then(function(result){
      jsonUtil.write(res,result);
  });
});

//找回密码发送邮件
router.post('/datainfo/user/findpassword', function(req, res, next) {
    var param = req.body;
    var findpassword = fu
    userDao.queryByUsername(param).then(function(result){
        var success = false;
        if(result.length > 0){
            var token = util.md5(result[0].username + util.randomnumber(8));
            mailUtil.send(result[0].email,"密码找回","找回密码链接半小时之内有效，请点击：" + config.url + "/resetpass/" + token + "，如非本人操作请注意保护账号安全。");
            cacheUtil.set(token, result[0].username);
            cacheUtil.expire(token, 1800);
            success = true;
        }
        jsonUtil.write(res,{
            success:success
        });
    });
});

//找回密码验证链接token并返回下次请求用的token
router.post('/datainfo/user/checkresetpass', function(req, res, next) {
    var param = req.body;
    cacheUtil.get(param.token).then(function(response){
        var result;
        console.log('checkresetpass-token-response',response);

        if(response != null){
            cacheUtil.del(param.token);
            var token = util.md5(util.md5(util.randomnumber(8)));
            cacheUtil.set(response + '_token', token);
            result = {
                success:true,
                username:response,
                token:token
            };
            jsonUtil.write(res,result);
        }else{
            result = {
                success:false
            };
            jsonUtil.write(res,result);
        }
    },function (err){
        console.log('checkresetpass-token-err',err);
    });
});

//重新设置密码
router.post('/datainfo/user/resetpass', function(req, res, next) {
    var param = req.body;
    cacheUtil.get(param.username + '_token').then(function(response){
        var result;
        console.log('resetpass-token-response',response);

        if(response != null && response == param.token){
            cacheUtil.del(param.username + '_token')
            userDao.resetpass(param)
            result = {
                success:true
            };
            jsonUtil.write(res,result);
        }else{
            result = {
                success:false
            };
            jsonUtil.write(res,result);
        }
    },function (err){
        console.log('checkresetpass-token-err',err);
    });
});

module.exports = router;
