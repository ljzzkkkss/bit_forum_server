// 实现与MySQL交互
var mysql = require('mysql');
var sql = require('./userSqlMapping');
var mysqlUtil = require('../../util/mysqlUtil');

module.exports = {
    add: function (param,fn) {
        mysqlUtil.getPool().getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, username, age, email) VALUES(0,?,?,?)',
            connection.query(sql.insert, [param.username, param.password, param.email], function(err, result) {
                if(result) {
                    result = {
                        success:true
                    };
                }

                fn(result);

                console.log(err);

                // 释放连接
                connection.release();
            });
        });
    },
    queryByUsername: function (param,fn) {
        mysqlUtil.getPool().getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'SELECT * FROM user WHERE username=?',
            connection.query(sql.queryByUsername, [param.username], function(err, result) {

                console.log('err:' + err);
                console.info('result:' + result);
                fn(result);
                // 释放连接
                connection.release();
            });
        });
    },
    resetpass: function (param,fn) {
        mysqlUtil.getPool().getConnection(function(err, connection) {
            // 建立连接，修改表对应记录
            // 'UPDATE user SET password=? WHERE username=?',
            connection.query(sql.resetpass, [param.password, param.username], function(err) {
                console.log(err);

                // 释放连接
                connection.release();
            });
        });
    }
};