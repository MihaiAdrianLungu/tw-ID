const express = require('express');
const Order = require('../database/models/Order');

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        const userId = req.userId;

        if(!userId) {
            return res.status(400).json({success: false, message: 'User id not found', data: {}})
        }

        const orders = await Order.findAll({
            where: {
                userId
            }
        });

        res.status(200).json({ success: true, message: 'Orders list', data: orders });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Order error', data: {} });
    }
})

module.exports = router;