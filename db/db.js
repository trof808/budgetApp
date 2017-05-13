const pg  = require('pg');
const config = require('../config');

const client = new pg.Pool(config.config);

client.connect();
