const {query, oneOf} = require("express-validator")

/**
 *
 * @type {ValidationChain[]}
 */
exports.getLatestValidator = [
    query(["sourceCurrency", "targetCurrencies"]).exists().withMessage("sourceCurrency and targetCurrencies are required!"),
    query(["targetCurrencies"]).matches(/^[A-Za-z]{3}(?:,[A-Za-z]{3})*?$/gm).withMessage("Currency Codes must be three letters. Example [EUR,USD,GBP,...]")
]
exports.convertValidator = [
    query(["to", "from", "amount"])
        .notEmpty()
        .withMessage("From, to, amount cannot be null or empty"),
    query(["amount"])
        .isFloat({gt: 0})
        .withMessage("Amount must be float and greater than 0"),
    query(["from", "to"]).isAlpha().withMessage("Currency Codes must be Alphabetic characters. Example [EUR,USD,GBP,...]"),
    query(["from", "to"]).isLength({
        min: 3,
        max: 3
    }).withMessage("Currency Codes must be three letters. Example [EUR,USD,GBP,...]")
]
exports.getTransactionsValidator = [
    oneOf([
        query(["createdAtStart", "createdAtEnd"])
            .isEmpty()
            .withMessage("One of the parameters must be (transactionId) or (createdAtStart, createdAtEnd)"),
        query(["transactionId"])
            .isEmpty()
            .withMessage("One of the parameters must be (transactionId) or (createdAtStart, createdAtEnd)")
    ]),


    query(["createdAtStart", "createdAtEnd"])
        .if(query(["transactionId"]).isEmpty())
        .bail()
        .notEmpty().withMessage("CreatedAtStart and CreatedAtEnd cannot be null or empty if transactionId is empty")
        .isDate().withMessage("CreatedAtStart and CreatedAtEnd must be date"),

    query(["transactionId"])
        .if(query(["createdAtStart", "createdAtEnd"]).isEmpty())
        .bail()
        .notEmpty().withMessage("transactionId cannot be null or empty if createdAtStart and createdAtEnd is empty")
        .isMongoId().withMessage("transactionId must be valid id"),

]
