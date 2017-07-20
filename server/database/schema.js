module.exports = function createSchemas(db) {
  return db.tx (t => {

    let drop = t.query('DROP TABLE IF EXISTS\
      users, images cascade \
    ');

    let users = t.query('CREATE TABLE IF NOT EXISTS users (\
      id SERIAL PRIMARY KEY NOT NULL,\
      password VARCHAR(300) NOT NULL,\
      username VARCHAR(30) NOT NULL UNIQUE,\
      email VARCHAR(30) NOT NULL UNIQUE,\
      first_name VARCHAR(30) NOT NULL,\
      last_name VARCHAR(30) NOT NULL \
    )');

    let cases = t.query('CREATE CASES IF NOT EXISTS cases (\
      id SERIAL PRIMARY KEY NOT NULL,\
      description VARCHAR(300) NOT NULL \
    )');

    let images = t.query('CREATE IMAGES IF NOT EXISTS images (\
      id SERIAL PRIMARY KEY NOT NULL,\
      caseid INTEGER NOT NULL,\
      path VARCHAR(300) NOT NULL,\
      degree VARCHAR(30) NOT NULL,\
      type VARCHAR(30) NOT NULL \
    )');

    return t.batch([drop, users, cases, images]);
  })
  .then(() => {
    console.log('database tables created');
  })
  .catch((err) => {
    console.log('error creating tables', err);
  });
};
