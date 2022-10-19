const Todo = require("./../models/todoModel");
const { query } = require("express");

exports.createTodo = async (req, res) => {
  console.log(req.body);
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newTodo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllTodo = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query }; //Destructuring |
    let query;

    if (req.query.page) {
      const excludedFields = ["page", "limit"];

      //PAGINATION
      //when the user has queried for a particular page...
      const page = req.query.page * 1 || 1; //defining defaults...
      const limit = req.query.limit * 1 || 2; //How many entries per page will come up?
      const skip = (page - 1) * limit; //we smartly calculate skip ourselves
      query = await Todo.find().skip(skip).limit(limit);
    } else {
      query = await Todo.find();
    }

    res.status(201).json({
      status: "success",
      entries: {
        query,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAnEntry = async (req, res) => {
  console.log(req.params.id); //we use id because that is what makes up the route that is used...
  try {
    const entry = await Todo.findById(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        entry,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateAnEntry = async (req, res) => {
  console.log(req.params.id);
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //this returns the modified document
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).josn({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      message: "document successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
