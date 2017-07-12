/**
 * Created by ljzzkkkss on 2017/7/12.
 */
var express = require('express');
var router = express.Router();
var cacheUtil = require('../util/cacheUtil');
var jsonUtil =  require('../util/jsonUtil');
var util = require('../util/util');
var config = require('../../conf/config');

var dynamicDao = require('../dao/dynamic/dynamicDao');
var userDao = require('../dao/user/userDao');

router.post('/datainfo/dynamic/insert', function(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    var token = util.md5(util.md5(util.randomnumber(8)));
    userDao.queryByUsername({
        username:param.username
    }).then(function(result){
        if(result.length == 0){
            jsonUtil.write(res,{
                success:false,
                msg:'用户不存在'
            });
        }else{
            return result[0].userid;
        }
    },function(err){
        console.info('dynamic-insert-err',err);
        jsonUtil.write(res,{
            success:false,
            msg:'服务器错误'
        });
    }).then(function(userid){
        dynamicDao.add({
            userid:userid,
            content:param.content,
            createtime:new Date()
        }).then(function(){
            cacheUtil.del(param.username + '_token');
            cacheUtil.set(param.username + '_token',token);
            jsonUtil.write(res,{
                success:true,
                msg:'发表成功',
                token:token
            });
        },function(err){
            console.info('dynamic-insert-err',err);
            jsonUtil.write(res,{
                success:false,
                msg:'服务器错误'
            });
        })
    })
});
