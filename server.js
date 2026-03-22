const express = require("express");
const { execSync } = require("child_process");
const app = express();

try {
  app.locals.v = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  app.locals.v = Date.now();
}

const port = process.env.PORT || 5000;

const homeRouter = require("./routes/home");
const helpRouter = require("./routes/help");
const linksRouter = require("./routes/links");
const apiDocsRouter = require("./routes/apiDocs");

const leaderboardRouter = require("./routes/api/leaderboard");
const tracksRouter = require("./routes/api/tracks");
const userStatsRouter = require("./routes/api/userStats");
const usersRouter = require("./routes/api/users");
const videosRouter = require("./routes/api/videos");
const activityApiRouter = require("./routes/api/activity");
const adminVideosRouter = require("./routes/api/admin/videos");

const topTracksRouter = require("./routes/topTracks");
const activityRouter = require("./routes/activity");
const peepeeRouter = require("./routes/peepee");

app.set('view engine', 'pug');

app.use((req, res, next) => {
    res.locals.active = path => {
        if(path === '/') {
            return req.originalUrl === '/' ? 'active' : '';
        }
        return req.originalUrl.startsWith(path) ? 'active' : '';
    };
    next();
});

app.use(express.static('public'));

app.use("/", homeRouter);
app.use("/help", helpRouter);
app.use("/links", linksRouter);

app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/users/:nickname/stats", userStatsRouter);
app.use("/api/users", usersRouter);
app.use("/api/videos", videosRouter);
app.use("/api/activity", activityApiRouter);
app.use("/api/admin/videos", adminVideosRouter);

app.use("/top-tracks", topTracksRouter);
app.use("/activity", activityRouter);
app.use("/peepee", peepeeRouter);
app.use("/api/docs", apiDocsRouter);

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
