const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var output = `<h1>Success!</h1>`;

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
// function sendEmail(){

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    
    
    // service: 'gmail',
    // smtp.gmail.com,
    // Requires SSL: 'Yes',

// Requires TLS: Yes (if available)

// Requires Authentication: Yes

// Port for SSL: 465

// Port for TLS/STARTTLS: 587

    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user:'volunteersinaction@gmail.com',
            clientId:'497364046096-7lqdd1l5rq9jhqq7g0n5d04h2g1740mp.apps.googleusercontent.com',
            clientSecret:'P5sGw2iUeIlM9koXVwIDezTB',
            refreshToken:'1/c5Xa1n1hmHcvLYL-T-BNT0l3DGbtU4EPVNqBbTk3R-k',
        })
    //     user: "volunteersinaction@gmail.com", // generated ethereal user
    //     pass: "volunteer@2018" // generated ethereal password
    // },
    // // tls:{
    //     rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: '"Volunteers In Action" <volunteersinaction@gmail.com>', // sender address
    to: 'emerson.doyah@gmail.com', // list of receivers
    subject: `Congratulations.`, // Subject line
    text: `Thanks for signing up to volunteer at an event. We really appreciate your time`, // plain text body
    html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    console.log('message sent!!!!!!!!!!!!!!!\n\n');
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    console.log('message sent!!!!!!!!!!!!!!!\n\n');
});

// });
// }

module.exports = transporter;