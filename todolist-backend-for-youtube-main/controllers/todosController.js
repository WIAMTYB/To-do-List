const asyncHandler = require("express-async-handler");
const { Todo, createTodo, updateTodo } = require("../models/Todo");

/**----------------------------------------
 * @desc Create New Todo
 * @Route /api/todos
 * @method POST
 * @access public 
------------------------------------------*/
module.exports.createTodoCtrl = asyncHandler(async (req, res) => {
  const { error } = createTodo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const todo = await Todo.create({
    title: req.body.title,
  });
  res.status(201).json(todo);
});

/**----------------------------------------
 * @desc Get All Todos
 * @Route /api/todos
 * @method GET
 * @access public 
------------------------------------------*/
module.exports.getAllTodosCtrl = asyncHandler(async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  if (!todos) {
    return res.status(404).json({ message: "No todos found" });
  }
  res.status(200).json(todos);
});

/**----------------------------------------
 * @desc Get Single Todo
 * @Route /api/todos/:id
 * @method GET
 * @access public 
------------------------------------------*/
module.exports.getSingleTodoCtrl = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.status(200).json(todo);
});

/**----------------------------------------
 * @desc Delete a Todo
 * @Route /api/todos/:id
 * @method DELETE
 * @access public
------------------------------------------*/
module.exports.deleteTodoCtrl = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Todo has been deleted" });
});

/**----------------------------------------
 * @desc Update a Todo
 * @Route /api/todos/:id
 * @method PUT
 * @access public
------------------------------------------*/
module.exports.updateTodoCtrl = asyncHandler(async (req, res) => {
  const { error, value } = updateTodo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updateFields = {};
  if (value.title !== undefined) updateFields.title = value.title;
  if (value.completed !== undefined) updateFields.completed = value.completed;

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: updateFields },
    { new: true }
  );

  res.status(200).json(updatedTodo);
});
