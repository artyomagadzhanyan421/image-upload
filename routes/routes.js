const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
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

// GET single image by ID
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(image);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE image by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json({ message: 'Image deleted successfully', deletedImage });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST: Upload image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const image = new Image({
            imageUrl: req.file.path,
        });

        const savedImage = await image.save();
        res.status(201).json(savedImage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;