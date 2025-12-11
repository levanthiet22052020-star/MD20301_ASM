const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const billDetailsSchema = new Schema({
    billID: { type: ObjectId, ref: 'Bill', required: true },
    productID: { type: ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
});

billDetailsSchema.index({ billID: 1, productID: 1 }, { unique: true });

module.exports = mongoose.models.BillDetails || mongoose.model('BillDetails', billDetailsSchema); 