const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const examenes = await models.examenes.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: examenes
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [examenes] = await _expMedico.query(
            'select * from fas_buscar_examenes(:Param);', //Cambiar a la funcion de examenes
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: examenes
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const examenes = await models.examenes.create({
            pac_id: req.body.paci_id,
            exa_comentarios: req.body.comentarios,
            exa_fecha: req.body.fecha,
            exa_resultados: req.body.resultados,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: examenes
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const examenes = await models.examenes.findOne({where: { exa_id: req.params.id }});

        if(!examenes) {
            throw notFoundError('No se encontro el paciente.');
        }

        await examenes.update({
            exa_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const examenes = await models.examenes.findOne({where: { exa_id: req.params.id }});

        if(!examenes) {
            throw notFoundError('No se encontro el paciente.');
        }

        await examenes.update({
            pac_id: req.body.paci_id,
            exa_comentarios: req.body.comentarios,
            exa_fecha: req.body.fecha,
            exa_resultados: req.body.resultados
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: examenes
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    readAll,
    createOne,
    deleteOne,
    updateOne,
    searchAll
}
