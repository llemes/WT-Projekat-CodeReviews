var Sequelize = require('sequelize');
var sequelize = new Sequelize("spirala4","root","root",{
    host:"127.0.0.1",
    dialect:"mysql",
    logging:false});
    
const baza={};

baza.Sequelize = Sequelize;  
baza.sequelize = sequelize;

baza.rola = sequelize.import(__dirname + '/rola.js');
baza.korisnik = sequelize.import(__dirname + '/korisnik.js');
baza.licniPodaci = sequelize.import(__dirname + '/licniPodaci.js');

baza.sequelize.sync({force: false}).then(function(){
    
    var listaRola = [];

    listaRola.push(baza.rola.create({
        naziv: 'administrator'
    }));
    listaRola.push(baza.rola.create({
        naziv: 'nastavnik'
    }));
    listaRola.push(baza.rola.create({
        naziv: 'student'
    }));

    Promise.all(listaRola).then(function(){
        baza.korisnik.create({
            korisnickoIme: 'admin',
            sifra: 'admin',
            rola: 1
        });
    }).catch(function(err) {
        // već kreirano, ignore
    });
    
});

module.exports = baza;
    