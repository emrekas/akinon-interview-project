const app = require("../../index")
const supertest = require("supertest")
const axios = require("axios");
const {getLatest, convert} = require("../../services/exchange.service");

jest.mock('axios');

const apiResp = {
    "success": true,
    "query": {"from": "TRY", "to": "USD", "amount": 5},
    "info": {"timestamp": 1660469103, "rate": 0.055753},
    "date": "2022-08-14",
    "result": 0.278765
}

describe("Test convert endpoint", () => {
    describe("All parameters are correct", () => {
        test("Should response 200, status true", async () => {
            axios.get.mockResolvedValueOnce({data: apiResp});

            await supertest(app)
                .get("/get-latest?sourceCurrency=TRY&targetCurrencies=EUR,USD")
                .expect(200)
                .then((response) => {
                    expect(response.body.status).toBe(true)
                })
        })
    });
})

describe("Test convert service", () => {
    test("Should response 200, status true", async () => {
        const apiResp = {
            "success": true,
            "query": {"from": "TRY", "to": "USD", "amount": 5},
            "info": {"timestamp": 1660469103, "rate": 0.055753},
            "date": "2022-08-14",
            "result": 0.278765
        };
        axios.get.mockResolvedValueOnce({data: apiResp});

        const result = await convert("TRY", "USD", 5);
        expect(result).toBe(apiResp)
    })

    test("aaa", async () => {
        axios.get.mockRejectedValueOnce(new Error('Async error message'));

        expect(async () => {
            await convert("TRY", "USD", 5);
        }).rejects.toThrow(new Error('Unexpected error occurred contact with owner'));
    })
})


