const express = require("express");
const router = express.Router();
const { getBot, killBot } = require("../controllers/bot");

router.post("/", getBot)
router.get("/killBot", killBot)

module.exports = router