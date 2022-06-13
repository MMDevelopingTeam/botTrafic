const express = require("express")
const initDB = require('./config/db')
const cors = require("cors")
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express()
const axios = require('axios');


require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    // console.log('addr: '+add);
    let url = `http://${process.env.IPSRV}:3020/api/botContainer/updateByIp/${add}`;
    axios.put(url, {isActive: true})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
})

app.use(cors())
app.use(express.json())
app.use(
    bodyParser.json({limit: '20mb'})
)
app.use(
    bodyParser.urlencoded({limit: '20mb', extended: true})
)

const port = process.env.PORT || 3000

//Rutas
app.use("/api", require("./routes"))

initDB();

app.listen(port, () => {
    console.log(`App lista por http://localhost:${port}`);
})
