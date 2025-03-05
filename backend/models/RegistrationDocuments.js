const mongoose = require("mongoose");

const RegistrationDocumentsSchema = new mongoose.Schema({
    board_resolution: { type: String, required: true },
    registration_certificate: { type: String, required: true },
    business_permit: { type: String, required: true },
    bank_account_certificate: { type: String, required: true },
    bir_certificate: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model("RegistrationDocuments", RegistrationDocumentsSchema);
