const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearMedicoBody = {
    type: 'object',
    properties: {
        nombres: {
            type: 'string',
            pattern: '^[a-zA-Z-]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombres solo debe contener letras y guiones',
            }
        },
        apellidos: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo apellidos debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras y guiones',
            }
        },
        tipo_medico: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo apellidos debe ser de tipo texto',
                pattern: 'El campo code tipo medico debe contener letras y guiones',
            }
        },
        numero_telefono: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            minLength: 8,
            maxLength: 8,
            errorMessage: {
                type: 'El campo telefono debe ser de tipo texto',
                pattern: 'El campo telefono debe contener numeros',
                maxLength: 'El campo telefono debe ser de 8 caracteres',
                minLength: 'El campo telefono debe ser de 8 caracteres',
            }
        },
              
        
        correo_electronico: {
            type: 'string',
            pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
            errorMessage: {
                type: 'El campo correo electronico debe ser de tipo texto',
                pattern: 'El campo correo electronico debe tener el formato xxx@xx.xxx'
            }
        },
        nombres: {
            type: 'string',
            pattern: '^[a-zA-Z-]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombres solo debe contener letras y guiones',
            }
        },
        
    },
    required: ['nombres', 'apellidos', 'tipo_medico','numero_telefono', 'correo_electronico','numero_colegiado'],
    errorMessage: {
        required: {
            nombres: 'El campo nombres es obligatorio',
            apellidos: 'El campo apellidos es obligatorio',
            tipo_medico: 'El campo tipo medico es obligatorio',
            numero_telefono: 'El campo numero telefono es obligatorio',
            correo_electronico: 'El campo correo electronico es obligatorio',
            numero_colegiado: 'El campo numero colegiado  es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdateMedicoBody = {
    type: 'object',
    properties: {
        nombres: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo nombres debe ser de tipo texto',
                pattern: 'El campo nombres solo debe contener letras y guiones',
            }
        },
        apellidos: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            errorMessage: {
                type: 'El campo apellidos debe ser de tipo texto',
                pattern: 'El campo code apellidos debe contener letras y guiones',
            }
        },
        
        numero_telefono: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            minLength: 8,
            maxLength: 8,
            errorMessage: {
                type: 'El campo telefono debe ser de tipo texto',
                pattern: 'El campo telefono debe contener numeros',
                maxLength: 'El campo telefono debe ser de 8 caracteres',
                minLength: 'El campo telefono debe ser de 8 caracteres',
            }
        },
        
        correo_electronico: {
            type: 'string',
            pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
            errorMessage: {
                type: 'El campo correo electronico debe ser de tipo texto',
                pattern: 'El campo correo electronico debe tener el formato xxx@xx.xxx'
            }
        },
        numero_colegiado: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            minLength: 8,
            maxLength: 8,
            errorMessage: {
                type: 'El campo número de colegiado debe ser de tipo texto',
                pattern: 'El campo colegiado debe contener numeros',
                maxLength: 'El campo telefono debe ser de 8 caracteres',
                minLength: 'El campo telefono debe ser de 8 caracteres',
            }
        },
        tipo_medico: {
            type: 'string',
            pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
            errorMessage: {
                type: 'El campo tipo de medico debe ser de tipo texto',
                pattern: 'El campo tipo de medico solo debe contener letras'
            }
        },

    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateMedicoParam = {
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

const schemaDeleteMedicoParam = {
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

const schemaSearchMedicoQuery = {
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

module.exports = { schemaCrearMedicoBody, schemaUpdateMedicoBody, schemaUpdateMedicoParam, schemaDeleteMedicoParam, schemaSearchMedicoQuery }
