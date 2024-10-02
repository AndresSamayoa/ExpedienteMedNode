const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/HorariosController');

// const { schemaCrearHorarioBody, schemaDeleteHorarioParam, schemaUpdateHorarioBody, schemaUpdateHorarioParam, schemaSearchHorarioQuery } = require('../Middlewares/Validator/Horarios')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/horarios', createOne);
routes.put('/horarios/:id', updateOne);
routes.delete('/horarios/:id', deleteOne);
routes.get('/horarios', readAll);
routes.get('/horarios/buscar', searchAll);

module.exports = routes;
