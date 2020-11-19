import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputItem: '',
      pantryList: [],
      shoppingList: [],
      itemNamesList: [],
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:9000/items`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        this.setState({itemNamesList: data.map(item => item.item_name)})
      })
      .then(() => {
        if(this.state.itemNamesList){
          this.setState({inputItem: this.state.itemNamesList[0]})
        } 
      }) 
    
    fetch(`http://localhost:9000/pantryList`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const itemIds = data.map(pantryItem => pantryItem.item_id)
        itemIds.forEach(item_id => {
          fetch(`http://localhost:9000/items/${item_id}`, { method: 'GET' })
          .then(response => response.json())
          .then(data => {
            this.setState({pantryList: this.state.pantryList.concat(data[0].item_name)})
          })
        })
      })
  }

  handleChangeInput = (event) => {
    this.setState({inputItem: event.target.value})
  }

  handleAddItem = async (event) => {
    event.preventDefault()
    var item_name = this.state.inputItem
    item_name = item_name[0].toUpperCase() + item_name.substring(1)
    if(this.state.itemNamesList.indexOf(item_name) === -1){
      await fetch(`http://localhost:9000/item`, {
        method: 'POST',
        headers: { 'Content-Type':  'application/json' },
        body: JSON.stringify({
                name: item_name,
                categoryID: 1, //TODO: FIX FOR CATEGORIES
             })
        })
    }
    fetch(`http://localhost:9000/items?item_name=${item_name}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        this.setState({pantryList: this.state.pantryList.concat(item_name)})
        fetch(`http://localhost:9000/pantryList/`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({item_id: data[0].item_id})
          })
      })
  }

  handleRemoveItem = (event) => {
    this.setState({pantryList: this.state.pantryList.filter(item => item !== event.target.value)})
  }

  handleAddToShoppingList = (event) => {
    this.handleRemoveItem(event)
    this.setState({shoppingList: this.state.shoppingList.concat(event.target.value)})
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
                {item}
                <button onClick={this.handleRemoveItem.bind(this)} value={item}>Remove</button>
                <button onClick={this.handleAddToShoppingList.bind(this)} value={item}>Add to Shopping List</button>
              </li>
            </div>
          )}
        </ul>

        <h3> Temp Shopping List </h3>
        <ul>
          {this.state.shoppingList.map(item =><li>{item}</li>)}
        </ul>
      </div>
    );
  }

}

export default App;
