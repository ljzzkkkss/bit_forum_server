var express = require('express');
var router = express.Router();
var CacheUtil = require('../util/cashUtil');

var userDao = require('../dao/user/userDao');

router.post('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

router.post('/queryByUsername', function(req, res, next) {
  userDao.queryByUsername(req, res, next);
});


module.exports = router;
