const pg = require('pg');

class Pool {
    _pool = null;
    
    connect(options) {
        this._pool = new pg.Pool(options);
        return this._pool.query('SELECT 1 + 1;');
    }

    close() {
        return this._pool.end();
    }

    // REALLY BIG SECURITY ISSUE HERE
    query(sql) {
        return this._pool.query(sql);
    }
}

module.exports = new Pool();

// //NORMALLY, we would create a pool like this:
// const pool = new pg.Pool({
//     //add configurations
// });

// module.exports = pool;

// // The above method of connection to a pool makes it really hard to connect to multiple databases
