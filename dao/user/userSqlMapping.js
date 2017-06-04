// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, username, password, email) VALUES(0,?,?,?)',
    queryByUsername: 'SELECT * FROM user WHERE username=?',
    resetpass: 'UPDATE user SET password=? WHERE username=?'
};

module.exports = user;