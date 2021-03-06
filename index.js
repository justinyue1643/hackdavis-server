const express = require('express')
const mongoose = require('mongoose')

const phoneRoute = require('./routes/phoneRoute');
const textRoute = require('./routes/textRoute');
const questionRoute = require('./routes/questionRoute');

const app = express()
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const Text = require('./mongo_schemas/text.js')
const Phone = require('./mongo_schemas/phone.js')

const uri = "mongodb+srv://hackuci_storms_hackdavis:somebasicpassword@cluster0.bylf6.mongodb.net/therapme?retryWrites=true&w=majority";

cronJob = require('cron').CronJob;

var textJob = new cronJob('40 09 * * *', function () {
    Phone.find((err, phoneNumber) => {
        try {
            for (let i = 0; i < phoneNumber.length; i++) {
                console.log(phoneNumber[i]);
                client.messages.create({
                    body: "When was the last time you felt lucky about yourself and why?",
                    from: "+17135615426",
                    to: phoneNumber[i].phone
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    });

})

textJob.start();

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

app.post("/send-message", (req, res) => {
    const twiml = new MessagingResponse();
    const userPhoneNumber = req.body.From;
    const userMessage = req.body.Body;

    var newText = Text({
        phone: userPhoneNumber,
        response: userMessage
    });

    newText.save()
        .then(() => res.json("Successfully saved"))
        .catch((err) => res.status(400).json("Error: " + err));

    console.log(userMessage);
    twiml.message('Thank you for your thoughtful response. Your message will be posted on the board shortly');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

app.post("/echo", (req, res) => {
    res.send(req.body.message);
});

app.use('/phone-number', phoneRoute);
app.use('/text', textRoute);
app.use('/question', questionRoute);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to the database'))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});

