const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  expiration: { type: Date, required: true },
  recipientEmail: { type: String, required: true },
});

module.exports = mongoose.model("File", FileSchema);
