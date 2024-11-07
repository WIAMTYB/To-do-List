const router = require("express").Router();

const {
  getSingleTodoCtrl,
  deleteTodoCtrl,
  updateTodoCtrl,
  getAllTodosCtrl,
  createTodoCtrl,
} = require("../controllers/todosController");
const validateObjectId = require("../middlewares/validateObjectId");


router.route("/").post(createTodoCtrl).get(getAllTodosCtrl);

router
  .route("/:id")
  .get(validateObjectId, getSingleTodoCtrl)
  .delete(validateObjectId, deleteTodoCtrl)
  .put(validateObjectId, updateTodoCtrl);

module.exports = router;
