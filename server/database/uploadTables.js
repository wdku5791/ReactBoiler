const dotenv = require('dotenv').config();
const pgp = require('pg-promise')();
const createSchema = require ('./schema.js');
pgp.pg.defaults.ssl = true;

let url = null;

const whichDb = function() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'TESTING') {
    url = process.env.TESTING_DATABASE_URL;
  } else if (process.env.NODE_ENV === 'DEV') {
    url = process.env.DATABASE_URL;
  } else if (process.env.NODE_ENV === 'PROD') {
    url = process.env.PRODUCTION_DATABASE_URL;
  }
};

whichDb()
let db = pgp(url);

createSchema(db)
.then(() => {
  process.exit(0);
}).catch((err) => {
  console.log(err);
  process.exit(1);
})
