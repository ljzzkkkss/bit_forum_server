/**
 * Created by ljzzkkkss on 2017/7/12.
 */
const express = require('express');

const router = express.Router();

const user = require('./controller/user');
const checkReq = require('./auth').checkReq;

/** ============================================================================= **/
/** MIDDLEWARES **/
/** ============================================================================= **/

router.use('/datainfo/dynamic/*', checkReq);



/** ============================================================================= **/
/** CONTROLLERS
 /** ============================================================================= **/

router.use(user);


module.exports = router;
