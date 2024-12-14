const { sequelize } = require("../server");
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'tester', 'admin'],
        validate: {
            isIn: [['user', 'tester', 'admin']]
        }
    }
}, {
    timestamps: false
})

module.exports = User;