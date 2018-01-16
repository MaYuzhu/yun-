/**
 * Created by 39557 on 2018/1/2.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/yundate');
mongoose.connection.on('open',function () {
  console.log('云音乐数据库已连接');
})

