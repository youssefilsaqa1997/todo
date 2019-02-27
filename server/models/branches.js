const mongoose = require('mongoose')
const validator=require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var branchSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true,
  },
  area:{
    type:String,
    required:true
  },
  ownerId:{
    type:String,
    required:true
  },
  openingHours:{
    type:String
  },
  address:{
    type:String,
    required:true
  },
  logo:{
    type:String
  }
});


var Branch = mongoose.model('branch', branchSchema);

module.exports={
    Branch
}