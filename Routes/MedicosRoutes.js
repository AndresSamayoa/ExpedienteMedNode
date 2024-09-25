const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/MedicosController');

const { schemaCrearMedicoBody, schemaDeleteMedicoParam, schemaUpdateMedicoBody, schemaUpdateMedicoParam,schemaSearchMedicoQuery } = require('../Middlewares/Validator/Medicos')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/medicos', validateBody(schemaCrearMedicoBody), createOne);
routes.put('/medicos/:id', validateBody(schemaUpdateMedicoBody), validateParams(schemaUpdateMedicoParam), updateOne);
routes.delete('/medicos/:id', validateParams(schemaDeleteMedicoParam), deleteOne);
routes.get('/medicos', readAll);
routes.get('/medicos/buscar', validateQuery(schemaSearchMedicoQuery), searchAll);

module.exports = routes;
