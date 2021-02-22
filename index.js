const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const app =express();

//setup body and cookie parser
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser({urlencoded:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
  const data=req.body();
  res.send("hello world");
})

app.listen(3002,(req,res)=>{ 
  console.log("server is running on port 3002");
})