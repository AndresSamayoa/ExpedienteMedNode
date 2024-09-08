const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarDisponibilidad (medico_id, fecha, hora) {
    const [[estado]] = await _expMedico.query(
        'exec pas_validar_hora_cita :MedicoId, :Fecha, :Hora;',
        {replacements: { MedicoId: medico_id, Fecha: fecha, Hora: hora } }
    );

    return estado;
} 

async function validarLlavesForaneas (medico_id, cliente_id) {
    const paciente = await models.pacientes.findOne({where: { pac_id: cliente_id }});
    
    if (!paciente) throw notFoundError('No se encontro el cliente');

    const medico = await models.medicos.findOne({where: { med_id: medico_id }});
    
    if (!medico) throw notFoundError('No se encontro el medico');
}

async function readAll (req, res, next) {
    try {
        const citas = await models.citas.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: citas
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [citas] = await _expMedico.query(
            'select * from fas_buscar_citas(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: citas
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas(req.body.medico_id, req.body.paciente_id);

        const citaValidacion = await validarDisponibilidad(req.body.medico_id, req.body.fecha, req.body.hora);

        if (!citaValidacion.Valido) {
            throw badRequestError(citaValidacion.Mensaje);
        }

        const cita = await models.citas.create({
            med_id: req.body.medico_id,
            pac_id: req.body.paciente_id,
            cit_fecha: req.body.fecha,
            cit_hora: req.body.hora,
            cit_estado: req.body.estado
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: cita
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const cita = await models.citas.findOne({where: { cit_id: req.params.id }});

        if(!cita) {
            throw notFoundError('No se encontro la cita.');
        }

        await cita.update({
            cit_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const cita = await models.citas.findOne({where: { cit_id: req.params.id }});

        if (!cita) {
            throw notFoundError('No se encontro la cita.');
        }

        await validarLlavesForaneas(req.body.medico_id || cita.med_id, req.body.paciente_id || cita.pac_id);

        if (
            (req.body.medico_id && cita.med_id != req.body.medico_id) ||
            (req.body.fecha && cita.cit_fecha != req.body.fecha) ||
            (req.body.hora && cita.cit_hora != req.body.hora)
        ) {
            const citaValidacion = await validarDisponibilidad(req.body.medico_id, req.body.fecha, req.body.hora);

            if (!citaValidacion.Valido) {
                throw badRequestError(citaValidacion.Mensaje);
            }
        }

        await cita.update({
            med_id: req.body.medico_id,
            pac_id: req.body.paciente_id,
            cit_fecha: req.body.fecha,
            cit_hora: req.body.hora,
            cit_estado: req.body.estado
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: cita
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
