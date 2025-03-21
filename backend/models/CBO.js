const mongoose = require("mongoose");

const CBOSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortname: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    address: { type: String, required: true, trim: true },
    representation: { type: String, enum: ["Main", "Branch"], required: true },

    // ✅ Store `operationDetails` as an embedded object instead of an ObjectId
    operationDetails: { type: Object, required: true },

    // ✅ Contact Details
    primaryContact: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      email: { type: String, required: true },
      telephone: { type: String },
      mobile: { type: String, required: true },
    },
    secondaryContact: {
      name: { type: String },
      designation: { type: String },
      email: { type: String },
      telephone: { type: String },
      mobile: { type: String },
    },

    // ✅ Fix `files` structure: Make sure all fields follow `{ file: String }`
    files: {
      rctResolution: { file: { type: String } },
      dti: { file: { type: String }, territorialScope: String, dateOfIssuance: Date, dateOfValidity: Date },
      sec: { file: { type: String }, typeOfRegistration: String, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      cda: { file: { type: String }, typeOfCooperative: String, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      csoNpoNgoPo: { file: { type: String }, agencyIssuer: String, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      doleRule1020: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },

      bankBook: { file: { type: String } },
      auditedFinancialStatement: { file: { type: String }, year: Number },
      latestITR: { file: { type: String }, year: Number },
      salesInvoice: { file: { type: String } },

      businessPermit: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      ffeDis: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      birRegistration: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      philGeps: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      rsbsa: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      fishAr: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      fda: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      agrarianReformBeneficiaries: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      farmersAssociation: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      irrigatorsAssociation: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      laborUnionsWorkersAssoc: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
      slpa: { file: { type: String }, registryNo: String, dateOfIssuance: Date, dateOfValidity: Date },
    },
  },
  { timestamps: true }
);

CBOSchema.index({ name: 1 });
CBOSchema.index({ shortname: 1 });

module.exports = mongoose.model("CBO", CBOSchema);
