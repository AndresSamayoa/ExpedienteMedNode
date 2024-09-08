const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const routes = require('./Routes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(routes);

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
  
    return res.status(error.statusCode).send({
      status: false,
      message: error.message,
      data: ''
    });
});

app.listen(process.env.LOCAL_PORT);