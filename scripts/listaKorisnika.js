var napuniTabelu = function() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if(ajax.readyState === 4 && ajax.status === 200) {
            var tabela = document.getElementById('tabelaKorisnika');
            var brojRedova = document.getElementById('tabelaKorisnika').getElementsByTagName("tr").length;
            var korisnici = JSON.parse(ajax.responseText);
            korisnici.forEach(element => {
                var row = tabela.insertRow(brojRedova);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = element.korisnickoIme;
                if(element.rola === 1) {
                    cell2.innerHTML = 'administrator';
                }
                if(element.rola === 2) {
                    cell2.innerHTML = 'nastavnik';
                }
                if(element.rola === 3) {
                    cell2.innerHTML = 'student';
                }
                if(element.rola === 2) {
                    console.log(element);
                    cell3.innerHTML = (element.verified ? 
                        (element.verified === true) ? 'unverify' : 'verify' 
                        : ' ');
                }
                                  
            });
        }
        else {
            // greška
        }
    };

    ajax.open('GET', '/listaSvihKorisnika', true);
    ajax.send();

}