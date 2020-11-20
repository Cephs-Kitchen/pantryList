const pool = require('./pool.js').getPool()

//---------------------ITEMS---------------------

const getCategories = (request, response) => {
  pool.query('SELECT * FROM tbl_item_categories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
                  getCategories
                 }