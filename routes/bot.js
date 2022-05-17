const express = require("express");
const router = express.Router();
const { getBot, killBot, vDos } = require("../controllers/bot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.post("/VDos", vDos)
router.get("/killBot", killBot)

module.exports = router