const axios = require('axios');
const {getLatest} = require('../../services/exchange.service');

jest.mock('axios');

describe("Test get-latest service", () => {
    test("Should response 200, status true", async () => {
        const apiResp = {
            "date": "2018-02-22",
            "historical": "",
            "info": {
                "rate": 148.972231,
                "timestamp": 1519328414
            },
            "query": {
                "amount": 25,
                "from": "GBP",
                "to": "JPY"
            },
            "result": 3724.305775,
            "success": true
        };
        axios.get.mockResolvedValue({ data: apiResp });

        const result = await getLatest("TRY", "EUR,USD");
        expect(result).toBe(apiResp)
    })
})
