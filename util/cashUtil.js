var redis = require('redis');
var config = require('../conf/config');

function CacheUtil() {
    this._redis = this._redis ? this._redis : redis.createClient(config.redis);
}

CacheUtil.prototype.keys = function (k,fn) {
    this._redis.keys(k, fn);
}

CacheUtil.prototype.get = function (k, fn) {
    this._redis.get(k, fn);
};

CacheUtil.prototype.set = function (k, v, fn) {
    this._redis.set(k, v, fn);
};

CacheUtil.prototype.expire = function (k, interval) {
    this._redis.expire(k, interval);
};

CacheUtil.prototype.del = function (k, fn) {
    this._redis.del(k, fn);
};

CacheUtil.prototype.hset = function (k, f, v, fn) {
    if (this._redis.hset === undefined) {
        fn(Error(), null);
    } else {
        this._redis.hset(k, f, v, fn);
    }
};

CacheUtil.prototype.hget = function (k, f, fn) {
    if (this._redis.hget === undefined) {
        fn(Error(), null);
    } else {
        this._redis.hget(k, f, fn);
    }
};

CacheUtil.prototype.multiDel = function (k, fn) {
    var multi = this._redis.multi();
    _.each(k, function (row) {
        multi.del(row);
    });
    multi.exec();
};

module.exports = CacheUtil;

/* Demo
 var cache = new CacheUtil();
 cache.set('test',1,function (err,value){
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