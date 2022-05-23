const express = require("express");
const { createProxys, createAcct, getProxys, getAccts, createKillbots } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const { validateStorageKillBot } = require("../validators/storage");
const router = express.Router();

router.post("/proxys", uploadMiddleware.single("myfile"), createProxys);
router.post("/accts", uploadMiddleware.single("myfile"), createAcct);
router.post("/killbots", validateStorageKillBot, createKillbots);
router.get("/getproxys", getProxys);
router.get("/getaccts", getAccts);
 
module.exports = router; 