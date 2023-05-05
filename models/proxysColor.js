const mongoose = require('mongoose');

const ProxysColorSchema = new mongoose.Schema(   
    {
        proxy: { type: String, required: true, unique: true },
        isFull: { type: Boolean, default: false },
        ms: { type: Number },
        isDown: { type: Boolean, default: false },
        idPackage: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'IdPackProxy', autopopulate: true }
    }
)

ProxysColorSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProxysColor', ProxysColorSchema)