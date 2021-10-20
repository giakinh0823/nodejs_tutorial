const express = require('express');
const router = express.Router();

const siteControler = require('../app/controllers/SiteController');

router.get('/search', siteControler.search);
router.get('/', siteControler.index);

module.exports = router;
