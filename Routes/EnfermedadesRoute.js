const express = require('express');

const { readAll, createOne, deleteOne, updateOne, searchAll, getEnfermedadesMenosComunes } = require('../Controllers/EnfermedadesController');


const routes = express();


routes.post('/Enfermedades', createOne);
routes.put('/Enfermedades/:id', updateOne);
routes.delete('/Enfermedades/:id',  deleteOne);
routes.get('/Enfermedades', readAll);
routes.get('/Enfermedades/buscar',  searchAll);
routes.get('/Enfermedades/menos/comunes', getEnfermedadesMenosComunes);

module.exports = routes;
