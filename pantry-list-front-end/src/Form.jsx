import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showItemHistory: true,
    }
  }

  handleShowItemHistory = (event) => {
    this.setState({showItemHistory: true})
    event.preventDefault()
  }

  handleInputNewItem = (event) => {
    this.setState({showItemHistory: false})
    event.preventDefault()
  }

  render() {
    return(
        <form onSubmit={this.props.handleAddItem}>
          <button onClick={this.handleShowItemHistory}>Choose from item history</button>
          <button onClick={this.handleInputNewItem}>Input new item</button>
          <br/><br/>
          {this.state.showItemHistory ?
            <label>
              Choose from Item History:
              <select onChange={this.props.handleItemInput}>
                <option value="" disabled selected>Select item</option>
                {this.props.itemsList.map(item => 
                    <option value={item.item_name} >{item.item_name}</option>
                )}
              </select>
            </label>
            :
            <label>
              Input New Item:
              <input type='text' placeholder="item name" onChange={this.props.handleItemInput}/>
              <select onChange={this.props.handleSelectCategoryInput}>
                  <option value="" disabled selected>Select category</option>
                  {this.props.categoriesList.map(category => 
                      <option value={JSON.stringify(category)} >{category.category_name}</option>
                  )}
              </select>
            </label>
          }
            <br/><br/>
            <label for="expiration">
            Expiration Date:
            <input type='date' name="expiration" id="expiration" onChange={this.props.handleDateInput}/>
            </label>
            <label for="amount">
            Amount:
            <input type="number" name="amount" id="amount" onChange={this.props.handleAmountInput} min="0"/>
            </label>

            <br/>
            <button type="submit">Add Item</button>
        </form>
    )
  }
}

export default Form