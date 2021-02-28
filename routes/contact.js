const router = require ('express').Router();
const db = require ('../databaseConnection/mySQL');
const nodemailer = require ('nodemailer');

//create post route to receive email from customer
router.post('/email',(re,res)=>(){
const {body}=req.body;
const output=`
<p> A New Contact Email Received</p>
  <h3> Contact Detail </h3>
    <ul>
        <li> Name : ${body.name}</li>
        <li> Email : ${body.email}</li>
        <li> Phone-Number: ${body.phone}</li>
    </ul>
  <h3>Message</h3>
  <p>${body.msgText}</p>
`
//Section-2 Setup Nodemailer Transporter
let transporter= nodemailer.createTransport({
host:'smtp.gmail.com',
port:587,
secure:false,
auth:{
  user:'rafatiqbalsiddiqui@gmail.com',
  pass:process.env.MAIL_SERVER_PASSWORD
},
tls:{
  rejectUnauthorized:false
}
});
//setup email account who will receive messages
let mailOptions={
  from: `"Nodemailer Contact" <${body.email}>`,
  to:['rafatiqbalsiddiqui@gmail.com','rafat.iqbal@gmail.com',body.email],
  subject:'Customer Contact Request',
  text: 'Hello World',  // plain text email
  html: output
};
//setup mail invitation 
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);   
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  res.send("Email has been sent");
});
})

module.exports=router;















})






});
