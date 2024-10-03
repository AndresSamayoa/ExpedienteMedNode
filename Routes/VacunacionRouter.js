const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/VacunacionController');

const routes = express();

routes.post('/vacunacion', createOne);
routes.put('/vacunacion/:id', updateOne);
routes.delete('/vacunacion/:id', deleteOne);
routes.get('/vacunacion', readAll);
routes.get('/vacunacion/buscar', searchAll);

module.exports = routes;
