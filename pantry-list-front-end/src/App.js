import './App.css';
import React from 'react';
import Form from './Form';

const API = 9000;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      itemInput: '',
      categoryInput: '',
      dateInput: '',
      amountInput:'',
      categoriesList: [],
      itemsList: [],
      pantryList: [],
    }
  }

  componentDidMount = async () => {
    //Show categories in dropdown menu
    const categoriesResponse = await fetch(`http://localhost:${API}/categories`, { method: 'GET' })
    const categoriesData = await categoriesResponse.json()
    this.setState({categoriesList: categoriesData})

    //Show item history to the dropdown menu
    this.refreshItemsList()

    //Show existing pantry list
    this.refreshPantryList()
  }

  refreshItemsList = () => {
    fetch(`http://localhost:${API}/items`, { method: 'GET' })
    .then(response => response.json())
    .then(data => this.setState({itemsList: data}))
  }

  refreshPantryList = () => {
    fetch(`http://localhost:${API}/selectPantryList`, { method: 'GET' })
    .then(response => response.json())
    .then(data => this.setState({pantryList: data}))    
  }

  handleItemInput = (event) => {
    this.setState({itemInput: event.target.value})
  }

  handleSelectCategoryInput = (event) => {
    this.setState({categoryInput: event.target.value})
  }

  handleDateInput = (event) => {
    this.setState({dateInput: event.target.value})
  }

  handleAmountInput = (event) => {
    this.setState({amountInput: Number.parseInt(event.target.value)})
  }

  handleAddItem = async (event) => {
    event.preventDefault()
    var category = JSON.parse(this.state.categoryInput)
    var item_name = this.state.itemInput
    item_name = item_name[0].toUpperCase() + item_name.substring(1)

    var promise = new Promise((resolve, reject) => {
      //Add new item to the item history
      const itemExists = this.state.itemsList.filter(item => item.item_name === item_name)
      if(itemExists.length === 0){
        fetch(`http://localhost:${API}/item`, {
          method: 'POST',
          headers: { 'Content-Type':  'application/json' },
          body: JSON.stringify({
                  name: item_name,
                  categoryID: category.category_id,
                })
          })
        .then(()=>
          fetch(`http://localhost:${API}/items?item_name=${item_name}`, {method: 'GET'})
          .then(res => res.json())
          .then(data => resolve(data[0].item_id))
          .then(() => this.refreshItemsList())
        )
      } else {
        resolve(itemExists[0].item_id);
      }
    })

    promise
    .then((item_id) =>
      //Add item to the pantry list
      fetch(`http://localhost:${API}/pantryList/`, {
        method: 'POST',
        headers: { 'Content-Type':  'application/json' },
        body: JSON.stringify({
                item_id: item_id,
                expiration: this.state.dateInput,
                amount: this.state.amountInput,
              })
        })    
      .then(() => this.refreshPantryList())
    )

  }

  handleRemoveItem = (event) => {
    const params = JSON.parse(event.target.value)
    const pantry_item_id = Number.parseInt(params.pantry_item_id)
    
    fetch(`http://localhost:${API}/pantryList/${pantry_item_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type':  'application/json' },
    })
    .then(() => this.refreshPantryList())
  }

  handleChangeAmount = (event) => {
    const params = JSON.parse(event.target.value)
    const pantry_item_id = Number.parseInt(params.pantry_item_id)
    const action = params.action
    let amount = params.amount
    if(action === 'increase'){
      amount++
    } else if (action === 'decrease'){
      amount--
    }

    fetch(`http://localhost:${API}/pantryList/`, {
      method: 'PUT',
      headers: { 'Content-Type':  'application/json' },
      body: JSON.stringify({
              amount: amount,
              pantry_item_id: pantry_item_id,
            })
    })
    .then(() => this.refreshPantryList())
  }

  handleAddToShoppingList = (event) => {
  // POST item to shopping list, requires body to have "listID, itemID, itemCount"
    const params = JSON.parse(event.target.value)
    const listID = 1 //TODO: FIGURE OUT HOW TO GET LIST ID
    const itemID = params.item_id
    const itemCount = params.amount

    fetch(`http://localhost:${API}/shoppinglist/${listID}/item`, {
      method: 'POST',
      headers: { 'Content-Type':  'application/json' },
      body: JSON.stringify({
              listID: listID,
              itemID: itemID,
              itemCount: itemCount,
            })
    })  
    this.handleRemoveItem(event)
  }

  render() {
    return (
      <div className="App">
        <h1> Pantry </h1>
        <Form
          categoriesList = {this.state.categoriesList}
          itemsList = {this.state.itemsList}
          handleItemInput = {this.handleItemInput}
          handleDateInput = {this.handleDateInput}
          handleAmountInput = {this.handleAmountInput}
          handleSelectCategoryInput = {this.handleSelectCategoryInput}
          handleAddItem = {this.handleAddItem}
        />
        <h1> Pantry List </h1>
        <ul>
          {this.state.pantryList.map(item =>
            <div>
              <li>
                {item.item_name}   Expiration Date : {item.expiration.substring(0,10)}   Amount : {item.amount}
                <button onClick={this.handleChangeAmount.bind(this)} value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'increase'})}>Increase Amount</button>
                <button onClick={this.handleChangeAmount.bind(this)} value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'decrease'})}>Decrease Amount</button>
                <button onClick={this.handleRemoveItem.bind(this)} value={JSON.stringify({pantry_item_id: item.pantry_item_id})}>Remove</button>
                <button onClick={this.handleAddToShoppingList.bind(this)} value={JSON.stringify({pantry_item_id: item.pantry_item_id, item_id: item.item_id, amount: item.amount})}>Add to Shopping List</button>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }

}

export default App;
