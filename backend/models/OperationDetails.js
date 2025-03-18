const mongoose = require("mongoose");

const OperationDetailsSchema = new mongoose.Schema({
  organization_registration: { 
    type: String, 
    required: true, 
    enum: ["Cooperative", "Stock Corporation", "Non-stock Corporation", "Unregistered", "Others"],
  },
  other_organization_registration: { 
    type: String,
    validate: {
      validator: function(value) {
        return this.organization_registration !== "Others" || (this.organization_registration === "Others" && value.trim() !== "");
      },
      message: "You must specify an organization type when 'Others' is selected.",
    },
  },
  date_established: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: "Date established cannot be in the future.",
    },
  },

  psic: {
    type: String, 
    default: "",
  },

  target_members: { type: String, required: true },
  
  number_of_members: {
    male: { type: Number, default: 0, min: 0 },
    female: { type: Number, default: 0, min: 0 },
  },

  annual_production: [
    {
      product: { type: String, required: true },
      type: { type: String, required: true },
      quantity: { type: Number, required: true, min: 0 },
      unit: { type: String, required: true },
      market_value: { type: Number, required: true, min: 0 },
    },
  ],
  production_scope: { type: String , required: true},
  sales_scope: { type: String , required: true},
  total_assets: { type: Number, min: 0 },
  total_liabilities: { type: Number, min: 0 },
  annual_gross_income: { type: Number,min: 0},
  procurement_experience: [
    {
      method: { type: String, required: true },
      participation_count: { type: Number, default: 0 },
      contracts_won: { type: Number, default: 0 },
      successful_implementations: { type: Number, default: 0 },
    }
  ],
  sponsor_agency: { type: String, required: true },
  other_sponsor_agency: { type: String ,default: ""},
});

OperationDetailsSchema.index({ date_established: -1 });

module.exports = mongoose.model("OperationDetails", OperationDetailsSchema);
