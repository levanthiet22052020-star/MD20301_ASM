var express = require('express');
var router = express.Router();
const accountModel = require('../models/Account');

//Đăng ký tài khoản
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const userExists = await accountModel.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ status: false, message: 'Email đã tồn tại' });
        }
        
        const newUser = new accountModel({ email, password, fullName });
        await newUser.save();
        res.status(201).json({ status: true, message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//Đăng nhập tài khoản
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await accountModel.findOne({ email, password });
        
        if (user) {
            res.status(200).json({ status: true, message: 'Đăng nhập thành công', data: user });
        } else {
            res.status(400).json({ status: false, message: 'Sai email hoặc mật khẩu' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

//Cập nhật thông tin tài khoản
router.put('/update', async (req, res) => {
    try {
        const { id, password, fullName } = req.body;
        const updatedUser = await accountModel.findByIdAndUpdate(
            id,
            { password, fullName },
            { new: true }
        );
        
        if (updatedUser) {
             res.status(200).json({ status: true, message: 'Cập nhật thành công', data: updatedUser });
        } else {
             res.status(404).json({ status: false, message: 'Không tìm thấy user' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;