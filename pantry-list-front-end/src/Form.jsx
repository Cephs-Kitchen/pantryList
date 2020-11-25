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
    let item_history_btn_class = this.state.showItemHistory ? "btn" : "btn notactive";
    let new_item_btn_class = this.state.showItemHistory ? "btn notactive" : "btn";
    return(
      <div>
        <br/><br/>
        <h1> Add Item </h1>
        <br/><br/>
        <form onSubmit={this.props.handleAddItem}>
            <button class={item_history_btn_class} onClick={this.handleShowItemHistory}>Choose from Item History</button>
            <button class={new_item_btn_class} onClick={this.handleInputNewItem}>Input New Item</button>
            <br/><br/>
            {this.state.showItemHistory ?
              <label>
                Item History: {" "}
                <select id="required" class="input" onChange={this.props.handleItemInput}>
                  <option value="" disabled selected>Select item</option>
                  {this.props.itemsList.map(item => 
                      <option value={item.item_name} >{item.item_name}</option>
                  )}
                </select>
              </label>
              :
              <label>
                Item Name:{" "}
                <input type='text' placeholder="Apples" id="required" class="input" onChange={this.props.handleItemInput}/>
                <br/><br/>
                Item Category:{" "}
                <select id="required" class="input" onChange={this.props.handleSelectCategoryInput}>
                    <option value="" disabled selected>Select category</option>
                    {this.props.categoriesList.map(category => 
                        <option value={JSON.stringify(category)} >{category.category_name}</option>
                    )}
                </select>
              </label>
            }
              <br/><br/>
              <label for="expiration">
              Expiration Date:{" "}
              <input type='date' class="input" id="expiration" onChange={this.props.handleDateInput}/>
              </label>
              <br/><br/>
              <label for="amount">
              Amount:{" "}
                <input type="number" class="input" name="amount" id="amount" placeholder="1" onChange={this.props.handleAmountInput} min="1"/>
              </label>

              <br/><br/>
              <button type="submit" id="addBtn">Add Item</button>
          </form>
      </div>  
    )
  }
}

export default Form