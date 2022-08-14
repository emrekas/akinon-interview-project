const { validationResult } = require("express-validator")
const methods = require("../../helpers/methods")

/**
 * sequential processing, stops running validations chain if the previous one have failed.
 */
exports.validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(400).json(
            methods.failResponse("Validation failed", errors.array())
        )
    }
}
