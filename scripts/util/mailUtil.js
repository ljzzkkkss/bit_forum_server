/**
 * Created by James on 2017/5/23.
 */
var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport({
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "793958447@qq.com", // 账号
        pass: "abqakypvxdhhbdeg" // 密码
    }
});

var mailUtil = {

    /**
     * f发送邮件方法
     * @param address 收件人地址可以是逗号分隔的字符串
     * @param subject 邮件主题
     * @param html 邮件内容html
     */
    send: function (address, subject, html) {
        // 设置邮件内容
        var mailOptions = {
            from: "ljzzkkkss<793958447@qq.com>", // 发件地址
            to: address, // 收件列表
            subject: subject, // 标题
            html: html// html 内容
        };
        // 发送邮件
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
            smtpTransport.close(); // 如果没用，关闭连接池
        });
    }
};

module.exports = mailUtil;