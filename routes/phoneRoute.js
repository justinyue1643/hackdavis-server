const router = require("express").Router()
const Phone = require("../mongo_schemas/phone.js");

router.route("/").get((req,res) => {
    Phone.find()
        .then((phoneNumbers) => res.json(phoneNumbers))
        .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/add").post((req, res) => {
    const phoneNumber = new Phone({
        phone: req.body.phoneNumber
    });

    phoneNumber.save()
        .then(() => res.json("Successfully saved!"))
        .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;