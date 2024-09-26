const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll, readOne, updateAttended, updateClose } = require('../Controllers/CitasController');

const { schemaCrearCitaBody, schemaDeleteCitaParam, schemaSearchCitaQuery, schemaUpdateCitaBody, schemaUpdateCitaParam } = require('../Middlewares/Validator/Citas')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/citas', validateBody(schemaCrearCitaBody), createOne);
routes.put('/citas/atender/:id', validateParams(schemaUpdateCitaParam), updateAttended);
routes.put('/citas/cerrar/:id', validateParams(schemaUpdateCitaParam), updateClose);
routes.put('/citas/:id', validateBody(schemaUpdateCitaBody), validateParams(schemaUpdateCitaParam), updateOne);
routes.delete('/citas/:id', validateParams(schemaDeleteCitaParam), deleteOne);
routes.get('/citas', readAll);
routes.get('/citas/buscar', validateQuery(schemaSearchCitaQuery), searchAll);
routes.get('/citas/:id', validateQuery(schemaSearchCitaQuery), readOne);

module.exports = routes;
