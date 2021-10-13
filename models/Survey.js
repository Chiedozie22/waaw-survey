const mongoose = require('mongoose');
const {Schema} = mongoose;

const surveySchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    Location: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    userID: {
        type: String
    },
}, {timestamps: true});

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;