const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const homeRouter = require("./routes/home");
const usersRouter = require("./routes/api/users");
const leaderboardRouter = require("./routes/api/leaderboard");

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use("/", homeRouter);

app.use("/api/users", usersRouter);
app.use("/api/leaderboard", leaderboardRouter);

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
