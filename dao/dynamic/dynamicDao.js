'use strict';

var mysql = require('mysql');
var sql = require('./dynamicSqlMapping');
var mysqlUtil = require('../../util/mysqlUtil');

module.exports = {
    add: function (param) {
        return new Promise(function (resolve, reject) {
            mysqlUtil.getPool().getConnection(function (err, connection) {
                // 建立连接，向表中插入值
                // INSERT INTO dynamic( userid, content, createtime) VALUES(?,?,?)
                connection.query(sql.insert, [param.userid, param.content, param.createtime], function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            });
        });
    }
};