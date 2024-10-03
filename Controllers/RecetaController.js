const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarLlavesForaneas (diagnostico_id) {
    //const diagnostico = await models.diagnostico.findOne({where: { DIA_id: diagnostico_id }});
    
    //if (!diagnostico) throw notFoundError('No se encontro el diagnostico');

}

async function readAll (req, res, next) {
    try {
        const receta = await models.receta.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: receta
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {

        const parametro = req.query.parametro;
        const [receta] = await _expMedico.query(
            'select * FROM CLI_RECETA WHERE REC_id LIKE :parametro;',
            {replacements: {  parametro: parametro } }
        );
        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: receta
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas(req.body.paciente_id);

        const receta = await models.receta.create({
            DIA_id: req.body.DIA_id,
            REC_valor_total: req.body.valor_total
            
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: receta
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const receta = await models.receta.findOne({where: { REC_id: req.params.id }});

        if(!receta) {
            throw notFoundError('No se encontro la receta.');
        }

        await receta.update({
            REC_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const receta = await models.receta.findOne({where: { REC_id: req.params.id }});

        if (!receta) {
            throw notFoundError('No se encontro la receta.');
        }

        await validarLlavesForaneas(req.body.diagnostico_id);

        
        await receta.update({
            DIA_id: req.body.DIA_id,
            REC_valor_total: req.body.valor_total
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: receta
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
