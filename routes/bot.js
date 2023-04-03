const express = require("express");
const router = express.Router();
const { getBot, killBot, getBotAny, status, killBotAny, getBotMixed, killBotMixed, botDebugControl, VerifyBotskillBot, BotFollowers, killBotFollowers } = require("../controllers/bot");
const { botDebug } = require("../utils/launchBot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.post("/killBot", validateBot, killBot)
router.post("/getBotAny", validateBot, getBotAny)
router.post("/botDebug", botDebugControl)
router.post("/killBotAny", validateBot, killBotAny)
router.post("/getBotMixed", validateBot, getBotMixed)
router.post("/killBotMixed", validateBot, killBotMixed)
router.get("/VerifyBotskillBot", VerifyBotskillBot)
router.get("/", status)

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// bot followers //////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/BotFollowers", validateBot, BotFollowers)
router.post("/killBotFollowers", validateBot, killBotFollowers)

module.exports = router