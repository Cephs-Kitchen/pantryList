function Form(props){
    return(
        <form onSubmit={props.handleAddItem}>
            <label>
            Choose from item history:
            <select onChange={props.handleItemInput}>
                <option value="" disabled selected>Select item</option>
                {props.itemsList.map(item => 
                    <option value={item.item_name} >{item.item_name}</option>
                )}
            </select>
            <br/>
            </label>
            <label>
            Or input new item:
            <input type='text' placeholder="item name" onChange={props.handleItemInput}/>
            </label>
            <label>
            Choose category:
            <select onChange={props.handleSelectCategoryInput.bind(this)}>
                <option value="" disabled selected>Select category</option>
                {props.categoriesList.map(category => 
                    <option value={JSON.stringify(category)} >{category.category_name}</option>
                )}
            </select>
            </label>
            <br/>
            <label for="expiration">
            Expiration Date:
            <input type='date' name="expiration" id="expiration" onChange={props.handleDateInput}/>
            </label>
            <label for="amount">
            Amount:
            <input type="number" name="amount" id="amount" onChange={props.handleAmountInput}/>
            </label>

            <br/>
            <button type="submit">Add Item</button>
        </form>
    )
}

export default Form