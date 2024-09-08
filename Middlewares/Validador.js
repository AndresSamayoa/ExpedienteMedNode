const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
require("ajv-errors")(ajv);

function validateBody(schema) {
    const validate = ajv.compile(schema);

    return function (req, res, next) {
        const valid = validate(req.body);

        if (!valid) {
            const errors = validate.errors.map(error => error.message);
            const errorMessage = errors.join('. ');
            return res.status(400).send({
                result: false,
                message: errorMessage,
                records: ''
            });
        }

        next();
    };
}

function validateParams(schema) {
    const validate = ajv.compile(schema);

    return function (req, res, next) {
        const valid = validate(req.params);

        if (!valid) {
            const errors = validate.errors.map(error => error.message);
            const errorMessage = errors.join('. ');
            return res.status(400).send({
                result: false,
                message: errorMessage,
                records: ''
            });
        }

        next();
    };
}

function validateQuery(schema) {
    const validate = ajv.compile(schema);

    return function (req, res, next) {
        const valid = validate(req.query);

        if (!valid) {
            const errors = validate.errors.map(error => error.message);
            const errorMessage = errors.join('. ');
            return res.status(400).send({
                result: false,
                message: errorMessage,
                records: ''
            });
        }

        next();
    };
}

module.exports = { validateBody, validateParams, validateQuery };