const router = require('express').Router();
const Question = require('../mongo_schemas/question.js')

router.route('/').get((req, res) => {
    Question.find()
        .then((results) => res.json(results))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;