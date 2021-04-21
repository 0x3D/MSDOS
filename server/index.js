const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')


db.one('SELECT $1 AS value', 123)
    .then(function (data) {
        console.log('DATA:', data.value)
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    })


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/insert', (req, res) => {

    const apartmentNo = req.body.appartmentNo
    const email = req.body.email
    const sqlInsert = "INSERT INTO Users (appartmentNo,email) VALUES ($1,$2)";

    db.one('INSERT INTO Logins VALUES($1,$2)', [email, apartmentNo]).then(function (data) {
        console.log('DATA:', data.value)
    }).catch(function (error) {
        console.log('ERROR:', error)
    })

    db.one('INSERT INTO Users VALUES($1,$2)', [apartmentNo, email]).then(function (data) {
        console.log('DATA:', data.value)
    }).catch(function (error) {
        console.log('ERROR:', error)
    })

    // TODO: should probably bbe /api/insert/Users or something here    
    // db.one(sqlInsert, [apartmentNo, email]).then(function (data) {
    //     console.log('DATA:', data.value)
    // }).catch(function (error) {
    //     console.log('ERROR:', error)
    // })

    // db.query(sqlInsert, [appartmentNo, email], (err, res) => {
    //     console.log(res)
    //     console.log(err)
    // })
})

app.get('/', (req, res) => {
    res.send("helloooooooo postgres")
})

app.listen(3002, () => {
    console.log('running on 3002')
})