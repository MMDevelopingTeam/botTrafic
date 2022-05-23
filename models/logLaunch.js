const mongoose = require('mongoose');

const LogLaunchSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now, required: true },
        name_model: { type: String, required: true },
        userId: { type: String },
        headquarterId: { type: String },
        companyId: { type: String },
        numberBots: { type: Number, required: true}
    }
)

module.exports = mongoose.model('LogLaunch', LogLaunchSchema)