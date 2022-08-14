const express = require("express")
const router = express.Router()

const exchangeController = require("../controllers/exchange.controller")
const {validate} = require("../middlewares/validators/wrapper.validator")
const {
    getLatestValidator,
    convertValidator,
    getTransactionsValidator
} = require("../middlewares/validators/exchange.validations")

router.get("/get-latest", validate(getLatestValidator), exchangeController.getLatest)
router.get("/convert", validate(convertValidator), exchangeController.convert)
router.get("/get-transactions", validate(getTransactionsValidator), exchangeController.getTransactions)

module.exports = router
