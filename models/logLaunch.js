const mongoose = require('mongoose');

const LogLaunchSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now, required: true },
        name_model: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId },
        headquarterId: { type: mongoose.Schema.Types.ObjectId },
        companyId: { type: mongoose.Schema.Types.ObjectId },
        numberBots: { type: Number, required: true},
        registerCompanyBotContainer: { type: mongoose.Schema.Types.ObjectId, required: true},
    }
)

module.exports = mongoose.model('LogLaunch', LogLaunchSchema)