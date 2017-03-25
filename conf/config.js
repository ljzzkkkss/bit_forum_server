var path = require('path');

var env = process.env.NODE_ENV || 'production';

var file = env == 'production' ? path.resolve(__dirname, 'prod.config') : path.resolve(__dirname, 'dev.config');
try {
    var config = require(file);
    console.log('Load config: [%s] %s', env, file);
} catch (err) {
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}
module.exports = config;