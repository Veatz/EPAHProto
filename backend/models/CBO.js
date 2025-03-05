const mongoose = require("mongoose");
const OperationDetailsSchema = require("./OperationDetails"); // ✅ Import schema

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
    registrationDocuments: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "RegistrationDocuments" 
    }
    },
  { timestamps: true }
);

module.exports = mongoose.model("CBO", CBOSchema);
