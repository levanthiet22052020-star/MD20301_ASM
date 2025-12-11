const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    cateID: { type: ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);