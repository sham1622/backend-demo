const { Schema, model } = require("mongoose");

const MessageScheme = Schema(
  {
    id: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
);

module.exports = model("Message", MessageScheme);
