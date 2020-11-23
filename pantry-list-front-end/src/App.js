import './App.css';
import React from 'react';

const apiPORT = 9000;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputItem: '',
      dateInput: '',
      amountInput:'',
      pantryList: [],
      itemsList: [],
      item_id: null,
    }
  }

  componentDidMount = async () => {
    //Show item history to the dropdown menu
    const itemsResponse = await fetch(`http://localhost:${apiPORT}/items`, { method: 'GET' })
    const itemsData = await itemsResponse.json()
    this.setState(
        {itemsList: itemsData},
        () => {
          if(this.state.itemsList){
            this.setState({inputItem: this.state.itemsList[0].item_name, item_id: this.state.itemsList[0].item_id})
          } 
        } 
      )

    //Show existing pantry list
    const pantryResponse = await fetch(`http://localhost:${apiPORT}/selectPantryList`, { method: 'GET' })
    const pantryData = await pantryResponse.json()
    this.setState({pantryList: pantryData})
  }

  handleChangeInput = (event) => {
    this.setState({inputItem: event.target.value})
  }

  handleSelectChangeInput = (event) => {
    const item = event.target.value.split(',')
    this.setState({inputItem: item[0], item_id: item[1]})
  }

  handleDateInput = (event) => {
    this.setState({dateInput: event.target.value})
  }

  handleAmountInput = (event) => {
    this.setState({amountInput: Number.parseInt(event.target.value)})
  }

  handleAddItem = async (event) => {
    event.preventDefault()
    var item_name = this.state.inputItem
    item_name = item_name[0].toUpperCase() + item_name.substring(1)
    var promise = new Promise((resolve, reject) => {
      //Add new item to the item history
      const tempArr = this.state.itemsList.filter(item => item.item_name === item_name)
      if(tempArr.length === 0){
        fetch(`http://localhost:${apiPORT}/item`, {
          method: 'POST',
          headers: { 'Content-Type':  'application/json' },
          body: JSON.stringify({
                  name: item_name,
                  categoryID: 1, //TODO: FIX FOR CATEGORIES
               })
          })
        .then(()=>{
            fetch(`http://localhost:${apiPORT}/items?item_name=${item_name}`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
              alert(JSON.stringify(data))
              this.setState({itemsList: this.state.itemsList.concat(data[0])}, resolve(data[0].item_id))
            })
          }
        )
      } else {
        resolve(tempArr[0].item_id);
      }
    })

    promise
      .then((item_id) =>
        //Add item to the pantry list
        fetch(`http://localhost:${apiPORT}/pantryList/`, {
          method: 'POST',
          headers: { 'Content-Type':  'application/json' },
          body: JSON.stringify({
                  item_id: item_id,
                  expiration: this.state.dateInput,
                  amount: this.state.amountInput,
                })
          })    
        .then(()=>{
          fetch(`http://localhost:${apiPORT}/selectPantryList`, { method: 'GET' })
          .then(pantryResponse => pantryResponse.json())
          .then(pantryData => this.setState({pantryList: pantryData}))
        })
      )

  }

  handleRemoveItem = (event) => {
    const pantry_item_id = Number.parseInt(event.target.value)
    fetch(`http://localhost:${apiPORT}/pantryList/${pantry_item_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type':  'application/json' },
      })
    .then(() =>
      this.setState({pantryList: this.state.pantryList.filter(item => item.pantry_item_id !== pantry_item_id)})
    )
  }

  handleAddToShoppingList = (event) => {
// POST item to shopping list, requires body to have "listID, itemID, itemCount"
    const pantry_item_id = Number.parseInt(event.target.value)
    const item = this.state.pantryList.filter(item => item.pantry_item_id === pantry_item_id)
    const listID = 1 //TODO: FIGURE OUT HOW TO GET LIST ID
    const itemID = item[0].item_id
    const itemCount = item[0].amount
    fetch(`http://localhost:${apiPORT}/shoppinglist/${listID}/item`, {
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
        <form onSubmit={this.handleAddItem.bind(this)}>
          <label>
            Choose from item history:
            <select onChange={this.handleSelectChangeInput.bind(this)}>
              {this.state.itemsList.map(item => 
                <option value={[item.item_name, item.item_id]} >{item.item_name}</option>
              )}
            </select>
          </label>
          <label>
            Or input new item:
            <input type='text' placeholder="item name" onChange={this.handleChangeInput}/>
          </label>
          <br/>
          <label for="expiration">
            Expiration Date:
            <input type='date' name="expiration" id="expiration" onChange={this.handleDateInput}/>
          </label>
          <label for="amount">
            Amount:
            <input type="number" name="amount" id="amount" onChange={this.handleAmountInput}/>
          </label>
          <br/>
          <button type="submit">Add Item</button>
        </form>
        <h1> Pantry List </h1>
        <ul>
          {this.state.pantryList.map(item =>
            <div>
              <li>
                {item.item_name}   Expiration Date : {item.expiration.substring(0,10)}   Amount : {item.amount}
                <button onClick={this.handleRemoveItem.bind(this)} value={item.pantry_item_id}>Remove</button>
                <button onClick={this.handleAddToShoppingList.bind(this)} value={item.pantry_item_id}>Add to Shopping List</button>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }

}

export default App;
