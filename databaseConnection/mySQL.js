const mySQL=require('mySQL');
const mySQLConnection = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  database:process.env.DATABASE_NAME
});
mySQLConnection.connect(function(err){
  if (err) throw err;
  console.log('MySql Data base Connected');
});

module.exports=mySQLConnection;