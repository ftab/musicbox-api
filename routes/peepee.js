const express = require('express');
const router = express.Router();
const peepee = require('../services/peepee');

router.get('/', async function(req, res, next) {
  try {
    const result = await peepee.getRankings(req.query.page);
    return res.render('peepee', { rankings: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
