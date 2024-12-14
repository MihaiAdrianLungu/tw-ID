const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const User = require('./database/models/User');
const Order = require('./database/models/Order');
const { verifyToken } = require('./utils');

const app = express();
dotenv.config();

User.hasMany(Order, { foreignKey: 'userId'});

const PORT = process.env.PORT ?? 3001;

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/orders', verifyToken, orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})