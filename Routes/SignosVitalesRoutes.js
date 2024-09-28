const express = require('express');

const { readAll, createOne, deleteOne, updateOne,searchAll, buscar } = require('../Controllers/SignosVitalesController');

const routes = express();

routes.post('/Signosvitales',  createOne);
routes.put('/Signosvitales/:id',  updateOne);
routes.delete('/Signosvitales/:id',  deleteOne);
routes.get('/Signosvitales', readAll);
routes.get('/Signosvitales/citas/:id',  buscar);
routes.get('/Signosvitales/buscar',  searchAll);
module.exports = routes;
