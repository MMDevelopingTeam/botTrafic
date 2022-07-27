const express = require("express");
const router = express.Router();
const { getBot, killBot, getBotAny, status, killBotAny, getBotMixed, killBotMixed } = require("../controllers/bot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.post("/killBot", validateBot, killBot)
router.post("/getBotAny", validateBot, getBotAny)
router.post("/killBotAny", validateBot, killBotAny)
router.post("/getBotMixed", validateBot, getBotMixed)
router.post("/killBotMixed", validateBot, killBotMixed)
router.get("/", status)

module.exports = router