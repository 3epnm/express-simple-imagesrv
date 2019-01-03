const express = require('express');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const CacheMgr = require('./lib/CacheMgr.js');
const ImgSrv = require('./lib/ImgSrv.js');

const User = require('./User');

passport.use(new Strategy(
  function (token, done) {
    if (token === User.token) {
      return done(null, User, { scope: 'all' });
    } else {
      return done(null, false);
    } 
  }));

const { winston, morgan } = require('./logger.js');

const options = {
  base_route: '/',
  base_url: '/image/',
  upload_dir: '/home/mb2/data/uploads/',
  cache_dir: '/home/mb2/data/cache/',
  cache_mgr: new CacheMgr(),
  logger: winston
}

const app = express();
app.set('imgsrv_options', options);

app.post('/',
  passport.authenticate('bearer', { session: false }),
  function(req, res, next) { next(); });

app.put('/:guid',
  passport.authenticate('bearer', { session: false }),
  function(req, res, next) { next(); });

app.use(morgan);
app.use(ImgSrv(options));

app.listen(61235);
