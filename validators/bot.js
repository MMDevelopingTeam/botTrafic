const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateBot = [
    check('token', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateBot}