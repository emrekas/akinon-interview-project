const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    query: {
        from: String,
        to: String,
        amount: Number,
    },
    result: Number,
    createdAt: Date
},{ versionKey: false });

module.exports = mongoose.model('transaction', transactionSchema);
