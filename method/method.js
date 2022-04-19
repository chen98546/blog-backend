// 方法模块 

let fs = require("fs");
let path = require("path");

let method = {};


// 将req.file中的数据封装为函数
method.fileDataFn = function (fileData) {
    return {
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path: filePath, // path有冲突取别名
        size,
        extname = path.extname(originalname), // 文件后缀名
    } = fileData;
};

// 获取文件路径
method.joinFn = function (joinName, dirname = path.dirname(__dirname)) {
    return path.join(`${dirname}/${joinName}`);
};

// 重命名方法
method.renameFn = function (fileData) {
    method.fileDataFn(fileData);
    return fs.renameSync(method.joinFn(destination + filename), method.joinFn(destination + filename + extname));
};


// 删除方法
method.unlinkFn = function (filePath) {
    return fs.unlink(method.joinFn(filePath), (err) => {});
};


// 将数据库中的所有数据和formData自定义属性封装为函数
method.bodyDataFn = function (bodyData) {
    return {
        art_id,
        art_title,
        art_content,
        art_author,
        art_status,
        art_date,
        art_pic,
        cate_id,
        cate_name,
        u_id,
        u_name,
        u_password,
        u_sex,
        u_intro,
        u_avatar,
        set_id,
        set_logoPic,
        set_logo,
        editorText,
        id,
        fileFlag,
        password2,
        password3,
        avatarFile,
        edit_artPic,
        picPath,
        edit_avatar
    } = bodyData;
};


// 判断是否成功函数
method.isMessageFn = function (query, message = '执行成功') {
    let codeObj = null;
    let {
        affectedRows
    } = query;
    if (affectedRows > 0) {
        // 成功
        codeObj = {
            code: 0,
            message,
        };
    } else {
        // 失败
        codeObj = {
            code: -1,
            message: '执行失败',
        };
    }
    return codeObj;
};

module.exports = method;