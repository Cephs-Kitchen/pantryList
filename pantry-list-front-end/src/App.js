import './App.css';
import React from 'react';

const apiPORT = 9000;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputItem: '',
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
                  expiration: '2020-01-01', //TODO: FIX INPUT
                  amount: 1 //TODO: FIX INPUT
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
            <select onChange={this.handleSelectChangeInput.bind(this)}>
              {this.state.itemsList.map(item => 
                <option value={[item.item_name, item.item_id]} >{item.item_name}</option>
              )}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          {this.state.pantryList.map(item =>
            <div>
              <li>
                {item.item_name}   Expiration Date : {item.expiration}   Amount : {item.amount}
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
