const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const enfermedad = await models.enfermedades.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: enfermedad
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {        
        const [enfermedad] = await _expMedico.query(
            'select * from fas_buscar_enfermedades(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: enfermedad
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const enfermedad = await models.enfermedades.create({
            ENF_nombre: req.body.nombre,
            ENF_descripcion: req.body.descripcion,
            ENF_tipo_enfermedad: req.body.tipoenfermedad,
           
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: enfermedad
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const enfermedad = await models.enfermedades.findOne({where: { ENF_id: req.params.id }});

        if(!enfermedad) {
            throw notFoundError('No se encontro la enfermedad.');
        }

        await enfermedad.update({
            ENF_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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

        const enfermedad = await models.enfermedades.findOne({where: { ENF_id: req.params.id }});

        if(!enfermedad) {
            throw notFoundError('No se encontro la enfermedad.');
        }

        await enfermedad.update({
            ENF_nombre: req.body.nombre,
            ENF_descripcion: req.body.descripcion,
            ENF_tipo_enfermedad: req.body.tipoenfermedad,

        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: enfermedad
        })
    } catch (error) {
        next(error);
    }
};

async function getEnfermedadesMenosComunes(req, res, next) {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        const [enfermedades] = await _expMedico.query(
            'SELECT * FROM fas_enfermedades_menos_comunes(:fecha_inicio, :fecha_fin) ORDER BY frecuencia ASC;',
            { replacements: { fecha_inicio, fecha_fin } }
        );
        return res.status(200).send({
            status: true,
            message: 'Éxito al consultar enfermedades menos comunes',
            data: enfermedades
        });
    } catch (error) {
        next(error);
    }
}



module.exports = {
    readAll,
    createOne,
    deleteOne,
    updateOne,
    searchAll,
    getEnfermedadesMenosComunes
}
