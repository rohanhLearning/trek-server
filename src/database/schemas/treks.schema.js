const { Schema, model } = require("mongoose");

const TrekSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      venue: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "difficult"],
      },
      timeRequired: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
);
  
module.exports = model("Trek", TrekSchema);