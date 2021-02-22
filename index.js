const express = require('express');
const cors=require('cors');

const app =express();

app.get("/",(req,res)=>{
  res.send("hello world");
})

app.listen(3002,(req,res)=>{ 
  console.log("server is running on port 3002");
})