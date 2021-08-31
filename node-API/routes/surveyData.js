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
        db.query(`SELECT * FROM rooms WHERE name = ${query.rooms[1]}`)
            .then(data => {
                console.log('rooms that match', data.rows)
            })
    })


    return router;
}


module.exports = surveyData