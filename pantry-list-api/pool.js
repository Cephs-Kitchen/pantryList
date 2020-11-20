const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ceph',
  host: 'localhost',
  database: 'cephs_citchen',
  password: 'ceph',
  port: 1000,
})

module.exports = {
    getPool: () => pool
};
