const mongoose = require('mongoose');

const LintingSchema = new mongoose.mongoose.mongoose.Schema({
    code: {
        type: String,
        required: true
    },
});

const LintingModel = mongoose.mongoose.model('LintingModel', LintingSchema);
module.exports = { LintingModel, LintingSchema };

