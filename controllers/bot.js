const { launchBotVDos, vDosBot } = require("../utils/launchBot");
const killBots = require('../models/killBots');
const accountsModels = require('../models/accounts');
const logLaunchModels = require('../models/logLaunch');
const proxysModels = require('../models/proxys');
const jwt = require('jsonwebtoken');

var currentDate = new Date();

const getBot = async (req, res) => {
  const {token} = req.body
  let dataLaunch = null;
  jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
      if (err) {
          return res.status(403).send({
              success: false,
              message: "Error en el token"
          });
      }else{
          // console.log(authData); 
          dataLaunch=authData
      }
  })

  const newLog = new logLaunchModels({
    date: currentDate,
    name_model: dataLaunch.nameModel,
    userId: dataLaunch.userId,
    headquarterId: dataLaunch.headquarter,
    companyId: dataLaunch.company,
    numberBots: dataLaunch.nBots
  })
  await newLog.save();
  console.log("log registrado");

  for (let indexAcc = 1; indexAcc < (dataLaunch.nBots+1); indexAcc++) {
    const dataAcct = await accountsModels.findOne({isUsed: false})
    if (!dataAcct) {
      res.status(400).send({
        success: false,
        message: 'No hay cuentas libres'
      });
      break;
    }
    const dataProxy = await proxysModels.findOne({isFull: false})
    if (!dataProxy) {
      res.status(400).send({
        success: false,
        message: 'No hay proxys libres'
      });
      break;
    }
    dataProxy.Nusers++
    if (dataProxy.Nusers === 10) {
      dataProxy.isFull = true
    }
    await dataProxy.save();
    if (dataProxy && dataProxy.isDown === false) {
      setTimeout(() => {
        // launchBot(dataProxy.proxy, dataAcct.username, dataAcct.password, dataAcct._id, dataModel.name_model)
        // launchBot(dataProxy.proxy, dataAcct.username, dataAcct.password, dataAcct._id, name_model)
        launchBotVDos(dataProxy.proxy, dataAcct._id, dataLaunch.nameModel, dataAcct.username, dataAcct.password, indexAcc, dataLaunch.idRegisterCompBotContainer)
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
  
  const {token} = req.body
  let dataKillbot = null;
  try {
    jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: "Error en el token"
            });
        }else{
            // console.log(authData); 
            dataKillbot=authData
        }
    })
  } catch (error) {
    return res.status(403).send({
        success: false,
        message: "JWT invalido"
    });
  }

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
  const dataKills = await killBots.find({nameModel: dataKillbot.nameModel});
  if (dataKills.length === 0) {
   return res.status(400).send({
     success: false,
     message: 'kills no encontrados'
   });
  }
  
  for (let index = 0; index < dataKillbot.nBots; index++) {
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

const getBotAny = async (req, res) => {

  const {token} = req.body
  let dataLaunch = null;
  jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
      if (err) {
          return res.status(403).send({
              success: false,
              message: "Error en el token"
          });
      }else{
          // console.log(authData); 
          dataLaunch=authData
      }
  })

  const newLog = new logLaunchModels({
    date: currentDate,
    name_model: dataLaunch.nameModel,
    userId: dataLaunch.userId,
    headquarterId: dataLaunch.headquarter,
    companyId: dataLaunch.company,
    numberBots: dataLaunch.nBots
  })
  await newLog.save();
  console.log("log registrado");

  for (let indexAcc = 1; indexAcc < (dataLaunch.nBots+1); indexAcc++) {
    const dataProxy = await proxysModels.findOne({isFullAny: false})
    if (!dataProxy) {
      res.status(400).send({
        success: false,
        message: 'No hay proxys libres'
      });
      break;
    }
    dataProxy.NusersAny++
    if (dataProxy.NusersAny === 30) {
      dataProxy.isFullAny = true
    }
    await dataProxy.save();
    if (dataProxy && dataProxy.isDown === false) {
      setTimeout(() => {
        vDosBot(dataLaunch.nameModel, dataProxy.proxy, dataLaunch.idRegisterCompBotContainer)
      }, 15000*indexAcc);
    } else{
      break;
    }
  }

  return res.status(200).send({
      success: true,
      message: 'bot corriendo'
  });
}

