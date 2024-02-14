const mongoose = require('mongoose');
const { Schema } = mongoose;

const SodaSchema = new Schema({
    name: { type: String, unique: true },
    fizziness: Number,
    rating: Number,
    isServed: { type: Boolean, default: true},
    createdOn: Number 
});

module.exports = mongoose.model('soda', SodaSchema);