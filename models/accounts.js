const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        headquarter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarter' },
        isUsed: { type: Boolean, default: false }
    }
)

module.exports = mongoose.model('Accounts', AccountsSchema)