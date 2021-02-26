const express =require('express');
const router = require('express').Router();
const verify = require ('../middleware/verifyToken');
const db =  require('../databaseConnection/mySQL');
// route to get the user profile for the user currently logged in

router.get('/userProfile',verify,(req,res)=>{
  const userProfileQuery=`SELECT * from Customers where CustomerID="${req.user.CustomerID}"`;
  db.query(userProfileQuery, (error,result)=>{
    if(error)throw error;
    return res.status(200).send(result);
  });
});
module.exports=router;