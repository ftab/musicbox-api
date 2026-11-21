import express from 'express';
import cytube from '../../services/cytube.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const send = (event, data) => {
        if(res.writableEnded || res.destroyed) return;
        res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    const keepAlive = setInterval(() => {
        if( ! res.writableEnded && ! res.destroyed) res.write(': ping\n\n');
    }, 15000);

    const sendStatus = data => {
        send('status', data);
        if( ! data) {
            send('currentMedia', null);
            send('playlistMeta', null);
        }
    };
    const sendCurrentMedia = data => send('currentMedia', data);
    const sendPlaylistMeta = data => send('playlistMeta', data);

    sendStatus(cytube.getStatus());

    if(cytube.getStatus()) {
        sendCurrentMedia(cytube.getCurrentMedia());
        sendPlaylistMeta(cytube.getPlaylistMeta());
    }

    cytube.emitter.on('status', sendStatus);
    cytube.emitter.on('changeMedia', sendCurrentMedia);
    cytube.emitter.on('setPlaylistMeta', sendPlaylistMeta);

    req.on('close', () => {
        clearInterval(keepAlive);
        cytube.emitter.off('status', sendStatus);
        cytube.emitter.off('changeMedia', sendCurrentMedia);
        cytube.emitter.off('setPlaylistMeta', sendPlaylistMeta);
    });

    res.on('error', () => {});
});

export default router;
