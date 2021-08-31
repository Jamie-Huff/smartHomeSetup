const express = require('express');
const router = express.Router();


const surveyData = (db) => {

    router.post("/", (req, res) => {
        //console.log("IN POST SURVEY", (req.body))
        let query = req.body
        let categories = query.categories
        console.log('Our categories: ', categories)
        console.log('Our budget: ', query.budget)
        console.log('Our rooms: ', query.rooms)
        db.query(`SELECT * FROM rooms`)
            .then(data => {
                // for starters, using our rooms, we need to narrow down our products for just those that have that room id
                console.log('rooms that match', data.rows)
            })
    })


    return router;
}


module.exports = surveyData