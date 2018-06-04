var login = function(username, password) {

    var ajax = new XMLHttpRequest();
    var valid = true;
    // todo: dodati validacije na polja login forme

    ajax.onreadystatechange = function() {

        if(ajax.readyState === 4 && ajax.status === 200) {

            console.log(ajax.responseXML);
            window.location.replace(window.location.protocol + "//" + window.location.host);

        }

    };

    if(valid) {

        var jsonObject = {
            username: username,
            sifra: password
        };

        ajax.open('POST', 'login', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(jsonObject));

    }

};

var registerStudent = function(obj) {

    var ajax = new XMLHttpRequest();
    var valid = true;

    ajax.onreadystatechange = function() {

        if(ajax.readyState === 4 && ajax.status === 200) {

            console.log(ajax.responseXML);
            window.location.replace(window.location.protocol + "//" + window.location.host)

        }

    }

    // todo: dodati provjere za sva polja
    if(!obj.korisnickoIme ||
        !obj.sifra ||
        !obj.rola ||
        !obj.imePrezime) {
            valid = false;
        }

    if(valid) {

        var jsonObject = {
            korisnickoIme: obj.korisnickoIme,
            sifra: obj.sifra,
            rola: obj.rola,
            imePrezime: obj.imePrezime,
            bitbucketUrl: obj.bitbucketUrl,
            bitbucketSsh: obj.bitbucketSsh,
            nazivRepozitorija: obj.nazivRepozitorija
        }

        ajax.open('POST', 'registration/student', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(jsonObject));

    }

}

var registerTeacher = function(obj) {

    var ajax = new XMLHttpRequest();
    var valid = true;

    ajax.onreadystatechange = function() {

        if(ajax.readyState === 4 && ajax.status === 200) {

            console.log(ajax.responseXML);
            window.location.replace(window.location.protocol + "//" + window.location.host)

        }

    }

    // todo: dodati provjere za sva polja
    if(!obj.korisnickoIme ||
        !obj.sifra ||
        !obj.rola ||
        !obj.imePrezime) {
            valid = false;
        }

    if(valid) {

        var jsonObject = {
            korisnickoIme: obj.korisnickoIme,
            sifra: obj.sifra,
            rola: obj.rola,
            imePrezime: obj.imePrezime,
            fakultetskiMail: obj.fakultetskiMail,
            maxBrojGrupa: obj.maxBrojGrupa,
            regexRepozitorij: obj.regexRepozitorij,
            semestarRegistracije: obj.semestarRegistracije,
            akademskaGodinaRegistracije: obj.akademskaGodinaRegistracije,
            verified: obj.verified
        }

        ajax.open('POST', 'registration/teacher', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(jsonObject));

    }

}