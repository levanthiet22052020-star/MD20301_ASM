var express = require('express');
var router = express.Router();
const billDetailsModel = require('../models/BillDetails');

//Lấy chi tiết hóa đơn theo billID
router.get('/detail', async (req, res) => {
    try {
        const { billID } = req.query;
        const details = await billDetailsModel
            .find({ billID: billID })
            .populate('productID'); 
            
        res.status(200).json({ status: true, data: details });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;