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
        ref: "OperationDetails" 
    },
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
      rctResolution: { type: String }, // Store file path or URL
      businessPermit: { type: String },
      doleCertificate: { type: String },
    },
    },
  { timestamps: true }
);

CBOSchema.index({ name: 1 });
CBOSchema.index({ shortname: 1 });

module.exports = mongoose.model("CBO", CBOSchema);
