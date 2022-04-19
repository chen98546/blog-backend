// 设置控制器

const md5 = require('md5');

const {
    pass_secret
} = require('../config/pass_secret.js');
const query = require('../mysql/connection.js');
const method = require('../method/method.js');


let SettingsCon = {}


SettingsCon.settings = (req, res) => {
    // 设置页面
    res.render('settings.html');
}


// logo名修改
SettingsCon.editSettings = async (req, res) => {
    method.bodyDataFn(req.body);
    let sql;

    if (fileFlag == 1) {
        method.fileDataFn(req.file);
        method.renameFn(req.file);
        set_logoPic = filename + extname
        sql = `update tb_settings set set_logo='${set_logo}', set_logoPic = '${set_logoPic}'`;

    } else {
        sql = `update tb_settings set set_logo='${set_logo}'`;
    }
    let {
        affectedRows
    } = await query(sql);
    if (affectedRows > 0) {
        let selSql = `select * from tb_settings`;
        let data = await query(selSql)
        res.json(data)
    }
}


// 个人信息设置
SettingsCon.amendPersonalData = async (req, res) => {
    method.bodyDataFn(req.body);
    let {
        u_id
    } = req.session.record;
    let sql;

    if (fileFlag == 1) {
        method.fileDataFn(req.file);
        method.renameFn(req.file);
        // 拼接路径
        u_avatar = filename + extname;
        sql = `update tb_users set u_name='${u_name}',u_avatar='${u_avatar}' where u_id = ${u_id}`;
        // 原图完整路径
        picPath = method.joinFn(destination + picPath);
        // 删除原图
        method.unlinkFn(picPath);
    } else {
        sql = `update tb_users set u_name='${u_name}' where u_id = ${u_id}`;
    }

    let {
        affectedRows
    } = await query(sql);

    if (affectedRows > 0) {
        let selSql = `select * from tb_users where u_id= ${u_id}`;
        let data = await query(selSql);
        req.session.record = data[0];
        res.cookie('userInfo', JSON.stringify(data[0]), {
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.json(data)
    } else {
        res.send('修改失败');
    }
}


// 密码修改
SettingsCon.editPwdForm = async (req, res) => {
    method.bodyDataFn(req.body);

    let {
        u_id
    } = req.session.record;

    u_password = md5(`${u_password}${pass_secret}`)
    password2 = md5(`${password2}${pass_secret}`)
    password3 = md5(`${password3}${pass_secret}`)


    if (u_password === req.session.record.u_password && password2 === password3) {
        let sql = `update tb_users set u_password='${password3}' where u_id = ${u_id}`;
        let {
            affectedRows
        } = await query(sql);

        if (affectedRows > 0) {
            req.session.destroy((err) => {
                if (err) {
                    throw err;
                }
            })
            let responseData = {
                u_password,
                code: 0,
                message: '密码修改成功'
            }
            res.json(responseData);

        } else {
            res.send('修改失败');
        }
    } else {
        let responseData = {
            u_password,
            code: -1,
            message: '密码修改失败'
        }
        res.json(responseData);
    }


}


module.exports = SettingsCon;