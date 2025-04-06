const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    public_id: { type: String, required: true }
});

module.exports = mongoose.model('images', imageSchema,);