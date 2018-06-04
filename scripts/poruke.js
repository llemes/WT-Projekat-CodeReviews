var Poruke = (function () {

    // ima defaultnu vrijednost da ne pozivam džaba svaki put

    var idDivaPoruka = 'errorMsg';

    // ovo je mogao biti dictionary zbog lakše čitljivosti
    // ali u specifikaciji je naglašeno da mora biti array :/

    var mogucePoruke = ['- Email koji ste napisali<br>nije validan fakultetski mail',
                        '- Indeks kojeg ste<br>napisali nije validan',
                        '- Nastavna grupa koju<br>ste napisali nije validna',
                        '- Akademska godina koju<br>ste unijeli nije validna',
                        '- Password: veliko, malo slovo i cifra,<br>dužine između 7 i 20 karaktera',
                        '- Password i potvrda<br>passworda se ne poklapaju',
                        '- Bitbucket URL nije validan',
                        '- Bitbucket SSH URL nije validan',
                        '- Naziv repozitorija nije validan',
                        '- Ime i prezime nisu validni'];
    var porukeZaIspis = [];

    return {
        ispisiGreske: function () {
            var htmlVrijednost = ' ';

            for(var el in porukeZaIspis) {
                htmlVrijednost += porukeZaIspis[el];
                htmlVrijednost += '<br>';
            }

            document.getElementById(idDivaPoruka).innerHTML = htmlVrijednost;
        },
        
        postaviIdDiva: function (idDiva) {
            idDivaPoruka = idDiva;
        },
        
        dodajPoruku: function (indeksPoruke) {
            var poruka = mogucePoruke[indeksPoruke];
            if(porukeZaIspis.indexOf(poruka) === -1) {
                porukeZaIspis.push(poruka);
            }
        },

        ocistiGresku: function (indeksPoruke) {
            var poruka = mogucePoruke[indeksPoruke];
            var indeksZaBrisanje = porukeZaIspis.indexOf(poruka);
            if(indeksZaBrisanje !== -1) {
                porukeZaIspis.splice(indeksZaBrisanje, 1);
            }
        },

        ocistiSve: function () {
            porukeZaIspis = [];
        }
    }

}());