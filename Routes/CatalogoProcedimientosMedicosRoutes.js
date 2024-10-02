const express = require('express');

const { readAll, readById, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/CatalogoProcedimientosMedicosController');

const { schemaCrearProcBody, schemaDeleteProcParam, schemaSearchProcQuery, schemaUpdateProcBody, schemaUpdateProcParam, schemaReadOneProcParam } = require('../Middlewares/Validator/CatalogoProcedimientosMedicos')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/catalogoProcedimientos', validateBody(schemaCrearProcBody), createOne);
routes.put('/catalogoProcedimientos/:id', validateBody(schemaUpdateProcBody), validateParams(schemaUpdateProcParam), updateOne);
routes.delete('/catalogoProcedimientos/:id', validateParams(schemaDeleteProcParam), deleteOne);
routes.get('/catalogoProcedimientos/buscar', validateQuery(schemaSearchProcQuery), searchAll);
routes.get('/catalogoProcedimientos', readAll);
routes.get('/catalogoProcedimientos/:id', validateParams(schemaReadOneProcParam), readById);

module.exports = routes;
