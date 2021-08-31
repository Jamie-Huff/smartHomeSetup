const express = require('express');
const router = express.Router();


const surveyData = (db) => {

    router.post("/", (req, res) => {
        console.log("IN POST SURVEY", (req.body))
        res.send("POSITIVE OUTCOME RECOMMENDATIONS")
        // res.status(500).send('Something broke!')
        })
    return router;
}


module.exports = surveyData