const express = require("express");
const router = express.Router();
const { getBot, killBot, getBotAny, status } = require("../controllers/bot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.post("/getBotAny", getBotAny)
router.post("/killBot", validateBot, killBot)
router.get("/", status)

module.exports = router