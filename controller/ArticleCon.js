// 文章控制器

const moment = require('moment');
const query = require('../mysql/connection.js');
const method = require('../method/method.js');

let ArticleCon = {};



// 文章页面
ArticleCon.article = (req, res) => {
    res.render('article.html')
}


// 添加页面
ArticleCon.addArticle = (req, res) => {
    res.render('addArticle.html')
}


// 编辑页面
ArticleCon.editArticle = (req, res) => {
    res.render('editArticle.html')
}


// 查询指定id数据回显
ArticleCon.onlyArticleData = async (req, res) => {
    let {
        id
    } = req.query;
    let sql = `select * from tb_article where art_id = ${id}`;
    let data = await query(sql);
    res.json(data);
}


// 获取
ArticleCon.articleListData = async (req, res) => {
    const {
        page,
        limit,
        keyword
    } = req.query;
    let offset = (page - 1) * limit;
    // 查询文章总数语句
    let countSql = `select count(art_id) count from tb_article WHERE 1 `;
    // 查询所有文章数据
    let sql = `SELECT t1.*, t2.cate_name,t3.u_name FROM tb_article t1 LEFT JOIN tb_category t2 ON t1.cate_id = t2.cate_id LEFT JOIN tb_users t3 ON t1.art_author = t3.u_id where 1 `;

    // 判断用户是否搜索
    if (keyword) {
        // 拼接模糊搜索语句
        countSql += `and art_title like '%${keyword}%'`;
        sql += `and art_title like '%${keyword}%' `;
    }
    // 拼接分页语句
    sql += `ORDER BY t1.art_id DESC LIMIT ${offset},${limit}`

    let result = await query(countSql);

    let {
        count
    } = result[0];

    let data = await query(sql);
    data = data.map(item => {
        // 转换时间格式
        item.art_date = moment(item.art_date).format('YYYY-MM-DD HH:mm:ss');
        item.art_status = item.art_status == 1 ? '已审核' : '未审核';
        return item;
    })
    let responseData = {
        count,
        data,
        code: 0,
    }
    res.json(responseData);
}


// 添加
ArticleCon.addArticleData = async (req, res) => {
    method.bodyDataFn(req.body);
    let sql;
    if (fileFlag == 1) {
        method.fileDataFn(req.file);
        method.renameFn(req.file);
        art_pic = filename + extname;
        sql = `insert into tb_article (art_title,art_date,cate_id,art_author,art_status,art_pic,art_content) values('${art_title}','${art_date}',${cate_id},${art_author},${art_status},'${art_pic}','${editorText}')`;
    } else {
        art_pic = 'images/avatar.webp';
        sql = `insert into tb_article (art_title,art_date,cate_id,art_author,art_status,art_pic,art_content) values('${art_title}','${art_date}',${cate_id},${art_author},${art_status},'${art_pic}','${editorText}')`;
    }

    let responseData = method.isMessageFn(await query(sql), '添加成功');
    res.json(responseData);
}


// 编辑
ArticleCon.editArticleData = async (req, res) => {
    method.bodyDataFn(req.body);
    let sql;
    if (fileFlag == 1) {
        method.fileDataFn(req.file);
        method.renameFn(req.file);
        art_pic = filename + extname;
        sql = `update tb_article set art_title = '${art_title}', art_date = '${art_date}',cate_id = ${cate_id},art_author = ${art_author},art_status = ${art_status},art_pic = '${art_pic}',art_content = '${editorText}' where art_id = ${art_id}`;

        // 上传旧图
        method.unlinkFn(destination + picPath);
    } else {
        sql = `update tb_article set art_title = '${art_title}', art_date = '${art_date}',cate_id = ${cate_id},art_author = ${art_author},art_status = ${art_status},art_content = '${editorText}' where art_id = ${art_id}`;
    }
    let responseData = method.isMessageFn(await query(sql), '编辑成功');
    res.json(responseData)
}


// 删除
ArticleCon.delArticle = async (req, res) => {
    let {
        id
    } = req.query;
    method.bodyDataFn(req.body);
    art_pic = method.joinFn(`uploads/${art_pic}`);
    let sql = `DELETE FROM tb_article WHERE art_id = ${id}`;
    method.unlinkFn(art_pic);
    let responseData = method.isMessageFn(await query(sql), '删除成功');
    res.json(responseData);
}



module.exports = ArticleCon;