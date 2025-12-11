var express = require('express');
var router = express.Router();
const categoryModel = require('../models/Category');

//Lấy tất cả danh mục
router.get('/all', async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ status: true, data: categories });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;