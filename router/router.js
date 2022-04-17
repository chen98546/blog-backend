const express = require('express');
const multer = require('multer');


const router = express.Router();


const upload = multer({
    dest: 'uploads/'
});


// 主页控制器
const IndexCon = require('../controller/IndexCon.js');
// 用户信息控制器
const UsersCon = require('../controller/UsersCon.js');
// 登录控制器
const LoginCon = require('../controller/LoginCon.js');
// 分类控制器
const CategoryCon = require('../controller/CategoryCon.js');
// 文章控制器
const ArticleCon = require('../controller/ArticleCon.js');
// 设置控制器
const SettingsCon = require('../controller/SettingsCon.js');
// 注册控制器
const RegisterCon = require('../controller/RegisterCon.js');



// 用户控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 获取用户名和头像
router.get('/getUsersData', UsersCon.getUsersData);



// 注册控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 注册页面
router.get('/register', RegisterCon.register);
// 上传注册信息
router.post('/registerUsersData', upload.single("registerAvatar"), RegisterCon.registerUsersData);



// 登录控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 登录页面
router.get('/login', LoginCon.login);
// 验证登录信息
router.post('/verifyLoginInfo', LoginCon.verifyLoginInfo);
// 退出登录
router.post('/logout', LoginCon.logout);



// 主页控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/', IndexCon.index);



// 分类控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 分类页面
router.get('/category', CategoryCon.category);
// 获取
router.get('/categoryListData', CategoryCon.categoryListData);
// 添加
router.post('/addCategory', CategoryCon.addCategory);
// 修改
router.put('/editCategory', CategoryCon.editCategory);
// 删除
router.delete('/delCategory', CategoryCon.delCategory);



// 文章控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 文章页面
router.get('/article', ArticleCon.article);
// 添加页面
router.get('/addArticle', ArticleCon.addArticle);
// 编辑页面
router.get('/editArticle', ArticleCon.editArticle);
// 获取
router.get('/articleListData', ArticleCon.articleListData);
// 获取
router.get('/onlyArticleData', ArticleCon.onlyArticleData);
// 添加
router.post('/addArticleData', upload.single("art_pic"), ArticleCon.addArticleData)
// 修改
router.put('/editArticleData', upload.single("edit_artPic"), ArticleCon.editArticleData)
// 删除
router.delete('/delArticle', ArticleCon.delArticle)






// 设置控制器 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 设置页面
router.get('/settings', SettingsCon.settings);
// 修改
router.put('/editSettings',upload.single("set_logoPic"), SettingsCon.editSettings);
// 个人信息修改
router.put('/amendPersonalData', upload.single("personalAvatar"), SettingsCon.amendPersonalData);
// 密码修改
router.put('/editPwdForm', SettingsCon.editPwdForm);








module.exports = router;