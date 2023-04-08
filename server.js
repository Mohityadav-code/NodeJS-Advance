const express = require("express");
const env = require("dotenv");
const config = env.config();
const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use=to load middleware functions

app.use("*", (req, res,next) => {
  // * means all routes
  const error=new Error("404 not found");
  error.message="404 not found";
    error.status=404;

  res.status(404).send("404 not found");
  next(error);
});
const errorHandler = require("./utilits/errohandling");
app.use("*",(error,req,res,next)=>{ //error handling middleware
    res.status(error.status||500).send(error.message)
    errorHandler(error,res);

})