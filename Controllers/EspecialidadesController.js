const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarLlavesForaneas (medico_id) {
    const medicos = await models.medicos.findOne({where: { MED_id: medico_id }});
    
    if (!medicos) throw notFoundError('No se encontro el medico');

}

async function readAll (req, res, next) {
    try {
        const especialidades = await models.especialidades.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: especialidades
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {

        const parametro = req.query.parametro;
        const [especialidades] = await _expMedico.query(
            'select * FROM CLI_ESPECIALIDAES WHERE ESP_id LIKE :parametro;',
            {replacements: {  parametro: parametro } }
        );
        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: especialidades
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas(req.body.medico_id);

        const especialidades = await models.especialidades.create({
            MED_id: req.body.medico_id,
            ESP_colegiado: req.body.colegiado,
            ESP_especialidad: req.body.especialidad,
            ESP_comentarios: req.body.comentario
         
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: especialidades
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const especialidades = await models.especialidades.findOne({where: { ESP_id: req.params.id }});

        if(!especialidades) {
            throw notFoundError('No se encontro la especialidad.');
        }

        await especialidades.update({
            ESP_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const especialidades = await models.especialidades.findOne({where: { ESP_id: req.params.id }});

        if (!especialidades) {
            throw notFoundError('No se encontro la especialidad.');
        }

        await validarLlavesForaneas(req.body.medico_id);

        
        await especialidades.update({
            MED_id: req.body.medico_id,
            ESP_colegiado: req.body.colegiado,
            ESP_especialidad: req.body.especialidad,
            ESP_comentarios: req.body.comentario
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: especialidades
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
