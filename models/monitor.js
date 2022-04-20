const mongoose = require('mongoose');

const MonitorSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        headquarter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarter' },
        address: { type: String, default: ""},
        number: {type: String},
        Shift: {type: String}
        
    }
)

module.exports = mongoose.model('Monitor', MonitorSchema)