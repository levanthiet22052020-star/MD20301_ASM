const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    cateName: { type: String, required: true }
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);