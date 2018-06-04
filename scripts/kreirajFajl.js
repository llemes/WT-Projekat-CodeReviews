var KreirajFajl = (function() {

    return {
        kreirajKomentar: function (spirala, index, sadrzaj, fnCallback) {

            // validacija primljenih podataka

            // ima barem jedan karakter?

            var barJedanZnak = /^.+$/;
            var validniParametri = true;
            if(!barJedanZnak.test(spirala) || !barJedanZnak.test(index)) {
                validniParametri = false;
            }
            // json ispravan?
            if(sadrzaj.length === 0 || !sadrzaj[0].hasOwnProperty('sifra_studenta') || !sadrzaj[0].hasOwnProperty('tekst') || !sadrzaj[0].hasOwnProperty('ocjena')) {
                validniParametri = false;
            }

            // priprema podataka za slanje

            var jsonObject = {};

            if(validniParametri) {

                jsonObject = {
                    'spirala': spirala,
                    'index': index,
                    'sadrzaj': []
                };

                // mapiranje možda redundantno ali nek se nađe

                sadrzaj.forEach(function (item) {
                    jsonObject.sadrzaj.push({
                        'sifra_studenta': item.sifra_studenta,
                        'tekst': item.tekst,
                        'ocjena': item.ocjena
                    });
                });
            }

            // AJAX

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function() {

                if(!validniParametri) {
                    fnCallback(-1, 'Neispravni parametri');
                }
                else if(ajax.readyState === 4 && ajax.status === 200) {
                    fnCallback(null, ajax.responseText);
                }
                else if(ajax.readyState === 4) {
                    fnCallback(ajax.status, ajax.responseText);
                }

            };

            ajax.open("POST", "komentar", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(jsonObject));

        },
        kreirajListu: function (godina, nizRepozitorija, fnCallback) {

            // validacije

            var barJedanZnak = /^.+$/;
            var validniParametri = true;

            if(!barJedanZnak.test(godina) || nizRepozitorija.length < 1) {
                validniParametri = false;
            }

            // priprema objekta

            var jsonObject = {};

            if(validniParametri) {
                jsonObject = {
                    'godina': godina,
                    'nizRepozitorija': []
                };

                nizRepozitorija.forEach(function (item){
                    jsonObject.nizRepozitorija.push(item);
                });
            }

            // AJAX

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {

                if(!validniParametri) {
                    fnCallback(-1, 'Neispravni parametri');
                }
                else if(ajax.readyState === 4 && ajax.status === 200) {
                    fnCallback(null, ajax.responseText);
                }
                else if(ajax.readyState === 4) {
                    fnCallback(ajax.status, ajax.responseText);
                }

            };

            ajax.open("POST", "lista", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(jsonObject));

        },
        kreirajIzvjestaj: function (spirala, index, fnCallback) {

            // validacija

            var barJedanZnak = /^.+$/;
            var validniParametri = true;
            if(!barJedanZnak.test(spirala) || !barJedanZnak.test(index)) {
                validniParametri = false;
            }

            // priprema objekta

            var jsonObject = {
                spirala: spirala,
                index: index
            };

            // AJAX

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {

                if(!validniParametri) {
                    fnCallback(-1, 'Neispravni parametri');
                }
                else if(ajax.readyState === 4 && ajax.status === 200) {
                    fnCallback(null, ajax.responseText);
                }
                else if(ajax.readyState === 4) {
                    fnCallback(ajax.status, ajax.responseText);
                }

            };

            ajax.open("POST", "izvjestaj", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(jsonObject));

        },
        kreirajBodove: function (spirala, index, fnCallback) {

            // validacija

            var barJedanZnak = /^.+$/;
            var validniParametri = true;
            if(!barJedanZnak.test(spirala) || !barJedanZnak.test(index)) {
                validniParametri = false;
            }

            // priprema objekta

            var jsonObject = {
                'spirala': spirala,
                'index': index
            };

            // AJAX

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {

                if(!validniParametri) {
                    fnCallback(-1, 'Neispravni parametri');
                }
                else if(ajax.readyState === 4 && ajax.status === 200) {
                    fnCallback(null, ajax.responseText);
                }
                else if(ajax.readyState === 4) {
                    fnCallback(ajax.status, ajax.responseText);
                }

            };

            ajax.open("POST", "bodovi", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(jsonObject));

        }
    }
})();