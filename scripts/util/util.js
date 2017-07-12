var crypto = require('crypto');

var util = {
    md5: function (str) {
        return crypto.createHash('md5').update(str).digest('hex');
    },
    randomnumber: function (len) {
        var result = '';
        for(var i = 0; i < len; i++){
            result += parseInt(Math.random() * 10);
        }
        return result;
    }
};

module.exports = util;