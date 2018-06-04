var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Rola = sequelize.define('rola', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        naziv: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        tableName: 'role'
    });
    return Rola;
}