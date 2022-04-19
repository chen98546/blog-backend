## 依赖

- fs
- path

## 方法使用

- 获取req.file属性 method.fileDataFn()： 参数：req.file; 解构req.file中的属性 添加一个`extname`获取上传原文件的后缀名  为避免命名冲突，将函数内path属性名重命名为filePath

- 获取文件路径 method.joinFn()：第一个参数：文件名; [ 第二个参数： __dirname（默认path.dirname(__dirname) ]

- 文件重命名 method.renameFn()：参数req.file

- 上传文件 method.unlinkFn()：第一个参数：需要删除的文件名;  [ 第二个参数： __dirname（默认path.dirname(__dirname) ]

- 数据 method.bodyDataFn()：req.body 

- 判断状态 isMessageFn()：第一个参数：query; [ 第二个参数：字符串 ]
