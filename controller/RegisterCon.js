// 注册控制器

const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const {pass_secret} = require('../config/pass_secret.js')
const query = require('../mysql/connection.js')

let RegisterCon = {};


// 注册页面
RegisterCon.register = (req, res) => {
    res.render('register.html')
}


// 注册数据
RegisterCon.registerUsersData = async (req, res) => {
    let {
        username,
        password2,
        registerAvatar,
        atrFileFlag,
        sex,
        intro
    } = req.body

    intro = intro !== '' ? intro : '这个人很懒，什么都没有留下'
    password2 = md5(`${password2}${pass_secret}`)

    // 是否上传了图片
    if (atrFileFlag == 1) {
        let {
            originalname,
            destination,
            filename
        } = req.file;

        // 获取图片后缀名
        let exName = path.extname(originalname);

        // 重命名
        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+ exName}`)
        );

        // 拼接图片路径
        registerAvatar = filename + exName;
    } else {
        registerAvatar = '1.webp';
    }

    let sql = `INSERT INTO tb_users(u_avatar,u_name,u_password,u_sex,u_intro) VALUES('${registerAvatar}','${username}','${password2}',${sex},'${intro}')`;

    let {
        affectedRows
    } = await query(sql);

    if (affectedRows > 0) {
        res.json({
            code: 0,
            message: '注册成功'
        });
    } else {
        res.send('注册失败')
    }

}


module.exports = RegisterCon;