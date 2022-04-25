const express = require("express");
const { createAccount, getAccounts, createProxy, createAccounts } = require("../controllers/accounts");
const router = express.Router();

router.post("/", createAccount)
router.post("/accoutsbot", createAccounts)
router.post("/proxy", createProxy)
router.get("/:id", getAccounts)

module.exports = router