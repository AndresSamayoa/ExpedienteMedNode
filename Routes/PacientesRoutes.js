const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/PacientesController');

const { schemaCrearPacienteBody, schemaDeletePacienteParam, schemaUpdatePacienteBody, schemaUpdatePacienteParam, schemaSearchPacienteQuery } = require('../Middlewares/Validator/Pacientes')
const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/pacientes', validateBody(schemaCrearPacienteBody), createOne);
routes.put('/pacientes/:id', validateBody(schemaUpdatePacienteBody), validateParams(schemaUpdatePacienteParam), updateOne);
routes.delete('/pacientes/:id', validateParams(schemaDeletePacienteParam), deleteOne);
routes.get('/pacientes', readAll);
routes.get('/pacientes/buscar', validateQuery(schemaSearchPacienteQuery), searchAll);

module.exports = routes;
