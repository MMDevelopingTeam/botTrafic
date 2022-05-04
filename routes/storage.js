const express = require("express");
const { createProxys, createAcct, createModels, getModels, getProxys, getAccts, createHeadquarter, createMonitor, createKillbots } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const { validateStorageProxys, validateStorageModel, validateStorageHeadquarter, validateStorageKillBot, validateStorageMonitor } = require("../validators/storage");
const router = express.Router();

router.post("/proxys", uploadMiddleware.single("myfile"), validateStorageProxys, createProxys);
router.post("/accts", uploadMiddleware.single("myfile"), createAcct);
router.post("/model", validateStorageModel, createModels);
router.post("/headquarter", validateStorageHeadquarter, createHeadquarter);
router.post("/killbots", validateStorageKillBot, createKillbots);
router.post("/monitor", validateStorageMonitor, createMonitor);
router.get("/getmodels", getModels);
router.get("/getproxys", getProxys);
router.get("/getaccts", getAccts);
 
module.exports = router; 