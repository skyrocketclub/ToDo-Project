const express = require("express");
const router = express.Router();
const todoController = require("./../controllers/todoControllers");

router
  .route("/")
  .get(todoController.getAllTodo)
  .post(todoController.createTodo);

router
  .route("/:id")
  .get(todoController.getAnEntry)
  .delete(todoController.deleteEntry)
  .patch(todoController.updateAnEntry);

module.exports = router;
