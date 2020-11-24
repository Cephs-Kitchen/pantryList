import React from 'react';

class PantryList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let des_btn_class = this.props.descendingFlag ? "btn" : "btn notactive";
    let asc_btn_class = this.props.descendingFlag ? "btn notactive" : "btn";
    return(
        <div id="item-list-header">
          <br/><br/>
          <h1> Pantry List </h1>
          <br/><br/>
          <label>
            Sort By:
            <select onChange={this.props.handleSortBy}>
                <option value={""} >Date Added</option>
                <option value={"expiration"} >Expiration Date</option>
                <option value={"category"} >Category</option>
            </select>
          </label>

          <button onClick={this.props.handleOrderAscending} class={asc_btn_class}><span>&#8593;</span></button>
          <button onClick={this.props.handleOrderDescending} class={des_btn_class}><span>&#8595;</span></button>

          <ul>
            {this.props.pantryList.map(item =>
              <div>
                <li>
                  {item.item_name} {""}
                  Expiration Date : {item.expiration ? item.expiration.substring(0,10) : 'N/A'} {""} 
                  

                  Amount : 
                  <button 
                    onClick={this.props.handleChangeAmount} 
                    value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'decrease'})}
                  > <span>&#8722;</span></button>

                  {item.amount ? item.amount : 'N/A'}
                  
                  <button 
                    onClick={this.props.handleChangeAmount} 
                    value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'increase'})}
                  > <span>&#43;</span> </button>


                  <button 
                    onClick={this.props.handleRemoveItem} 
                    value={JSON.stringify({pantry_item_id: item.pantry_item_id})}
                  > Remove</button>
                  <button 
                    onClick={this.props.handleAddToShoppingList} 
                    value={JSON.stringify({pantry_item_id: item.pantry_item_id, item_id: item.item_id, amount: item.amount})}
                  > Add to Shopping List</button>
                </li>
              </div>
            )}
          </ul>
        </div>
      )
  } 
}

export default PantryList