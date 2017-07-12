'use strict';

var mysql = require('mysql');
var sql = require('./userSqlMapping');
var mysqlUtil = require('../../util/mysqlUtil');

module.exports = {
    add: function (param) {
        return new Promise(function (resolve, reject) {
            mysqlUtil.getPool().getConnection(function (err, connection) {
                // 建立连接，向表中插入值
                // INSERT INTO user(id, username, age, email) VALUES(0,?,?,?),
                connection.query(sql.insert, [param.username, param.password, param.email], function (err, result) {
                    // 释放连接
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                });
            });
        });
    },
    queryByUsername: function (param) {
        return new Promise(function (resolve, reject){
            mysqlUtil.getPool().getConnection(function(err, connection) {
                // 建立连接，向表中插入值
                // 'SELECT * FROM user WHERE username=?',
                connection.query(sql.queryByUsername, [param.username], function(err, result) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    // 释放连接
                    connection.release();
                });
            });
        });
    },
    resetpass: function (param) {
        return new Promise(function (resolve, reject) {
            mysqlUtil.getPool().getConnection(function (err, connection) {
                // 建立连接，修改表对应记录
                // 'UPDATE user SET password=? WHERE username=?',
                connection.query(sql.resetpass, [param.password, param.username], function (err,result) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    // 释放连接
                    connection.release();
                });
            });
        });
    }
};