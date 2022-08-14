const exchangeModel = require('../models/transaction.model');
const axios = require('axios');

axios.defaults.headers.common['apiKey'] = process.env.API_KEY || "ZRGzTJ3ZnFL8voovL7zE9ZpP4sWpFpWk";
const baseAddress = process.env.API_BASE_ADDRESS || "https://api.apilayer.com/exchangerates_data";

const createTransaction = async (query, result) => await exchangeModel.create({
    query,
    result,
    createdAt: new Date()
});

const getLatest = async (sourceCurrency, targetCurrencies) => {
    const response = await axios.get(`${baseAddress}/latest?base=${sourceCurrency}&symbols=${targetCurrencies}`);
    return response.data;
}

const convert = async (from, to, amount) => {
    try {
        const response = await axios.get(`${baseAddress}/convert?from=${from}&to=${to}&amount=${amount}`);

        if (response && response.status === 200) {
            const {query, result} = response.data;
            await createTransaction(query, result);
        }
        return response?.data;
    } catch (e) {
        throw Error("Unexpected error occurred contact with owner")
    }
}

const getTransactionsById = async (transactionId) => await exchangeModel.findById(transactionId);

const getTransactionsByDateRange = async (createdAtStart, createdAtEnd) => {
    const result = await exchangeModel.find({
        createdAt: {
            $gte: createdAtStart,
            $lt: createdAtEnd
        }
    });
    return result;
}

module.exports = {
    getLatest,
    convert,
    getTransactionsById,
    getTransactionsByDateRange
}
