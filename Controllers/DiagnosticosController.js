const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const diagnosticos = await models.diagnosticos.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: diagnosticos
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [diagnosticos] = await _expMedico.query(
            'select * from fas_buscar_diagnosticos(:Param);', //Cambiar por el de diagnosticos
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: diagnosticos
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const diagnosticos = await models.diagnosticos.create({
            cit_id: req.body.cita_id,
            enf_id: req.body.enfer_id,
            dia_observacion: req.body.diag_observacion
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: diagnosticos
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const diagnosticos = await models.diagnosticos.findOne({where: { dia_id: req.params.id }});

        if(!diagnosticos) {
            throw notFoundError('No se encontro el diagnostico.');
        }

        await diagnosticos.update({
            dia_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const diagnosticos = await models.diagnosticos.findOne({where: { dia_id: req.params.id }});

        if(!diagnosticos) {
            throw notFoundError('No se encontro el paciente.');
        }

        await diagnosticos.update({
            cit_id: req.body.cita_id,
            enf_id: req.body.enfer_id,
            dia_observacion: req.body.diag_observacion
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: diagnosticos
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
