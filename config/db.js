const mongoose = require('mongoose');

const DB_URL =  `mongodb://localhost:27017/botTraficDataBase`

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URL,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) {
                    console.log("error en DB");
                }else{
                    console.log("DB conectada correctamente")
                }
            }
        )
    }

    connect();
}