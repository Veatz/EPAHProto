const mongoose = require("mongoose");

const OperationDetailsSchema = new mongoose.Schema({
  organization_registration: { type: String, required: true },
  date_established: { type: Date, required: true },
  psic: { type: String },
  target_members: { type: String },
  number_of_members: {
    male: { type: Number, default: 0 },
    female: { type: Number, default: 0 },
  },
  annual_production: [
    {
      product: { type: String, required: true },
      type: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
      market_value: { type: Number, required: true },
    },
  ],
  production_scope: { type: String },
  sales_scope: { type: String },
  total_assets: { type: Number },
  total_liabilities: { type: Number },
  annual_gross_income: { type: Number },
  procurement_experience: [
    {
      type: { type: String, required: true }, // ✅ Fix: Add `type: String` inside the object
      number_of_participation: { type: Number, default: 0 },
      number_of_contracts_won: { type: Number, default: 0 },
      number_of_successful_implementations: { type: Number, default: 0 },
    }
  ],
  sponsor_agency: { type: String, required: true },
  other_sponsor_agency: { type: String },
});

module.exports = mongoose.model("OperationDetails", OperationDetailsSchema);
