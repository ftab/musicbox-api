const express = require('express');
const router = express.Router();
const stats = require('../../services/stats');

router.get('/', async (req, res) => {
    res.json(await stats.getTotalSongs());
});

module.exports = router;
