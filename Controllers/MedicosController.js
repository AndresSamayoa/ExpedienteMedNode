const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const medicos = await models.medicos.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: medicos
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [medicos] = await _expMedico.query(
            'select * from fas_buscar_medicos(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: medicos
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const medico = await models.medicos.create({
            USR_id: req.body.usuario_id,    
            med_nombre : req.body.nombres,
            med_apellido: req.body.apellidos ,
            med_tipo: req.body.tipo_medico,
            med_telefono: req.body.numero_telefono ,
            med_correo:req.body.correo_electronico ,
            med_numero_colegiado: req.body.numero_colegiado,
            
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: medico
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const medico = await models.medicos.findOne({where: { med_id: req.params.id }});

        if(!medico) {
            throw notFoundError('No se encontro el medico.');
        }

        await medico.update({
            med_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const medico = await models.medicos.findOne({where: { med_id: req.params.id }});

        if(!medico) {
            throw notFoundError('No se encontro el medico.');
        }

        await medico.update({
            USR_id: req.body.usuario_id,    
            med_nombre : req.body.nombres,
            med_apellido: req.body.apellidos ,
            med_tipo: req.body.tipo_medico,
            med_telefono: req.body.numero_telefono ,
            med_correo:req.body.correo_electronico ,
            med_numero_colegiado: req.body.numero_colegiado,

        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: medico
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
