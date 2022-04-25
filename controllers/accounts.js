const proxyModels = require('../models/proxys');
const headquarterModels = require('../models/headquarter');
const accountsModels = require('../models/accounts');
const {launchBotCreate} = require('../utils/createAccouts');


const createAccount = async (req, res) => {
    const { username, password } = req.body;

    const newAcct = new accountsModels({
        username,
        password
    })

    const saveAcct = await newAcct.save();
    console.log(saveAcct)

    return res.status(200).send({
        success: true,
        message: 'Cuenta guardada correctamente'
    });
};
const createAccounts = async (req, res) => {
    const { headquarter_id } = req.body;

    const dataheadquarter = await headquarterModels.findOne({_id: headquarter_id})
    if (!dataheadquarter) {
        return res.status(400).send({
            success: false,
            message: 'Sede no encontrada'
        });
    }
    try {
        launchBotCreate(headquarter_id)
        return res.status(200).send({
            success: true,
            message: 'Cuentas guardadas correctamente'
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
        
    }
};

const createProxy = async (req, res) => {
    const { proxy } = req.body;

    const newProxy = new proxyModels({
        proxy
    })

    const saveproxy = await newProxy.save();
    console.log(saveproxy)

    return res.status(200).send({
        success: true,
        message: 'proxy guardado correctamente'
    });
};

const getAccounts = async (req, res) => {
    const { id } = req.params

    const dataAcct = await accountsModels.findOne({isUsed: false});
    console.log(dataAcct.username)
    return res.status(200).send({
        success: true,
        message: 'Cuenta encontrada',
        dataAcct
    });
}

module.exports = {createAccount, createAccounts, getAccounts, createProxy};