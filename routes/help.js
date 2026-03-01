const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const helpPath = path.join(__dirname, '../content/help.md');

router.get('/', (req, res) => {
  const markdown = fs.readFileSync(helpPath, 'utf8');
  const content = marked(markdown);
  res.render('help', { content });
});

module.exports = router;
