const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCrearHorarioBody = {
    type: 'object',
    properties: {
        medi_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo medico id debe ser de tipo numerico',
                pattern: 'El campo medico id debe contener numeros',
            }
        },
        hora_inicio: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo hora inicio debe ser de tipo texto',
                pattern: 'El campo hora inicio debe tener el formato YYYY-MM-DD'
            }
        },
        hora_fin: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo hora fin debe ser de tipo texto',
                pattern: 'El campo hora fin debe tener el formato YYYY-MM-DD'
            }
        },
        hora_hora_inicio: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo hora hora inicio debe ser de tipo numerico',
                pattern: 'El campo hora hora inicio debe contener numeros',
            }
        },
        hora_hora_fin: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo hora hora fin debe ser de tipo numerico',
                pattern: 'El campo hora hora fin debe contener numeros',
            }
        },
        hora_lunes: {
            type: 'TINYINT', // Valida como booleano en tu API
            errorMessage: {
                type: 'El campo hor_lunes debe ser TINYINT (true/false)'
            }
        },
        hora_martes: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_martes debe ser TINYINT (true/false)'
            }
        },
        hora_miercoles: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_miercoles debe ser TINYINT (true/false)'
            }
        },
        hora_jueves: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_jueves debe ser TINYINT (true/false)'
            }
        },
        hora_viernes: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_viernes debe ser TINYINT (true/false)'
            }
        },
        hora_sabado: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_sabado debe ser TINYINT (true/false)'
            }
        },
        hora_domingo: {
            type: 'TINYINT',
            errorMessage: {
                type: 'El campo hor_domingo debe ser TINYINT (true/false)'
            }
        },    
    },
    required: ['medi_id', 'hora_inicio', 'hora_fin', 'hora_hora_inicio', 'hora_hora_fin', 'hora_lunes', 'hora_martes', 'hora_miercoles', 'hora_jueves', 'hora_viernes', 'hora_sabado', 'hora_domingo'],
    errorMessage: {
        required: {
            medi_id: 'El campo medico id es obligatorio',
            hora_inicio: 'El campo hora inicio es obligatorio',
            hora_fin: 'El campo hora fin es obligatorio',
            hora_hora_inicio: 'El campo hora hora inicio es obligatorio',
            hora_hora_fin: 'El campo hora hora fin es obligatorio',
            hora_lunes: 'El campo lunes es obligatorio',
            hora_martes: 'El campo martes es obligatorio',
            hora_miercoles: 'El campo miercoles es obligatorio',
            hora_jueves: 'El campo jueves es obligatorio',
            hora_viernes: 'El campo viernes es obligatorio',
            hora_sabado: 'El campo sabado es obligatorio',
            hora_domingo: 'El campo domingo es obligatorio'
        }
    },
    additionalProperties: false
}

const schemaUpdateHorarioBody = {
    type: 'object',
    properties: {
        medi_id: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo medico id debe ser de tipo numerico',
                pattern: 'El campo medico id debe contener numeros',
            }
        },
        hora_inicio: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo hora inicio debe ser de tipo texto',
                pattern: 'El campo hora inicio debe tener el formato YYYY-MM-DD'
            }
        },
        hora_fin: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: {
                type: 'El campo hora fin debe ser de tipo texto',
                pattern: 'El campo hora fin debe tener el formato YYYY-MM-DD'
            }
        },
        hora_hora_inicio: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo hora hora inicio debe ser de tipo numerico',
                pattern: 'El campo hora hora inicio debe contener numeros',
            }
        },
        hora_hora_fin: {
            type: 'number',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'El campo hora hora fin debe ser de tipo numerico',
                pattern: 'El campo hora hora fin debe contener numeros',
            }
        },
        hora_lunes: {
            type: 'boolean', // Valida como booleano en tu API
            errorMessage: {
                type: 'El campo hor_lunes debe ser booleano (true/false)'
            }
        },
        hora_martes: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_martes debe ser booleano (true/false)'
            }
        },
        hora_miercoles: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_miercoles debe ser booleano (true/false)'
            }
        },
        hora_jueves: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_jueves debe ser booleano (true/false)'
            }
        },
        hora_viernes: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_viernes debe ser booleano (true/false)'
            }
        },
        hora_sabado: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_sabado debe ser booleano (true/false)'
            }
        },
        hora_domingo: {
            type: 'boolean',
            errorMessage: {
                type: 'El campo hor_domingo debe ser booleano (true/false)'
            }
        }, 
    },
    errorMessage: {
    },
    additionalProperties: false
}

const schemaUpdateHorarioParam = {
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

const schemaDeleteHorarioParam = {
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

const schemaSearchHorarioQuery = {
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

module.exports = { schemaCrearHorarioBody, schemaUpdateHorarioBody, schemaUpdateHorarioParam, schemaDeleteHorarioParam, schemaSearchHorarioQuery }
