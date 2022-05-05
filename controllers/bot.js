const { launchBot, launchBotDos } = require("../utils/launchBot");
const killBots = require('../models/killBots');
const accountsModels = require('../models/accounts');
const streamerModels = require('../models/streamer');
const logLaunchModels = require('../models/logLaunch');
const monitorModels = require('../models/monitor');
const proxysModels = require('../models/proxys');
const fs = require("fs");

var currentDate = new Date();

const getBot = async (req, res) => {
  const {name_model, name_monitor} = req.body

  const dataModel = await streamerModels.findOne({name_model})
  if (!dataModel) {
    return res.status(400).send({
      success: true,
      message: 'Modelo no encontrada en DB'
  });
  }
  const dataMonitor = await monitorModels.findOne({username: name_monitor})
  if (!dataMonitor) {
    return res.status(400).send({
      success: true,
      message: 'Monitor no encontrado en DB'
  });
  }

  const newLog = new logLaunchModels({
    date: currentDate,
    name_model,
    monitor: dataMonitor._id,
    headquarter: dataMonitor.headquarter_id,
    numberBots: 10
  })
  await newLog.save();
  console.log("log registrado");

  for (let indexAcc = 1; indexAcc < 11; indexAcc++) {
    const dataAcct = await accountsModels.findOne({isUsed: false})
    if (!dataAcct) {
      console.log("No hay cuentas libres");
      break;
    }
    const dataProxy = await proxysModels.findOne({headquarter_id: dataMonitor.headquarter_id, isFull: false})
    dataProxy.Nusers++
    if (dataProxy.Nusers === 10) {
      dataProxy.isFull = true
    }
    await dataProxy.save();
    if (dataProxy && dataProxy.isDown === false) {
      setTimeout(() => {
        launchBot(dataProxy.proxy, dataAcct.username, dataAcct.password, dataAcct._id, dataModel.name_model)
      }, 16000*indexAcc);
    } else{
      break;
    }
    dataAcct.isUsed = true
    await dataAcct.save();
  }

  return res.status(200).send({
      success: true,
      message: 'bot corriendo'
  });
};

const killBot = async (req, res) => {
  
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 1; i < 1e7; i++) { 
      console.log(new Date().getTime() - start);
      if ((new Date().getTime() - start) > milliseconds) {
       break;
      }
    }
   }
   
   function demo() {
     sleep(200);
   }
   
   
  console.clear()
  const dataKills = await killBots.find();
  if (dataKills.length === 0) {
   return res.status(400).send({
     success: false,
     message: 'kills no encontrados'
   });
  }
  
  for (let index = 0; index < dataKills.length; index++) {
    const dataAcct = await accountsModels.findOne({_id: dataKills[index].acct_id});
    if (!dataAcct) {
      console.log("cuenta no encotrada");
      break;
    }
    dataAcct.isUsed=false;
    await dataAcct.save();
    const dataProxy = await proxysModels.findOne({proxy: dataKills[index].proxy})
    if (!dataProxy) {
      break;
    }
    if (dataProxy.Nusers < 10) {
      dataProxy.isFull=false
    }
    dataProxy.Nusers--
    await dataProxy.save();
    await killBots.deleteOne({_id: dataKills[index]._id});
    try {
      demo();
      process.kill(dataKills[index].NmrKill);
      console.log("kill bot");
    } catch (error) {
      console.log(error.message);
    }
  }
  console.clear()
  console.log("killbots eliminados")
  return res.status(200).send({
      success: true,
      message: 'bot killer'
  });
};

module.exports = {getBot, killBot};