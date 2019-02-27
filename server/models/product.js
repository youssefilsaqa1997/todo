const mongoose = require('mongoose')
const validator=require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var productSchema = new mongoose.Schema({
  desc:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  madeIn:{
    type:String
  },
  logo:{
    type:String,
    required:true 
  },
  category:{
    type:Number,
    required:true
  },
  branchId:{
    type:String,
    required:true
  }
});


var Product = mongoose.model('product', branchSchema);

module.exports={
    Product
}