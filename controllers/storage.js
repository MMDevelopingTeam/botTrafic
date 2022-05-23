const fs = require("fs");
const proxysModels = require('../models/proxys');
const accountsModels = require('../models/accounts');
const killBotsModels = require('../models/killBots');

const createProxys = async (req, res) => {
  const { file } = req

  if (!file) {
    return res.status(400).send({
        success: false,
        message: 'No hay archivo'
      });
  }

  const fileProxys = fs.readFileSync(`storage/${file.filename}`, 'UTF-8');
  const proxys = fileProxys.split(",")
  console.log("------ Guardando data del archivo en base de datos --------");
  console.log("------ no parar el proceso --------");
  try {
    for (let index = 0; index < proxys.length; index++) {
      const newProxy = new proxysModels({
        proxy: proxys[index]
      })

    const saveProxy = await newProxy.save();
    console.log(saveProxy)
    }
    fs.unlinkSync(`storage/${file.filename}`)
    console.log("archivo eliminado");
    return res.status(200).send({
        success: true,
        message: 'data del archivo guardada en base de datos'
    });
  } catch (error) {
    return res.status(400).send({
        success: false,
        message: error.message
    });
  }

};
const createAcct = async (req, res) => {
  const { file } = req
  if (!file) {
    return res.status(400).send({
        success: false,
        message: 'No hay archivo'
      });
  }

  const fileAccts = fs.readFileSync(`storage/${file.filename}`, 'UTF-8');
  const accts = fileAccts.split(",")
  console.log("------ Guardando data del archivo en base de datos --------");
  console.log("------------------- no parar el proceso -------------------");
  try {
    for (let index = 0; index < accts.length; index++) {
      
      const newAccount = new accountsModels({
        username: accts[index].split(':').shift(),
        password: accts[index].split(':').pop(),
      })
      
      const saveAccount = await newAccount.save();
      console.log(saveAccount)
    }
    fs.unlinkSync(`storage/${file.filename}`)
    console.log("archivo eliminado");
    return res.status(200).send({
      success: true,
      message: 'data del archivo guardada en base de datos'
    });
  } catch (error) {
    return res.status(400).send({
        success: false,
        message: error.message
    });
  }

};

const getProxys = async (req, res) => {
  const prsModels = await proxysModels.find()
  if (proxysModels) {
    return res.status(200).send({
      success: true,
      message: 'proxys encontrados',
      prsModels
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando proxys'
    });
  }
}
const getAccts = async (req, res) => {
  const acctsModels = await accountsModels.find()
  if (acctsModels) {
    return res.status(200).send({
      success: true,
      message: 'Cuentas encotradas',
      acctsModels
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando cuentas'
    });
  }
}
const createKillbots = async (req, res) => {
  const {id_acct} = req.body;
  const newNot = new killBotsModels({
    NmrKill: 12345,
    acct_id: id_acct,
    proxy: "154.37.254.17:8800"
  })
  await newNot.save()
  return res.status(200).send({
    success: true,
    message: 'killbot creado'
  });
}

module.exports = {createProxys, createAcct, getProxys, getAccts, createKillbots};