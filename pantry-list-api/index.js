const express = require('express')
const bodyParser = require('body-parser')
const categoryDB = require('./categoryQueries')
const itemsDB = require('./itemsQueries')
const pantryDB = require('./pantryQueries')
const shoppingDB = require('./shoppingQueries')

const app = express()
const port = 8001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// GET categories ---- /categories
app.get('/categories', categoryDB.getCategories)


// POST item to shopping list, requires body to have "listID, itemID, itemCount"
app.post('/shoppinglist/:listId/item', shoppingDB.postToShoppingList)


// GET items  ---- /items
app.get('/items', itemsDB.getItems)

// POST item to items, requires body to have "name" and "categoryID"
app.post('/item', itemsDB.postItem)


// GET select pantry list ---- /selectPantryList?sortBy="expiration"
app.get('/pantryList', pantryDB.getPantryList)

// GET pantry list item by id  ---- /pantryList/:itemId
app.get('/pantryList/:itemId', pantryDB.getItemByItemId)

// POST item to pantry list, requires body to have "item_id", "expiration", and "amount"
app.post('/pantryList', pantryDB.postToPantryList)

// UPDATE item to pantry list, requires body to have "amount, pantry_item_id"
app.put('/pantryList', pantryDB.updatePantryItemAmount)

// DELETE pantry list item 
app.delete('/pantryList/:pantryItemId', pantryDB.deletePantryItem)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})





////------UNUSED------
// GET item by id  ---- /items/:itemId
app.get('/items/:itemId', itemsDB.getItemByItemId)

//------FOR TESTING------
// for testing: GET shopping list
app.get('/shoppinglist/:listId/items', shoppingDB.getShoppingList)