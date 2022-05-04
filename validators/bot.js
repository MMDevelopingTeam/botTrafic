const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateBot = [
    check('name_model', 'El campo es requerido')
    .exists(),
    check('name_monitor', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateBot}