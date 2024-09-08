const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/CitasController');

const { schemaCrearCitaBody, schemaDeleteCitaParam, schemaSearchCitaQuery, schemaUpdateCitaBody, schemaUpdateCitaParam } = require('../Middlewares/Validator/Citas')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/citas', validateBody(schemaCrearCitaBody), createOne);
routes.put('/citas/:id', validateBody(schemaUpdateCitaBody), validateParams(schemaUpdateCitaParam), updateOne);
routes.delete('/citas/:id', validateParams(schemaDeleteCitaParam), deleteOne);
routes.get('/citas', readAll);
routes.get('/citas/buscar', validateQuery(schemaSearchCitaQuery), searchAll);

module.exports = routes;
