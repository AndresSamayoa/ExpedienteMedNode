const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearProcBody = {
    type: 'object',
    properties: {
        cita_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo cita debe ser de tipo numerico',
                pattern: 'El campo cita debe contener numeros',
            }
        },
        procedimiento_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo procedimiento debe ser de tipo numerico',
                pattern: 'El campo procedimiento debe contener numeros',
            }
        },
    },
    required: ['cita_id', 'procedimiento_id'],
    errorMessage: {
        required: {
            cita_id: 'El campo cita es obligatorio',
            procedimiento_id: 'El campo procedimiento es obligatorio'
        }
    },
    additionalProperties: false
}

const schemaUpdateProcBody = {
    type: 'object',
    properties: {
        cita_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo cita debe ser de tipo numerico',
                pattern: 'El campo cita debe contener numeros',
            }
        },
        procedimiento_id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo procedimiento debe ser de tipo numerico',
                pattern: 'El campo procedimiento debe contener numeros',
            }
        },
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateProcParam = {
    type: 'object',
    properties: {
        id: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo id debe ser de tipo numero',
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

const schemaDeleteProcParam = {
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

const schemaReadByDateParam = {
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

module.exports = { schemaCrearProcBody, schemaUpdateProcBody, schemaUpdateProcParam, schemaDeleteProcParam, schemaReadByDateParam }
