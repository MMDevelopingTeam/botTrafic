const proxyModels = require('../models/proxys');

const createAccounts = async (req, res) => {
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

const createProxys = async (req, res) => {
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

module.exports = {createAccounts, getAccounts, createProxys};