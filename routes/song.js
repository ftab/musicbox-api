const express = require('express');
const router = express.Router();
const songDetails = require('../services/songDetails');

router.get('/:videoId', async function(req, res, next) {
    try {
        const videoId = parseInt(req.params.videoId, 10);
        if (isNaN(videoId)) {
            res.status(400).send('Invalid video ID');
            return;
        }

        const video = await songDetails.getById(videoId);
        if (video.data.length === 0) {
            res.status(404).send('Song not found');
            return;
        }

        const [artists, sharedBy, moreTracks] = await Promise.all([
            songDetails.getArtists(videoId),
            songDetails.getSharedBy(videoId),
            songDetails.getById(videoId).then(async (v) => {
                const artistRows = await songDetails.getArtists(videoId);
                const primaryIds = artistRows
                    .filter(a => a.role === 'primary')
                    .map(a => a.artistId);
                return songDetails.getOtherTracksByArtists(videoId, primaryIds);
            })
        ]);

        return res.render('song', {
            song: video.data[0],
            artists,
            sharedBy,
            moreTracks
        });
    } catch (err) {
        console.error('Error getting song details', err.message);
        next(err);
    }
});

module.exports = router;
