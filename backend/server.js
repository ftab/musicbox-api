const express = require("express");
const path = require('path');
const app = express();
const cytube = require('./services/cytube');

cytube.connect();

const port = process.env.PORT || 5000;

const leaderboardRouter = require("./routes/api/leaderboard");
const statsRouter = require("./routes/api/stats");
const tracksRouter = require("./routes/api/tracks");
const userStatsRouter = require("./routes/api/userStats");
const usersRouter = require("./routes/api/users");
const songRouter = require("./routes/api/song");
const artistRouter = require("./routes/api/artist");
const videosRouter = require("./routes/api/videos");
const activityApiRouter = require("./routes/api/activity");
const searchRouter = require("./routes/api/search");
const adminVideosRouter = require("./routes/api/admin/videos");
const streamRouter = require("./routes/api/stream");

app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/stats", statsRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/users/:nickname/stats", userStatsRouter);
app.use("/api/users", usersRouter);
app.use("/api/song", songRouter);
app.use("/api/artist", artistRouter);
app.use("/api/videos", videosRouter);
app.use("/api/activity", activityApiRouter);
app.use("/api/search", searchRouter);
app.use("/api/admin/videos", adminVideosRouter);
app.use("/api/stream", streamRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

if(process.env.NODE_ENV === 'production') {
    app.use('/assets', express.static(path.join(__dirname, '../dist/assets'), {
        maxAge: '1y',
        immutable: true
    }));

    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

if(process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log("Listening on", port));
}

module.exports = app;
