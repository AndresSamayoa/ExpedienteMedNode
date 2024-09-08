const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearPacienteBody = {
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
        cui: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            minLength: 13,
            maxLength: 13,
            errorMessage: {
                type: 'El campo cui debe ser de tipo texto',
                pattern: 'El campo cui debe contener numeros',
                maxLength: 'El campo cui debe ser de 13 caracteres',
                minLength: 'El campo cui debe ser de 13 caracteres',
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
        fecha_nacimiento: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha de nacimiento debe ser de tipo texto',
                pattern: 'El campo fecha de nacimiento debe tener el formato YYYY-MM-DD'
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
    },
    required: ['nombres', 'apellidos', 'cui', 'fecha_nacimiento', 'numero_telefono', 'correo_electronico'],
    errorMessage: {
        required: {
            nombres: 'El campo nombres es obligatorio',
            apellidos: 'El campo apellidos es obligatorio',
            cui: 'El campo cui es obligatorio',
            fecha_nacimiento: 'El campo fecha nacimiento es obligatorio',
            numero_telefono: 'El campo numero telefono es obligatorio',
            correo_electronico: 'El campo correo electronico es obligatorio',
        }
    },
    additionalProperties: false
}

const schemaUpdatePacienteBody = {
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
        cui: {
            type: ['string','number'],
            pattern: '^[0-9]+$',
            minLength: 13,
            maxLength: 13,
            errorMessage: {
                type: 'El campo cui debe ser de tipo texto',
                pattern: 'El campo cui debe contener numeros',
                maxLength: 'El campo cui debe ser de 13 caracteres',
                minLength: 'El campo cui debe ser de 13 caracteres',
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
        fecha_nacimiento: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo fecha de nacimiento debe ser de tipo texto',
                pattern: 'El campo fecha de nacimiento debe tener el formato YYYY-MM-DD'
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
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdatePacienteParam = {
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

const schemaDeletePacienteParam = {
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

const schemaSearchPacienteQuery = {
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

module.exports = { schemaCrearPacienteBody, schemaUpdatePacienteBody, schemaUpdatePacienteParam, schemaDeletePacienteParam, schemaSearchPacienteQuery }
