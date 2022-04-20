const express = require("express");
const { createProxys, createAcct, createModels, getModels, getProxys, getAccts, createHeadquarter, createMonitor } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();

router.post("/proxys", uploadMiddleware.single("myfile"), createProxys);
router.post("/accts", uploadMiddleware.single("myfile"), createAcct);
router.post("/model", createModels);
router.post("/headquarter", createHeadquarter);
router.post("/monitor", createMonitor);
router.get("/getmodels", getModels);
router.get("/getproxys", getProxys);
router.get("/getaccts", getAccts);
 
module.exports = router; 