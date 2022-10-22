const express = require("express");
const todoRouter = require("./routers/todoRoutes");
const AppError = require("./utils/appError");
const app = express();
const globalErrorHandler = require("./controllers/errorController");

//defining middlewares that apply to all the requests...

//get the requests made from the server in json format
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 🔥");
  next();
});

//using this middleware to simplify the routing...
app.use("/api/v1/todo", todoRouter);

//Advance your Error Handling Using the following steps
/*
1. Make a middle where that catches all the error
2. Make another Middle ware called App Error that populates the
  Status, StatusCode and Error MEssages
3. Implement the handling of all the error (where you send the response to the user...)
*/

// If the user enters a wrong route...
app.all("*", (req, res, next) => {
  //Once you pass an argument into next, its an error already!!!
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
