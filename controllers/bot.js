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
      }, 15000*indexAcc);
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
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }
   
   function demo() {
     console.log('Taking a break...');
     sleep(5000);
   }
   
   const dataKills = await killBots.find();
   
   if (dataKills) {
     for (let index = 0; index < dataKills.length; index++) {
      demo();
      
      const dataAcct = await accountsModels.findOne({_id: dataKills[index].acct_id});
      if (!dataAcct) {
        break;
      }
      accountsModels.updateOne(
        { _id: dataKills[index].acct_id},
        { $set: {"isUsed": false}},
        (err, doc) => {
          if (err) return console.log("error actualizando cuenta");
          if (doc !== null) {
            console.log("estado de cuenta cambiado")
          }
        }
      );
      try {
        process.kill(dataKills[index].NmrKill);
        const dataProxy = await proxysModels.findOne({proxy: dataKills[index].proxy})
        if (!dataProxy) {
          break;
        }
        if (dataProxy.Nusers < 10) {
          dataProxy.isFull=false
        }
        dataProxy.Nusers--
        await dataProxy.save();
      } catch (error) {
        console.log(error.message);
      }
      const deleteKill = await killBots.deleteOne({_id: dataKills[index]._id});
      console.log(deleteKill);
    }
    return res.status(200).send({
        success: true,
        message: 'bot killer'
      });
  }


  // const {browserPID} = req.body;
  // process.kill(browserPID);
};

const logLaunch = async (req, res) => {
  
}

module.exports = {getBot, killBot};