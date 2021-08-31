const express = require('express');
const router = express.Router();


const surveyData = (db) => {

    router.post("/", (req, res) => {
        console.log("IN POST SURVEY", (req.body))
        res.send("THIS IS WHERE I SEND RECOMMENDATIONS OR FAILURE MESSAGE")
    })

    
    return router;
}


module.exports = surveyData