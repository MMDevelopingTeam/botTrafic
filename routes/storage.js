const express = require("express");
const { createProxys, createAcct, getProxys, getAccts, createKillbots, getAcctsFree, getProxysFree, createProxysString, getKillBotsByModelAndRegisterBotC, reset } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const { validateStorageKillBot, getKillBotsValidator, getCreateProxysString } = require("../validators/storage");
const router = express.Router();

router.post("/proxys", uploadMiddleware.single("myfile"), createProxys);
router.post("/proxysString", getCreateProxysString, createProxysString);
router.post("/accts", uploadMiddleware.single("myfile"), createAcct);
router.post("/killbots", validateStorageKillBot, createKillbots);
router.get("/getAcctsFree", getAcctsFree);
router.post("/getKillBotsByModel", getKillBotsValidator, getKillBotsByModelAndRegisterBotC);
router.get("/getproxys", getProxys);
router.get("/getproxysFree", getProxysFree);
router.get("/getaccts", getAccts);
router.post("/reset", reset);
 
module.exports = router; 