const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll, buscar } = require('../Controllers/DetalleRecetaController');

const routes = express();

routes.post('/detallereceta', createOne);
routes.put('/detallereceta/:id', updateOne);
routes.delete('/detallereceta/:id', deleteOne);
routes.get('/detallereceta', readAll);
routes.get('/detallereceta/buscar', searchAll);
routes.get('/detallereceta/:id', buscar);
module.exports = routes;
