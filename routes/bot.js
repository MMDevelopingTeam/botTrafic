const express = require("express");
const router = express.Router();
const { getBot, killBot } = require("../controllers/bot");
const { validateBot } = require("../validators/bot");

router.post("/", validateBot, getBot)
router.get("/killBot", killBot)

module.exports = router