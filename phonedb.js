const mongoose = require('mongoose')
const Text = require('./text.js')

const uri = "mongodb+srv://hackuci_storms_hackdavis:somebasicpassword@cluster0.bylf6.mongodb.net/therapme?retryWrites=true&w=majority";
// pw: somebasicpassword
// dbname: therapme         it was the default :^)

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to the database'))
    .catch((err) => console.log(err))

const textResponse = new Text({
    phone: "+01234567890",
    response: "I'm doing well today but I skipped all of my classes."
})

textResponse.save()
    .catch((err) => {
        console.log(err)
    })