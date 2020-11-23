const pool = require('./pool.js').getPool()

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
    pool.query('SELECT * FROM tbl_items ORDER BY category_id', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
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

////------UNUSED------
const getItemByItemId = (request, response) => {
  const id = parseInt(request.params.itemId)
  pool.query('SELECT * FROM tbl_items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
                  getItems,
                  postItem,
                  getItemByItemId,
                 }