const express = require("express");
const { createAccount, createProxy, createAccounts, isFullFalse, deleteActsSuperUser } = require("../controllers/accounts");
const router = express.Router();

router.post("/", createAccount)
router.post("/accoutsbot", createAccounts)
router.post("/proxy", createProxy)
router.get("/isFullFalse", isFullFalse)
router.post("/deleteActsSuperUser", deleteActsSuperUser)

module.exports = router