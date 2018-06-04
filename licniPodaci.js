var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var LicniPodaci = sequelize.define('LicniPodaci', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        imePrezime: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        // samo student
        bitbucketUrl: {
            type: Sequelize.STRING(100),
        },
        bitbucketSsh: {
            type: Sequelize.STRING(100)
        },
        nazivRepozitorija: {
            type: Sequelize.STRING(50)
        },
        // samo nastavnik
        fakultetskiMail: {
            type: Sequelize.STRING(50)
        },
        maxBrojGrupa: {
            type: Sequelize.INTEGER
        },
        regexRepozitorij: {
            type: Sequelize.STRING
        },
        semestarRegistracije: {
            type: Sequelize.STRING(30)
        },
        akademskaGodinaRegistracije: {
            type: Sequelize.STRING(9)
        },
        verified: {
            type: Sequelize.INTEGER
        }
        
    }, {
        freezeTableName: true,
        tableName: 'licniPodaci'
    });
    return LicniPodaci;
}