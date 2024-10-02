const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/DiagnosticosController');

// const { schemaCrearDiagnosticosBody, schemaDeleteDiagnosticosParam, schemaUpdateDiagnosticosBody, schemaUpdateDiagnosticosParam, schemaSearchDiagnosticosQuery } = require('../Middlewares/Validator/Diagnosticos')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/diagnosticos',createOne);
routes.put('/diagnosticos/:id', updateOne);
routes.delete('/diagnosticos/:id', deleteOne);
routes.get('/diagnosticos', readAll);
routes.get('/diagnosticos/buscar', searchAll);

module.exports = routes;
