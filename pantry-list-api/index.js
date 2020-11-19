const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/items', db.getItems)

app.get('/items/:itemId', db.getItemByItemId)

app.get('/pantryList', db.getPantryList)

app.post('/postToPantryList', db.postToPantryList)

/*
app.get('/students/:studentId', db.getStudentByStudentId)

app.post('/register', db.registerStudent)

app.post('/grade/:studentId', db.addGrade)
*/

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})