const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/EspecialidadesController');

const routes = express();

routes.post('/especialidades', createOne);
routes.put('/especialidades/:id', updateOne);
routes.delete('/especialidades/:id', deleteOne);
routes.get('/especialidades', readAll);
routes.get('/especialidades/buscar', searchAll);

module.exports = routes;
