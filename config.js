module.exports = {
    cookieSecret: 'vndfjv904r934kvkfv',
    connectionString: 'postgres://localhost:5432/budget',
    config: {
      user: 'postgres', //env var: PGUSER
      database: 'budget', //env var: PGDATABASE
      password: '585465077m', //env var: PGPASSWORD
      host: 'localhost', // Server hosting the postgres database
      port: 5432, //env var: PGPORT
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    }
};
