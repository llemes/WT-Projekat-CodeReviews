function posaljiIndekseNaServer(indeksi, brojSpirale) {

    var ajax = new XMLHttpRequest();

    var valid = true;

    ajax.onreadystatechange = function() {

        if(ajax.readyState === 4 && ajax.status === 200) {

            // zahtjev je prošao ok
            document.getElementById('feedback').innerText = 'Datoteka uspješno kreirana';

        }

        else if(ajax.readyState === 4 && ajax.status === 400) {

            // validacija nije prošla
            document.getElementById('feedback').innerText = 'Neispravan unos';

        }

        else if(ajax.readyState === 4 && ajax.status === 500) {

            // greška sa servera
            document.getElementById('feedback').innerText = 'Greška na serveru';

        }

    };

    // let's parse the string

    allRows = indeksi.replace( /\n/g, " " ).split(" ");

    indeksiArray = [];

    for(var i = 0; i < allRows.length; i++) {

        trenutniRed = allRows[i].split(',');

        // sada validirati sve

        // 6 brojeva indeksa u redu
        if(trenutniRed.length !== 6) {
            valid = false;
            break;
        }

        // svi indeksi su u ispravnom formatu
        for(var j = 0; j < trenutniRed.length; j++) {

            var regEx = /^\d{5}$/;
            if(!regEx.test(trenutniRed[j])) {
                valid = false;
            }
            if(!valid) {
                break;
            }

        }

        // svi indeksi se razlikuju od prvog i razlikuju međusobno
        for(j = 1; j < trenutniRed.length; j++) {

            if(trenutniRed[0] === trenutniRed[j]) {
                valid = false;
            }
            for(var k = 1; k < trenutniRed.length; k++) {
                if(j !== k && trenutniRed[j] === trenutniRed[k]) {
                    valid = false;
                }
            }
            if(!valid) {
                break;
            }

        }

        if(valid) {
            indeksiArray.push(trenutniRed);
        }

    }

    if(valid) {

        jsonObject = {
            'brojSpirale': brojSpirale,
            'indeksi': indeksiArray
        };

        ajax.open("POST", "unos", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(jsonObject));

    }

    else {

        document.getElementById('feedback').innerText = 'Neispravni podaci';

    }


}