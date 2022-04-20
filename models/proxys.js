const mongoose = require('mongoose');

const ProxysSchema = new mongoose.Schema(
    {
        proxy: { type: String, required: true, unique: true },
        headquarter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarter' },
        isFull: { type: Boolean, default: false },
        Nusers: { type: Number, default: 0 },
        isDown: { type: Boolean, default: false }
    }
)

module.exports = mongoose.model('Proxys', ProxysSchema)