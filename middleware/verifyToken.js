const JWT = require('jsonwebtoken');
module.exports=function(req,res,next){
  let token =req.cookies.auth_token;
  if(!token)return res.redirect('/login');
  try{
    const varified = jwt.verify(token,"ieuriuifjfksllaeelklkqle");
    req.user=verified.user;
    next(); 
  }
  catch(err){
    return res.redirect('/login');
  }
}