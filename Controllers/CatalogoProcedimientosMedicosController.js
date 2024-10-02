const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const procedimientos = await models.catalogo_procedimientos_medicos.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: procedimientos
        })
    } catch (error) {
        next(error);
    }
};

async function readById (req, res, next) {
    try {
        const procedimiento = await models.catalogo_procedimientos_medicos.findOne({where: {cpm_id: req.params.id}});

        if(!procedimiento) {
            throw notFoundError('No se encontro el procedimiento.');
        }

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: procedimiento
        })
    } catch (error) {
        next(error);
    }
};

//Pendiente
async function searchAll (req, res, next) {
    try {
        const [precedimientos] = await _expMedico.query(
            'select * from fas_buscar_catalogo_procedimientos_medicos(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: precedimientos
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const procedimiento = await models.catalogo_procedimientos_medicos.create({
            cpm_nombre: req.body.nombre,
            cpm_precio: req.body.precio,
            cpm_local: req.body.local,
            cpm_examen: req.body.examen,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: procedimiento
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {
        const procedimiento = await models.catalogo_procedimientos_medicos.findOne({where: {cpm_id: req.params.id}});

        if(!procedimiento) {
            throw notFoundError('No se encontro el procedimiento.');
        }

        await procedimiento.update({
            cpm_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al eliminar',
            data: {}
        })
    } catch (error) {
        next(error);
    }
};

async function updateOne (req, res, next) {
    try {
        const procedimiento = await models.catalogo_procedimientos_medicos.findOne({where: {cpm_id: req.params.id}});

        if (!procedimiento) {
            throw notFoundError('No se encontro el procedimiento.');
        }

        await procedimiento.update({
            cpm_nombre: req.body.nombre,
            cpm_precio: req.body.precio,
            cpm_local: req.body.local,
            cpm_examen: req.body.examen,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: procedimiento
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    readAll,
    readById,
    searchAll,
    createOne,
    deleteOne,
    updateOne,
    searchAll
}
