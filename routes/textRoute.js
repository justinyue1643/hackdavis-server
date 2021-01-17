const Text = require('../mongo_schemas/text.js');
const router = require('express').Router();

router.route("/").get((req, res) => {
    Text.find()
        .then((texts) => res.json(texts))
        .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;