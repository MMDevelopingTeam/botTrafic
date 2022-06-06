const express = require("express");
const { createAccount, createProxy, createAccounts, isFullFalse } = require("../controllers/accounts");
const router = express.Router();

router.post("/", createAccount)
router.post("/accoutsbot", createAccounts)
router.post("/proxy", createProxy)
router.get("/isFullFalse", isFullFalse)

module.exports = router