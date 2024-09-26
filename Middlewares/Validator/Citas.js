const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearCitaBody = {
    type: 'object',
    properties: {
        medico_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo de medico debe ser de tipo numerico',
                pattern: 'El campo medico solo debe contener numeros',
            }
        },
        paciente_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo paciente debe ser de tipo numerico',
                pattern: 'El campo paciente solo debe contener numeros',
            }
        },
        fecha: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$',
            errorMessage: {
                type: 'El campo fecha debe ser de tipo texto',
                pattern: 'El campo fecha debe tener el formato YYYY-MM-DD hh:mm:ss'
            }
        },
    },
    required: ['medico_id', 'paciente_id', 'fecha'],
    errorMessage: {
        required: {
            medico_id: 'El campo medico es obligatorio',
            paciente_id: 'El campo paciente es obligatorio',
            fecha: 'El campo fecha es obligatorio',
            hora: 'El campo hora nacimiento es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdateCitaBody = {
    type: 'object',
    properties: {
        medico_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo de medico debe ser de tipo numerico',
                pattern: 'El campo medico solo debe contener numeros',
            }
        },
        paciente_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo paciente debe ser de tipo numerico',
                pattern: 'El campo paciente solo debe contener numeros',
            }
        },
        fecha: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$',
            errorMessage: {
                type: 'El campo fecha debe ser de tipo texto',
                pattern: 'El campo fecha debe tener el formato YYYY-MM-DD hh:mm:ss'
            }
        },
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateCitaParam = {
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

const schemaDeleteCitaParam = {
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

const schemaSearchCitaQuery = {
    type: 'object',
    properties: {
        parametro: {
            type: 'string',
            pattern: '^[a-zA-Z- ]+$',
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

module.exports = { schemaCrearCitaBody, schemaUpdateCitaBody, schemaUpdateCitaParam, schemaDeleteCitaParam, schemaSearchCitaQuery }
