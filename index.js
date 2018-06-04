// admin admin
var fs = require('fs');
var path = require('path');
var os = require('os');
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var session = require('express-session');
var bcrypt = require('bcrypt');

var baza = require('./baza.js');

var app = express();
var port = process.env.PORT || 3000;

app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/res', express.static(path.join(__dirname, '/res')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use(bodyParser.json());

app.use(session({
    key: 'user_id',
    secret: 'omaewamoushindeiru',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
var sessionChecker = function(req, res, next) {
    if(req.session.user) {
        res.statusMessage = 'true';
        if(req.session.user.rola === 3) {
            res.redirect('/statistika');
        }
        if(req.session.user.rola === 2) {
            res.redirect('/unos');
        }
        if(req.session.user.rola === 1) {
            res.redirect('/');
        }
    }
    else {
        next();
    }
};

app.listen(port, function() {
    console.log("Listening on " + port);
});

var stopAttacks = function (str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

app.route('/login')
    .get(sessionChecker, function(req, res) {
        res.statusMessage = 'false';
        res.sendFile('login.html', { root: __dirname + "/views/" } );     
    })
    .post(function(req, res) {
        var username = stopAttacks(req.body.username),
            sifra = stopAttacks(req.body.sifra);

        baza.korisnik.findOne({ where: {korisnickoIme: username} }).then(function (user){
            
            if(!user) {
                res.statusMessage = 'false';
                res.redirect('/login');
            }
            else if(!bcrypt.compareSync(sifra, user.sifra)) {
                res.statusMessage = 'false';
                res.redirect('/login');
            }
            else {
                req.session.user = user.dataValues;
                if(user.rola === 3) {
                    res.redirect('/statistika');
                }
                if(user.rola === 2) {
                    res.redirect('/unos');
                }
                if(user.rola === 1) {
                    res.redirect('/listaKorisnika');
                }
            }
        });
    });

app.route('/registration/:tip')
    .get(sessionChecker, function(req, res) {
        res.statusMessage = 'true';
        var tipForme = req.params.tip;

        if(tipForme === 'student') {
            res.sendFile('studentRegistration.html', { root: __dirname + "/views/" } );
        }
        else if(tipForme === 'teacher') {
            res.sendFile('teacherRegistration.html', { root: __dirname + "/views/" } );
        }
        else {
            res.status(400).send({
                message: 'ne postoji'
            });
        }
    })
    .post(function(req, res) {

        var tipRegistracije = req.params.tip;
        var obj = req.body;
        var jsonObject = {}
        
        if(tipRegistracije === 'student') {

            baza.korisnik.create({
                korisnickoIme: stopAttacks(obj.korisnickoIme),
                sifra: stopAttacks(obj.sifra),
                rola: obj.rola
            }).then(function(user){
                baza.licniPodaci.create({
                    id: user.id,
                    imePrezime: stopAttacks(obj.imePrezime),
                    bitbucketUrl: stopAttacks(obj.bitbucketUrl),
                    bitbucketSsh: stopAttacks(obj.bitbucketSsh),
                    nazivRepozitorija: stopAttacks(obj.nazivRepozitorija)
                }).then(function() {
                    console.log('ok');
                    res.status(200).send({
                        message: 'Registracija uspješna'
                    });
                });
            });

            
        }

        else if(tipRegistracije === 'teacher') {

            baza.korisnik.create({
                korisnickoIme: obj.korisnickoIme,
                sifra: obj.sifra,
                rola: obj.rola
            }).then(function(user){
                baza.licniPodaci.create({
                    id: user.id,
                    imePrezime: obj.imePrezime,
                    fakultetskiMail: obj.fakultetskiMail,
                    maxBrojGrupa: obj.maxBrojGrupa,
                    regexRepozitorij: obj.regexRepozitorij,
                    semestarRegistracije: obj.semestarRegistracije,
                    akademskaGodinaRegistracije: obj.akademskaGodinaRegistracije,
                    verified: 0
                }).then(function() {
                    console.log('ok');
                    res.status(200).send({
                        message: 'Registracija uspješna'
                    })
                });
            });

        }

        else {
            res.status(404).send({
                message: 'ne postoji'
            });
        }

    });


app.get('/', function(req, res){
    if(req.session.user) {
        res.sendFile('index.html', { root: __dirname + "/views/" } );
    }
    else {
        res.statusMessage = 'true';  
        res.sendFile('index.html', { root: __dirname + "/views/" } );      
    }
});
app.route('/listaKorisnika') 
    .get(function(req, res) {
        if(req.session.user && req.session.user.rola === 1) {
            res.sendFile('listaKorisnika.html', { root: __dirname + '/views/'});
        }
        else if(req.session.user) {
            res.redirect('/');
        }
        else {
            res.statusMessage = 'true';
            res.redirect('/login');
        }
    })
    .post(function(req, res){

    });

app.get('/listaSvihKorisnika', function(req, res) {
     var listaKorisnika = [];
    var promises = []
    if(req.session.user && req.session.user.rola === 1) {
        
        
        baza.korisnik.findAll({ where: {rola: 3 } }).then(function(korisnici) {
            korisnici.forEach(function(korisnik) {
                var objekat = {
                    id: korisnik.id,
                    korisnickoIme: korisnik.korisnickoIme,
                    rola: korisnik.rola,
                    verified: null
                }
                listaKorisnika.push(objekat);
            });

            baza.korisnik.findAll({ where: {rola: 1 } }).then(function(korisnici) {
                korisnici.forEach(function(korisnik) {
                    var objekat2 = {
                        id: korisnik.id,
                        korisnickoIme: korisnik.korisnickoIme,
                        rola: korisnik.rola,
                        verified: null
                    }
                    listaKorisnika.push(objekat2);
                });
                baza.korisnik.findAll({ where: {rola:2}}).then(function(korisnici) {
                    korisnici.forEach(function(korisnik) {
                        var objekat3 = {
                            id: korisnik.id,
                            korisnickoIme: korisnik.korisnickoIme,
                            rola: korisnik.rola,
                            verified: null
                        }
                        baza.licniPodaci.findOne({ where: {id: objekat3.id} }).then(function(licniPodatak) {
                            
                            if(licniPodatak.verified === 0) {
                                objekat3.verified = false;
                            }
                            else {
                                objekat3.verified = true;
                            }
                            listaKorisnika.push(objekat3);
                        });
                    });
                    res.send(JSON.stringify(listaKorisnika));
                })
            });
        });

        
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    } 
});

app.get('/unoskomentara', function(req, res){
    if(req.session.user && req.session.user.rola === 3) {
        res.sendFile('unoskomentara.html', { root: __dirname + "/views/" } );
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    }
});
app.get('/statistika', function(req, res){
    if(req.session.user && req.session.user.rola === 3) {
        res.sendFile('statistika.html', { root: __dirname + "/views/" } );
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    }
});
app.get('/unos', function(req, res){
    if(req.session.user && req.session.user.rola === 2) {
        res.sendFile('unosSpiska.html', { root: __dirname + "/views/" } );
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    }
});
app.get('/nastavnik', function(req, res) {
    if(req.session.user && req.session.user.rola === 2) {
        res.sendFile('nastavnik.html', { root: __dirname + "/views/" });
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    }
});
app.get('/bitbucket', function(req, res) {
    if(req.session.user && req.session.user.rola === 2) {
        res.sendFile('bitbucketPozivi.html', { root: __dirname + "/views/" });
    }
    else if(req.session.user) {
        res.redirect('/');
    }
    else {
        res.statusMessage = 'true';
        res.redirect('/login');
    }
});


app.post('/komentar', function(req, res) {

    if(req.session.user && req.session.user.rola === 3) {

        var jsonObject = req.body;
    
        if(!jsonObject.spirala ||
            !jsonObject.index ||
            !jsonObject.sadrzaj) {
    
            res.status(400).send({
                message: 'Podaci nisu u traženom formatu!',
                data: null
            });
            return;
    
        }
    
        var prosleValidacije = true;
        jsonObject.sadrzaj.forEach(function (value) {
    
            if(!value.sadrzaj.sifra_studenta ||
                !value.sadrzaj.tekst ||
                !value.sadrzaj.ocjena) {
    
                prosleValidacije = false;
    
                res.status(400).send({
                    message: 'Podaci nisu u traženom formatu!',
                    data: null
                });
    
            }
    
        });
        if(!prosleValidacije) {
            return;
        }
    
        fs.writeFile('markS' + stopAttacks(jsonObject.spirala) + stopAttacks(jsonObject.index) + '.json', JSON.stringify(jsonObject), function(err) {
    
            if(err) {
                res.status(500).send({
                    message: 'Greška pri kreiranju datoteke',
                    data: null
                });
                return;
            }
    
            res.status(200).send({
                message: 'Uspješno kreirana datoteka!',
                data: jsonObject
            });
    
        });

    }

    else {

        res.status(403).send({
            message: 'Nemate dopuštenje za ovu operaciju'
        });

    }

});
app.post('/unos', function (req, res) {

    if(req.session.user && req.session.user.rola === 2) {

        var jsonObject = req.body;
    
        // validacije
    
        // format ok?
        if(!jsonObject.hasOwnProperty('indeksi') || !jsonObject.hasOwnProperty('brojSpirale')) {
            res.status(400).send({
                message: 'Podaci nisu u traženom obliku!',
                data: null
            });
            return;
        }
    
        if(jsonObject.brojSpirale < 1 || jsonObject.brojSpirale > 4) {
            res.status(400).send({
                message: 'Neispravan broj spirale',
                data: null
            });
            return;
        }
    
        if(jsonObject.indeksi.length === 0) {
            res.status(400).send({
                message: 'Polje indeksi je prazno',
                data: null
            });
            return;
        }
    
        for(var i = 0; i < jsonObject.indeksi.length; i++) {
    
            var trenutniRed = jsonObject.indeksi[i];
    
            if(trenutniRed.length !== 6) {
                res.status(400).send({
                    message: 'Potrebno je poslati 6 brojeva indeksa',
                    data: null
                });
                return;
            }
    
            for(var j = 0; j < trenutniRed.length; j++) {
    
                var regEx = /^\d{5}$/;
                if(!regEx.test(trenutniRed[j])) {
                    res.status(400).send({
                        message: 'Broj indeksa nije u ispravnom formatu',
                        data: null
                    });
                    return;
                }
    
            }
    
            for(j = 1; j < trenutniRed.length; j++) {
    
                if(trenutniRed[0] === trenutniRed[j]) {
                    res.status(400).send({
                        message: 'Student je dodijeljen sam sebi',
                        data: null
                    });
                    return;
                }
                for(var k = 1; k < trenutniRed.length; k++) {
                    if(j !== k && trenutniRed[j] === trenutniRed[k]) {
                        res.status(400).send({
                            message: 'Studentu je dvaput dodijeljen isti projekat',
                            data: null
                        });
                        return;
                    }
                }
    
            }
    
        }
    
        // podaci su ok, kreiramo fajl
    
        fs.writeFile('spisakS' + jsonObject.brojSpirale + '.json', JSON.stringify(jsonObject.indeksi), function(err) {
            if(err) {
                res.status(500).send({
                    message: 'Greška pri kreiranju datoteke'
                });
                return;
            }
    
            res.status(200).send({
               message: 'Datoteka uspješno kreirana'
            });
    
        });
    }

    else {

        res.status(403).send({
            message: 'Nemate dopuštenje za ovu operaciju'
        });

    }
    
});
app.post('/lista', function (req, res) {

    if(req.session.user && req.session.user.rola === 2) {

        var jsonObject = req.body;
    
        // valja proći ove rigorozne validacije
        if(!jsonObject.godina || !jsonObject.nizRepozitorija) {
    
            res.status(400).send({
               message: 'Podaci nisu u traženom formatu!',
               data: null
            });
            return;
    
        }
    
        var toBeFiled = [];
    
        for(var i = 0; i < jsonObject.nizRepozitorija.length; i++) {
            if(jsonObject.nizRepozitorija[i].indexOf(jsonObject.godina) !== -1) {
                toBeFiled.push(jsonObject.nizRepozitorija[i]);
            }
        }
    
        fs.writeFile('spisak' + jsonObject.godina + '.txt', JSON.stringify(toBeFiled), function (err) {
            if(err) {
                res.status(500).send({
                    message: 'Greška pri kreiranju datoteke',
                    data: null
                });
                return;
            }
    
            res.status(200).send({
                message: 'Lista uspješno kreirana!',
                data: toBeFiled.length
            });
    
        });

    }

    else {

        res.status(403).send({
            message: 'Nemate dopuštenje za ovu operaciju'
        });

    }

});
app.post('/izvjestaj', function (req, res) {

    if(req.session.user && req.session.user.rola === 2) {

        var jsonObject = req.body;
    
        if(!jsonObject || !jsonObject.spirala || !jsonObject.index) {
    
            res.status(400).send({
                message: 'Podaci nisu u traženom formatu!',
                data: null
            });
            return;
        }
    
        var p = __dirname;
    
        fs.readdir(p, function (err, files) {
    
            if (err) {
                throw err;
            }
    
            var filesToOpen = [];
    
            if(files.indexOf('spisakS' + jsonObject.spirala + '.json') !== -1) {
    
                fs.readFile('spisakS' + jsonObject.spirala + '.json', 'utf-8', function (err, data) {
    
                    if(err) {
                       throw err;
                    }
    
                    var sadrzaj = JSON.parse(data);
    
                    sadrzaj.forEach(function (value) {
                       if(value.indexOf(jsonObject.index) > 0) {
                           filesToOpen.push({
                               fajl: 'markS' + jsonObject.spirala + value[0] + '.json',
                               pozicija: value.indexOf(jsonObject.index) === 1 ? 'A' :
                                   value.indexOf(jsonObject.index) === 2 ? 'B' :
                                   value.indexOf(jsonObject.index) === 3 ? 'C' :
                                   value.indexOf(jsonObject.index) === 4 ? 'D' : 'E'
                           });
                       }
                    });
    
                    if(filesToOpen.length === 0) {
                        res.status(404).send({
                            message: 'Ne postoje informacije o tom studentu'
                        });
                        return;
                    }
    
                    var fajlKreiran = false;
    
                    filesToOpen.forEach(function (value) {
    
                        if(files.indexOf(value.fajl) !== -1) {
    
                            var data = fs.readFileSync(value.fajl, 'utf-8');
    
                            var trazeniKomentar = JSON.parse(data).sadrzaj.find(function (el) { return el.sifra_studenta === value.pozicija; });
    
                            fs.appendFileSync('izvjestajS' + jsonObject.spirala + jsonObject.index + '.txt',
                                JSON.stringify(trazeniKomentar.tekst) + os.EOL + '##########' + os.EOL);
    
                            fajlKreiran = true;
                        }
    
                    });
    
                    if(fajlKreiran) {
                        res.status(200).sendFile(__dirname + 'izvjestajS' + jsonObject.spirala + jsonObject.index + '.txt');
                    }
    
                    else {
                        res.status(500).send({
                            message: 'Greška pri kreiranju datoteke'
                        })
                    }
    
                });
    
            }
    
            else {
    
                res.status(404).send({
                    message: 'Ne postoje informacije o toj spirali'
                });
    
            }
    
        });

    }

    else {

        res.status(403).send({
            message: 'Nemate dopuštenje za ovu operaciju'
        });

    }

});
app.post('/bodovi', function(req, res) {
    
    if(req.session.user && req.session.user.rola === 2) {

        var jsonObject = req.body;

        if(!jsonObject.spirala || !jsonObject.index) {

            res.status(400).send({
                message: 'Podaci nisu u očekivanom formatu!',
                data: null
            });
            return;

        }

        var p = __dirname;

        fs.readdir(p, function (err, files) {

            if (err) {
                throw err;
            }

            var filesToOpen = [];

            if(files.indexOf('spisakS' + jsonObject.spirala + '.json') !== -1) {

                fs.readFile('spisakS' + jsonObject.spirala + '.json', 'utf-8', function (err, data) {

                    if(err) {
                        throw err;
                    }

                    var sadrzaj = JSON.parse(data);

                    sadrzaj.forEach(function (value) {
                        if(value.indexOf(jsonObject.index) > 0) {
                            filesToOpen.push({
                                fajl: 'markS' + jsonObject.spirala + value[0] + '.json',
                                pozicija: value.indexOf(jsonObject.index) === 1 ? 'A' :
                                    value.indexOf(jsonObject.index) === 2 ? 'B' :
                                    value.indexOf(jsonObject.index) === 3 ? 'C' :
                                    value.indexOf(jsonObject.index) === 4 ? 'D' : 'E'
                            });
                        }
                    });

                    if(filesToOpen.length === 0) {
                        res.status(404).send({
                            message: 'Ne postoje informacije o tom studentu'
                        });
                        return;
                    }

                    var bodovi = 0;
                    var sveProsloOk = true;

                    filesToOpen.forEach(function (value) {

                        if(files.indexOf(value.fajl) !== -1) {

                            var data = fs.readFileSync(value.fajl, 'utf-8');
                            bodovi += JSON.parse(data).sadrzaj.find(function (el) { return el.sifra_studenta === value.pozicija; }).ocjena;
                        }

                        else {

                            sveProsloOk = false;
                            res.status(404).send({
                            message: 'Ne postoje svi potrebni fajlovi za izračunavanje prosjeka'
                            });

                        }

                    });

                    if(sveProsloOk) {

                        var prosjek = Math.floor(bodovi / filesToOpen.length) + 1;

                        res.status(200).send({

                            poruka: 'Student ' + jsonObject.index + ' je ostvario u prosjeku ' + prosjek + ' mjesto'

                        });

                    }

                });

            }

            else {

                res.status(404).send({
                    message: 'Ne postoje informacije o toj spirali'
                });

            }

        });
    }

    else {

        res.status(403).send({
            message: 'Nemate dopuštenje za ovu operaciju'
        });

    }

});