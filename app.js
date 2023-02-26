const express = require("express")
const initDB = require('./config/db')
const cors = require("cors")
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express()
const axios = require('axios');
const schedule = require('node-schedule');
const { msProxys, acctsOff, packsproxys } = require("./utils/msProxysBots");
// const cache = require('express-expeditious')({
//     namespace: 'expresscache',
//     defaultTtl: '10 minute',
//     statusCodeExpires: {
//       404: '5minutes',
//       500: 0
//     }
// })


require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    // console.log('addr: '+add);
    let url = `http://${process.env.IPSRV}:3020/api/botContainer/updateByIp/${process.env.MI_IP}`;
    axios.put(url, {isActive: true})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
})

// app.use(cache);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit: '50mb'}))
app.use(
    bodyParser.json({limit: '20mb'})
)
app.use(
    bodyParser.urlencoded({limit: '20mb', extended: true})
)

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})

const port = process.env.PORT || 3000

//Rutas
app.use("/api", require("./routes"))

initDB();

schedule.scheduleJob(`0 */${process.env.HORAS_TEST_PROX} * * *`, () => {
// schedule.scheduleJob(`*/${process.env.HORAS_TEST_PROX} * * * * *`, () => {
    console.log("Ejecuntando test latencia proxys");
    msProxys();
})
schedule.scheduleJob(`0 */${process.env.HORAS_TEST_ACTS} * * *`, () => {
// schedule.scheduleJob(`*/${process.env.HORAS_TEST_ACTS} * * * * *`, () => {
    console.log("Ejecuntando test cuentas off");
    acctsOff();
})
schedule.scheduleJob(`0 */${process.env.HORAS_TEST_PACKPROXYS} * * *`, () => {
//  schedule.scheduleJob(`*/${process.env.HORAS_TEST_PACKPROXYS} * * * * *`, () => {
    packsproxys();
})

app.listen(port, () => {
    console.log(`App lista por http://localhost:${port}`);
})
