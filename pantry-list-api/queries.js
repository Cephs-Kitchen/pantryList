const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'localhost',
  database: 'cephs_citchen',
  //password: 'password',
  port: 61293,
})

const getItems = (request, response) => {
  pool.query('SELECT * FROM tbl_items', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
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
                  /*
                  getStudentByStudentId,
                  registerStudent,
                  addGrade,*/
                 }
