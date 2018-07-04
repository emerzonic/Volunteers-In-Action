const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var output = `<h1>Success!</h1>`;

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
// function sendEmail(){
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: 'volunteersinactions@gmail.com',
//         clientId: '385985468889-8n7gpmn837se74ib2gmnpu72kon3adop.apps.googleusercontent.com',
//         clientSecret: '64PcEzsoLRLyEnJ2U4RlsDj9',
//         refreshToken: '1/b-kDO2DqcnJZhRxqf2VLHkzxpPNU963mckTYxQJPQHM'
//         // accessToken: 'ya29.GlvuBTbxPX4fBmHYYqfQJxsCiomERi-R1rV59SGxHnSFbhrPaVXMLSe6EkLoFpvRDHaO0ue21dfybeTl4kUvka39VfLUwZ4DPYKNJrhAjq6hwBgpDmfvRQMeyKdp'
//     }
// // });

// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             type: 'OAuth2',
//             user: 'volunteersinaction@gmail.com',
//             clientId: '385985468889-8n7gpmn837se74ib2gmnpu72kon3adop.apps.googleusercontent.com',
//             clientSecret: '64PcEzsoLRLyEnJ2U4RlsDj9',
//             refreshToken: '1/b-kDO2DqcnJZhRxqf2VLHkzxpPNU963mckTYxQJPQHM'
//             // accessToken: 'ya29.GlvuBTbxPX4fBmHYYqfQJxsCiomERi-R1rV59SGxHnSFbhrPaVXMLSe6EkLoFpvRDHaO0ue21dfybeTl4kUvka39VfLUwZ4DPYKNJrhAjq6hwBgpDmfvRQMeyKdp',
//         })
//     }
// });

// // var transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     port: 465,
// //     secure: false,
// //     auth: {
// //            user: 'volunteersinaction@gmail.com',
// //            pass: 'volunteer@2018'
// //        }
// //    });


// // setup email data with unicode symbols
// var mailOptions = {
//     from: '"Volunteers In Action" <volunteersinaction@gmail.com>', // sender address
//     to: 'emerson.doyah@gmail.com', // list of receivers
//     subject: `Congratulations.`, // Subject line
//     text: `Thanks for signing up to volunteer at an event. We really appreciate your time`, // plain text body
//     html: output // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     console.log('Sending message!!!!!!!!!!!!!!!\n\n');
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     console.log('message sent!!!!!!!!!!!!!!!\n\n');
// });

// });
// }

// module.exports = transporter;