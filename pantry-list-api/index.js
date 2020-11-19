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

app.post('/item', db.postItem)

app.get('/pantryList', db.getPantryList)

app.post('/pantryList', db.postToPantryList)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})