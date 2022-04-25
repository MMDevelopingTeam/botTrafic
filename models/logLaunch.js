const mongoose = require('mongoose');

const LogLaunchSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now, required: true },
        name_model: { type: String, required: true },
        monitor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'monitor' },
        headquarter: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarter' },
        numberBots: { type: Number, required: true}
    }
)

module.exports = mongoose.model('LogLaunch', LogLaunchSchema)