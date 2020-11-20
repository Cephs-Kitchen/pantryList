const express = require('express')
const bodyParser = require('body-parser')
const itemsDB = require('./itemsQueries')
const pantryDB = require('./pantryQueries')
const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// GET items  ---- /items
app.get('/items', itemsDB.getItems)

// GET item by id  ---- /items/:itemId
app.get('/items/:itemId', itemsDB.getItemByItemId)

// POST item to items, requires body to have "name" and "categoryID"
app.post('/item', itemsDB.postItem)

// GET pantry list  ---- /pantryList
app.get('/pantryList', pantryDB.getPantryList)


app.get('/selectPantryList', pantryDB.getSelectPantryList)

// GET pantry list item by id  ---- /pantryList/:itemId
app.get('/pantryList/:itemId', pantryDB.getItemByItemId)

// POST item to pantry list, requires body to have "item_id", "expiration", and "amount"
app.post('/pantryList', pantryDB.postToPantryList)

// DELETE pantry list item 
app.delete('/pantryList/:pantryItemId', pantryDB.deletePantryItem)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})