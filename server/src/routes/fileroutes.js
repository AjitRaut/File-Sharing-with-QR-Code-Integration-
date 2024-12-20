const express = require('express');
const { uploadFile, downloadFile } = require('../controllers/fileController');
const router = express.Router();

router.post('/upload', uploadFile);
router.get('/download/:token', downloadFile);

module.exports = router;