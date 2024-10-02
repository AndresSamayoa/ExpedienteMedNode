const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearExamenBody = {
    type: 'object',
    properties: {
        paci_id: {
            type: 'number',
            pattern: '[0-9]',
            errorMessage: {
                type: 'El campo del id del paciente debe ser de tipo numerico',
                pattern: 'El campo nombres solo debe contener numeros',
            }
        },
        comentarios: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo comentario debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras o guiones',
            }
        },
        fecha: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha de nacimiento debe ser de tipo texto',
                pattern: 'El campo fecha de nacimiento debe tener el formato YYYY-MM-DD'
            }
        },
        resultados: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo comentario debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras o guiones',
            }
        },
    },
    required: ['paci_id', 'comentarios', 'fecha', 'resultados'],
    errorMessage: {
        required: {
            paci_id: 'El campo id del paciente es obligatorio',
            comentarios: 'El campo comentario es obligatorio',
            fecha: 'El campo fecha es obligatorio',
            resultados: 'El campo resultado es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdateExamenBody = {
    type: 'object',
    properties: {
        paci_id: {
            type: 'number',
            pattern: '[0-9]',
            errorMessage: {
                type: 'El campo del id del paciente debe ser de tipo numerico',
                pattern: 'El campo nombres solo debe contener numeros',
            }
        },
        comentarios: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo comentario debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras o guiones',
            }
        },
        fecha: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha de nacimiento debe ser de tipo texto',
                pattern: 'El campo fecha de nacimiento debe tener el formato YYYY-MM-DD'
            }
        },
        resultados: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo comentario debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras o guiones',
            }
        },
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateExamenParam = {
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

const schemaDeleteExamenParam = {
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

const schemaSearchExamenQuery = {
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

module.exports = { schemaCrearExamenBody, schemaUpdateExamenBody, schemaUpdateExamenParam, schemaDeleteExamenParam, schemaSearchExamenQuery }
