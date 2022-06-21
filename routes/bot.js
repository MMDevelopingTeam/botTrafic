const express = require("express");
const router = express.Router();
const { getBot, killBot, vDos, killByNickname, status } = require("../controllers/bot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.post("/VDos", vDos)
router.post("/killBot", validateBot, killBot)
router.get("/", status)

module.exports = router