const express = require('express');
const Image = require('../mongodb/models/Image');

const router = express.Router();

// GET request
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;