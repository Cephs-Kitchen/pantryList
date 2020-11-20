import './App.css';
import React from 'react';

const apiPORT = 9000;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputItem: '',
      pantryList: [],
      itemNamesList: [],
    }
  }

  componentDidMount = async () => {
    //Show item history to the dropdown menu
    const itemsResponse = await fetch(`http://localhost:${apiPORT}/items`, { method: 'GET' })
    const itemsData = await itemsResponse.json()
    this.setState(
        {itemNamesList: itemsData.map(item => item.item_name)},
        () => {
          if(this.state.itemNamesList){
            this.setState({inputItem: this.state.itemNamesList[0]})
          } 
        } 
      )

    //Show existing pantry list
    const pantryResponse = await fetch(`http://localhost:${apiPORT}/selectPantryList`, { method: 'GET' })
    const pantryData = await pantryResponse.json()
    this.setState({pantryList: pantryData.map(item => [item.item_name, item.expiration, item.amount])})
  }

  handleChangeInput = (event) => {
    this.setState({inputItem: event.target.value})
  }

  handleAddItem = async (event) => {
    event.preventDefault()
    var item_name = this.state.inputItem
    item_name = item_name[0].toUpperCase() + item_name.substring(1)
    //Add new item to the item history
    if(this.state.itemNamesList.indexOf(item_name) === -1){
      await fetch(`http://localhost:${apiPORT}/item`, {
        method: 'POST',
        headers: { 'Content-Type':  'application/json' },
        body: JSON.stringify({
                name: item_name,
                categoryID: 1, //TODO: FIX FOR CATEGORIES
             })
        })
    }
    //Add item to the pantry list
    fetch(`http://localhost:${apiPORT}/items?item_name=${item_name}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        fetch(`http://localhost:${apiPORT}/pantryList/`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({item_id: data[0].item_id})
          })
      })
    this.setState({pantryList: this.state.pantryList.concat(item_name)})
  }

  handleRemoveItem = (event) => {
    this.setState({pantryList: this.state.pantryList.filter(item => item !== event.target.value)})
  }

  handleAddToShoppingList = (event) => {
    alert(`TODO: add ${event.target.item} to shopping list & remove from pantryList`)
  }

  render() {
    return (
      <div className="App">
        <h1> Pantry List </h1>

        <input type='text' placeholder="item name" onChange={this.handleChangeInput}/>
        <button onClick={this.handleAddItem}>Add Item</button>

        <form onSubmit={this.handleAddItem.bind(this)}>
          <label>
            Choose from item history:
            <select value={this.state.value} onChange={this.handleChangeInput.bind(this)}>
              {this.state.itemNamesList.map(item => 
                <option value={item}>{item}</option>
              )}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          {this.state.pantryList.map(item =>
            <div>
              <li>
                {item[0]}   Expiration Date : {item[1].substring(0,10)}   Amount : {item[2]}
                <button onClick={this.handleRemoveItem.bind(this)} value={item}>Remove</button>
                <button onClick={this.handleAddToShoppingList.bind(this)} value={item}>Add to Shopping List</button>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }

}

export default App;
