/**
 * Created by ljzzkkkss on 2017/7/12.
 */
var cacheUtil = require('./util/cacheUtil');
var jsonUtil =  require('./util/jsonUtil');
var util = require('./util/util');
var config = require('../conf/config');

exports.checkReq = function(req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    cacheUtil.get(param.username + '_sessonid').then(function(response){
        console.log('checkReq-sessonid-response',response);
        if(response && response == param.session){
            jsonUtil.write(res,{
                success:false,
                msg:'登录已失效'
            });
        }else if(response == null){
            jsonUtil.write(res,{
                success:false,
                msg:'登录已失效'
            });
        }
    },function(err){
        console.log('checkReq-sessonid-err',err);
        jsonUtil.write(res,{
            success:false,
            msg:'服务器错误'
        });
    }).then(function(){
        cacheUtil.get(param.username + '_token').then(function(response){
            if(response && response == param.token){
                next();
            }else{
                jsonUtil.write(res,{
                    success:false,
                    msg:'参数异常'
                });
            }
        },function(err){
            console.log('checkReq-token-err',err);
            jsonUtil.write(res,{
                success:false,
                msg:'服务器错误'
            });
        });
    });

};