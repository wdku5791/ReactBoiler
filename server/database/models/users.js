const db = require('./config');

module.exports = {
  getUser(email) {
    return db.one('select * from users where email=$1', [email]);
  },
  createUser(userObj) {

    /*
    {
      password:
      username:
      first_name:
      last_name:
      address:
      email:
      type:
    }
    insert into users (username, first_name, last_name, email, address, type, password) \
     values ('wdku', 'winston', 'ku', 'wdku5791@gmail.com', '471 quail drive', 'user', 'hashed')
    */
    return db.query('insert into users \
      (username, first_name, last_name, email, address, type, password)\
      values \
      (${username}, ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
      returning id', userObj);
  }
}