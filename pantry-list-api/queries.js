const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'localhost',
  database: 'cephs_citchen',
  password: 'ceph',
  port: 1000,
})

const getItems = (request, response) => {
  let item_name = request.query.item_name
  if(item_name){
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

  pool.query('SELECT * FROM tbl_items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postToPantryList = (request, response) => {
  const { item_id } = request.body
  pool.query(
    'INSERT INTO tbl_pantrylist (item_id) VALUES ($1)',
    [item_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`successful post to pantry list`)
    }
  )
}

/*
const getStudentByStudentId = (request, response) => {
  const id = parseInt(request.params.studentId)

  pool.query('SELECT * FROM students WHERE studentId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const registerStudent = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO students (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201)
  })
}


const addGrade = (request, response) => {
  const id = parseInt(request.params.studentId)
  const { className, grade } = request.body

  pool.query(
    'UPDATE students SET history = $1 WHERE studentId = $2',
    [grade, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
*/

module.exports = {
                  getItems,
                  getPantryList,
                  getItemByItemId,
                  postToPantryList,
                  /*
                  getStudentByStudentId,
                  registerStudent,
                  addGrade,*/
                 }
