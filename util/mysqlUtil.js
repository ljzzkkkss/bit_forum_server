var mysql = require('mysql');
var config = require('../../conf/config');

var pool = undefined;

var mysqlUtil = {
    getPool: function () {
        if (pool == undefined){
            pool = mysql.createPool( config.mysql);
        }
        return pool;
    }
};

module.exports = mysqlUtil;