const router = require ('express').Router();
const db = require ('../databaseConnection/mySQL');
const nodemailer = require ('nodemailer');

//post request for sending email to customers

router.post('/bookingemail',(req,res)=>{
  const {body}=req.body;
  const output=`
  <p> Your Booking Detail </p>
  <h3> Package Detail </h3>
  <ul> 
    <li> firstName   : ${body.fname}</li>
    <li> lastName    : ${body.lname}</li>
    <li> phoneNumber : ${body.phone}</li>
    <li> email       : ${body.email}</li>
    <li> packageName : ${body.packageName}</li>
    <li> packagePrice: ${body.packagePrice}</li>
    <li> startDate   : ${body.startDate}</li>
    <li> endDate     : ${body.endDate}</li>
  </ul>
  
  
  `
})