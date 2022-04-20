const mongoose = require('mongoose');

const StreamerSchema = new mongoose.Schema(
    {
        name_model: { type: String, required: true, unique: true }
    }
)

module.exports = mongoose.model('Streamer', StreamerSchema)