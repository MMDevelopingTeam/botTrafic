const proxyModels = require('../models/proxys');
const accountsModels = require('../models/accounts');
const {launchBotCreate} = require('../utils/createAccouts');
const { generatorNames } = require('../utils/generatorNames');


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
    const {nInt} = req.body;
    if (!nInt) {
        return res.status(400).send({
            success: false,
            message: 'el campo nInt es requerido'
        });
    }
    try {
        for (let index = 0; index < nInt; index++) {
            console.log("interacion:", index);
            await generatorNames()
            await launchBotCreate()
        }
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


const isFullFalse = async (req, res) => {
    const dataAccts = await accountsModels.find()
    if (!dataAccts) {
        return res.status(400).send({
            success: false,
            message: 'Cuentas no encontradas'
        });
    }
    try {
        for (let index = 0; index < dataAccts.length; index++) {
            const dataAcct = await accountsModels.findOne({_id : dataAccts[index]._id});
            dataAcct.isUsed=false;
            await dataAcct.save();
        }
        return res.status(200).send({
            success: true,
            message: "Estado cambiado"
        });  
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });  
    }
}

module.exports = {createAccount, createAccounts, createProxy, isFullFalse};