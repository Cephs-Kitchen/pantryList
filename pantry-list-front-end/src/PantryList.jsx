import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare, faPlusSquare , faCartPlus , faArrowUp , faArrowDown } from "@fortawesome/free-solid-svg-icons";

function PantryList (props) {
    let des_btn_class = props.descendingFlag ? "btn" : "btn notactive";
    let asc_btn_class = props.descendingFlag ? "btn notactive" : "btn";
    return(
        <div>
          <br/><br/>
          <h1> Pantry List </h1>
          <br/><br/>

          <table id="table">
            <tbody>
              <tr>
                <td>
                  Sort By:{" "}
                  <select class="input" onChange={props.handleSortBy}>
                      <option value={""} >Date Added</option>
                      <option value={"expiration"} >Expiration Date</option>
                      <option value={"category"} >Category</option>
                  </select>
                </td>
                <td>
                  <button onClick={props.handleOrderAscending} class={asc_btn_class}><FontAwesomeIcon icon={faArrowUp}/></button>
                  <button onClick={props.handleOrderDescending} class={des_btn_class}><FontAwesomeIcon icon={faArrowDown}/></button>
                </td>
              </tr>
            </tbody>
          </table>

          <table id="table">
            <tbody>
              <tr>
                <th class="table-header" id="name_col">Item Name</th>
                <th class="table-header" id="expiration_col">Expiration Date</th>
                <th class="table-header" colspan="3" >Amount</th>
              </tr>
            {props.pantryList.map(item =>
              <tr id="table-row">
                <td id="name_col">
                  {item.item_name} {""}
                </td>
                <td id="expiration_col">
                  {item.expiration ? `${item.expiration.substring(5,7)}/${item.expiration.substring(8,10)}/${item.expiration.substring(0,4)}` : 'None'} {""} 
                </td>
                  <td id="button_column"
                    onClick={() => props.handleChangeAmount(JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'decrease'}))} 
                  ><FontAwesomeIcon icon={faMinusSquare}/></td>
                  <td>
                  {item.amount}
                  </td>
                  <td id="button_column"
                    onClick={() => props.handleChangeAmount(JSON.stringify({pantry_item_id: item.pantry_item_id, amount: item.amount, action: 'increase'}))} 
                  ><FontAwesomeIcon icon={faPlusSquare}/></td>
                <td id="button_column">
                  <span onClick={() => props.handleRemoveItem(JSON.stringify({pantry_item_id: item.pantry_item_id}))}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                  </span>
                </td>
                <td id="button_column" >
                  <span 
                    onClick={() => props.handleAddToShoppingList(JSON.stringify({pantry_item_id: item.pantry_item_id, item_id: item.item_id, amount: item.amount}))} 
                  ><FontAwesomeIcon icon={faCartPlus}/></span>
                </td>
              </tr>
            )}
            </tbody>
          </table>

        </div>
      )
}

export default PantryList