const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/ExamenesController');

// const { schemaCrearExamenBody, schemaDeleteExamenParam, schemaUpdateExamenBody, schemaUpdateExamenParam, schemaSearchExamenQuery } = require('../Middlewares/Validator/Examenes')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/examenes', createOne);
routes.put('/examenes/:id', updateOne);
routes.delete('/examenes/:id', deleteOne);
routes.get('/examenes', readAll);
routes.get('/examenes/buscar', searchAll);

module.exports = routes;
