// 登录控制器

const md5 = require('md5');
const query = require('../mysql/connection.js');
const method = require('../method/method.js');
const {
    pass_secret
} = require('../config/pass_secret.js')


let LoginCon = {};

// 登录页面
LoginCon.login = (req, res) => {
    res.render('login.html')
}

LoginCon.verifyLoginInfo = async (req, res) => {
    method.bodyDataFn(req.body);
    u_password = md5(`${u_password}${pass_secret}`);

    let sql = `SELECT * FROM tb_users WHERE u_name='${u_name}' AND u_password='${u_password}'`;
    let data = await query(sql);
    if (data.length > 0) {
        req.session.record = data[0];
        res.cookie('userInfo', JSON.stringify(data[0]), {
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.json({
            data,
            code: 0,
            message: '登录成功'
        })
    } else {
        res.json({
            data,
            code: 1,
            message: '用户名或密码错误'
        })
    }
}

// 退出清空所有session数据
LoginCon.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        }
    })
    res.send('退出登录')
}

module.exports = LoginCon;