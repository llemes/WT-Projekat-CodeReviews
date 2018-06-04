var load = function(pageName){

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            document.getElementById("pageContent").innerHTML = ajax.responseText;
            if(pageName === 'login') {
                LoadRegistrationForm();
            }
            if(pageName === 'listaKorisnika') {
                napuniTabelu();
            }
        }
        if (ajax.readyState === 4 && ajax.status === 404) {
            document.getElementById("pageContent").innerHTML = "Greska: nepoznat URL";
        }
    };

    ajax.open("GET", pageName, true);
    ajax.send();
};

var formType = 'teacher';

function LoadRegistrationForm() {

    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/registration/' + formType, true);
    ajax.onreadystatechange = function () {

        if (this.readyState !== 4) {
            return;
        }
        if (this.status !== 200) {
            return;
        }

        document.getElementById('registration') ?
            document.getElementById('registration').innerHTML = this.responseText :
            console.log('no registration form');

        Poruke.ocistiSve();

        // ova funkcija uvijek radi toggle - nema potrebe za parametrom
        if (formType === 'student') {
            formType = 'teacher';
        }
        else if (formType === 'teacher') {
            formType = 'student';
        }

        document.getElementById('RegisterFormToggleButton') ?
            document.getElementById('RegisterFormToggleButton').addEventListener('click', LoadRegistrationForm) :
            console.log('no button found');

    };

    ajax.send();
}