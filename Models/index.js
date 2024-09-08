const fs = require('fs')
const path = require('path')
const { _expMedico } = require('../Utils/Database')
const models = {}

fs.readdirSync(__dirname).filter(file =>
  (file !== path.basename(__filename)) && (file.slice(-3) === '.js')
).forEach(file => {
  const model = require(`./${file}`)(_expMedico);
  models[file.substring(0, file.length - 3).toLowerCase()] = model;
})

module.exports = models;
