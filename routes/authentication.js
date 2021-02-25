const express = require('express');
const Joi =require('@hapi/joi');
const jwt=require('jsonwebtoken');
const app =express();
const router =require('express').Router();

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
        CustPhone:Joi.string().max(10).require(),
        CustEmail:Joi.string().max(25).require(),
        CustUserName:Joi.string().min(6).require(),
        CustPassword:Joi.string().min(8).require(),
      });
  const result= registerSchema.validate(body);
  if(result.error)
  return res.status(400).send(result.error.details[0].message);
  const userExist=`SELECT * FROM customers where CustUserName="${body.CustUserName}" or CustEmail="${body.CustEmail}"`;
  const registerQuery="INSERT INTO `Customers` (`CustFirstName`, `CustLastName`,`CustAddress`,`CustCity`,`CustProv`,`CustPostal`,`CustCountry`,`CustPhone`,"+
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
module.exports=router;
