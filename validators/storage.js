const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateStorageModel = [
    check('name_model', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateStorageHeadquarter = [
    check('name', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateStorageKillBot = [
    check('id_acct', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateStorageMonitor = [
    check('username', 'El campo es requerido')
    .exists(),
    check('name', 'El campo es requerido')
    .exists(),
    check('password', 'El password es de minimo 6 caracteres')
    .exists()
    .isLength({min: 6}),
    check('headquarter_id', 'El campo es requerido')
    .exists(),
    check('address', 'El campo es requerido')
    .exists(),
    check('number', 'El campo es requerido y es de tipo numerico')
    .exists(),
    check('Shift', 'El campo es requerido')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const getKillBotsValidator = [
    check('nameModel', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
const getCreateProxysString = [
    check('proxysStrings', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


module.exports = {
    validateStorageModel, 
    validateStorageHeadquarter,
    validateStorageKillBot,
    validateStorageMonitor,
    getCreateProxysString,
    getKillBotsValidator
}