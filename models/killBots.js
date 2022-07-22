const mongoose = require('mongoose');

const KillBotSchema = new mongoose.Schema(
    {
        NmrKill: { type: Number, required: true },
        nameModel: { type: String, required: true },
        acct_id: { type: mongoose.Schema.Types.ObjectId },
        type: { type: String, required: true },
        proxy: { type: String, required: true },
    }
)

module.exports = mongoose.model('KillBot', KillBotSchema)