// 前台控制器

let query = require('../mysql/connection.js')
let frontendCon = {};

frontendCon.frontCategory = async (req, res) => {
    let sql = `SELECT t1.*,COUNT(t2.cate_id) count FROM tb_category t1 LEFT JOIN tb_article t2  ON t1.cate_id = t2.cate_id GROUP BY t1.cate_id`;
    let data = await query(sql);
    res.json(data)
}


frontendCon.frontArtData = async (req, res) => {
    const {
        page = 1, limit = 5
    } = req.query;
    const offset = (page - 1) * limit;
    let sql = `SELECT t1.*,t2.cate_name,t3.u_name FROM tb_article t1 LEFT JOIN tb_category t2 on t1.cate_id = t2.cate_id LEFT JOIN tb_users t3 on t1.art_author = t3.u_id where t1.art_status = 1 order by t1.art_id desc limit ${offset},${limit}`;
    let data = await query(sql);
    res.json(data)
}


frontendCon.frontCateArt = async (req, res) => {
    const {
        id
    } = req.query;
    let sql = `select t1.*,t2.cate_name from tb_article t1 left join tb_category t2 on t1.cate_id = t2.cate_id where t1.cate_id = ${id}`;
    let data = await query(sql);
    res.json(data)
}



frontendCon.frontDetailArt = async (req, res) => {
    const {
        id
    } = req.query;
    let sql = `SELECT t1.*,t2.cate_name,t3.u_name FROM tb_article t1 LEFT JOIN tb_category t2 on t1.cate_id = t2.cate_id LEFT JOIN tb_users t3 on t1.art_author = t3.u_id where t1.art_id = ${id}`;
    let data = await query(sql);
    res.json(data)
}



module.exports = frontendCon;