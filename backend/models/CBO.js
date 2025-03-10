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
    }
    },
  { timestamps: true }
);

CBOSchema.index({ name: 1 });
CBOSchema.index({ shortname: 1 });

module.exports = mongoose.model("CBO", CBOSchema);
