const express = require('express');
const Joi =require('@hapi/joi');
const jwt=require('jsonwebtoken');
const db = require('../databaseConnection/mySQL');
const router =require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

router.post('/registration', (req,res)=>{
      const {body}=req;
      //defing schema for joi validation
      const registerSchema= Joi.object({
        CustFirstName:Joi.string().max(25).require(),
        CustLastName:Joi.string().max(25).require(),
        CustAddress:Joi.string().max(50).require(),
        CustCity:Joi.string().max(50).require(),
        CustProv:Joi.string().max(50).require(),
        CustPostal:Joi.string().max(7).require(),
        CustCountry:Joi.string().max(50).require(),
        CustBusPhone:Joi.string().max(10).require(),
        CustEmail:Joi.string().max(25).require(),
        CustUserName:Joi.string().min(6).require(),
        CustPassword:Joi.string().min(8).require(),
      });
  const result= registerSchema.validate(body);
  if(result.error)
  return res.status(400).send(result.error.details[0].message);
  const userExist=`SELECT * FROM customers where CustUserName="${body.CustUserName}" or CustEmail="${body.CustEmail}"`;
  const registerQuery="INSERT INTO `Customers` (`CustFirstName`, `CustLastName`,`CustAddress`,`CustCity`,`CustProv`,`CustPostal`,`CustCountry`,`CustBusPhone`,"+
  "`CustEmail`,`CustUserName`,`CustPassword`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(userExist,async(err,result)=>{
      if(err) throw err;
      if(result.length>0){
      return res.status(400).send("user already exists");
      }
      const salt=await bcrypt.genSalt(10);
      const encryptedPassword=await bcrypt.hash(body.CustPassword,salt);
      body.CustPassword=encryptedPassword;
    //inserting data into Database
      let data=[]
      for (let item of Object.keys(body)){
        data.push(body[item])
      }
      db.query(registerQuery,data,(err,result)=>{
        if(err) throw err;
        return res.status(200).send(result);
      });
    });
});

//Add login route
router.post("/login",(req,res)=>{
    let {body}=req;
    const loginSchema=Joi.Object({
      CustEmail:Joi.string().max(25).required(),
      CustPassword:Joi.string.min(8).required()   
    })
    const result=loginSchema.validate(body);
  if (result.err)
  return res.status(400).send(result.error.details[0].message);

  const loginQuery=`SELECT * from customers where CustUserName="${body.CustUserName}"or CustEmail="${body.CustEmail}"`;

  // Running Login Query
    db.query(loginQuery, async(err,result)=>{  
    if (err) throw error;
    if(result.length==0) return res.status(400).send('invalid userName or Email');
   //comparing password  
    const isPasswordMatched= await bcrypt.compare(body.CustPassword,result[0].CustPassword);
    if(!isPasswordMatched) return res.status(400).send('invalid Password');
  
   // Creating JWT token using provided pattern   
    const token=jwt.sign({CustomerID: result[0].CustomerId}, 'ieuriuifjfksllaeelklkqle');
    res.cookie('auth_token', token,{
      maxAge: 72000000,
      httpOnly: true,
    });
    res.status(200).end()
  }); 
});
module.exports=router;
