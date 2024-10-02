const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/CitasController');

// const { schemaCrearCitaBody, schemaDeleteCitaParam, schemaSearchCitaQuery, schemaUpdateCitaBody, schemaUpdateCitaParam } = require('../Middlewares/Validator/Citas')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/citas',createOne);
routes.put('/citas/:id', updateOne);
routes.delete('/citas/:id', deleteOne);
routes.get('/citas', readAll);
routes.get('/citas/buscar',searchAll);

module.exports = routes;
