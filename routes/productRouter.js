var express = require('express');
var router = express.Router();
const productModel = require('../models/Product');

//Lấy tất cả sản phẩm
router.get('/all', async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//Lấy sản phẩm theo danh mục
router.get('/category', async (req, res) => {
    try {
        const { cateID } = req.query;
        const products = await productModel.find({ cateID: cateID });
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//Tìm kiếm sản phẩm theo tên
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        const products = await productModel.find({
            productName: { $regex: name, $options: 'i' }
        });
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get('/detail', async (req, res) => {
    try {
        const { id } = req.query;
        const product = await productModel.findById(id);
        if (product) {
            res.status(200).json({ status: true, data: product });
        } else {
            res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;