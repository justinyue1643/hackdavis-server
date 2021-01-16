const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

allPhoneNumbers = ["+17142092509", "+17142347559"]
cronJob = require('cron').CronJob;

var textJob = new cronJob('57 12 * * *', function(){
    for (let i = 0; i < allPhoneNumbers.length; i++) {
        client.messages.create({
            body: "Your daily question: Do you question the nature of your reality?",
            from: "+17135615426",
            to: allPhoneNumbers[i]
        })
    }
})

textJob.start();

app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});

app.get("/", (req, res) => {
    client.messages
        .create({
            body: "Hello, you just sent a GET request to the index endpoint.",
            from: "+17135615426",
            to: "+17142092509"
        })
        .then(message => console.log(message))
    res.send("Index Endpoint: Message successfully sent!");
})

app.get("/add-phone-number", (req, res) => {

})

app.post("/send-message", (req, res) => {
    const twiml = new MessagingResponse();
    const userMessage = req.body.Body;

    console.log(req.body);
    if (req.body.Body == 'hello') {
        twiml.message("Hi back!");
    }
    else {
        twiml.message('bwoah');
    }

    console.log(userMessage);

    //twiml.message("Thank you for the thoughtful response. Your message will be posted shortly.");

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

app.post("/echo", (req, res) => {
    res.send(req.body.message);
});
