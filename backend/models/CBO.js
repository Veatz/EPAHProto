const mongoose = require("mongoose");

const CBOSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortname: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    representation: {
      type: String,
      enum: ["Main", "Branch"],
      required: true,
    },
    operationDetails: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "OperationDetails", 
      required: true },

    primaryContact: {
      name: { type: String, required: true },
      designation: { type: String },
      email: { type: String, required: true },
      telephone: { type: String },
      mobile: { type: String },
    },
    secondaryContact: {
      name: { type: String },
      designation: { type: String },
      email: { type: String },
      telephone: { type: String },
      mobile: { type: String },
    },
    files: {
      // Legal Requirements
      rctResolution: { type: String },
      dti: {
        file: { type: String },
        territorialScope: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      sec: {
        file: { type: String },
        typeOfRegistration: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      cda: {
        file: { type: String },
        typeOfCooperative: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      csoNpoNgoPo: {
        file: { type: String },
        agencyIssuer: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      doleRule1020: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
    
      // Financial Requirements
      bankBook: { type: String },
      auditedFinancialStatement: {
        file: { type: String },
        year: { type: Number },
      },
      latestITR: {
        file: { type: String },
        year: { type: Number },
      },
      salesInvoice: { type: String },
    
      // Additional Registration/Accreditations
      businessPermit: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      ffeDis: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      birRegistration: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      rsbsa: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      fishAr: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      fda: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      agrarianReformBeneficiaries: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      farmersAssociation: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      irrigatorsAssociation: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
      laborUnionsWorkersAssoc: {
        file: { type: String },
        registryNo: { type: String },
        dateOfIssuance: { type: Date },
        dateOfValidity: { type: Date },
      },
    },
    },
  { timestamps: true }
);

CBOSchema.index({ name: 1 });
CBOSchema.index({ shortname: 1 });

module.exports = mongoose.model("CBO", CBOSchema);
