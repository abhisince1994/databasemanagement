const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fields: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Table;
};