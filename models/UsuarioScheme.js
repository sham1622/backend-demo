const { Schema, model } = require("mongoose");

const UsuarioScheme = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

UsuarioScheme.virtual("tareas", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

module.exports = model("Usuario", UsuarioScheme);
