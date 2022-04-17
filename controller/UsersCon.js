// 用户信息控制器

const query = require('../mysql/connection.js')

let UsersCon = {};


UsersCon.getUsersData = async (req, res) => {
    let sql = `SELECT u_name,u_avatar FROM tb_users`;
    let data = await query(sql);
    res.json(data)
}





module.exports = UsersCon;