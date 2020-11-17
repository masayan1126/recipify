const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
admin.initializeApp();
// Using Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});
// Sending the request
exports.sendMail = functions.region("asia-northeast1").https.onRequest((req: any, res: any) => {
    cors(req, res, () => {
        // Getting query parameter from http request
        const to = req.query.to;
        const msg = req.query.msg;
        const mailOptions = {
            from: gmailEmail,
            to: to,
            subject: 'This is a sample of email function',
            html: `${msg}`
        };
        // Getting results
        return transporter.sendMail(mailOptions, (erro: any, info: any) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
