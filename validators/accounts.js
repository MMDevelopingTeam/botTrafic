const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')


const validateAcctsIsFull = [
    check('headquarter_id', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {}