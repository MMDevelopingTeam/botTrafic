const axios = require('axios');
const {testProxys} = require('./stateProxys');
const proxysModels = require('../models/proxys');
const accountsModels = require('../models/accounts');
const idPackProxyModels = require('../models/idPackProxy');

const msProxys = async () => {
    try {
        await testProxys();
        const dataP = await proxysModels.find({isDown: true});
        if (dataP.length > 0) {
            let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
            const body = {
                "description": `Proxys caidos del bot container con ip ${process.env.MI_IP}`,
                "proxys": dataP
            }
            const dataA = await axios.post(url, body)
            if (dataA.data) {
                return console.log(dataA.data.message);
            }
        }
    } catch (error) {
        return console.log(error);
    }
}

const acctsOff = async () => {
    try {
        const dataA = await accountsModels.find({isWorking: false});
        if (dataA.length > 0) {
            let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
            const body = {
                "description": `Cuentas en falló del bot container con ip ${process.env.MI_IP}`,
                "cuentas": dataA,
                "note": "cuentas bloqueadas o baneadas"
            }
            const dataSend = await axios.post(url, body)
            if (dataSend.data) {
                return console.log(dataSend.data.message);
            }
        }
    } catch (error) {
        return console.log(error);
    }
}

const packsproxys = async () => {
    try {
        const dataA = await idPackProxyModels.find();
        for (let index = 0; index < dataA.length; index++) {
            const currentDateInitial = new Date();
            const currentDateInitialD = new Date(dataA[index].dateExpirated);
            const fechaExOne = new Date(dataA[index].dateExpirated);
            const fechaExtwo = new Date(dataA[index].dateExpirated);
            fechaExOne.setDate(fechaExOne.getDate()-1)
            fechaExtwo.setDate(fechaExtwo.getDate()-2)

            let dayHoy = currentDateInitial.getDate()
            let mesHoy = currentDateInitial.getMonth()

            let dayFalta1 = fechaExOne.getDate()
            let mesFalta1 = fechaExOne.getMonth()

            let dayFalta2 = fechaExtwo.getDate()
            let mesFalta2 = fechaExtwo.getMonth()

            let dayfechaEx = currentDateInitialD.getDate()
            let mesfechaEx = currentDateInitialD.getMonth()
            if (dayHoy === dayFalta1 && mesHoy === mesFalta1) {

                let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
                const body = {
                    "description": `Paquete de proxys con id ${dataA[index].id} de la plataforma ${dataA[index].platform} en el bot con ip ${process.env.MI_IP} caducada en 1 dia`,
                    "paquete": dataA[index],
                    "note": "Paquete de proxys caducado"
                }
                const dataSend = await axios.post(url, body)
                if (dataSend.data) {
                    return console.log(dataSend.data.message);
                }
            }
            if (dayHoy === dayFalta2 && mesHoy === mesFalta2) {
                let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
                const body = {
                    "description": `Paquete de proxys con id ${dataA[index].id} de la plataforma ${dataA[index].platform} en el bot con ip ${process.env.MI_IP} caducada en 2 dia`,
                    "paquete": dataA[index],
                    "note": "Paquete de proxys caducado"
                }
                const dataSend = await axios.post(url, body)
                if (dataSend.data) {
                    return console.log(dataSend.data.message);
                }
            }
            if (dayHoy === dayfechaEx && mesHoy === mesfechaEx) {
                let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
                const body = {
                    "description": `Paquete de proxys con id ${dataA[index].id} de la plataforma ${dataA[index].platform} en el bot con ip ${process.env.MI_IP} caducada hoy`,
                    "paquete": dataA[index],
                    "note": "Paquete de proxys caducado"
                }
                const dataSend = await axios.post(url, body)
                if (dataSend.data) {
                    return console.log(dataSend.data.message);
                }
            }
            if (Date.parse(currentDateInitialD) <= Date.parse(currentDateInitial)) {
                let url = `http://${process.env.IPSRV}:3020/api/sockets/sendMessageForSuperUserByBot/${process.env.MI_IP}`;
                const body = {
                    "description": `Paquete de proxys caducado con id ${dataA[index].id} de la plataforma ${dataA[index].platform} en el bot con ip ${process.env.MI_IP}`,
                    "paquete": dataA[index],
                    "note": "Paquete de proxys caducado"
                }
                const dataSend = await axios.post(url, body)
                if (dataSend.data) {
                    return console.log(dataSend.data.message);
                }
            }
        }
    } catch (error) {
        return console.log(error);
    }
}

module.exports = {acctsOff, msProxys, packsproxys}