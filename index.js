/**
 * Created by 39557 on 2018/1/2.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStroe = require('connect-mongo')(session);

require('./tools/db');

var app = express();
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:'yun',
  store:new MongoStroe({mongooseConnection:mongoose.connection})

}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(function (req,res,next) {
  app.locals.msg = {};
  app.locals.cookies = req.cookies;
  app.locals.session = req.session;
  next();
})

app.set('view engine','ejs');
app.set('views','views');
app.use(require('./routers/router'));

app.use(function (req,res) {
  res.status(404);
});

app.listen(3000,function () {
  console.log('yun启动成功');
})