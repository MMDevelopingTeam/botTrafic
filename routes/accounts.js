const express = require("express");
const { createAccount, getAccounts, createProxy, createAccounts, isFullFalse } = require("../controllers/accounts");
const { validateCreateAccts, validateAcctsIsFull } = require("../validators/accounts");
const router = express.Router();

router.post("/", createAccount)
router.post("/accoutsbot", validateCreateAccts, createAccounts)
router.post("/proxy", createProxy)
router.get("/isFullFalse", validateAcctsIsFull, isFullFalse)
router.get("/:id", getAccounts)

module.exports = router