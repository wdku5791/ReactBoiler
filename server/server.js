const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config();
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const imageHandler = require('./controllers/images.js');

app.use(express.static(path.join(__dirname, '/../client/public')));


app.use('/images', imageHandler);



const server = app.listen(port, function () {
  console.log('Listening on port ', port);
});
