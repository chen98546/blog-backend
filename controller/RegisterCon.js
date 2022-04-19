// 注册控制器

const md5 = require('md5');

const {
    pass_secret
} = require('../config/pass_secret.js')
const query = require('../mysql/connection.js');
const method = require('../method/method.js');


let RegisterCon = {};


// 注册页面
RegisterCon.register = (req, res) => {
    res.render('register.html')
}


// 注册数据
RegisterCon.registerUsersData = async (req, res) => {
    method.bodyDataFn(req.body);
    u_intro = u_intro !== '' ? u_intro : '这个人很懒，什么都没有留下';
    password2 = md5(`${password2}${pass_secret}`);

    // 是否上传了图片
    if (fileFlag == 1) {
        method.renameFn(req.file);
        // 拼接图片路径
        u_avatar = filename + extname;
    } else {
        u_avatar = 'images/avatar.webp';
    }
    let sql = `INSERT INTO tb_users(u_avatar,u_name,u_password,u_sex,u_intro) VALUES('${u_avatar}','${u_name}','${password2}',${u_sex},'${u_intro}')`;

    let responseData = method.isMessageFn(await query(sql), '注册成功');
    res.json(responseData);

}


module.exports = RegisterCon;