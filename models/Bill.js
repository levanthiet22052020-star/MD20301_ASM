const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const billSchema = new Schema({
    BillID: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    email: { type: ObjectId, ref: 'Account', required: true }
});

module.exports = mongoose.models.Bill || mongoose.model('Bill', billSchema);