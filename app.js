const express = require("express");
const todoRouter = require("./routers/todoRoutes");
const app = express();

//defining middlewares that apply to all the requests...

//get the requests made from the server in json format
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 🔥");
  next();
});

//using this middleware to simplify the routing...
app.use("/api/v1/todo", todoRouter);

module.exports = app;
