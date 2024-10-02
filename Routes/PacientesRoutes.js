const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/PacientesController');

// const { schemaCrearPacienteBody, schemaDeletePacienteParam, schemaUpdatePacienteBody, schemaUpdatePacienteParam, schemaSearchPacienteQuery } = require('../Middlewares/Validator/Pacientes')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/pacientes', createOne);
routes.put('/pacientes/:id', updateOne);
routes.delete('/pacientes/:id', deleteOne);
routes.get('/pacientes', readAll);
routes.get('/pacientes/buscar', searchAll);

module.exports = routes;
