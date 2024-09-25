const { Sequelize } = require('sequelize');
const dbConfig = require('../config');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.tables = require('./tableModel')(sequelize, Sequelize);

module.exports = db;