const pool = require('./pool').getPool()

//---------------------PANTRY---------------------

const getSelectPantryList = (request, response) => {
  let str = 'SELECT pantry_item_id, tbl_items.item_id, expiration, amount, item_name, category_name FROM tbl_pantrylist INNER JOIN tbl_items ON tbl_pantrylist.item_id = tbl_items.item_id INNER JOIN tbl_item_categories ON tbl_items.category_id = tbl_item_categories.category_id' 
  const sortBy = request.query.sortBy
  if (sortBy === 'expiration'){
    pool.query(    
      str+' ORDER BY expiration ASC, pantry_item_id ASC;', 
      (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } else if (sortBy === 'category'){
    pool.query(    
      str+' ORDER BY category_name ASC, pantry_item_id ASC;', 
      (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } else {
    pool.query(
      str+' ORDER BY pantry_item_id ASC;', 
      (error, results) => {
      if(error) { throw error }
        response.status(200).json(results.rows)
      })
  }
}

const getPantryList = (request, response) => {
  pool.query('SELECT * FROM tbl_pantrylist', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })  
}

const getItemByItemId = (request, response) => {
  const id = parseInt(request.params.itemId)
  let str = 'SELECT pantry_item_id, tbl_items.item_id, expiration, amount, item_name, category_name FROM tbl_pantrylist INNER JOIN tbl_items ON tbl_pantrylist.item_id = tbl_items.item_id INNER JOIN tbl_item_categories ON tbl_items.category_id = tbl_item_categories.category_id' 
  pool.query(str+' WHERE tbl_items.item_id = $1;', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postToPantryList = (request, response) => {
  const id = parseInt(request.params.itemId)
  let result;
  let { item_id, expiration, amount } = request.body
  if (!expiration){
    expiration = null
  }
  if (!amount){
    amount = 0
  }
  if (item_id) {
    pool.query(
      'INSERT INTO tbl_pantrylist (item_id, expiration, amount) VALUES ($1, $2, $3)',
      [item_id, expiration, amount],
      (error, results) => {
        if (error) {
            throw error;
        }
      }
    );
    result = {
        status: "success",
        message: "The message was successfully sent",
    };
  } else {
      result = {
          status: "failed",
          message: "The message was not sent",
      };
      response.status(400);
  }
  response.json(result);
}

const updatePantryItemAmount = (request, response) => {
  //need pantry_item_id and amount
  const { amount, pantry_item_id } = request.body
  if (amount && pantry_item_id) {
    pool.query(
      'UPDATE tbl_pantrylist SET amount = $1 WHERE pantry_item_id = $2;',
      [amount, pantry_item_id],
      (error, results) => {
        if (error) {
            throw error;
        }
      }
    )
    result = {
        status: "success",
        message: "The message was successfully sent",
    }
  } else {
      result = {
          status: "failed",
          message: "The message was not sent",
      }
      response.status(400)
  }
  response.json(result)
}

const deletePantryItem = (request, response) => {
  const pantry_item_id = parseInt(request.params.pantryItemId)
  let result;
  if (pantry_item_id) {
    pool.query(
      'DELETE FROM tbl_pantrylist WHERE pantry_item_id = $1',
      [pantry_item_id],
      (error, results) => {
          if (error) {
              throw error;
          }
      }
    );
    result = {
        status: "success",
        message: "successful delete",
    };
  } else {
      result = {
          status: "failed",
          message: "failed delete",
      };
      response.status(400);
  }
  response.json(result);
}

module.exports = {
                  getSelectPantryList,
                  getPantryList,
                  getItemByItemId,
                  postToPantryList,
                  updatePantryItemAmount,
                  deletePantryItem
                 }



