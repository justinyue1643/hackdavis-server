const express = require('express')
const app = express()
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});

// 17135615426
app.post("/", (req, res) => {
    client.messages
        .create({
            body: "This is a third text",
            from: "+17135615426",
            to: "+17142092509"
        })
        .then(message => console.log(message))
})
