const router = require("express").Router()
const Phone = require("../mongo_schemas/phone.js");
// require('dotenv').config();


const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.route("/").get((req,res) => {
    Phone.find()
        .then((phoneNumbers) => res.json(phoneNumbers))
        .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/add").post((req, res) => {
    const phoneNumber = new Phone({
        phone: req.body.phoneNumber
    });

    client.messages
        .create({
            body: "Hello, you've just been added to therapME!",
            from: "+17135615426",
            to: req.body.phoneNumber,
        })
        .then(message => console.log(message))

    phoneNumber.save()
        .then(() => res.json("Successfully saved!"))
        .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;