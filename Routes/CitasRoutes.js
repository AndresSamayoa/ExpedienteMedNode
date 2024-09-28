const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll, readOne, updateAttended, updateClose, readDetailed } = require('../Controllers/CitasController');

const { schemaCrearCitaBody, schemaDeleteCitaParam, schemaSearchCitaQuery, schemaUpdateCitaBody, schemaUpdateCitaParam, schemaGetCitaParam } = require('../Middlewares/Validator/Citas')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/citas', validateBody(schemaCrearCitaBody), createOne);
routes.put('/citas/atender/:id', validateParams(schemaUpdateCitaParam), updateAttended);
routes.put('/citas/cerrar/:id', validateParams(schemaUpdateCitaParam), updateClose);
routes.put('/citas/:id', validateBody(schemaUpdateCitaBody), validateParams(schemaUpdateCitaParam), updateOne);
routes.delete('/citas/:id', validateParams(schemaDeleteCitaParam), deleteOne);
routes.get('/citas', readAll);
routes.get('/citas/detalle/:id', validateParams(schemaGetCitaParam), readDetailed);
routes.get('/citas/buscar', validateQuery(schemaSearchCitaQuery), searchAll);
routes.get('/citas/:id', validateParams(schemaGetCitaParam), readOne);

module.exports = routes;
