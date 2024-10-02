const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarLlavesForaneas (paciente_id) {
    const paciente = await models.pacientes.findOne({where: { pac_id: paciente_id }});
    
    if (!paciente) throw notFoundError('No se encontro el cliente');

}

async function readAll (req, res, next) {
    try {
        const vacunacion = await models.vacunacion.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: vacunacion
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {

        const parametro = req.query.parametro;
        const [vacunacion] = await _expMedico.query(
            'select * FROM CLI_VACUNACION WHERE VAC_id LIKE :parametro;',
            {replacements: {  parametro: parametro } }
        );
        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: vacunacion
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas(req.body.paciente_id);

        const vacunacion = await models.vacunacion.create({
            pac_id: req.body.paciente_id,
            VAC_fecha_vacunacion: req.body.fecha_vacunacion,
            VAC_descripcion: req.body.descripcion,
         
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: vacunacion
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const vacunacion = await models.vacunacion.findOne({where: { VAC_id: req.params.id }});

        if(!vacunacion) {
            throw notFoundError('No se encontro la Vacuna.');
        }

        await vacunacion.update({
            VAC_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const vacunacion = await models.vacunacion.findOne({where: { VAC_id: req.params.id }});

        if (!vacunacion) {
            throw notFoundError('No se encontro la vacuna.');
        }

        await validarLlavesForaneas(req.body.paciente_id);

        
        await vacunacion.update({
            pac_id: req.body.paciente_id,
            VAC_fecha_vacunacion: req.body.fecha_vacunacion,
            VAC_descripcion: req.body.descripcion,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: vacunacion
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
