const mongoose = require('mongoose');

const IdPackProxySchema = new mongoose.Schema(   
    {
        id: { type: String, required: true, unique: true },
        platform: { type: String }
    }
)

module.exports = mongoose.model('IdPackProxy', IdPackProxySchema)