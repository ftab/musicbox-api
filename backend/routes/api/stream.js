const express = require('express');
const router = express.Router();
const cytube = require('../../services/cytube');

router.get('/', async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const sendCurrentMedia = data => res.write(`event: currentMedia\ndata: ${JSON.stringify(data)}\n\n`);
        const sendPlaylistMeta = data => res.write(`event: playlistMeta\ndata: ${JSON.stringify(data)}\n\n`);

        sendCurrentMedia(cytube.getCurrentMedia());
        sendPlaylistMeta(cytube.getPlaylistMeta());

        cytube.emitter.on('changeMedia', sendCurrentMedia);
        cytube.emitter.on('setPlaylistMeta', sendPlaylistMeta);

        req.on('close', () => {
            cytube.emitter.off('changeMedia', sendCurrentMedia);
            cytube.emitter.off('setPlaylistMeta', sendPlaylistMeta);
        });
    } catch(err) {
        console.error(`Error while sending event stream `, err.message);
        next(err);
    }
});

module.exports = router;
