const express = require('express');
const router = express.Router();
const peepee = require('../services/peepee');

const WEB_PER_PAGE = 50;

router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const result = await peepee.getRankings(page, WEB_PER_PAGE);
    return res.render('peepee', { rankings: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