const killBotAny = async (req, res) => {
  const {token} = req.body
  let dataKillbot = null;
  try {
    jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: "Error en el token"
            });
        }else{
            // console.log(authData); 
            dataKillbot=authData
        }
    })
  } catch (error) {
    return res.status(403).send({
        success: false,
        message: "JWT invalido"
    });
  }

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
  const dataKills = await killBots.find({nameModel: dataKillbot.nameModel, idRegisterCompBotContainer: dataKillbot.idRegisterCompBotContainer});
  if (dataKills.length === 0) {
   return res.status(400).send({
     success: false,
     message: 'kills no encontrados'
   });
  }
  
  for (let index = 0; index < dataKillbot.nBots; index++) {
    const dataProxy = await proxysModels.findOne({proxy: dataKills[index].proxy})
    if (!dataProxy) {
      break;
    }
    if (dataProxy.NusersAny < 30) {
      dataProxy.isFullAny=false
    }
    dataProxy.NusersAny--
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

const getBotMixed = async (req, res) => {
  const {token} = req.body
  let dataLaunch = null;
  jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
      if (err) {
          return res.status(403).send({
              success: false,
              message: "Error en el token"
          });
      }else{
          // console.log(authData); 
          dataLaunch=authData
      }
  })

  const newLog = new logLaunchModels({
    date: currentDate,
    name_model: dataLaunch.nameModel,
    userId: dataLaunch.userId,
    headquarterId: dataLaunch.headquarter,
    companyId: dataLaunch.company,
    numberBots: dataLaunch.nBots
  })
  let iInicial = dataLaunch.nBots*3
  let iFinal = Number(iInicial)
  console.log(iFinal);

  await newLog.save();
  console.log("log registrado");

  for (let indexAcc = 1; indexAcc < (dataLaunch.nBots+1); indexAcc++) {
    const dataAcct = await accountsModels.findOne({isUsed: false})
    if (!dataAcct) {
      res.status(400).send({
        success: false,
        message: 'No hay cuentas libres'
      });
      break;
    }
    const dataProxy = await proxysModels.findOne({isFull: false})
    if (!dataProxy) {
      res.status(400).send({
        success: false,
        message: 'No hay proxys libres'
      });
      break;
    }
    dataProxy.Nusers++
    if (dataProxy.Nusers === 10) {
      dataProxy.isFull = true
    }
    await dataProxy.save();
    if (dataProxy && dataProxy.isDown === false) {
      setTimeout(() => {
        // launchBot(dataProxy.proxy, dataAcct.username, dataAcct.password, dataAcct._id, dataModel.name_model)
        // launchBot(dataProxy.proxy, dataAcct.username, dataAcct.password, dataAcct._id, name_model)
        launchBotVDos(dataProxy.proxy, dataAcct._id, dataLaunch.nameModel, dataAcct.username, dataAcct.password, indexAcc, dataLaunch.idRegisterCompBotContainer)
      }, 15000*indexAcc);
    } else{
      break;
    }
    dataAcct.isUsed = true
    await dataAcct.save();
  }

  for (let indexAcc = 1; indexAcc < (iFinal+1); indexAcc++) {
    const dataProxy = await proxysModels.findOne({isFullAny: false})
    if (!dataProxy) {
      res.status(400).send({
        success: false,
        message: 'No hay proxys libres'
      });
      break;
    }
    dataProxy.NusersAny++
    if (dataProxy.NusersAny === 30) {
      dataProxy.isFullAny = true
    }
    await dataProxy.save();
    if (dataProxy && dataProxy.isDown === false) {
      setTimeout(() => {
        vDosBot(dataLaunch.nameModel, dataProxy.proxy, dataLaunch.idRegisterCompBotContainer)
      }, 15000*indexAcc);
    } else{
      break;
    }
  }

  return res.status(200).send({
      success: true,
      message: 'bot corriendo'
  });
}

const killBotMixed = async (req, res) => {
  const {token} = req.body
  let dataKillbot = null;
  try {
    jwt.verify(token, process.env.KEY_JWT, (err, authData) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: "Error en el token"
            });
        }else{
            // console.log(authData); 
            dataKillbot=authData
        }
    })
  } catch (error) {
    return res.status(403).send({
        success: false,
        message: "JWT invalido"
    });
  }

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
  const dataKills = await killBots.find({nameModel: dataKillbot.nameModel, idRegisterCompBotContainer: dataKillbot.idRegisterCompBotContainer});
  if (dataKills.length === 0) {
   return res.status(400).send({
     success: false,
     message: 'kills no encontrados'
   });
  }
  if (dataKills.length < dataKillbot.nBots) {
    return res.status(400).send({
      success: false,
      message: 'No existen mas killbots'
    });
   }
  
  let i = dataKillbot.nBots*3

  for (let index = 0; index < i; index++) {
    if (dataKills[index].type === "actsLogued") {
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
    } else{
      const dataProxy = await proxysModels.findOne({proxy: dataKills[index].proxy})
      if (!dataProxy) {
        break;
      }
      if (dataProxy.NusersAny < 30) {
        dataProxy.isFullAny=false
      }
      dataProxy.NusersAny--
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
  }

  console.clear()
  console.log("killbots eliminados")
  return res.status(200).send({
      success: true,
      message: 'bot killer'
  });
};

const status = async (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Bot funcionando correctamente"
});
}

module.exports = {getBot, killBot, getBotAny, killBotAny, getBotMixed, killBotMixed, status};