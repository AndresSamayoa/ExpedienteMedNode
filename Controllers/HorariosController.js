const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const horarios = await models.horarios.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: horarios
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [horarios] = await _expMedico.query(
            'select * from fas_buscar_horarios(:Param);', //CAMBIAR POR EL DE HORARIOS
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: horarios
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const horarios = await models.horarios.create({
            med_id: req.body.medi_id,
            hor_inicio: req.body.hora_inicio,
            hor_fin: req.body.hora_fin,
            hor_hora_inicio: req.body.hora_hora_inicio,
            hor_hora_fin: req.body.hora_hora_fin,
            hor_disponibilidad: req.body.hora_disponibilidad,
            hor_lunes: req.body.hora_lunes,
            hor_martes: req.body.hora_martes,
            hor_miercoles: req.body.hora_miercoles,
            hor_jueves: req.body.hora_jueves,
            hor_viernes: req.body.hora_viernes,
            hor_sabado: req.body.hora_sabado,
            hor_domingo: req.body.hora_domingo,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: horarios
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const horarios = await models.horarios.findOne({where: { hor_id: req.params.id }});

        if(!horarios) {
            throw notFoundError('No se encontro el horarios.');
        }

        await horarios.update({
            hor_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const horarios = await models.horarios.findOne({where: { hor_id: req.params.id }});

        if(!horarios) {
            throw notFoundError('No se encontro el horarios.');
        }

        await paciente.update({
            med_id: req.body.medi_id,
            hor_inicio: req.body.hora_inicio,
            hor_fin: req.body.hora_fin,
            hor_hora_inicio: req.body.hora_hora_inicio,
            hor_hora_fin: req.body.hora_hora_fin,
            hor_disponibilidad: req.body.hora_disponibilidad,
            hor_lunes: req.body.hora_lunes,
            hor_martes: req.body.hora_martes,
            hor_miercoles: req.body.hora_miercoles,
            hor_jueves: req.body.hora_jueves,
            hor_viernes: req.body.hora_viernes,
            hor_sabado: req.body.hora_sabado,
            hor_domingo: req.body.hora_domingo
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: horarios
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
