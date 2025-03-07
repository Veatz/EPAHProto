const { body, validationResult } = require("express-validator");

// Validation for Creating a CBO (POST)
const validateCBO = [
    body("name").notEmpty().withMessage("Name is required"),
    body("shortname").notEmpty().withMessage("Short name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("representation").notEmpty().withMessage("Representation is required"),
    body("operationDetails").notEmpty().withMessage("Operation details are required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validation for Updating a CBO (PATCH) - Partial Update
const validateCBOUpdate = [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("shortname").optional().notEmpty().withMessage("Short name cannot be empty"),
    body("address").optional().notEmpty().withMessage("Address cannot be empty"),
    body("representation").optional().notEmpty().withMessage("Representation cannot be empty"),
    body("operationDetails").optional().isObject().withMessage("Operation details must be an object"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateCBO, validateCBOUpdate };