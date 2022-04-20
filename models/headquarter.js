const mongoose = require('mongoose');

const HeadquarterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        address: { type: String},
        number: { type: String }
    }
)

module.exports = mongoose.model('Headquarter', HeadquarterSchema)