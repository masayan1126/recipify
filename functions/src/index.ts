const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();
const db = admin.firestore();
// Using Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});
// Sending the request
export const sendMail = functions.region("asia-northeast1").https.onRequest((req: any, res: any) => {
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


const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
};
/**
 * Execute the following command in your Terminal app
 * curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json" -d @dataset.json
*/
export const addBotDataset = functions.region('asia-northeast1').https.onRequest(async (req: any, res: any) => {
    if (req.method !== 'POST') {
        sendResponse(res, 405, {error: "Invalid Request"})
    } else {
        const dataset = req.body;
        for (const key of Object.keys(dataset)) {
            const data = dataset[key];
            await db.collection('bot').doc(key).set(data)
        }
        sendResponse(res, 200, {message: 'Successfully added dataset! WooHoo!'});
    }
});

export const addDefaultRecipes = functions.region('asia-northeast1').https.onRequest(async (req: any, res: any, recipeDataset, uid) => {
    cors(req, res, (async() => {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.set('Access-Control-Allow-Origin', 'https://recipify-e1b95.web.app');
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        } else {
            const dataset = recipeDataset;
            for (const key of Object.keys(dataset)) {
                const data = dataset[key];
                const ref = db.collection('users').doc(uid).colleciton("recipes").doc();
                const id = ref.id;
                await db.collection('users').doc(uid).colleciton("recipes").doc(id).set(data)
                console.log(id);
                console.log(data);
                
            }
            sendResponse(res, 200, {message: 'Successfully added dataset! WooHoo!'});
        }
    }))
});