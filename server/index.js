const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql') // TODO REMOVE

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "msdos",
    database: "msdos_database"
});


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

app.listen(3002, () => {
    console.log('running on 3002')
})