const express = require("express");
const { createProxys, createAcct, getProxys, getAccts, createKillbots, getAcctsFree, getProxysFree, createProxysString, getKillBotsByModelAndRegisterBotC, reset, mac, msProxys, getInfoBot, getStatsAdmin, createIdPackProxy, verifyIdPackProxy } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const { cacheInit } = require("../middleware/cache");
const { validateStorageKillBot, getKillBotsValidator, getCreateProxysString } = require("../validators/storage");
const router = express.Router();

router.post("/proxys", uploadMiddleware.single("myfile"), createProxys);
router.post("/proxysString", getCreateProxysString, createProxysString);
router.post("/accts", uploadMiddleware.single("myfile"), createAcct);
router.post("/killbots", validateStorageKillBot, createKillbots);
router.post("/createIdPackProxy", createIdPackProxy);
router.get("/getAcctsFree", getAcctsFree);
router.post("/getKillBotsByModel", getKillBotsValidator, getKillBotsByModelAndRegisterBotC);
router.get("/getproxys", cacheInit, getProxys);
router.get("/getproxysFree", getProxysFree);
router.get("/getaccts", getAccts);
router.get("/mac", mac);
router.get("/msProxys", msProxys);
router.get("/getInfoBot", cacheInit, getInfoBot);
router.get("/verifyIdPackProxy/:id", verifyIdPackProxy);
router.get("/getStatsAdmin/:id", cacheInit, getStatsAdmin);
router.post("/reset", reset);
 
module.exports = router; 