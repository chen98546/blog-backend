// 主页控制器

let IndexCon = {}

// 后台首页
IndexCon.index = (req, res) => {
    res.render('index.html')
}

module.exports = IndexCon;