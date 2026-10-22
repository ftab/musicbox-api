import express from 'express';
import cytube from '../../services/cytube.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const keepAlive = setInterval(() => res.write('event: ping\n\n'), 15000);
    const sendCurrentMedia = data => res.write(`event: currentMedia\ndata: ${JSON.stringify(data)}\n\n`);
    const sendPlaylistMeta = data => res.write(`event: playlistMeta\ndata: ${JSON.stringify(data)}\n\n`);

    sendCurrentMedia(cytube.getCurrentMedia());
    sendPlaylistMeta(cytube.getPlaylistMeta());

    cytube.emitter.on('changeMedia', sendCurrentMedia);
    cytube.emitter.on('setPlaylistMeta', sendPlaylistMeta);

    req.on('close', () => {
        clearInterval(keepAlive);
        cytube.emitter.off('changeMedia', sendCurrentMedia);
        cytube.emitter.off('setPlaylistMeta', sendPlaylistMeta);
    });
});

export default router;
