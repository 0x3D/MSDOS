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

    const pname = req.body.pname
    const appNr = req.body.appNr
    const sqlInsert = "INSERT INTO Person (pname,appNr) VALUES (?,?)";

    db.query(sqlInsert, [pname, appNr], (err, res) => {
        console.log(res)
        console.log(err)
    })
})

app.get('/', (req,res) => {
    res.send("helloooooooo postgres")
})

app.listen(3002, () => {
    console.log('running on 3002')
})