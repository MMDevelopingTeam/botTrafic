const mongoose = require('mongoose');

const ProxysSchema = new mongoose.Schema(
    {
        proxy: { type: String, required: true, unique: true },
        isFull: { type: Boolean, default: false },
        isFullAny: { type: Boolean, default: false },
        Nusers: { type: Number, default: 0 },
        NusersAny: { type: Number, default: 0 },
        ms: { type: Number },
        isDown: { type: Boolean, default: false }
    }
)

module.exports = mongoose.model('Proxys', ProxysSchema)