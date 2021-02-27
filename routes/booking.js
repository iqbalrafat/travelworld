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
  //section-2 setup nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,    // true for 465, false for other ports
    auth:{
      user: 'rafatiqbalsiddiqui@gmail.com',
      pass: process.env.MAIL_SERVER_PASSWORD    
    },
    tls:{
      rejectUnauthorized:false
    }
  })
// section-3 setup email account who will send and who will receive
  let mailOptions = {
    from: `"Nodemailer Contact" <${body.email}>`, // sender address
    to: ['rafatiqbalsiddiqui@gmail.com', 'yin.dong@edu.sait.ca','wenhong.liu@edu.sait.ca','ying.jin@edu.sait.ca', body.email],// list of receivers
    subject: 'Customer Booking Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};
// step-4 setup mail invitation
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send("Your booking request has been sent , Our Agent will contact you shortly");
  });
})

module.exports=router;

})