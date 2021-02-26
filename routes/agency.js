const router = require('express').Router();
const db = require('../databaseConnection/mySQL');

//Retrieve all agencies data from database
router.get('/agencyData',(req,res)=>{
  const agencyDataQuery= `SELECT * FROM agencies`;
  db.query(agencyDataQuery,(error,result)=>{
    if(error)throw error;
    return res.status(200).send(result);
  })
})