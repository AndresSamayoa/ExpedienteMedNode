const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearMedicamentoBody = {
    type: 'object',
    properties: {
        nombre_medicamento: {
            type: 'string',
            pattern: '^[a-zA-Z-]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombre solo debe contener letras y guiones',
            }
        },
        descripcion: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo apellidos debe ser de tipo texto',
                pattern: 'El campo code descripcion debe contener letras y guiones',
            }
        },
        med_precio: {
            type: ['string','decimal'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo precio debe ser de tipo texto',
                pattern: 'El campo cui debe contener decimal'
            }
        }
    },
    required: ['nombre_medicamento', 'descripcion', 'med_precio'],
    errorMessage: {
        required: {
            nombre_medicamento: 'El campo nombre es obligatorio',
            descripcion: 'El campo descripcion es obligatorio',
            med_precio: 'El campo precio es obligatorio'
        }
    },
    additionalProperties: false
}

const schemaUpdateMedicamentoBody = {
    type: 'object',
    properties: {
        nombre_medicamento: {
            type: 'string',
            pattern: '^[a-zA-Z-]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombre solo debe contener letras y guiones',
            }
        },
        descripcion: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo apellidos debe ser de tipo texto',
                pattern: 'El campo code descripcion debe contener letras y guiones',
            }
        },
        med_precio: {
            type: ['string','decimal'],
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo precio debe ser de tipo texto',
                pattern: 'El campo cui debe contener decimal'
            }
        }
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateMedicamentoParam = {
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

const schemaDeleteMedicamentoParam = {
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

const schemaSearchMedicamentoQuery = {
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

module.exports = { schemaCrearMedicamentoBody, schemaUpdateMedicamentoBody, schemaUpdateMedicamentoParam, schemaDeleteMedicamentoParam, schemaSearchMedicamentoQuery }
