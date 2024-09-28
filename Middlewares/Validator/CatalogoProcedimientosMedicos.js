const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearProcBody = {
    type: 'object',
    properties: {
        nombre: {
            type: 'string',
            pattern: '^[a-zA-Z- ]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombres solo debe contener letras y guiones',
            }
        },
        precio: {
            type: ['string','number'],
            pattern: '^\d*(\.\d+)?$',
            errorMessage: {
                type: 'El campo precio debe ser de tipo numerico',
                pattern: 'El campo precio debe contener numeros y solo 1 punto decimal',
            }
        },
        local: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            errorMessage: {
                type: 'El campo local debe ser de tipo numero',
                pattern: 'El campo cui debe ser 0 o 1',
            }
        },
        examen: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            errorMessage: {
                type: 'El campo examen debe ser de tipo numero',
                pattern: 'El campo examen debe 0 o 1',
            }
        },
    },
    required: ['nombre', 'precio', 'local', 'examen'],
    errorMessage: {
        required: {
            nombre: 'El campo nombre es obligatorio',
            precio: 'El campo precio es obligatorio',
            local: 'El campo local es obligatorio',
            examen: 'El campo examen nacimiento es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdateProcBody = {
    type: 'object',
    properties: {
        nombre: {
            type: 'string',
            pattern: '^[a-zA-Z- ]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombres solo debe contener letras y guiones',
            }
        },
        precio: {
            type: ['string','number'],
            pattern: '^\d*(\.\d+)?$',
            errorMessage: {
                type: 'El campo precio debe ser de tipo numerico',
                pattern: 'El campo precio debe contener numeros y solo 1 punto decimal',
            }
        },
        local: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            errorMessage: {
                type: 'El campo local debe ser de tipo numero',
                pattern: 'El campo cui debe ser 0 o 1',
            }
        },
        examen: {
            type: ['string','number'],
            pattern: '^[0-1]+$',
            errorMessage: {
                type: 'El campo examen debe ser de tipo numero',
                pattern: 'El campo examen debe 0 o 1',
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

const schemaReadOneProcParam = {
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

const schemaSearchProcQuery = {
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

module.exports = { schemaCrearProcBody, schemaUpdateProcBody, schemaUpdateProcParam, schemaReadOneProcParam, schemaDeleteProcParam, schemaSearchProcQuery }
