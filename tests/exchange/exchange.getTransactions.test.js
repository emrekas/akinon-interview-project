const app = require("../../index");
const supertest = require("supertest");
const mockingoose = require('mockingoose');
const transactionModel = require("../../models/transaction.model");
const {
    getTransactionsByDateRange
} = require('../../services/exchange.service');


describe("Test get-latest endpoint", () => {
    describe("All parameters are correct", () => {
        test("Should response 200 and status true", async () => {
            await supertest(app)
                .get("/get-transactions?createdAtStart=2021-08-11&createdAtEnd=2022-08-10")
                .expect(200)
                .then((response) => {
                    expect(response.body.status).toBe(true)
                })
        })
    });
    describe("Parameters are not correct", () => {
        test("Should response 400 and status false, when there's no parameters", async () => {
            await supertest(app)
                .get("/get-transactions")
                .expect(400)
                .then((response) => {
                    expect(response.body.status).toBe(false)
                })
        })

        test("Should response 400 and status false, when createdAtStart, createdAtEnd and transactionId sends at the same time", async () => {
            await supertest(app)
                .get("/get-transactions?createdAtStart=2021-08-11&createdAtEnd=2022-08-10&transactionId=62f8d2f0a44b6fcb0515d5bd")
                .expect(400)
                .then((response) => {
                    expect(response.body.status).toBe(false)
                })
        })
    });
});

describe("Test get-latest service", () => {
    test("getTransactionsByDateRange", async () => {
        mockingoose(transactionModel).toReturn([{
            query: {"from": "TRY", "to": "USD", "amount": 5},
            _id: "62f8d2f0a44b6fcb0515d5bd",
            result: 0.278765,
            createdAt: "2022-08-14T10:48:16.216Z"
        }]);
        const results = await getTransactionsByDateRange("2022-08-13", "2022-08-17");
        expect(results).toBe(results);
    })
});
