const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'database',
  database: 'cephs_citchen',
  password: 'ceph',
  port: 5432, //postgres database port
})

module.exports = {
    getPool: () => pool
};
