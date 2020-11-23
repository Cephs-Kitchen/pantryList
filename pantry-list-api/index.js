const express = require('express')
const bodyParser = require('body-parser')
const categoryDB = require('./categoryQueries')
const itemsDB = require('./itemsQueries')
const pantryDB = require('./pantryQueries')
const shoppingDB = require('./shoppingQueries')

const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/categories', categoryDB.getCategories)

// GET items  ---- /items
app.get('/items', itemsDB.getItems)

// GET item by id  ---- /items/:itemId
app.get('/items/:itemId', itemsDB.getItemByItemId)

// POST item to items, requires body to have "name" and "categoryID"
app.post('/item', itemsDB.postItem)

// GET select pantry list ---- /selectPantryList?sortBy="expiration"
app.get('/selectPantryList', pantryDB.getSelectPantryList)

// GET pantry list  ---- /pantryList
app.get('/pantryList', pantryDB.getPantryList)

// GET pantry list item by id  ---- /pantryList/:itemId
app.get('/pantryList/:itemId', pantryDB.getItemByItemId)

// POST item to pantry list, requires body to have "item_id", "expiration", and "amount"
app.post('/pantryList', pantryDB.postToPantryList)

// POST item to pantry list, requires body to have "amount, pantry_item_id"
app.put('/pantryList', pantryDB.updatePantryItemAmount)

// DELETE pantry list item 
app.delete('/pantryList/:pantryItemId', pantryDB.deletePantryItem)

// POST item to shopping list, requires body to have "listID, itemID, itemCount"
app.post('/shoppinglist/:listId/item', shoppingDB.postToShoppingList)

// for testing: GET shopping list
app.get('/shoppinglist/:listId/items', shoppingDB.getShoppingList)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})