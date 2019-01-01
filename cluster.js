const cluster = require('cluster');
const express = require('express');
const CacheMgr = require('./lib/CacheMgr.js');
const ImgSrv = require('./lib/ImgSrv.js');

const { winston, morgan } = require('./logger.js');

const numCPUs = 4; // require('os').cpus().length;

if (cluster.isMaster) {
  new CacheMgr(cluster);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} 
else {
  const options = {
    base_url: '/',
    upload_dir: __dirname + '/data/uploads/',
    cache_dir: __dirname + '/data/cache/',
    cache_mgr: new CacheMgr(cluster),
    logger: winston
  }

  const app = express();
  app.set('imgsrv_options', options);

  app.use(morgan);
  app.use(ImgSrv(options));

  app.listen(61235);
}