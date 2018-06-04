var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var Korisnik = sequelize.define('Korisnik', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        korisnickoIme: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
        },
        sifra: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rola: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: function(korisnik) {
                var salt = bcrypt.genSaltSync();
                korisnik.sifra = bcrypt.hashSync(korisnik.sifra, salt);
            }
        },
        freezeTableName: true,
        tableName: 'korisnici'
    });
    return Korisnik;
}