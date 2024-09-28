const express = require('express');

const { readByDate, readById, createOne, deleteOne, updateOne } = require('../Controllers/ProcedimientosMedicosController');

const { schemaCrearProcBody, schemaDeleteProcParam, schemaUpdateProcBody, schemaUpdateProcParam, schemaReadByDateParam } = require('../Middlewares/Validator/ProcedimientosMedicos')
const { validateBody, validateParams } = require('../Middlewares/Validador')

const routes = express();

routes.post('/procedimientos', validateBody(schemaCrearProcBody), createOne);
routes.put('/procedimientos/:id', validateBody(schemaUpdateProcBody), validateParams(schemaUpdateProcParam), updateOne);
routes.delete('/procedimientos/:id', validateParams(schemaDeleteProcParam), deleteOne);
routes.get('/procedimientos/cita/:id', validateParams(schemaReadByDateParam), readByDate);
routes.get('/procedimientos/:id', readById);

module.exports = routes;
