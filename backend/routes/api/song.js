const express = require('express');
const router = express.Router();
const songDetails = require('../../services/songDetails');
const { validateParams } = require('../../middleware/validate');
const { videoIdParamSchema } = require('../../schema');

router.get('/:videoId', validateParams(videoIdParamSchema), async (req, res) => {
    const videoId = req.validatedParams.videoId;
    const video = await songDetails.getById(videoId);

    if(video.data.length === 0) {
        return res.status(404).json({
            error: [
                { message: 'Song not found' },
            ],
        });
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

    return res.json({
        song: video.data[0],
        artists,
        sharedBy,
        moreTracks
    });
});

module.exports = router;
