const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

// Joi Validation

const createTodo = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    // completed: Joi.boolean().default(false),
  });
  return schema.validate(obj);
};

const updateTodo = (obj) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    completed: Joi.boolean().optional(),
  });
  return schema.validate(obj);
};

module.exports = { Todo, createTodo, updateTodo };
