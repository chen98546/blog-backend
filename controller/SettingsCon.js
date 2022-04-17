// 设置控制器

const fs = require('fs')
const path = require('path')
const md5 = require('md5');

const {
    pass_secret
} = require('../config/pass_secret.js')
const query = require('../mysql/connection.js')

let SettingsCon = {}


SettingsCon.settings = (req, res) => {
    res.render('settings.html')
}


// logo名修改
SettingsCon.editSettings = async (req, res) => {
    let {
        set_logo,
        logoFlag
    } = req.body;
    let sql;


    let set_logoPic;

    if (logoFlag == 1) {
        let {
            originalname,
            destination,
            filename
        } = req.file;

        let extname = path.extname(originalname);
        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+extname}`)
        );

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
    let {
        username,
        personalAvatar,
        avatarPath,
        isEditUserInfo
    } = req.body;
    let {
        u_id
    } = req.session.record;


    if (isEditUserInfo == 1) {
        let {
            originalname,
            destination,
            filename
        } = req.file

        // 图片后缀
        let extname = path.extname(originalname);
        // 原图完整路径
        avatarPath = path.join(`${path.dirname(__dirname)}/${destination+avatarPath}`)
        // 重命名
        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+extname}`)
        );
        // 拼接路径
        personalAvatar = filename + extname;
        sql = `update tb_users set u_name='${username}',u_avatar='${personalAvatar}' where u_id = ${u_id}`;
        // 删除原图
        fs.unlink(avatarPath, (err) => {})
    } else {
        sql = `update tb_users set u_name='${username}' where u_id = ${u_id}`;
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
    let {
        password1,
        password2,
        password3
    } = req.body;

    let {
        u_id
    } = req.session.record;

    password1 = md5(`${password1}${pass_secret}`)
    password2 = md5(`${password2}${pass_secret}`)
    password3 = md5(`${password3}${pass_secret}`)


    if (password1 === req.session.record.u_password && password2 === password3) {
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
                password1,
                code: 0,
                message: '密码修改成功'
            }
            res.json(responseData);

        } else {
            res.send('修改失败');
        }
    } else {
        let responseData = {
            password1,
            code: -1,
            message: '密码修改失败'
        }
        res.json(responseData);
    }



}


module.exports = SettingsCon;