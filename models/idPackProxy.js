const mongoose = require('mongoose');

const IdPackProxySchema = new mongoose.Schema(   
    {
        id: { type: String, required: true, unique: true },
        platform: { type: String },
        dateExpirated: { type: Date, required: true }
    }
)

module.exports = mongoose.model('IdPackProxy', IdPackProxySchema)