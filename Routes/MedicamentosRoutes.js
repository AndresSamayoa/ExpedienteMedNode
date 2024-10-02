const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/MedicamentosController');

// const { schemaCrearMedicamentoBody, schemaDeleteMedicamentoParam, schemaSearchMedicamentoQuery, schemaUpdateMedicamentoBody, schemaUpdateMedicamentoParam } = require('../Middlewares/Validator/Medicamentos')
// const { validateBody, validateParams, validateQuery } = require('../Middlewares/Validador')

const routes = express();

routes.post('/medicamentos', createOne);
routes.put('/medicamentos/:id', updateOne);
routes.delete('/medicamentos/:id', deleteOne);
routes.get('/medicamentos', readAll);
routes.get('/medicamentos/buscar', searchAll);

module.exports = routes;
