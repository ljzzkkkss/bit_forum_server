// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, username, password, email) VALUES(0,?,?,?)',
    queryByUsername: 'SELECT * FROM user WHERE username=?'
};

module.exports = user;