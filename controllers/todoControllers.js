const Todo = require("./../models/todoModel");
const { query } = require("express");
const appError = require("./../utils/appError");

//defining a wrapper to catch all the errors in async functions
// So that we can do away with all the try ... catch blocks
const catchAsync = require("./../utils/catchAsync");

exports.createTodo = catchAsync(async (req, res) => {
  console.log(req.body);
  const newTodo = await Todo.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newTodo,
    },
  });
});

exports.getAllTodo = catchAsync(async (req, res) => {
  console.log(req.query);
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
});

exports.getAnEntry = catchAsync(async (req, res) => {
  console.log(req.params.id); //we use id because that is what makes up the route that is used...
  const entry = await Todo.findById(req.params.id);

  res.status(201).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.updateAnEntry = catchAsync(async (req, res) => {
  console.log(req.params.id);
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
});

exports.deleteEntry = catchAsync(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "document successfully deleted",
  });
});
