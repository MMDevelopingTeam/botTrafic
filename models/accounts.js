const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isUsed: { type: Boolean, default: false },
        stricks: { type: Number, default: 0 },
        isWorking: { type: Boolean, default: true },
        arrayModelsFollowers: { type: Array, default: [] },
        nFolloers: { type: Number, default: 0 },
    }
)

module.exports = mongoose.model('Accounts', AccountsSchema)