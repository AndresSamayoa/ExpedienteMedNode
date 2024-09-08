const sequelize = require('sequelize').Sequelize;

const { _expMedico: expMedicoConnection } = require('../Config/database.json');

const _expMedico = new sequelize(expMedicoConnection.database, expMedicoConnection.username, expMedicoConnection.password,  expMedicoConnection);

module.exports = { _expMedico };
