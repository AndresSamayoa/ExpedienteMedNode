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
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha debe ser de tipo texto',
                pattern: 'El campo fecha debe tener el formato YYYY-MM-DD'
            }
        },
        hora: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            maximum: 23,
            minimum: 0,
            errorMessage: {
                type: 'El campo hora debe ser de tipo numerico',
                pattern: 'El campo hora debe de contener solo numeros',
                maximum: 'El campo hora debe de ser menor o igual a 23',
                minimum: 'El campo hora debe de ser mayor o igual a 0'
            }
        },
        estado: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            maximum: 1,
            minimum: 0,
            errorMessage: {
                type: 'El campo estado debe ser de tipo numerico',
                pattern: 'El campo estado debe de contener solo numeros',
                maximum: 'El campo estado debe de ser 0 o 1',
                minimum: 'El campo estado debe de ser 0 o 1'
            }
        },
    },
    required: ['medico_id', 'paciente_id', 'fecha', 'hora', 'estado'],
    errorMessage: {
        required: {
            medico_id: 'El campo medico es obligatorio',
            paciente_id: 'El campo paciente es obligatorio',
            fecha: 'El campo fecha es obligatorio',
            hora: 'El campo hora nacimiento es obligatorio',
            estado: 'El campo estado telefono es obligatorio',
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
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha debe ser de tipo texto',
                pattern: 'El campo fecha debe tener el formato YYYY-MM-DD'
            }
        },
        hora: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            maximum: 23,
            minimum: 0,
            errorMessage: {
                type: 'El campo hora debe ser de tipo numerico',
                pattern: 'El campo hora debe de contener solo numeros',
                maximum: 'El campo hora debe de ser menor o igual a 23',
                minimum: 'El campo hora debe de ser mayor o igual a 0'
            }
        },
        estado: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            maximum: 1,
            minimum: 0,
            errorMessage: {
                type: 'El campo estado debe ser de tipo numerico',
                pattern: 'El campo estado debe de contener solo numeros',
                maximum: 'El campo estado debe de ser 0 o 1',
                minimum: 'El campo estado debe de ser 0 o 1'
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

module.exports = { schemaCrearCitaBody, schemaUpdateCitaBody, schemaUpdateCitaParam, schemaDeleteCitaParam, schemaSearchCitaQuery }
