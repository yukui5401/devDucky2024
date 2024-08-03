const mongoose = require('mongoose');

const CodeSuggestionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },

});

module.exports = CodeSuggestionSchema


