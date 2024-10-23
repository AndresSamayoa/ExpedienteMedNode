const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const pacientes = await models.pacientes.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: pacientes
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [pacientes] = await _expMedico.query(
            'select * from fas_buscar_pacientes(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: pacientes
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const paciente = await models.pacientes.create({
            pac_nombre: req.body.nombres,
            pac_apellido: req.body.apellidos,
            pac_cui: req.body.cui,
            pac_fecha_nacimiento: req.body.fecha_nacimiento,
            pac_numero_telefonico: req.body.numero_telefono,
            pac_correo_electronico: req.body.correo_electronico,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: paciente
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const paciente = await models.pacientes.findOne({where: { pac_id: req.params.id }});

        if(!paciente) {
            throw notFoundError('No se encontro el paciente.');
        }

        await paciente.update({
            pac_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const paciente = await models.pacientes.findOne({where: { pac_id: req.params.id }});

        if(!paciente) {
            throw notFoundError('No se encontro el paciente.');
        }

        await paciente.update({
            pac_nombre: req.body.nombres,
            pac_apellido: req.body.apellidos,
            pac_cui: req.body.cui,
            pac_fecha_nacimiento: req.body.fecha_nacimiento,
            pac_numero_telefonico: req.body.numero_telefono,
            pac_correo_electronico: req.body.correo_electronico
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: paciente
        })
    } catch (error) {
        next(error);
    }
};

async function ficha_medica_paciente (req, res, next) {
    try {
        const citas = [];
        const paciente = await models.pacientes.findOne({where: { pac_id: req.params.id }});

        if (!paciente) {
            throw notFoundError('Paciente no encontrado');
        }

        const citasCompletas = await models.citas.findAll({where: {pac_id: req.params.id, cit_estado: 'Completada'}});

        if (citasCompletas.length < 1) {
            throw notFoundError('Nunca se ha atendido al paciente');
        }

        for (const citaComp of citasCompletas) {
            const [citaArr] = await _expMedico.query(
                'select * from fas_info_general_cita(:Paciente);',
                {replacements: {Paciente: citaComp.cit_id}}
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
                const recetas_respuesta = [];
                let total_receta = 0
    
                for (const receta of recetas) {
                    const [detalles_receta] = await _expMedico.query(
                        'select * from fas_buscar_detalle_receta(:Receta);',
                        {replacements: { Receta: receta.REC_id } }
                    );
    
                    for (const detalle of detalles_receta) {
                        total_receta += detalle.DET_subtotal;
                    }
    
                    recetas_respuesta.push(...detalles_receta);
                }
    
                diagnostico['DetalleRecetas'] = recetas_respuesta;
                diagnostico['TotalRecetas'] = total_receta;
            }
    
            cita['diagnosticos'] = diagnosticos;
            
            citas.push(cita);   
        }

        return res.status(200).send({
            status: true,
            message: 'Citas consultada exitosamente',
            data: {...paciente.dataValues, citas}
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
    searchAll,
    ficha_medica_paciente,
}
