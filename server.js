// 服务模块

const express = require('express');
const path = require('path');
const express_template = require('express-art-template');
const session = require('express-session');
const cors = require('cors')
const chokidar = require('chokidar');
const execSh = require('exec-sh');


const router = require('./router/router.js');
const apiRouter = require('./router/apiRouter.js');
const middleware = require('./middleware/middleware.js');

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/assets')))
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(express.static(path.join(__dirname, '/uploads')))


app.use('/api', apiRouter)


app.use(session({
    name: 'session_id',
    secret: 'GTA10086%',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 60000 * 30,
    }
}))


let {
    checkSessionAuth
} = middleware
// 判断session 中间件
app.use(checkSessionAuth);

app.use(router);




// 监听目录controller的变化
chokidar.watch('./controller').on('all', (event, path) => {
    // 文件修改了，自动执行eslint检测语法
    if (event == 'change') {
        execSh("npx eslint ./controller", function (err) {
            if (err) {
                console.log("err", err.code);
            }
        });
    }
});


app.listen(12580, () => {
    console.log('server is running at port 12580');
})