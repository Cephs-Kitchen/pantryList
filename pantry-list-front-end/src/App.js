import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputItem: '',
      pantryItemIdList: [],
      pantryList: [],
      shoppingList: [],
      itemsList: [],
    }
  }

  componentDidMount = () => {
    //TODO WITH PANTRYLIST DATABASE
    
    fetch(`http://localhost:9000/items`, { method: 'GET' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({itemsList: data.map(item => item.item_name)})
      })
      .then(() => {
        var newInputItem = ''
        if(this.state.itemsList.length > 0){
          newInputItem = this.state.itemsList[0]
        } else {
          newInputItem = ''
        }
        this.setState({inputItem: newInputItem})
      }) 
    
    fetch(`http://localhost:9000/pantryList`, { method: 'GET' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({pantryItemIdList: data.map(item => item.item_id)})
      })
      .then(() => {
        this.state.pantryItemIdList.forEach(item_id => {
          console.log(item_id)
          fetch(`http://localhost:9000/items/${item_id}`, { method: 'GET' })
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({pantryList: this.state.pantryList.concat(data.map(item=>item.item_name))})
          })
        })
      })
  }

  handleChangeInput = (event) => {
    this.setState({inputItem: event.target.value})
  }

  handleAddItem = (event) => {
    var item_name = this.state.inputItem
    fetch(`http://localhost:9000/items?item_name=${item_name}`, { method: 'GET' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        alert(JSON.stringify(data[0]))


      })


/*
    const response = await 
    const existsInItems = response.json()

    if(existsInItems){
      //pull from items
      alert(JSON.stringify(existsInItems))
    } else {
      fetch(`http://localhost:9000/pantryList/${item_name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({item_name}),
        })
        .then(() => {
          this.setState({pantryList: this.state.pantryList.concat(this.state.inputItem)})
        })
    }
    */
    event.preventDefault()
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
              {this.state.itemsList.map(item => 
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
