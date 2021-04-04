const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
const cors = require('cors')
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'quotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/addChar', (req, res) => {
    db.collection('characters').insertOne({name: req.body.name,
    quotes: req.body.quote})
    .then(result => {
        console.log('Quote Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addQuote', (req, res) => {
    db.collection('characters').updateOne(
      {name: req.body.name},
      {
        $addToSet: { quotes: req.body.data}
      },
      {
        sort: {_id: -1},
        upsert: true
      }
    )
    .then(result => {
        console.log('Added quote')
        res.json('Quote added')
    })
    .catch(error => console.error(error))
})

// app.delete('/deleteRapper', (req, res) => {
//     db.collection('quotes').deleteOne({stageName: req.body.stageNameS})
//     .then(result => {
//         console.log('Rapper Deleted')
//         res.json('Rapper Deleted')
//     })
//     .catch(error => console.error(error))
// })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
