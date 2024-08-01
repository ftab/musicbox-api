const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const usersRouter = require("./routes/users");

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
