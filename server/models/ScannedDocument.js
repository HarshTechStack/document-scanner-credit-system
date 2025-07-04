import mongoose from "mongoose";

const scannedDocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  filename: {
    type: String, // Optional: name of the uploaded file (for logs/UI)
  },
  length: {
    type: Number, // Optional: number of characters (or words) in the text
  },
  tags: {
    type: [String], // Optional: for future categorization (e.g., ["aadhar", "income"])
    default: [],
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScannedDocument", // Optional: list of related/matched documents
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScannedDocument = mongoose.model("ScannedDocument", scannedDocumentSchema);

export default ScannedDocument;
