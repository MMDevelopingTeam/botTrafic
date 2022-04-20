const mongoose = require('mongoose');

const KillBotSchema = new mongoose.Schema(
    {
        NmrKill: { type: Number, required: true },
        acct_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    }
)

module.exports = mongoose.model('KillBot', KillBotSchema)