const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database/database.sqlite",
    logging: false
})

sequelize.sync()
    .then(() => {
        console.log('Models successfully (re)created');
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = {
    sequelize
}