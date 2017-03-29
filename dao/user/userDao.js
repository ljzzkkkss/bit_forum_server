// 实现与MySQL交互
var mysql = require('mysql');
var sql = require('./userSqlMapping');
var mysqlUtil = require('../../util/mysqlUtil');

module.exports = {
    add: function (param) {
        var returnresult;
        mysqlUtil.getPool().getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, username, age, email) VALUES(0,?,?,?)',
            connection.query(sql.insert, [param.username, param.password, param.email], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                returnresult = result;

                console.log(err);

                // 释放连接
                connection.release();
            });
        });
        return returnresult
    },
    queryByUsername: function (req, res, next) {
        var returnresult;
        mysqlUtil.getPool().getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'SELECT * FROM user WHERE username=?',
            connection.query(sql.queryByUsername, [param.username], function(err, result) {

                console.log(err);

                returnresult = result;

                // 释放连接
                connection.release();
            });
        });
        return returnresult
    }
};