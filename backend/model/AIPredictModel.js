const mongoose = require('mongoose');

const AIPredictModel = new mongoose.Schema({
    user_input: {
        type: String,
        required: true
    },
    ml_response: {
        type: String,
        required: true
    }
});

module.exports = AIPredictModel;
