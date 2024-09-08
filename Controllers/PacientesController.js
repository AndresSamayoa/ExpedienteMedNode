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

module.exports = {
    readAll,
    createOne,
    deleteOne,
    updateOne,
    searchAll
}
