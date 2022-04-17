// 分类控制器

const query = require('../mysql/connection.js')

let CategoryCon = {};

CategoryCon.category = (req, res) => {
    res.render('category.html')
}


// 查询
CategoryCon.categoryListData = async (req, res) => {
    let sql = `SELECT t1.*,COUNT(t2.cate_id) count FROM tb_category t1 LEFT JOIN tb_article t2  ON t1.cate_id = t2.cate_id GROUP BY t1.cate_id`;
    let data = await query(sql)
    console.log(data);
    let responseData = {
        data,
        code: 0,
    }
    res.json(responseData);
}


// 添加
CategoryCon.addCategory = async (req, res) => {
    let {
        cate_name
    } = req.body;
    let sql = `insert into tb_category(cate_name)values('${cate_name}')`;
    let data = await query(sql);
    res.json(data)
}


// 修改
CategoryCon.editCategory = async (req, res) => {
    let {
        cate_id,
        cate_name,
    } = req.body

    let sql = `update tb_category set cate_name = '${cate_name}' where cate_id = ${cate_id}`;
    let data = await query(sql);

    let responseData = {
        code: 0,
        message: '修改成功',
    }

    res.json(responseData)
}


// 删除
CategoryCon.delCategory = async (req, res) => {
    let {
        id
    } = req.query;
    let sql = `DELETE FROM tb_category WHERE cate_id = ${id}`;
    let data = await query(sql);
    let responseData = {
        code: 0,
        message: '删除成功'
    }
    res.json(responseData);
}



module.exports = CategoryCon;