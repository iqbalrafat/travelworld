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





});
module.exports=router;
