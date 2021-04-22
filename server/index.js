const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT json_agg(Users) FROM Users;"
    //const sqlGet = "Select * from Users"
    db.many(sqlGet).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
})

app.post("/api/insert", (req, res) => {

    const apartmentNo = req.body.appartmentNo
    const email = req.body.email
    const sqlInsert = "INSERT INTO Users (appartmentNo,email) VALUES ($1,$2)";

    db.one('INSERT INTO Users VALUES($1,$2)', [apartmentNo, email]).then(function (data) {
        console.log('DATA:', data.value)
    }).catch(function (error) {
        console.log('ERROR:', error)
    })
})


app.listen(3002, () => {
    console.log('running on 3002')
})