// 文章控制器

const fs = require('fs')
const path = require('path')
const moment = require('moment')

const query = require('../mysql/connection.js')

let ArticleCon = {};



// 文章
ArticleCon.article = (req, res) => {
    res.render('article.html')
}

// 添加
ArticleCon.addArticle = (req, res) => {
    res.render('addArticle.html')
}

// 编辑 
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

    let {
        page,
        limit,
        keyword
    } = req.query;
    let offset = (page - 1) * limit;
    let countSql = `select count(art_id) count from tb_article WHERE 1 `;
    let sql = `SELECT t1.*, t2.cate_name,t3.u_name FROM tb_article t1 LEFT JOIN tb_category t2 ON t1.cate_id = t2.cate_id LEFT JOIN tb_users t3 ON t1.art_author = t3.u_id where 1 `;

    if (keyword) {
        countSql += `and art_title like '%${keyword}%'`;
        sql += `and art_title like '%${keyword}%' `;
    }
    sql += `ORDER BY t1.art_id DESC LIMIT ${offset},${limit}`


    let result = await query(countSql);
    let {
        count
    } = result[0];





    let data = await query(sql)
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
    let {
        art_title,
        art_date,
        cate_id,
        art_author,
        art_status,
        editorText,
        addFlag
    } = req.body;

    let sql;
    let art_pic;
    if (addFlag == 1) {
        let {
            originalname,
            filename,
            destination
        } = req.file;

        let extname = path.extname(originalname);

        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+extname}`)
        );

        art_pic = filename + extname;
        sql = `insert into tb_article (art_title,art_date,cate_id,art_author,art_status,art_pic,art_content) values('${art_title}','${art_date}',${cate_id},${art_author},${art_status},'${art_pic}','${editorText}')`;

    } else {
        art_pic = '1.webp'
        sql = `insert into tb_article (art_title,art_date,cate_id,art_author,art_status,art_pic,art_content) values('${art_title}','${art_date}',${cate_id},${art_author},${art_status},'${art_pic}','${editorText}')`;

    }




    let data = await query(sql);

    let responseData = {
        code: 0,
        message: '添加成功'
    }
    res.json(responseData)
}


// 编辑
ArticleCon.editArticleData = async (req, res) => {
    let {
        art_title,
        art_date,
        cate_id,
        art_author,
        art_status,
        editorText,
        fileFlag,
        art_id
    } = req.body;

    if (fileFlag == 1) {
        let {
            originalname,
            filename,
            destination
        } = req.file;

        let extname = path.extname(originalname);

        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+extname}`)
        );

        let art_pic = filename + extname;
        sql = `update tb_article set art_title = '${art_title}', art_date = '${art_date}',cate_id = ${cate_id},art_author = ${art_author},art_status = ${art_status},art_pic = '${art_pic}',art_content = '${editorText}' where art_id = ${art_id}`;
    } else {
        sql = `update tb_article set art_title = '${art_title}', art_date = '${art_date}',cate_id = ${cate_id},art_author = ${art_author},art_status = ${art_status},art_content = '${editorText}' where art_id = ${art_id}`;
    }

    let data = await query(sql);

    let responseData = {
        code: 0,
        message: '修改成功'
    }
    res.json(responseData)
}



// 删除
ArticleCon.delArticle = async (req, res) => {
    let {
        id
    } = req.query;
    let {
        art_pic
    } = req.body;

    art_pic = path.join(`${path.dirname(__dirname)}/${'uploads/'+art_pic}`)

    let sql = `DELETE FROM tb_article WHERE art_id = ${id}`;
    fs.unlink(art_pic, (err) => {})
    let data = await query(sql);
    let responseData = {
        code: 0,
        message: '删除成功'
    }
    res.json(responseData);
}



module.exports = ArticleCon;