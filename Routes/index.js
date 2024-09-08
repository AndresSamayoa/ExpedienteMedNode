const fs = require('fs')
const path = require('path')
const express = require('express');

const routes = express();

fs.readdirSync(__dirname).filter(file =>
  (file !== path.basename(__filename)) && (file.slice(-3) === '.js')
).forEach(file => {
  const router = require(`./${file}`);
  routes.use('/api', router);
})

module.exports = routes;
