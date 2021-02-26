const mysql = require('mysql');
const mySQLConnection = mysql.createConnection({
  host:"localhost",
  user:"root",
  database:"travelexperts"
});
mySQLConnection.connect(function(err){
  if (err) throw err;
  console.log('MySql Data base Connected');
});

module.exports=mySQLConnection;