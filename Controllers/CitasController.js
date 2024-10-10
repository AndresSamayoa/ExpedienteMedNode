const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarDisponibilidad (medico_id, fecha) {
    const [[estado]] = await _expMedico.query(
        'exec pas_validar_hora_cita :MedicoId, :Fecha;',
        {replacements: { MedicoId: medico_id, Fecha: fecha } }
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

async function readOne (req, res, next) {
    try {
        const cita = await models.citas.findOne({where: {cit_id: req.params.id}});

        if(!cita) {
            throw notFoundError('No se encontro la cita')
        }

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: cita
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

        const citaValidacion = await validarDisponibilidad(req.body.medico_id, req.body.fecha);

        if (!citaValidacion.Valido) {
            throw badRequestError(citaValidacion.Mensaje);
        }

        const cita = await models.citas.create({
            med_id: req.body.medico_id,
            pac_id: req.body.paciente_id,
            cit_fecha: moment(req.body.fecha).format('YYYY-MM-DD HH:mm:ss'),
            cit_estado: models.citas.rawAttributes.cit_estado.values[0]
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
            (req.body.fecha && cita.cit_fecha != req.body.fecha)
        ) {
            const citaValidacion = await validarDisponibilidad(req.body.medico_id, req.body.fecha);

            if (!citaValidacion.Valido) {
                throw badRequestError(citaValidacion.Mensaje);
            }
        }

        await cita.update({
            med_id: req.body.medico_id,
            pac_id: req.body.paciente_id,
            cit_fecha: moment(req.body.fecha).format('YYYY-MM-DD HH:mm:ss')
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

async function updateAttended (req, res, next) {
    try {
        const cita = await models.citas.findOne({where: { cit_id: req.params.id }});

        if (!cita) {
            throw notFoundError('No se encontro la cita.');
        }

        await cita.update({
            cit_estado: models.citas.rawAttributes.cit_estado.values[1]
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

async function updateClose (req, res, next) {
    try {

        // Consumir sp
        await _expMedico.query('exec pas_cerrar_cita :CitaId', 
            {replacements: {CitaId: req.params.id}}
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: {}
        })
    } catch (error) {
        next(error);
    }
};

async function readDetailed (req, res, next) {
    try {
        const [citaArr] = await _expMedico.query(
            'select * from fas_info_general_cita(:Cita);',
            {replacements: {Cita: req.params.id}}
        );

        const cita = citaArr[0];

        if(!cita) {
            throw notFoundError('No se encontro la cita')
        }

        const [procedimientos] = await _expMedico.query(
            'select * from fas_procedimientos_medicos_cita(:Cita)',
            {replacements: {Cita: cita.CIT_id}}
        );

        cita['procedimientos'] = procedimientos;

        // Consultar signos vitales
        const signos_vitales = await models.signosvitales.findOne({where: {CIT_id: cita.CIT_id}});

        cita['signosVitales'] = signos_vitales;

        // Consultar diagnosticos
        const [diagnosticos] = await _expMedico.query(
            'select * from fas_buscar_diagnosticos(:Cita);',
            {replacements: { Cita: cita.CIT_id } }
        );

        cita['diagnosticos'] = diagnosticos;

        return res.status(200).send({
            status: true,
            message: 'Cita consultada exitosamente',
            data: cita
        })
    } catch (error) {
        next(error);
    }
}

async function  pas_detalle_pago_cita (req, res, next) {
    try {

        // Consumir funcion de detalle pago
        const [records]= await _expMedico.query('exec pas_detalle_pago_cita :id;', 
            {replacements: {id: req.params.id}}
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: records
        })
    } catch (error) {
        next(error);
    }
};

async function ficha_medica_cita (req, res, next) {
    try {
        const [citaArr] = await _expMedico.query(
            'select * from fas_info_general_cita(:Cita);',
            {replacements: {Cita: req.params.id}}
        );

        const cita = citaArr[0];

        if(!cita) {
            throw notFoundError('No se encontro la cita')
        }

        const [procedimientos] = await _expMedico.query(
            'select * from fas_procedimientos_medicos_cita(:Cita)',
            {replacements: {Cita: cita.CIT_id}}
        );

        cita['procedimientos'] = procedimientos;

        // Consultar signos vitales
        const signos_vitales = await models.signosvitales.findOne({where: {CIT_id: cita.CIT_id}});

        cita['signosVitales'] = signos_vitales;

        // Consultar diagnosticos
        const [diagnosticos] = await _expMedico.query(
            'select * from fas_buscar_diagnosticos(:Cita);',
            {replacements: { Cita: cita.CIT_id } }
        );

        for (const diagnostico of diagnosticos) {
            const recetas = await models.receta.findAll({ where: { DIA_id: diagnostico.DiagnosticoId } });
            const recetas_respuesta = []

            for (const receta of recetas) {
                const [detalles_receta] = await _expMedico.query(
                    'select * from fas_buscar_detalle_receta(:Receta);',
                    {replacements: { Receta: receta.REC_id } }
                );

                recetas_respuesta.push({
                    ...receta.DataValues,
                    detalles: detalles_receta
                });
            }

            diagnostico['recetas'] = recetas_respuesta;
        }

        cita['diagnosticos'] = diagnosticos;

        return res.status(200).send({
            status: true,
            message: 'Cita consultada exitosamente',
            data: cita
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    readAll,
    readOne,
    createOne,
    deleteOne,
    updateOne,
    updateAttended,
    updateClose,
    searchAll,
    readDetailed,
    pas_detalle_pago_cita,
    ficha_medica_cita,
}
