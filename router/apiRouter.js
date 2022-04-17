const express = require('express')
const frontendCon = require('../controller/frontendCon.js')

let apiRouter = express.Router();

apiRouter.get('/frontCategory', frontendCon.frontCategory)
apiRouter.get('/frontArtData', frontendCon.frontArtData)
apiRouter.get('/frontCateArt', frontendCon.frontCateArt)
apiRouter.get('/frontDetailArt', frontendCon.frontDetailArt)


module.exports = apiRouter;