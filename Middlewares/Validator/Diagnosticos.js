const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearDiagnosticoBody = {
    type: 'object',
    properties: {
        cita_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo cita id debe ser de tipo numerico',
                pattern: 'El campo cita id solo debe contener numeros',
            }
        },
        enfer_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo enfermerdad id debe ser de tipo numerico',
                pattern: 'El campo enfermerdad id solo debe contener numeros',
            }
        },
        dia_observacion: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo dia debe ser de tipo texto',
                pattern: 'El campo dia debe tener el formato YYYY-MM-DD'
            }
        },
    },
    required: ['cita_id', 'enfer_id', 'dia_observacion'],
    errorMessage: {
        required: {
            cita_id: 'El campo cita id es obligatorio',
            enfer_id: 'El campo enfermedad id es obligatorio',
            dia_observacion: 'El campo dia es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdateDiagnosticoBody = {
    type: 'object',
    properties: {
        cita_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo cita id debe ser de tipo numerico',
                pattern: 'El campo cita id solo debe contener numeros',
            }
        },
        enfer_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo enfermerdad id debe ser de tipo numerico',
                pattern: 'El campo enfermerdad id solo debe contener numeros',
            }
        },
        dia_observacion: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo dia debe ser de tipo texto',
                pattern: 'El campo dia debe tener el formato YYYY-MM-DD'
            }
        },
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateDiagnosticoParam = {
    type: 'object',
    properties: {
        id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo id debe ser de tipo texto',
                pattern: 'El campo id solo debe contener numeros',
            }
        },
    },
    required: ['id'],
    errorMessage: {
        required: {
            id: 'El campo id es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaDeleteDiagnosticoParam = {
    type: 'object',
    properties: {
        id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo id debe ser de tipo texto',
                pattern: 'El campo id solo debe contener numeros',
            }
        },
    },
    required: ['id'],
    errorMessage: {
        required: {
            id: 'El campo id es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaSearchDiagnosticoQuery = {
    type: 'object',
    properties: {
        parametro: {
            type: 'string',
            pattern: '^[a-zA-Z-]+$',
            errorMessage: {
                type: 'El campo parametro debe ser de tipo texto',
                pattern: 'El campo parametro solo debe contener letras',
            }
        },
    },
    required: ['parametro'],
    errorMessage: {
        required: {
            id: 'El campo parametro es obligatorio',
        }
    },
    additionalProperties: false
}

module.exports = { schemaCrearDiagnosticoBody, schemaUpdateDiagnosticoBody, schemaUpdateDiagnosticoParam, schemaDeleteDiagnosticoParam, schemaSearchDiagnosticoQuery }
