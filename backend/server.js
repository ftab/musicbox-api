import express from 'express';
import path from 'path';
import cytube from './services/cytube.js';
import leaderboardRouter from './routes/api/leaderboard.js';
import statsRouter from './routes/api/stats.js';
import tracksRouter from './routes/api/tracks.js';
import userStatsRouter from './routes/api/userStats.js';
import usersRouter from './routes/api/users.js';
import songRouter from './routes/api/song.js';
import artistRouter from './routes/api/artist.js';
import videosRouter from './routes/api/videos.js';
import activityApiRouter from './routes/api/activity.js';
import searchRouter from './routes/api/search.js';
import adminVideosRouter from './routes/api/admin/videos.js';
import streamRouter from './routes/api/stream.js';

const app = express();
const port = process.env.PORT || 5000;
const __dirname = import.meta.dirname;

cytube.connect();

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

    app.get('*splat', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

if(process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log("Listening on", port));
}

export default app;
