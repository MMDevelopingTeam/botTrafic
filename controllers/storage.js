const fs = require("fs");
const proxysModels = require('../models/proxys');
const accountsModels = require('../models/accounts');
const headquarterModels = require('../models/headquarter');
const killBotsModels = require('../models/killBots');
const monitorModels = require('../models/monitor');
const streamerModels = require('../models/streamer');
const { parseId } = require("../utils/parserId");

const createProxys = async (req, res) => {
  const { file } = req
  const { headquarter_id } = req.body
  if (!file) {
    return res.status(400).send({
        success: false,
        message: 'No hay archivo'
      });
  }
  try {
    const dataHeadquarter = await headquarterModels.findOne({_id: parseId(headquarter_id)})
    if (!dataHeadquarter) {
      return res.status(400).send({
        success: false,
        message: 'Headquarter no encontrada'
      });
    }
    
  } catch (error) {
    fs.unlinkSync(`storage/${file.filename}`)
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }

  const fileProxys = fs.readFileSync(`storage/${file.filename}`, 'UTF-8');
  const proxys = fileProxys.split(",")
  console.log("------ Guardando data del archivo en base de datos --------");
  console.log("------ no parar el proceso --------");
  try {
    for (let index = 0; index < proxys.length; index++) {
      const newProxy = new proxysModels({
        proxy: proxys[index],
        headquarter_id
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
  const { headquarter_id } = req.body
  if (!file) {
    return res.status(400).send({
        success: false,
        message: 'No hay archivo'
      });
  }

  try {
    const dataHeadquarter = await headquarterModels.findOne({_id: parseId(headquarter_id)})
    if (!dataHeadquarter) {
      return res.status(400).send({
        success: false,
        message: 'Headquarter no encontrada'
      });
    }
    
  } catch (error) {
    fs.unlinkSync(`storage/${file.filename}`)
    return res.status(400).send({
      success: false,
      message: error.message
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
        headquarter_id
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
const createHeadquarter = async (req, res ) => {
  const {name, address, number} = req.body;
  const dataHeadquarter = await headquarterModels.findOne({name})
  if (dataHeadquarter) {
    return res.status(400).send({
      success: false,
      message: 'La sede ya esta registrada'
    });
  }
  const newHeadquarter = new headquarterModels({
    name, address, number
  })
  const saveHeadquarter = await newHeadquarter.save();
  console.log(saveHeadquarter)
  return res.status(200).send({
    success: true,
    message: 'Sede creada correctamente'
  });
  
}
const createModels = async (req, res ) => {
  const {name_model} = req.body;
  const dataStramer = await streamerModels.findOne({name_model})
  if (dataStramer) {
    return res.status(400).send({
      success: false,
      message: 'La modelo ya esta registrada'
    });
  }
  const newModel = new streamerModels({
    name_model
  })
  const saveModel = await newModel.save();
  console.log(saveModel)
  return res.status(200).send({
    success: true,
    message: 'Modelo creada correctamente'
  });
  
}
const createMonitor = async (req, res ) => {
  const {username, name, password, headquarter_id, address, number, Shift} = req.body;
  const dataMonitor = await monitorModels.findOne({username})
  if (dataMonitor) {
    return res.status(400).send({
      success: false,
      message: 'El monitor ya esta registrado'
    });
  }
  const newMonitor = new monitorModels({
    username, name, password, headquarter_id, address, number, Shift
  })
  const saveMonitor = await newMonitor.save();
  console.log(saveMonitor)
  return res.status(200).send({
    success: true,
    message: 'Monitor creado correctamente'
  });
  
}

const getModels = async (req, res) => {
  const dataModels = await streamerModels.find()
  if (dataModels) {
    return res.status(200).send({
      success: true,
      message: 'Modelos encontradas',
      dataModels
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Error encontrando modelos'
    });
  }
}
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

module.exports = {createProxys, createAcct, createModels, createHeadquarter, getModels, getProxys, getAccts, createMonitor, createKillbots};