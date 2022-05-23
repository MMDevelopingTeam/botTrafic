const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isUsed: { type: Boolean, default: false }
    }
)

module.exports = mongoose.model('Accounts', AccountsSchema)