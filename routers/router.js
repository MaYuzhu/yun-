/**
 * Created by 39557 on 2018/1/2.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var sha1 = require('sha1');

router.get('/index',function (req,res) {
  res.render('index');
});
router.get('/login',function (req,res) {
  res.render('login');
});
router.get('/zhuce',function (req,res) {
  res.render('zhuce');
});
//为根目录映射一个路由
router.get('/',function (req, res) {
  res.redirect('/zhuce')
})

//登录的路由
router.post('/login',function (req,res) {
  var username = req.body.username;
  var password = req.body.password;
  var msg = {username:username};
  User.findOne({username:username},function (err,user) {
    if(!err&&user&&user.password==password){
      res.cookie('username',username,{maxAge:1000*60*60*24*5});
      req.session.loginUser = user;
      res.redirect('/index');
    }else{
      msg.err ='用户名或密码错误'
      res.render('login',{msg:msg});
    }
  });


});


//注册的路由
router.post('/zhuce',function (req,res) {
  var username = req.body.username;
  var password = req.body.password;

  var phoneReg = /^[0-9]{11}$/;
  //var phoneReg = /^[\w-]{6,18}$/;
  var pwdReg = /^[\w-]{6,18}$/;

  var msg = {username:username};

  if(!phoneReg.test(username)){
    msg.phErr = '请输入正确的手机号码';
  }
  if(!pwdReg.test(password)){
    msg.pwdErr = '请输入6-18位，可以包含字母、数字、_、-的密码';
  }
  if(msg.phErr||msg.pwdErr){
    res.render('zhuce',{msg:msg});
    return;
  }

   User.create({
      username:username,
      password:password

    },function (err) {
      if(!err){
        res.redirect('/login');
      }else {
        msg.err = '手机号已存在';
        res.render('zhuce',{msg:msg});
      }
    });

});


module.exports = router;