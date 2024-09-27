const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function validarLlavesForaneas (cita_id, procedimiento_id) {
    const procedimiento = await models.catalogo_procedimientos_medicos.findOne({where: {cpm_id: procedimiento_id}});

    if(!procedimiento) {
        throw notFoundError('No se encontro el procedimiento.');
    }

    const cita = await models.citas.findOne({where: {cit_id: cita_id}});

    if(!cita) {
        throw notFoundError('No se encontro la cita')
    }

    return {
        procedimiento,
        cita
    }
}


async function readByDate (req, res, next) {
    try {
        const [procedimientos] = await _expMedico.query(
            'select * from fas_procedimientos_medicos_cita(:Cita)',
            {replacements: {Cita: req.params.id}}
        );

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
        const procedimiento = await models.procedimientos_medicos.findOne({where: {pro_id: req.params.id}});

        if(!procedimiento) {
            throw notFoundError('No se encontro el procedimiento.');
        }

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: procedimiento
        });
    } catch (error) {
        next(error);
    }
};

async function createOne(req, res, next) {
    try {
        const external = await validarLlavesForaneas(req.body.cita_id, req.body.procedimiento_id);

        const procedimiento = await models.procedimientos_medicos.create({
            cit_id: req.body.cita_id,
            cpm_id: req.body.procedimiento_id,
            pro_valor: external.procedimiento.cpm_local ? external.procedimiento.cpm_precio : 0,
        });
        
        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: procedimiento
        });
    } catch (error) {
        next(error);
    }
}

async function deleteOne (req, res, next) {
    try {

        const procedimiento = await models.procedimientos_medicos.findOne({where: { pro_id: req.params.id }});

        if(!procedimiento) {
            throw notFoundError('No se encontro el procedimiento.');
        }

        await procedimiento.update({
            pro_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const procedimiento = await models.procedimientos_medicos.findOne({where: { cit_id: req.params.id }});

        if(!procedimiento) {
            throw notFoundError('No se encontro la cita.');
        }

        const external = await validarLlavesForaneas(req.body.cita_id || cita.cit_id, req.body.procedimiento_id || cita.cpm_id);

        await procedimiento.update({
            cit_id: req.body.cita_id,
            cpm_id: req.body.procedimiento_id,
            pro_valor: external.procedimiento.cpm_local ? external.procedimiento.cpm_precio : 0,
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

module.exports = {
    readByDate,
    readById,
    createOne,
    deleteOne,
    updateOne,
}
