var jsonUtil = {
    // 向前台返回JSON方法的简单封装
   write:  function (res, ret) {
        if(typeof ret === 'undefined') {
            res.json({
                success: false,
                msg: '操作失败'
            });
        } else {
            res.json(ret);
        }
    }
};

module.exports = jsonUtil;