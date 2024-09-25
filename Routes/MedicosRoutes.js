const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/MedicosController');

const routes = express();

routes.post('/medicos',  createOne);
routes.put('/medicos/:id',  updateOne);
routes.delete('/medicos/:id',  deleteOne);
routes.get('/medicos', readAll);
routes.get('/medicos/buscar',  searchAll);

module.exports = routes;
