const moment = require('moment')

const models = require('../Models');
const { _expMedico } = require('../Utils/Database');
const { notFoundError } = require('../errors');

async function readAll (req, res, next) {
    try {
        const medicamentos = await models.medicamentos.findAll();

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: medicamentos
        })
    } catch (error) {
        next(error);
    }
};

async function searchAll (req, res, next) {
    try {
        const [medicamentos] = await _expMedico.query(
            'select * from fas_buscar_medicamentos(:Param);', //Cambiar por el de medicamentos
            {replacements: { Param: req.query.parametro } }
        );

        return res.status(200).send({
            status: true,
            message: 'Exito al consultar',
            data: medicamentos
        })
    } catch (error) {
        next(error);
    }
};

async function createOne (req, res, next) {
    try {

        const medicamentos = await models.medicamentos.create({
            med_nombre_medicamento: req.body.nombre_medicamento,
            med_descripcion: req.body.descripcion,
            med_precio: req.body.med_precio
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al crear',
            data: medicamentos
        })
    } catch (error) {
        next(error);
    }
};

async function deleteOne (req, res, next) {
    try {

        const medicamentos = await models.medicamentos.findOne({where: { med_id: req.params.id }});

        if(!medicamentos) {
            throw notFoundError('No se encontro el paciente.');
        }

        await medicamentos.update({
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

        const medicamentos = await models.medicamentos.findOne({where: { med_id: req.params.id }});

        if(!medicamentos) {
            throw notFoundError('No se encontro el paciente.');
        }

        await medicamentos.update({
            med_nombre_medicamento: req.body.nombre_medicamento,
            med_descripcion: req.body.descripcion,
            med_precio: req.body.med_precio
        });

        return res.status(200).send({
            status: true,
            message: 'Exito al actualizar',
            data: medicamentos
        })
    } catch (error) {
        next(error);
    }
};

async function getReporteMedicamentos (req, res, next) {

    try {
        const{fecha_inicio, fecha_fin} = req.query;
        const[medicamentos] = await _expMedico.query(
            'SELECT * FROM fn_Reporte_Medicamentos(:fecha_inicio, :fecha_fin)',
            {replacements: {fecha_inicio, fecha_fin} }
        );

        return res.status(200).send({
            status: true,
            message: 'Éxito al Consultar Reporte Medicamentos',
            data: medicamentos
        });

    } catch (error) {
        next (error);
    }
}

module.exports = {
    readAll,
    createOne,
    deleteOne,
    updateOne,
    searchAll,
    getReporteMedicamentos

}
