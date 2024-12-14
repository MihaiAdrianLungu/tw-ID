const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../database/models/User");

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        res.status(200).json({ success: true, message: 'Users list', data: users });
    } catch (error) {
        res.status(400).json({ success: false, message: 'User error', data: {} });
    }
})

router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        // console.log(req.query);

        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid user id', data: {} });
        }

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found', data: {} });
        }

        res.status(200).json({ success: true, message: 'User found', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'User error', data: {} });
    }
})

router.post('/', async function (req, res) {
    try {
        const { username, password, role } = req.body;

        const user = await User.findOne({
            where: {
                username
            }
        })

        if(user) {
           return res.status(400).json({ success: false, message: 'User already exists with this username', data: {} });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const createdUser = await User.create({
            username,
            password: hash,
            role,
        })

        delete createdUser.dataValues.password;

        res.status(201).json({success: true, message: 'User created', data: createdUser});
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating user', data: {} });
    }
})

module.exports = router
