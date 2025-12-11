var express = require('express');
var router = express.Router();
const billModel = require('../models/Bill');
const billDetailsModel = require('../models/BillDetails');

//Đặt hàng
router.post('/order', async (req, res) => {
    try {
        const { userID, items } = req.body;
        
        const newBill = new billModel({ userID: userID, date: Date.now() });
        await newBill.save();

        const details = items.map(item => ({
            billID: newBill._id,
            productID: item.productID,
            quantity: item.quantity
        }));
        
        await billDetailsModel.insertMany(details);

        res.status(200).json({ status: true, message: 'Đặt hàng thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//Lấy lịch sử đơn hàng của người dùng
router.get('/history', async (req, res) => {
    try {
        const { userID } = req.query;
        const bills = await billModel.find({ userID: userID }).sort({ date: -1 });
        res.status(200).json({ status: true, data: bills });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;