const fs = require("fs");
const proxysModels = require('../models/proxys');
const IdPackProxyModels = require('../models/idPackProxy');
const accountsModels = require('../models/accounts');
const logLaunchModels = require('../models/logLaunch');
const killBotsModels = require('../models/killBots');
const axios = require('axios');
const {testProxys} = require('../utils/stateProxys');

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
      const dataP = await proxysModels.findOne({proxy: proxys[index]})
      if (dataP) {
        console.log('proxy ya existente');
      }else{
        const newProxy = new proxysModels({
          proxy: proxys[index]
        })
        await newProxy.save();
      }
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

const createProxysString = async (req, res) => {
  const { platformProxys, idPackageProxys, proxysStrings } = req.body

  const dataI = await IdPackProxyModels.findOne({id: idPackageProxys})
  if (!dataI) {
    return res.status(400).send({
      success: false,
      message: 'El paqueta no existe'
    });
  }
  try {
    const proxys = proxysStrings.split('\n')
    // return console.log(proxys.length);
    for (let index = 0; index < proxys.length; index++) {
      const dataS = proxys[index].split(' ')
      const proxyF = dataS[0].split(',')[0]
      const dataP = await proxysModels.findOne({proxy: proxyF})
      if (dataP) {
        console.log('proxy ya existente');
      }else{
        const newProxy = new proxysModels({
          proxy: proxyF,
          idPackage: dataI._id
        })
        await newProxy.save();
      }
    }
    return res.status(200).send({
        success: true,
        message: 'data guardada en base de datos'
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
  const prsModels = await proxysModels.find().sort({ms: 1})
  if (prsModels) {
    return res.status(200).send({
      success: true,
      message: 'proxys encontrados',
      prsModelsLength: prsModels.length,
      prsModels
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando proxys'
    });
  }
}

const getProxysFree = async (req, res) => {
  const prsModels = await proxysModels.find({isFull: false})
  if (proxysModels) {
    return res.status(200).send({
      success: true,
      message: 'proxys encontrados',
      prsModelsLength: prsModels.length,
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
      acctslength: acctsModels.length,
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando cuentas'
    });
  }
}

const getAcctsFree = async (req, res) => {
  const acctsModels = await accountsModels.find({isUsed: false})
  if (acctsModels) {
    return res.status(200).send({
      success: true,
      message: 'Cuentas encotradas',
      acctsModels: acctsModels.length
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando cuentas'
    });
  }
}

const getKillBotsByModelAndRegisterBotC = async (req, res) => {
  const { nameModel, id_registerBotCompany } = req.body;
  const acctsModels = await killBotsModels.find({nameModel, idRegisterCompBotContainer: id_registerBotCompany})
  if (acctsModels) {
    return res.status(200).send({
      success: true,
      message: 'Killbots encotrados',
      acctsModelsLength: acctsModels.length,
      acctsModels: acctsModels
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando Killbots'
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

const reset = async (req, res) => {
  const dataProxys = await proxysModels.find()
  if (!dataProxys) {
    return res.status(400).send({
      success: false,
      message: 'Proxys no encontrados'
    });
  }
  const dataActs = await accountsModels.find()
  if (!dataActs) {
    return res.status(400).send({
      success: false,
      message: 'Cuentas no encontradas'
    });
  }
  try {
    for (let indexUno = 0; indexUno < dataProxys.length; indexUno++) {
      const dataProxy = await proxysModels.findOne({_id: dataProxys[indexUno]._id})
      dataProxy.isFull=false
      dataProxy.isFullAny=false
      dataProxy.Nusers=0
      dataProxy.NusersAny=0
      await dataProxy.save()
    }
    for (let indexDos = 0; indexDos < dataActs.length; indexDos++) {
      const dataAct = await accountsModels.findOne({_id: dataActs[indexDos]._id})
      dataAct.isUsed=false
      await dataAct.save()
    }
    await killBotsModels.deleteMany()
    await logLaunchModels.deleteMany()
    
    let url = `http://${process.env.MI_IP}:3020/api/tableLogLaunch/reset`;
    await axios(url)
    return res.status(200).send({
      success: true,
      message: 'bot reseteado correctamente'
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}

const mac = async (req, res) => {
  // exec('ipconfig/all',(err, stdout) => {
  //     if (err) {
  //         return console.log(err.message);
  //     }
  //     return console.log(stdout);
  // });
  console.log(req.connection.remoteAddress);
}

const msProxys = async (req, res) => {
  await testProxys()
  return res.status(200).send({
    success: true,
    message: 'Comprobando latencia de proxys'
  });
}

const getInfoBot = async (req, res) => {
  try {
    const acctsModels = await accountsModels.find()
    const acctsFreeModels = await accountsModels.find({isUsed: false})
    const dataP = await proxysModels.find()
    const dataPFree = await proxysModels.find({isFull: false})
    const dataK = await killBotsModels.find()
    const dataL = await logLaunchModels.find().sort({date: -1})
    return res.status(200).send({
      success: true,
      message: 'Info obtenida correctamente',
      acctsLength: acctsModels.length,
      acctsFreeLength: acctsFreeModels.length,
      proxyLength: dataP.length,
      proxyFreeLength: dataPFree.length,
      killbotsLength: dataK.length,
      ip: process.env.MI_IP,
      log: dataL,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}

const getStatsAdmin = async (req, res) => {
  const { id } = req.params
  if (id === ':id') {
      return res.status(400).send({
          success: false,
          message: "id es requerido"
      });
  }
  try {
    const dataL = await logLaunchModels.find({companyId: id}).sort({date: -1})
    return res.status(200).send({
      success: true,
      message: 'Info obtenida correctamente',
      logBotsByCompany: dataL
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}

const createIdPackProxy = async (req, res) => {
  const { id, platform, dateExpirated } = req.body;
  try {
    var currentDateInitial = new Date();
    var currentDateInitialD = new Date(dateExpirated);
    if (Date.parse(currentDateInitialD) <= Date.parse(currentDateInitial)) {
      return res.status(400).send({
        success: false,
        message: 'La fecha debe ser mayor a la de hoy'
      });
    }
    const dataI = await IdPackProxyModels.findOne({id})
    if (dataI) {
      return res.status(400).send({
        success: false,
        message: 'El paqueta ya existe'
      });
    }
    const newIdPackProxy = new IdPackProxyModels({
      id,
      platform,
      dateExpirated: currentDateInitialD
    })
    await newIdPackProxy.save();
    return res.status(200).send({
      success: true,
      message: 'Paqueta creado correctamente'
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}

const verifyIdPackProxy = async (req, res) => {
  const { id } = req.params;
  try {
    const dataI = await IdPackProxyModels.findOne({id})
    if (dataI) {
      return res.status(200).send({
        success: true,
        message: 'Busqueda exitosa',
        existe: true
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Busqueda exitosa',
        existe: false
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
}

module.exports = {createProxys, createIdPackProxy, verifyIdPackProxy, getInfoBot, createProxysString, getStatsAdmin, msProxys, mac, createAcct, getProxys, reset, getProxysFree, getAccts, createKillbots, getAcctsFree, getKillBotsByModelAndRegisterBotC};