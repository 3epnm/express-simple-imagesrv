const express = require('express');
const CacheMgr = require('./lib/CacheMgr.js');
const ImgSrv = require('./lib/ImgSrv.js');

const { winston, morgan } = require('./logger.js');

const options = {
  base_url: '/image/',
  upload_dir: __dirname + '/data/uploads/',
  cache_dir: __dirname + '/data/cache/',
  cache_mgr: new CacheMgr(),
  logger: winston
}

const app = express();
app.set('imgsrv_options', options);

app.use(morgan);
app.use(ImgSrv(options));

app.listen(61235);
