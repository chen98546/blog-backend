// 分类控制器

const query = require('../mysql/connection.js');
const method = require('../method/method.js');

let CategoryCon = {};

// 分类页面
CategoryCon.category = (req, res) => {
    res.render('category.html')
}


// 查询
CategoryCon.categoryListData = async (req, res) => {
    let sql = `SELECT t1.*,COUNT(t2.cate_id) count FROM tb_category t1 LEFT JOIN tb_article t2  ON t1.cate_id = t2.cate_id GROUP BY t1.cate_id`;
    let data = await query(sql)
    let responseData = {
        data,
        code: 0,
    }
    res.json(responseData);
}


// 添加
CategoryCon.addCategory = async (req, res) => {
    method.bodyDataFn(req.body);
    let sql = `insert into tb_category(cate_name)values('${cate_name}')`;
    let data = await query(sql);
    res.json(data)
}


// 修改
CategoryCon.editCategory = async (req, res) => {
    method.bodyDataFn(req.body);
    let sql = `update tb_category set cate_name = '${cate_name}' where cate_id = ${cate_id}`;
    let responseData = method.isMessageFn(await query(sql), '修改成功');
    res.json(responseData)
}


// 删除
CategoryCon.delCategory = async (req, res) => {
    let {
        id
    } = req.query;
    let sql = `DELETE FROM tb_category WHERE cate_id = ${id}`;
    let responseData = method.isMessageFn(await query(sql), '删除成功');
    res.json(responseData)
}


module.exports = CategoryCon;