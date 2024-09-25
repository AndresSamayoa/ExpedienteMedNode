const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError, badRequestError } = require('../errors');



async function validarLlavesForaneas ( paciente_id) {
    const paciente = await models.pacientes.findOne({where: { pac_id: paciente_id }});
    
    if (!paciente) throw notFoundError('No se encontro el paciente');

}

async function readAll (req, res, next) {
    try {
        const Signosvitales = await models.Signosvitales.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: Signosvitales
        })
    } catch (error) {
        next(error);
    }
};

/*async function searchAll (req, res, next) {
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
};*/

async function createOne (req, res, next) {
    try {
        await validarLlavesForaneas( req.body.cliente_id);

        
        const Signosvitales = await models.SignosVitales.create({
            PAC_id: req.body.paciente_id,
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

        const Signosvitales = await models.SignosVitales.findOne({where: { SIG_id: req.params.id }});

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
        const Signosvitales = await models.SignosVitales.findOne({where: { SIG_id: req.params.id }});

        if (!Signosvitales) {
            throw notFoundError('No se encontro información.');
        }

        await validarLlavesForaneas(req.body.paciente_id );


        await Signosvitales.update({
            PAC_id: req.body.paciente_id,
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
    //searchAll
}
