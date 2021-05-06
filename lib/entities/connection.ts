import knex from 'knex';

export default knex({
  client: 'pg',
  connection: process.env.DSN,
  acquireConnectionTimeout: 4000,
});
