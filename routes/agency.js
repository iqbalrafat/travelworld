const router = require('express').Router();
const db = require('../databaseConnection/mySQL');

//Retrieve all agencies data from database
router.get('/agencyData',(req,res)=>{
  const agencyDataQuery= `SELECT * FROM agencies`;
  db.query(agencyDataQuery,(error,result)=>{
    if(error)throw error;
    return res.status(200).send(result);
  });
});
//Retrieve all agents from database
router.get('/agentsData',(req,res)=>{
  const agentsQuery=`SELECT * FROM agents`;
  db.query(agentsQuery,(error,result)=>{
    if(error)throw error;
    res.status(200).send(result);
  });
});
