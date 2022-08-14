const methods = require("../helpers/methods")
const {getTransactionsById, getLatest, convert, getTransactionsByDateRange} = require("../services/exchange.service");


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getLatest = async (req, res, next) => {
    const {sourceCurrency, targetCurrencies} = req.query;
    res.send(methods.successResponse(await getLatest(sourceCurrency, targetCurrencies)));
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.convert = async (req, res) => {
    const {from, to, amount} = req.query;
    try {
        res.send(methods.successResponse(await convert(from, to, amount)));
    } catch (e) {
        res.send(methods.failResponse(e.message))
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTransactions = async (req, res) => {
    const {transactionId, createdAtStart, createdAtEnd} = req.query;
    if (transactionId)
    {
        res.send(
            methods.successResponse(await getTransactionsById(transactionId))
        )
    }

    res.send(methods.successResponse(await getTransactionsByDateRange(createdAtStart, createdAtEnd)));
}
