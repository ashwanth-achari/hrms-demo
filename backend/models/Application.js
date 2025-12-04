const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    candidateName: String,
    candidateEmail: String,
    resumeUrl: String, // or path
    status: { type: String, default: "PENDING" },
    // future: AI evaluation fields
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
