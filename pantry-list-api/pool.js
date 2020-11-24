const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'localhost',
  database: 'cephs_citchen',
  password: 'ceph',
  port: 5400, //postgres database port
})

module.exports = {
    getPool: () => pool
};
