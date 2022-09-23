const axios = require('axios');
const {testProxys} = require('./stateProxys');
const proxysModels = require('../models/proxys');

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

module.exports = {msProxys}