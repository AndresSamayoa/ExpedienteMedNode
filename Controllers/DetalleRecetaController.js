const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');

async function validarLlavesForaneas (medicamento_id, receta_id) {
    const receta = await models.receta.findOne({where: { rec_id: receta_id }});
    
    if (!receta) throw notFoundError('No se encontro la receta');

    const medicamento = await models.medicamentos.findOne({where: { med_id: medicamento_id }});
    
    if (!medicamento) throw notFoundError('No se encontro el medicamento');

    return {medicamento}
}

async function readAll (req, res, next) {
    try {
        const detallereceta = await models.detallereceta.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: detallereceta
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {

        const parametro = req.query.parametro;
        const [detallereceta] = await _expMedico.query(
            'select * FROM CLI_DETALLE_RECETA WHERE DET_id LIKE :parametro;',
            {replacements: {  parametro: parametro } }
        );
        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: detallereceta
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {
        const references = await validarLlavesForaneas(req.body.medicamento_id, req.body.receta_id);
        
        const detallereceta = await models.detallereceta.create({
            med_id: req.body.medicamento_id,
            rec_id: req.body.receta_id,
            det_comentarios: req.body.comentario,
            det_cantidad: req.body.cantidad,
            det_subtotal: references.medicamento.med_precio * req.body.cantidad
            
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: detallereceta
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const detallereceta = await models.detallereceta.findOne({where: { det_id: req.params.id }});

        if(!detallereceta) {
            throw notFoundError('No se encontro el detalle.');
        }

        await detallereceta.update({
            det_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const detallereceta = await models.detallereceta.findOne({where: { det_id: req.params.id }});

        if (!detallereceta) {
            throw notFoundError('No se encontro el detalle.');
        }

        const references = await validarLlavesForaneas(req.body.medicamento_id || detallereceta.med_id, req.body.receta_id);

        await detallereceta.update({
            med_id: req.body.medicamento_id,
            rec_id: req.body.receta_id,
            det_comentario: req.body.comentario,
            det_cantidad: req.body.cantidad,
            det_subtotal: references.medicamento.med_precio * req.body.cantidad
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: detallereceta
        })
    } catch (error) {
        next(error);
    }
};

async function buscar (req, res, next) {
    try 
    {
        const [detallereceta] = await _expMedico.query(
            'select * from fas_buscar_detalle_receta(:Param);',
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: detallereceta
        })
    } 
    catch (error) 
    {
        next(error);
    }
};


module.exports = {
    readAll,
    createOne,
    deleteOne,
    updateOne,
    buscar,
    searchAll
}
