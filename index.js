const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var phoneNumbers = ["+17142092509", "+17142347559"]

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

app.post("/sms", (req, res) => {
    /*const message = req.body;
    for (let i = 0; i < phoneNumbers.length; i++) {
        client.messages
            .create({
                body: message,
                from: "+17135615426",
                to: phoneNumbers[i]
            })
            .then(message => console.log(message))
    }
    console.log(message);
    res.send("Send Message Endpoint: Messages successfull sent!");*/
    const twiml = new MessagingResponse();

    twiml.message("Thank you for the thoughtful response. Your message will be posted shortly.");

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})
