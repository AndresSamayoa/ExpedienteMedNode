const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');



async function validarLlavesForaneas ( cita_id) {
    const cita = await models.citas.findOne({where: { CIT_id: cita_id }});
    
    if (!cita) throw notFoundError('No se encontro la cita');

}

async function readAll (req, res, next) {
    try {
        const Signosvitales = await models.signosvitales.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: Signosvitales
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {

        const parametro = req.query.parametro;
        const [signosvitales] = await _expMedico.query(
            'select * FROM CLI_SIGNOS_VITALES WHERE SIG_id LIKE :parametro;',
            {replacements: {  parametro: `%${parametro}%` } }
        );
        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: signosvitales
        })
    } catch (error) {
        next(error);
    }
};


async function buscar (req, res, next) {
    try 
    {
        const signosvitales = await models.signosvitales.findAll({where: { CIT_id: req.params.id }});

            return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: signosvitales
        })
    } 
    catch (error) 
    {
        next(error);
    }
};


async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas( req.body.cita_id);

        
        const Signosvitales = await models.signosvitales.create({
            CIT_id: req.body.cita_id,
            SIG_presion_arterial: req.body.presion_arterial ,
            SIG_temperatura: req.body.temperatura,
            SIG_frecuencia_cardiaca :req.body.frecuenciacardiaca,
            SIG_respiraciones: req.body.respiraciones,
            SIG_oxigenacion : req.body.oxigenacion,
            SIG_glucosa : req.body.glucosa,
            SIG_peso: req.body.peso,
            SIG_estatura : req.body.estatura,

        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: Signosvitales
        })
    } catch (error) {
        next(error);
    }    
};

async function deleteOne (req, res, next) {
    try {

        const Signosvitales = await models.signosvitales.findOne({where: { SIG_id: req.params.id }});

        if(!Signosvitales) {
            throw notFoundError('No se encontro información');
        }

        await Signosvitales.update({
            SIG_fecha_eliminacion: moment().format('YYYY-MM-DD hh:mm:ss')
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
        const Signosvitales = await models.signosvitales.findOne({where: { SIG_id: req.params.id }});

        if (!Signosvitales) {
            throw notFoundError('No se encontro información.');
        }

        await validarLlavesForaneas( req.body.cita_id);

        await Signosvitales.update({
            CIT_id: req.body.cita_id,
            SIG_presion_arterial: req.body.presion_arterial ,
            SIG_temperatura: req.body.temperatura,
            SIG_frecuencia_cardiaca :req.body.frecuenciacardiaca,
            SIG_respiraciones: req.body.respiraciones,
            SIG_oxigenacion : req.body.oxigenacion,
            SIG_glucosa : req.body.glucosa,
            SIG_peso: req.body.peso,
            SIG_estatura : req.body.estatura,
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: Signosvitales
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
    buscar
}
