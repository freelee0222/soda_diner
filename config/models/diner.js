const mongoose = require('mongoose');
const { Schema } = mongoose

const dinerSchema = new Schema({
    name: { type: String, unique: true },
    location: String,
    sodas: [String],
    createdOn: Number
});

module.exports = mongoose.model('diner', dinerSchema);