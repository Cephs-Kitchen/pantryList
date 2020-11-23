function PantryList(props){
    return(
      <div>
        <label>
          Sort By:
          <select onChange={props.handleSortBy}>
              <option value="" disabled selected>Select</option>
              <option value={"expiration"} >expiration</option>
              <option value={"category"} >category</option>
              <option value={""} >date added</option>
          </select>
          <br/>
        </label>

        <button onClick={props.handleFlipOrder}>Flip Order</button>

        <ul>
          {props.pantryList.map(item =>
            <div>
              <li>
                {item.item_name}   
                Expiration Date : {item.expiration ? item.expiration.substring(0,10) : 'N/A'}   
                Amount : {item.amount ? item.amount : 'N/A'}
                <button 
                  onClick={props.handleChangeAmount} 
                  value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'increase'})}
                > Increase Amount</button>
                <button 
                  onClick={props.handleChangeAmount} 
                  value={JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'decrease'})}
                > Decrease Amount</button>
                <button 
                  onClick={props.handleRemoveItem} 
                  value={JSON.stringify({pantry_item_id: item.pantry_item_id})}
                > Remove</button>
                <button 
                  onClick={props.handleAddToShoppingList} 
                  value={JSON.stringify({pantry_item_id: item.pantry_item_id, item_id: item.item_id, amount: item.amount})}
                > Add to Shopping List</button>
              </li>
            </div>
          )}
        </ul>
      </div>
    )
}

export default PantryList