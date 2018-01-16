/**
 * Created by 39557 on 2018/1/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username:{
    type:String,
    unique:true
  },
  password:String
});

module.exports = mongoose.model('user',userSchema);