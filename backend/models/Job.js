const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    department: String,
    location: String,
    status: { type: String, default: "OPEN" },
    // etc...
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
