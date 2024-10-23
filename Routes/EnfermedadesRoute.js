const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll, getEnfermedadesComunes } = require('../Controllers/EnfermedadesController');


const routes = express();


routes.post('/Enfermedades', createOne);
routes.put('/Enfermedades/:id', updateOne);
routes.delete('/Enfermedades/:id',  deleteOne);
routes.get('/Enfermedades', readAll);
routes.get('/Enfermedades/buscar',  searchAll);
routes.get('/Enfermedades/', getEnfermedadesComunes);
module.exports = routes;
