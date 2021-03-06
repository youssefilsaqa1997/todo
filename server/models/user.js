const mongoose = require('mongoose')
const validator=require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:3
  },
  typeOfUser:{
    type:String,
    required:true,
    trim:true
  },
  mobile:{
    type:String,
    required:true
  },
  profilePic:{
    type:String
  },
  name:{
    type:String,
    required:true,
    trim:true,
  }
});


var User = mongoose.model('users', userSchema);

module.exports={
  User
}