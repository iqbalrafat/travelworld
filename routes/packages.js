const router = require ('express').Router();
const db = require ('../databaseConnection/mySQL');


//route to get all packages data from packages table
router.get('/packagesData',(req,res)=>{
  const allPackageQuery=`SELECT * from packages`;
  db.query(allPackageQuery,(error,result)=>{
    if(error)throw error;
    return res.status(200).send(result);
  });
});

//route to get the specific package data from database
router.get('/packagesData/:id',(req,res)=>{
  const singlePackageQuery=`SELECT * FROM packages where PackageID="${req.params.id}"`;
  db.query(singlePackageQuery,(error,result)=>{
    if(error)throw error;
    return res.status(200).send(result);
  });
});