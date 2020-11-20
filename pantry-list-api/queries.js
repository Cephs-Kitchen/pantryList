const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'localhost',
  database: 'cephs_citchen',
  password: 'ceph',
  port: 1000,
})

//---------------------ITEMS---------------------

const getItems = (request, response) => {
  let item_name = request.query.item_name
  if(item_name){
    item_name = item_name[0].toUpperCase() + item_name.substring(1)
    pool.query('SELECT * FROM tbl_items WHERE item_name = $1', [item_name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } else {
    pool.query('SELECT * FROM tbl_items', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getItemByItemId = (request, response) => {
  const id = parseInt(request.params.itemId)
  pool.query('SELECT * FROM tbl_items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postItem = (req, res) => {
  let result;
  const itemDetails = req.body;
  if (itemDetails.name && itemDetails.categoryID) {
    pool.query(
      "INSERT INTO tbl_items (item_name, category_id) VALUES ($1, $2)",
      [itemDetails.name, itemDetails.categoryID],
      (db_err, db_res) => {
          if (db_err) {
              throw db_err;
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
      res.status(400);
  }
  res.json(result);
}


//---------------------PANTRY---------------------

const getPantryList = (request, response) => {
  pool.query('SELECT * FROM tbl_pantrylist', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postToPantryList = (request, response) => {
  const id = parseInt(request.params.itemId)
  let result;
  const { item_id, expiration, amount } = request.body
  if (item_id && expiration && amount) {
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
                  getItems,
                  postItem,
                  getPantryList,
                  getItemByItemId,
                  postToPantryList,
                  deletePantryItem
                 }
