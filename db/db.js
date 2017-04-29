const pg  = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trof';
const client = new pg.Client(connectionString);

client.connect();
// const query = client.query(
//   'CREATE TABLE budgetData(id SERIAL PRIMARY KEY, type VARCHAR(50) not null, date VARCHAR(50), category VARCHAR(250), description TEXT, sum INTEGER)'
// );
// query.on('end', () => { client.end(); });
