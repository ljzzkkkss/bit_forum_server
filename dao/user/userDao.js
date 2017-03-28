// 实现与MySQL交互
var mysql = require('mysql');
var config = require('../../conf/config');
var sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool( config.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, username, age, email) VALUES(0,?,?,?)',
            connection.query(sql.insert, [param.username, param.password, param.email], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }
                console.log(err);

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    queryByUsername: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'SELECT * FROM user WHERE username=?',
            connection.query(sql.queryByUsername, [param.username], function(err, result) {

                console.log(err);
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    }
};