const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll } = require('../Controllers/RecetaController');

const routes = express();

routes.post('/receta', createOne);
routes.put('/receta/:id', updateOne);
routes.delete('/receta/:id', deleteOne);
routes.get('/receta', readAll);
routes.get('/receta/buscar', searchAll);

module.exports = routes;
