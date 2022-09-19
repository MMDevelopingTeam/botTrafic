const express = require("express");
const { createProxys, createAcct, getProxys, getAccts, createKillbots, getAcctsFree, getProxysFree, createProxysString, getKillBotsByModelAndRegisterBotC, reset, mac, msProxys, getInfoBot, getStatsAdmin } = require("../controllers/storage");
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
router.get("/mac", mac);
router.get("/msProxys", msProxys);
router.get("/getInfoBot", getInfoBot);
router.get("/getStatsAdmin/:id", getStatsAdmin);
router.post("/reset", reset);
 
module.exports = router; 