const express = require("express");
const { createAccounts, getAccounts, createProxys } = require("../controllers/accounts");
const router = express.Router();

router.post("/", createAccounts)
router.post("/proxy", createProxys)
router.get("/:id", getAccounts)

module.exports = router