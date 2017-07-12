var redis = require('redis');
var config = require('../../conf/config');

var redisClient = redis.createClient(config.redis);

var cacheUtil = {
    key:  function (k,fn) {
        redisClient.keys(k, fn);
    },
    get: function (k) {
        return new Promise(function (resolve,reject){
            redisClient.get(k, function(err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })

    },
    set: function (k, v, fn){
        redisClient.set(k, v, fn);
    },
    expire: function (k, interval) {
        redisClient.expire(k, interval);
    },
    del: function (k, fn) {
        redisClient.del(k, fn);
    },
    hset: function (k, f, v, fn) {
        if (redisClient.hset === undefined) {
            fn(Error(), null);
        } else {
            redisClient.hset(k, f, v, fn);
        }
    },
    hget: function (k, f, fn) {
        if (redisClient.hget === undefined) {
            fn(Error(), null);
        } else {
            redisClient.hget(k, f, fn);
        }
    },
    multiDel: function (k) {
        var multi = redisClient.multi();
        k.each(function (row) {
            multi.del(row);
        });
        multi.exec();
    }
};

module.exports = cacheUtil;

/* Demo
 cacheUtil.set('test',1,function (err,value){
 if(err){
 console.log(err);
 }
 console.log(value);//成功value是OK
 });
 cache.get('test',function(err,value){
 if(err){
 console.log(err);
 }
 console.log(value);
 });
 */